"""Structured AI result derived from the class code and confidence a model returned.

Only the code and the confidence are stored on the diagnosis row, so this is what
rebuilds the full result when a past diagnosis is read back (history, notifications).
"""

DISEASE_NAMES = {
    # poultry (app/poultry_model.py)
    'avian_influenza': 'Avian Influenza',
    'cocci': 'Coccidiosis',
    'healthy': 'Healthy',
    'ncd': 'Newcastle Disease',
    'non_poultry': 'Non Poultry',
    'pullorum': 'Pullorum Disease',
    'salmo': 'Salmonellosis',
    # fish (app/ai_model.py)
    'bacterial_red_disease': 'Bacterial Red Disease',
    'bacterial_diseases_aeromoniasis': 'Aeromoniasis',
    'bacterial_gill_disease': 'Bacterial Gill Disease',
    'fungal_diseases_saprolegniasis': 'Saprolegniasis',
    'parasitic_diseases': 'Parasitic Diseases',
    'viral_diseases_white_tail_disease': 'White Tail Disease',
    'healthy_fish': 'Healthy Fish',
    'not_fish': 'Not Fish',
}

NON_DISEASE_CODES = {'healthy', 'healthy_fish', 'non_poultry', 'not_fish'}

# Diseases where a high-confidence hit is an emergency rather than a routine finding.
CRITICAL_CODES = {'avian_influenza', 'ncd', 'pullorum', 'viral_diseases_white_tail_disease'}


def build_ai_result(disease_code: str, confidence: float) -> dict:
    """Build a structured AI result dict from raw model output."""
    disease_name = DISEASE_NAMES.get(disease_code, disease_code.replace('_', ' ').title())
    is_healthy = disease_code in NON_DISEASE_CODES

    if is_healthy:
        severity = 'NONE'
    elif confidence >= 0.8:
        severity = 'CRITICAL' if disease_code in CRITICAL_CODES else 'HIGH'
    elif confidence >= 0.6:
        severity = 'MEDIUM'
    else:
        severity = 'LOW'

    return {
        'disease_code': disease_code,
        'disease_name': disease_name,
        'confidence': confidence,
        'confidence_percent': round(confidence * 100, 2),
        'severity': severity,
        'is_healthy': is_healthy,
        'needs_treatment': not is_healthy and confidence > 0.5,
    }
