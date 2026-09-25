"""Load the reference disease content into the database.

Runs on every startup and is keyed on disease_code / treatment_code, so editing a
line of content and restarting updates the row instead of inserting a duplicate.
"""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import AsyncSessionLocal
from app.models.disease import Disease, SeverityLevel, Symptom, TargetSpecies
from app.models.treatment import ApplicationMethod, DiseaseTreatment, Treatment
from app.seeds.fish_content import FISH_DISEASES
from app.seeds.poultry_content import POULTRY_DISEASES

ALL_DISEASES = FISH_DISEASES + POULTRY_DISEASES


async def _upsert_symptoms(db: AsyncSession, entries: list[dict], species: TargetSpecies) -> list[Symptom]:
    symptoms = []
    for entry in entries:
        result = await db.execute(
            select(Symptom).where(
                Symptom.symptom_name == entry["en"],
                Symptom.target_species == species,
            )
        )
        symptom = result.scalar_one_or_none()
        if symptom is None:
            symptom = Symptom(symptom_name=entry["en"], target_species=species)
            db.add(symptom)
        symptom.symptom_name_bn = entry["bn"]
        symptoms.append(symptom)
    return symptoms


async def _upsert_treatment(db: AsyncSession, data: dict) -> Treatment:
    result = await db.execute(
        select(Treatment).where(Treatment.treatment_code == data["code"])
    )
    treatment = result.scalar_one_or_none()
    if treatment is None:
        treatment = Treatment(treatment_code=data["code"])
        db.add(treatment)

    treatment.treatment_name = data["name"]["en"]
    treatment.treatment_name_bn = data["name"]["bn"]
    treatment.medication_name = data["medication"]["en"]
    treatment.medication_name_bn = data["medication"]["bn"]
    treatment.application_method = ApplicationMethod(data["method"])
    treatment.dosage_text = data["dosage"]["en"]
    treatment.dosage_text_bn = data["dosage"]["bn"]
    treatment.duration_days = data["duration_days"]
    treatment.precaution = data["precaution"]["en"]
    treatment.precaution_bn = data["precaution"]["bn"]
    treatment.precautions = data["precautions"]["en"]
    treatment.precautions_bn = data["precautions"]["bn"]
    treatment.alternatives_note = data["alternatives"]["en"]
    treatment.alternatives_note_bn = data["alternatives"]["bn"]
    treatment.summary = data["summary"]["en"]
    treatment.summary_bn = data["summary"]["bn"]
    treatment.medication_summary = data["medication_summary"]["en"]
    treatment.medication_summary_bn = data["medication_summary"]["bn"]
    treatment.requires_veterinarian = data["requires_veterinarian"]
    treatment.source_reference = data["reference"]
    return treatment


async def seed_disease_content() -> int:
    """Insert or refresh every disease, symptom and treatment. Returns the disease count."""
    async with AsyncSessionLocal() as db:
        for entry in ALL_DISEASES:
            species = TargetSpecies(entry["species"])

            result = await db.execute(
                select(Disease)
                .options(selectinload(Disease.symptoms))
                .where(Disease.disease_code == entry["code"])
            )
            disease = result.scalar_one_or_none()
            if disease is None:
                disease = Disease(disease_code=entry["code"])
                db.add(disease)

            disease.disease_name = entry["name"]["en"]
            disease.disease_name_bn = entry["name"]["bn"]
            disease.short_name = entry["short_name"]["en"]
            disease.short_name_bn = entry["short_name"]["bn"]
            disease.target_species = species
            disease.description = entry.get("description", {}).get("en")
            disease.description_bn = entry.get("description", {}).get("bn")
            disease.diagnosis_method = entry["diagnosis"]["en"]
            disease.diagnosis_method_bn = entry["diagnosis"]["bn"]
            disease.contagious = entry["contagious"]
            disease.severity_level = SeverityLevel(entry["severity"])
            disease.notifiable = entry["notifiable"]
            disease.zoonotic = entry["zoonotic"]

            disease.symptoms = await _upsert_symptoms(db, entry["symptoms"], species)

            treatment = await _upsert_treatment(db, entry["treatment"])
            await db.flush()

            link = await db.get(DiseaseTreatment, (disease.disease_id, treatment.treatment_id))
            if link is None:
                link = DiseaseTreatment(
                    disease_id=disease.disease_id,
                    treatment_id=treatment.treatment_id,
                )
                db.add(link)
            link.effectiveness_notes = entry["treatment"]["effectiveness"]["en"]
            link.effectiveness_notes_bn = entry["treatment"]["effectiveness"]["bn"]
            link.is_primary_treatment = True

        await db.commit()
    return len(ALL_DISEASES)
