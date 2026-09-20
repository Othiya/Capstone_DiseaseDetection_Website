FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY shobarkhamar-complete-backend/requirements.txt .

RUN pip install --upgrade pip && \
    pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install -r requirements.txt && \
    pip install gdown

RUN python -c "from torchvision.models import mobilenet_v3_large, MobileNet_V3_Large_Weights; mobilenet_v3_large(weights=MobileNet_V3_Large_Weights.DEFAULT)"

COPY shobarkhamar-complete-backend/ .

COPY shobarkhamar-complete-backend/app/models/best_mobilenet_v3_large_fish_disease.pth /app/models/best_mobilenet_v3_large_fish_disease.pth

RUN python download_models.py

RUN mkdir -p /app/uploads /app/logs

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
