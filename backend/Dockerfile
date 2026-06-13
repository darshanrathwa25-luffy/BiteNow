# --- Stage 1: Build & Dependency Isolation ---
FROM python:3.11-slim AS builder
WORKDIR /build
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
# Install build dependencies (e.g., for cryptography or db drivers)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
# Copy requirements first for layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
# --- Stage 2: Minimal Runtime Execution Layer ---
FROM python:3.11-slim AS runner
WORKDIR /app
ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1
# Create a non-root user and group for security
RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -m -s /bin/bash appuser
# Copy virtual environment from builder stage
COPY --from=builder /opt/venv /opt/venv
# Copy source code and assign ownership
COPY --chown=appuser:appgroup . .
# Switch to the non-root user
USER appuser
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
