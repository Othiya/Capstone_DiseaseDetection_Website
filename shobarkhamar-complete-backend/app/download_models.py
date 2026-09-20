import os
import gdown

# Download models from Google Drive links:
MODELS = {
}

os.makedirs("/app/models", exist_ok=True)

for filename, file_id in MODELS.items():
    dest = f"/app/models/{filename}"
    if not os.path.exists(dest):
        print(f"Downloading {filename}...")
        gdown.download(id=file_id, output=dest, quiet=False)
        print(f"✓ {filename} done")
    else:
        print(f"✓ {filename} already exists")
