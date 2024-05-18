import os

from fastapi import HTTPException, APIRouter, UploadFile, File, Query
from pyrogram import Client
import json
import base64
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api_id = "29499355"
api_hash = "a7d026d128fa36a7e4b90e3bc89e519e"
session_path = "my_account"

app = Client(name=session_path, api_id=api_id, api_hash=api_hash)
router = APIRouter(tags=["Scrapper"])


@router.post("/channelPosts")
async def scrapper(channel_tag: str = Query(..., description="Tag of the channel"), num_posts: int = Query(10, description="Number of posts to fetch")):
    try:
        result = await extract_posts(channel_tag, num_posts)  # Await the async function
        return json.loads(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def extract_posts(channel_tag, num_posts):
    async with app:
        posts = []
        async for message in app.get_chat_history(channel_tag, limit=num_posts):
            post_data = {
                "date": message.date.isoformat(),
                "text": message.text or message.caption or "",
                "photo": None
            }
            if message.photo:
                file = await app.download_media(message.photo)
                with open(file, "rb") as image_file:
                    post_data["photo"] = base64.b64encode(image_file.read()).decode("utf-8")

            posts.append(post_data)

        return json.dumps(posts, ensure_ascii=False, indent=4)
