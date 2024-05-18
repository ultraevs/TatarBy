from fastapi import HTTPException, APIRouter, UploadFile, File
import io
import torch
import torchaudio
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

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
