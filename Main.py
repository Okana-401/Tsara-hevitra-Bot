from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from utils.openai_api import ask_gpt
import os

app = FastAPI()

# CORS (React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Azo amboarina ho toy ny http://localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("message")
    response = await ask_gpt(prompt)
    return {"response": response}
