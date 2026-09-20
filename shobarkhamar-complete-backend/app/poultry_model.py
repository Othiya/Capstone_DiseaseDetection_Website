"""Poultry disease inference using the trained EfficientNetV2-B1 checkpoint."""

from typing import Dict

import timm
import torch
import torchvision.transforms as transforms
from PIL import Image


EXPECTED_CLASS_NAMES = [
    "avian_influenza",
    "cocci",
    "healthy",
    "ncd",
    "non_poultry",
    "pullorum",
    "salmo",
]

DISPLAY_NAMES = {
    "avian_influenza": "Avian Influenza",
    "cocci": "Coccidiosis",
    "healthy": "Healthy",
    "ncd": "Newcastle Disease",
    "non_poultry": "Non Poultry",
    "pullorum": "Pullorum Disease",
    "salmo": "Salmonellosis",
}

HEALTHY_CLASSES = {"healthy", "non_poultry"}
CRITICAL_CLASSES = {"avian_influenza", "ncd", "pullorum"}


class PoultryDiseaseDetector:
    def __init__(self, model_path: str, device: str = None):
        self.device = torch.device(
            device or ("cuda" if torch.cuda.is_available() else "cpu")
        )
        print(f"Loading poultry model on device: {self.device}")

        checkpoint = torch.load(model_path, map_location="cpu", weights_only=True)
        if not isinstance(checkpoint, dict) or "model_state_dict" not in checkpoint:
            raise ValueError("Unsupported poultry checkpoint format")

        self.class_names = checkpoint.get("class_names", EXPECTED_CLASS_NAMES)
        if self.class_names != EXPECTED_CLASS_NAMES:
            raise ValueError(
                f"Unexpected poultry class order: {self.class_names}; "
                f"expected {EXPECTED_CLASS_NAMES}"
            )

        model_name = checkpoint.get("timm_model_name_used", "tf_efficientnetv2_b1.in1k")
        self.model = timm.create_model(
            model_name,
            pretrained=False,
            num_classes=len(self.class_names),
        )
        self.model.load_state_dict(checkpoint["model_state_dict"], strict=True)
        self.model.to(self.device)
        self.model.eval()

        config = checkpoint.get("config", {})
        image_size = int(config.get("image_size", 240))
        mean = config.get("imagenet_mean", [0.485, 0.456, 0.406])
        std = config.get("imagenet_std", [0.229, 0.224, 0.225])
        self.transform = transforms.Compose([
            transforms.Resize((image_size, image_size)),
            transforms.ToTensor(),
            transforms.Normalize(mean=mean, std=std),
        ])

        print("Poultry EfficientNetV2-B1 model loaded successfully")
        print(f"  Classes: {self.class_names}")

    def predict(self, image_path: str, top_k: int = 3) -> Dict:
        image = Image.open(image_path).convert("RGB")
        tensor = self.transform(image).unsqueeze(0).to(self.device)

        with torch.inference_mode():
            probabilities = torch.softmax(self.model(tensor), dim=1)[0]

        top_probs, top_indices = torch.topk(
            probabilities, k=min(top_k, len(self.class_names))
        )
        predictions = []
        for probability, index in zip(top_probs.tolist(), top_indices.tolist()):
            code = self.class_names[index]
            predictions.append({
                "disease_code": code,
                "disease_name": DISPLAY_NAMES[code],
                "confidence": probability,
                "confidence_percent": round(probability * 100, 2),
            })

        primary = predictions[0]
        code = primary["disease_code"]
        confidence = primary["confidence"]
        is_healthy = code in HEALTHY_CLASSES

        if is_healthy:
            severity = "NONE"
        elif confidence >= 0.8:
            severity = "CRITICAL" if code in CRITICAL_CLASSES else "HIGH"
        elif confidence >= 0.6:
            severity = "MEDIUM"
        else:
            severity = "LOW"

        return {
            "primary_prediction": {**primary, "severity": severity},
            "all_predictions": predictions,
            "is_healthy": is_healthy,
            "needs_treatment": not is_healthy and confidence > 0.5,
        }
