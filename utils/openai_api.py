import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

async def ask_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Manao ahoana! Ianao dia bot amin’ny teny Malagasy."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=500
    )
    return response['choices'][0]['message']['content']
