# ===========================================
# AHE Risk Engine – Data Mapping Specification (v1.0)
# ===========================================
# Purpose:
# This document defines EXACTLY how raw data from AHE Blocks (A–H) is mapped
# into the normalized input schema required by the Risk Engine (Block E).
# This mapping ensures:
#   • Consistency across all ingest sources
#   • Predictability for ML v2.0
#   • Auditability for regulators (NICE, FDA, MHRA)
#   • Clean inputs for population-level dashboards & passports

# -------------------------------------------
# 1. Canonical Risk Input Object (RISK_INPUT_V1)
# -------------------------------------------
# Every risk calculation call will be based on this canonical object.

RISK_INPUT_V1 = {
  "patient_id": string,
  "demographics": {
    "sex": enum("male", "female", "other", "unknown"),
    "age": int,
    "ethnicity": optional string,
    "country": optional string,
    "bmi": float,
    "height_cm": optional float,
    "weight_kg": optional float,
  },
  "vitals": {
    "heart_rate": optional float,
    "hrv": optional float,
    "blood_pressure_sys": optional float,
    "blood_pressure_dia": optional float,
    "spo2": optional float,
    "resp_rate": optional float,
    "temperature_body": optional float,
  },
  "metabolic": {
    "fasting_glucose": optional float,
    "hba1c": optional float,
    "cholesterol_total": optional float,
    "ldl": optional float,
    "hdl": optional float,
    "triglycerides": optional float,
  },
  "lifestyle": {
    "smoking": enum("never", "former", "current", "unknown"),
    "alcohol": enum("none", "low", "moderate", "high", "unknown"),
    "activity_level": enum("low", "moderate", "high", "unknown"),
    "sleep_hours": optional float,
  },
  "conditions": [string],      # coded using ICD-10 or SNOMED where available
  "medications": [string],     # normalized drug_code from Phase 4/5
  "symptoms": [string],        # from Block B (Symptom PRO)
  "family_history": {
    "cvd": bool,
    "stroke": bool,
    "diabetes": bool,
    "cancer": bool
  },
  "device_signals": [          # from Block F Device Hub
    {
      "type": string,          # heart_rate | steps | skin_temperature etc.
      "value": float,
      "recorded_at": iso datetime
    }
  ],
  "timestamp": iso datetime     # when this mapping is produced
}

# -------------------------------------------
# 2. Mapping Rules from AHE Blocks → RISK_INPUT_V1
# -------------------------------------------

# 2.1 Block A – Monitoring
# ------------------------
# Raw events such as:
#   {
#     "metric": "heart_rate",
#     "value": 82,
#     "unit": "bpm"
#   }
# Mapping:
#   → vitals.heart_rate = 82

# 2.2 Block B – Symptoms / PRO
# ----------------------------
# Example event:
#   { "symptom": "shortness_of_breath" }
# Mapping:
#   → symptoms.append("shortness_of_breath")

# 2.3 Block C – Clinical Pathways
# -------------------------------
# Encoded ICD-10 / SNOMED codes for active conditions:
#   "I10" → Hypertension
#   "E11" → Type 2 diabetes
# Mapping:
#   → conditions.append(ICD/SNOMED code)

# 2.4 Block D – Digital Therapeutics
# ----------------------------------
# Behavioral / treatment adherence signals map to lifestyle.activity_level.

# 2.5 Block E – Risk (Self)
# -------------------------
# Historical risk outputs can feed into ML v2.0 but are ignored in v1.0.

# 2.6 Block F – Device Hub
# ------------------------
# Example:
#   {
#     "measurement_type": "skin_temperature",
#     "value": 36.4
#   }
# Mapping:
#   → vitals.temperature_body = 36.4

# 2.7 Block G – Care Layer
# ------------------------
# Clinician-entered data overrides patient-entered or device data:
#   - If doctor enters blood_pressure_sys → overwrite previous values.
#   - If doctor adds condition → must be placed first in the array.

# 2.8 Block H – Governance
# ------------------------
# Data quality filters applied BEFORE mapping:
#   - Missing or extreme values removed
#   - Outliers flagged but not deleted
#   - Provenance IDs attached for audit

# -------------------------------------------
# 3. Normalization Logic
# -------------------------------------------
# All incoming data is normalized before mapping:
#
#   "78 bpm" → 78
#   "36.8C"  → 36.8
#   "120/80" → sys=120, dia=80
#
#   "yes" → True
#   "no"  → False

# -------------------------------------------
# 4. Handling Missing / Low-Quality Data
# -------------------------------------------
# The Risk Engine v1.0 must run even with partial data.
# Mapping rules ensure:
#
#   - If BMI missing but height & weight present → compute
#   - If vital signs missing → risk score still computable
#   - If symptoms empty → no penalty
#
# The RISK_INPUT_V1 is designed to ALWAYS be constructible.

# -------------------------------------------
# 5. Audit & Provenance Requirements
# -------------------------------------------
# For each field mapped:
#
#   - Append provenance_id
#   - Append source_block ("A"…"H")
#   - Append timestamp
#
# Example:
#   vitals.heart_rate → { value: 82, provenance: "AHE:A:device", t: "..."}
#
# This fulfills GDPR / MHRA / NICE explainability requirements.

# -------------------------------------------
# 6. Mapping Examples
# -------------------------------------------

# Example A: Device HR + Symptom + Condition
# ------------------------------------------
# Incoming:
#   Device: heart_rate=88
#   PRO: symptoms=["chest_pain"]
#   Condition: ["I10"]
#
# Output:
#   {
#     "vitals": { "heart_rate": 88 },
#     "symptoms": ["chest_pain"],
#     "conditions": ["I10"]
#   }

# Example B: Mixed device + clinician
# -----------------------------------
# Device: BP=135/95
# Clinician: BP=128/85
# → clinician overrides:
#   { "vitals": { "blood_pressure_sys": 128, "blood_pressure_dia": 85 } }

# -------------------------------------------
# 7. Versioning
# -------------------------------------------
# RISK_INPUT_V1 must be stable for all of Phase 8.
# Any change → release RISK_INPUT_V2 with a migration plan.

# END OF DOCUMENT (v1.0)