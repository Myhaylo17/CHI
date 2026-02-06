import asyncio
import sys
import os

# Додаємо поточну директорію в шлях, щоб імпорти працювали коректно
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.client import (
    fetch_async_external,
    fetch_sync_external,
    fetch_multiprocessing_external,
    test_local_server
)


async def run_benchmarks():
    # Зовнішні тести
    await fetch_async_external()
    fetch_sync_external()
    fetch_multiprocessing_external()

    print("\n" + "=" * 40)
    print("ТЕСТУВАННЯ FASTAPI")
    print("=" * 40)

    # Тести локального сервера
    await test_local_server("blocking")
    await test_local_server("non-blocking")


if __name__ == "__main__":
    asyncio.run(run_benchmarks())
