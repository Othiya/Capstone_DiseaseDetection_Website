import uuid
import enum
from sqlalchemy import Column, String, DateTime, Integer, Text, ForeignKey, Boolean, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class ApplicationMethod(str, enum.Enum):
    ORAL = "ORAL"
    INJECTION = "INJECTION"
    TOPICAL = "TOPICAL"
    WATER = "WATER"
    IN_WATER = "IN_WATER"
    FEED = "FEED"
    BATH = "BATH"
    DIP = "DIP"
    SPRAY = "SPRAY"
    # No farmer-applied protocol exists: the bird/fish owner must call a vet or
    # the livestock authority instead of dosing anything themselves.
    VETERINARY_RESPONSE = "VETERINARY_RESPONSE"
    OTHER = "OTHER"


class Treatment(Base):
    __tablename__ = "treatments"

    treatment_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    treatment_code = Column(String(80), nullable=False, unique=True, index=True)
    treatment_name = Column(String(200), nullable=False)
    treatment_name_bn = Column(String(400), nullable=True)
    medication_name = Column(String(400), nullable=True)
    medication_name_bn = Column(String(800), nullable=True)
    application_method = Column(Enum(ApplicationMethod), nullable=False)
    dosage_text = Column(Text, nullable=True)
    dosage_text_bn = Column(Text, nullable=True)
    duration_days = Column(Integer, nullable=True)
    # Prose form shown on the treatment page.
    precaution = Column(Text, nullable=True)
    precaution_bn = Column(Text, nullable=True)
    # List form shown on the disease database page.
    precautions = Column(JSON, nullable=True)
    precautions_bn = Column(JSON, nullable=True)
    alternatives_note = Column(Text, nullable=True)
    alternatives_note_bn = Column(Text, nullable=True)
    # One-line summaries for the disease database card, which states the medication
    # more briefly than the dosing detail the treatment page needs.
    summary = Column(Text, nullable=True)
    summary_bn = Column(Text, nullable=True)
    medication_summary = Column(Text, nullable=True)
    medication_summary_bn = Column(Text, nullable=True)
    # When true the UI must suppress the dosing protocol and show a referral instead.
    requires_veterinarian = Column(Boolean, default=False, nullable=False)
    source_reference = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    disease_treatments = relationship("DiseaseTreatment", back_populates="treatment")


class DiseaseTreatment(Base):
    __tablename__ = "disease_treatments"

    disease_id = Column(UUID(as_uuid=True), ForeignKey("diseases.disease_id"), primary_key=True)
    treatment_id = Column(UUID(as_uuid=True), ForeignKey("treatments.treatment_id"), primary_key=True)
    effectiveness_notes = Column(Text, nullable=True)
    effectiveness_notes_bn = Column(Text, nullable=True)
    is_primary_treatment = Column(Boolean, default=False)

    disease = relationship("Disease", back_populates="disease_treatments")
    treatment = relationship("Treatment", back_populates="disease_treatments")
