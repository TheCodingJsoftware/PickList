# ============================
#   1) Frontend Build Stage
# ============================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package.json + lock file first for better caching
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy the rest of the frontend source
COPY . .

# Build frontend using Webpack (creates /dist folder)
RUN npm run build


# ============================
#   2) Backend Build Stage
# ============================
FROM python:3.12-slim AS backend

WORKDIR /app

# Install system deps if Tornado or your code needs them
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy Python requirements (create requirements.txt if not already present)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Copy compiled frontend from stage 1 into backend static path
# Adjust the path if your Tornado static directory differs
COPY --from=frontend-builder /app/dist ./static/

# Expose your Tornado port
EXPOSE 5061

# Run Tornado
CMD ["python", "main.py"]
