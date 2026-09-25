import uuid
import enum
from sqlalchemy import Column, String, Boolean, DateTime, Text, ForeignKey, Enum, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class SeverityLevel(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class TargetSpecies(str, enum.Enum):
    FISH = "FISH"
    POULTRY = "POULTRY"
    MIXED = "MIXED"


# Association table for disease <-> symptom
disease_symptoms = Table(
    "disease_symptoms",
    Base.metadata,
    Column("disease_id", UUID(as_uuid=True), ForeignKey("diseases.disease_id"), primary_key=True),
    Column("symptom_id", UUID(as_uuid=True), ForeignKey("symptoms.symptom_id"), primary_key=True),
)


class Symptom(Base):
    __tablename__ = "symptoms"

    symptom_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    symptom_name = Column(String(200), nullable=False)
    symptom_name_bn = Column(String(400), nullable=True)
    symptom_description = Column(Text, nullable=True)
    target_species = Column(Enum(TargetSpecies), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    diseases = relationship("Disease", secondary=disease_symptoms, back_populates="symptoms")


class Disease(Base):
    __tablename__ = "diseases"

    disease_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # Matches the class code the AI models return (app/ai_model.py, app/poultry_model.py)
    # so a diagnosis result can be looked up without string-matching display names.
    disease_code = Column(String(60), nullable=False, unique=True, index=True)
    disease_name = Column(String(200), nullable=False)
    disease_name_bn = Column(String(400), nullable=True)
    short_name = Column(String(100), nullable=True)
    short_name_bn = Column(String(200), nullable=True)
    target_species = Column(Enum(TargetSpecies), nullable=False)
    description = Column(Text, nullable=True)
    description_bn = Column(Text, nullable=True)
    diagnosis_method = Column(Text, nullable=True)
    diagnosis_method_bn = Column(Text, nullable=True)
    contagious = Column(Boolean, default=False)
    severity_level = Column(Enum(SeverityLevel), default=SeverityLevel.MEDIUM)
    # Diseases that must be reported to the livestock authority (e.g. avian influenza).
    notifiable = Column(Boolean, default=False)
    # Diseases transmissible to humans, so handlers need protective measures.
    zoonotic = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    symptoms = relationship("Symptom", secondary=disease_symptoms, back_populates="diseases")
    disease_treatments = relationship("DiseaseTreatment", back_populates="disease")
    diagnoses = relationship("Diagnosis", back_populates="final_disease", lazy="select")
