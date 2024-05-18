from fastapi import HTTPException, APIRouter, UploadFile, File, Query
import io
import torch
import torchaudio
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
from pyrogram import Client
import json
import base64

api_id = "29499355"
api_hash = "a7d026d128fa36a7e4b90e3bc89e519e"
app = Client("my_account", api_id=api_id, api_hash=api_hash)

processor_path = "anton-l/wav2vec2-large-xlsr-53-tatar"
model_path = "anton-l/wav2vec2-large-xlsr-53-tatar"
processor = Wav2Vec2Processor.from_pretrained(processor_path)
model = Wav2Vec2ForCTC.from_pretrained(model_path)

router = APIRouter(tags=["Model"])


@router.post("/recognize")
async def voice_recognition(file: UploadFile = File(...)):
    if not file.filename.endswith(('.wav', '.ogg')):
        raise HTTPException(status_code=400, detail="Invalid file format")

    contents = await file.read()
    prediction = totext(contents)
    return prediction

@router.post("/channelPosts")
async def scrapper(channel_tag: str = Query(..., description="Tag of the channel"), num_posts: int = Query(10, description="Number of posts to fetch")):
    try:
        result = extract_posts(channel_tag, num_posts)
        return json.loads(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def extract_posts(channel_tag, num_posts):
    with app:
        posts = []
        for message in app.get_chat_history(channel_tag, limit=num_posts):
            post_data = {
                "date": message.date.isoformat(),
                "text": message.text or message.caption or "",
                "photo": None
            }
            if message.photo:
                file = app.download_media(message.photo)
                with open(file, "rb") as image_file:
                    post_data["photo"] = base64.b64encode(image_file.read()).decode("utf-8")
            
            posts.append(post_data)

        return json.dumps(posts, ensure_ascii=False, indent=4)


def totext(audio_bytes):
    audio_stream = io.BytesIO(audio_bytes)
    speech_array, sampling_rate = torchaudio.load(audio_stream)
    resampler = torchaudio.transforms.Resample(orig_freq=sampling_rate, new_freq=16_000)
    speech = resampler(speech_array).squeeze().numpy()

    # Подготовка входных данных для модели
    inputs = processor(speech, sampling_rate=16_000, return_tensors="pt", padding=True)

    # Предсказание
    with torch.no_grad():
        logits = model(inputs.input_values, attention_mask=inputs.attention_mask).logits
    predicted_ids = torch.argmax(logits, dim=-1)

    # Вывод результата
    return processor.batch_decode(predicted_ids)
