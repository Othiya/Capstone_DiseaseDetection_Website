"""Bilingual disease content served to the disease database and treatment pages.

Both languages are returned in one payload so the language toggle in the UI is
instant and does not need a refetch.
"""

from typing import List, Optional

from pydantic import BaseModel

from app.models.disease import Disease, SeverityLevel, TargetSpecies
from app.models.treatment import ApplicationMethod, DiseaseTreatment


class LocalizedText(BaseModel):
    en: str
    bn: Optional[str] = None


class LocalizedList(BaseModel):
    en: List[str] = []
    bn: List[str] = []


class TreatmentContent(BaseModel):
    treatment_code: str
    name: LocalizedText
    medication: LocalizedText
    medication_summary: LocalizedText
    application_method: ApplicationMethod
    dosage: LocalizedText
    duration_days: Optional[int] = None
    precaution: LocalizedText
    precautions: LocalizedList
    alternatives: LocalizedText
    summary: LocalizedText
    effectiveness: LocalizedText
    # When true the UI must not present a dosing protocol as if the farmer can act
    # on it alone; it shows a referral to a veterinarian instead.
    requires_veterinarian: bool
    reference: Optional[str] = None


class DiseaseContent(BaseModel):
    disease_code: str
    species: TargetSpecies
    name: LocalizedText
    short_name: LocalizedText
    description: LocalizedText
    diagnosis: LocalizedText
    symptoms: LocalizedList
    contagious: bool
    severity: SeverityLevel
    notifiable: bool
    zoonotic: bool
    treatment: Optional[TreatmentContent] = None


class DiseaseContentListResponse(BaseModel):
    diseases: List[DiseaseContent]
    total: int


def _text(en: Optional[str], bn: Optional[str]) -> LocalizedText:
    return LocalizedText(en=en or "", bn=bn)


def _treatment_content(link: DiseaseTreatment) -> TreatmentContent:
    treatment = link.treatment
    return TreatmentContent(
        treatment_code=treatment.treatment_code,
        name=_text(treatment.treatment_name, treatment.treatment_name_bn),
        medication=_text(treatment.medication_name, treatment.medication_name_bn),
        medication_summary=_text(
            treatment.medication_summary, treatment.medication_summary_bn
        ),
        application_method=treatment.application_method,
        dosage=_text(treatment.dosage_text, treatment.dosage_text_bn),
        duration_days=treatment.duration_days,
        precaution=_text(treatment.precaution, treatment.precaution_bn),
        precautions=LocalizedList(
            en=treatment.precautions or [], bn=treatment.precautions_bn or []
        ),
        alternatives=_text(treatment.alternatives_note, treatment.alternatives_note_bn),
        summary=_text(treatment.summary, treatment.summary_bn),
        effectiveness=_text(link.effectiveness_notes, link.effectiveness_notes_bn),
        requires_veterinarian=treatment.requires_veterinarian,
        reference=treatment.source_reference,
    )


def build_disease_content(disease: Disease) -> DiseaseContent:
    primary = next(
        (link for link in disease.disease_treatments if link.is_primary_treatment),
        None,
    )
    return DiseaseContent(
        disease_code=disease.disease_code,
        species=disease.target_species,
        name=_text(disease.disease_name, disease.disease_name_bn),
        short_name=_text(disease.short_name, disease.short_name_bn),
        description=_text(disease.description, disease.description_bn),
        diagnosis=_text(disease.diagnosis_method, disease.diagnosis_method_bn),
        symptoms=LocalizedList(
            en=[s.symptom_name for s in disease.symptoms],
            bn=[s.symptom_name_bn or s.symptom_name for s in disease.symptoms],
        ),
        contagious=disease.contagious,
        severity=disease.severity_level,
        notifiable=disease.notifiable,
        zoonotic=disease.zoonotic,
        treatment=_treatment_content(primary) if primary else None,
    )
