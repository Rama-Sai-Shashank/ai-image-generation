from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from huggingface_hub import InferenceClient
from io import BytesIO
import base64
import os
from dotenv import load_dotenv

# Load env
load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL_ID = os.getenv("HF_MODEL_ID", "black-forest-labs/FLUX.1-schnell")

if not HF_API_KEY:
    print("⚠️ HF_API_KEY not set in .env")

# HuggingFace Inference client (it will internally use router etc.)
client = InferenceClient(
    provider="auto",   # let HF decide
    api_key=HF_API_KEY
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later deployment lo specific ga change cheyochu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    image_base64: str

@app.get("/")
def root():
    return {"message": "AI Image Generator backend running!"}

@app.post("/generate", response_model=GenerateResponse)
def generate_image(data: GenerateRequest):
    if not HF_API_KEY:
        raise HTTPException(status_code=500, detail="HF API key missing")

    try:
        # HuggingFace client will call the right text-to-image endpoint
        image = client.text_to_image(
            data.prompt,
            model=HF_MODEL_ID,
        )  # returns PIL.Image

        # Convert PIL image -> bytes -> base64
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        img_bytes = buffer.getvalue()
        img_b64 = base64.b64encode(img_bytes).decode("utf-8")

        return GenerateResponse(image_base64=img_b64)

    except Exception as e:
        print("HF error:", e)
        raise HTTPException(status_code=500, detail="AI API error")
