import logging
from aiogram import Bot, Dispatcher, types
from aiogram.contrib.middlewares.logging import LoggingMiddleware
from aiogram.types import ParseMode
from aiogram.utils import executor
from aiogram.dispatcher.filters import Text
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.types import ContentType
from dotenv import load_dotenv
import os

load_dotenv()
API_TOKEN = os.getenv('BOT_TOKEN')
MODERATOR_ID = int(os.getenv('MODERATOR_ID'))
CHANNEL_ID = int(os.getenv('CHANNEL_ID'))

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot, storage=MemoryStorage())
dp.middleware.setup(LoggingMiddleware())


class Form(StatesGroup):
    waiting_for_photo = State()
    waiting_for_text = State()
    waiting_for_moderation = State()


@dp.message_handler(commands='start')
async def cmd_start(message: types.Message):
    await Form.waiting_for_photo.set()
    await message.reply("Пожалуйста, отправьте фото.")


@dp.message_handler(content_types=ContentType.PHOTO, state=Form.waiting_for_photo)
async def process_photo(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['photo'] = message.photo[-1].file_id
    await Form.next()
    await message.reply("Теперь отправьте текст.")


@dp.message_handler(state=Form.waiting_for_text)
async def process_text(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['text'] = message.text

    markup = types.InlineKeyboardMarkup()
    markup.add(types.InlineKeyboardButton("Подтвердить", callback_data='approve'))
    data_to_send = data
    await bot.send_photo(
        MODERATOR_ID,
        photo=data_to_send['photo'],
        caption=data_to_send['text'],
        reply_markup=markup
    )
    await Form.waiting_for_moderation.set()
    await message.reply("Ваше сообщение отправлено на модерацию.")


@dp.callback_query_handler(Text(equals='approve'), state=Form.waiting_for_moderation)
async def approve_post(callback_query: types.CallbackQuery, state: FSMContext):
    async with state.proxy() as data:
        await bot.send_photo(
            CHANNEL_ID,
            photo=data['photo'],
            caption=data['text']
        )
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(callback_query.from_user.id, "Сообщение опубликовано в канале.")
    await state.finish()


if __name__ == '__main__':
    from aiogram import executor

    executor.start_polling(dp, skip_updates=True)
