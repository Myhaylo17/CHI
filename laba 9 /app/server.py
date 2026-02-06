from fastapi import FastAPI
import time
import asyncio

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Сервер працює! Доступні шляхи: /blocking та /non-blocking"}

@app.get("/blocking")
async def blocking_endpoint():
    time.sleep(2)
    return {"mode": "really blocking now"}

@app.get("/non-blocking")
async def non_blocking_endpoint():
    await asyncio.sleep(2)
    return {"status": "success", "mode": "non-blocking"}