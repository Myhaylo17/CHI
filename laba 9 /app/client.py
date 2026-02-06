import asyncio
import httpx
import time
import requests
from multiprocessing import Pool

URL_DELAY = "https://httpbin.org/delay/2"
COUNT = 5


# --- Частина 1: Зовнішні запити ---

async def fetch_async_external():
    print(f"\n--- Запуск 5 асинхронних запитів до httpbin ---")
    start = time.perf_counter()
    async with httpx.AsyncClient() as client:
        tasks = [client.get(URL_DELAY, timeout=10) for _ in range(COUNT)]
        await asyncio.gather(*tasks)
    duration = time.perf_counter() - start
    print(f"Асинхронно виконано за: {duration:.2f} сек")


def fetch_sync_external():
    print(f"\n--- Запуск 5 синхронних запитів до httpbin ---")
    start = time.perf_counter()
    for _ in range(COUNT):
        requests.get(URL_DELAY)
    duration = time.perf_counter() - start
    print(f"Синхронно виконано за: {duration:.2f} сек")


def _worker_task(url):
    return requests.get(url)


def fetch_multiprocessing_external():
    print(f"\n--- Запуск 5 запитів через Multiprocessing ---")
    start = time.perf_counter()
    with Pool(processes=COUNT) as pool:
        pool.map(_worker_task, [URL_DELAY] * COUNT)
    duration = time.perf_counter() - start
    print(f"Multiprocessing виконано за: {duration:.2f} сек")


# --- Частина 2: Тестування нашого сервера ---

async def test_local_server(endpoint_name):
    url = f"http://127.0.0.1:8000/{endpoint_name}"
    print(f"\nТестуємо локальний ендпоінт: /{endpoint_name}")
    start = time.perf_counter()

    async with httpx.AsyncClient() as client:
        tasks = [client.get(url, timeout=15) for _ in range(COUNT)]
        await asyncio.gather(*tasks)

    duration = time.perf_counter() - start
    print(f"Результат /{endpoint_name}: {duration:.2f} сек")