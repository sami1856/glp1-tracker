# **Elisence – Road to 100% Medical-Grade AHE (v1.0)**
## Advanced Health Engine — Medical Device Roadmap

This document defines the official pathway for transforming the Elisence AHE from a “Prototype / Sketch Mode” system into a fully **Medical-Grade Software as a Medical Device (SaMD)** compliant with **MHRA / CE / NICE / ISO 13485 / ISO 14971 / GDPR** standards.

---

# **Phase 8.1 — Scientific Upgrade (Clinical Models Integration)**  
### Objective: Upgrade from Sketch Mode → Clinical-Validated Risk Models

**Key Work:**
- Replace placeholder logic with validated global clinical models:
  - **QRISK3 / SCORE2** → Cardiovascular disease (CVD)
  - **CHA₂DS₂-VASc** → Stroke risk (when applicable)
  - **CKD-EPI 2021** → Kidney function
  - **FIB-4 / NAFLD Fibrosis Score** → Liver disease
  - **QDiabetes / FINDRISC** → Metabolic / diabetes progression
- Add real clinical inputs:
  - BP, LDL, HDL, Total Cholesterol, HbA1c, BMI, GFR, ALT/AST  
  - Symptom pathways, PROs, lifestyle inputs
- Scientific calibration:
  - ROC/AUC  
  - Calibration curve  
  - Brier score  
  - Fairness analysis (age/gender/ethnicity groups)

**Output of Phase 8.1:**  
✔ **AHE_RiskEngine_v2 (Scientific Mode)**  
✔ Scientifically grounded and ready for validation

---

# **Phase 8.2 — Clinical Validation (Retrospective + Prospective)**  
### Objective: Demonstrate accuracy and safety in real-world populations

**Retrospective Validation:**
- Test the model on anonymised datasets (NHS / Hospital / UK Biobank)
- Evaluate performance:
  - AUC, sensitivity, specificity  
  - NPV, PPV  
  - Calibration (Hosmer–Lemeshow)  
  - Fairness across demographic groups

**Prospective Clinical Pilot (NHS Clinics):**
- Doctors use Elisence AHE alongside normal practice
- Compare decisions vs AHE risk outputs
- Structured clinician feedback

**Documentation:**
- Clinical Validation Report  
- Evidence Summary  
- Bias & Fairness Report

**Output of Phase 8.2:**  
✔ Proven accuracy  
✔ Evidence required for MHRA/NICE approval

---

# **Phase 8.3 — Medical Device Compliance (SaMD Regulatory Path)**  
### Objective: Prepare Elisence for formal SaMD registration

**Quality Management System (ISO 13485-Lite):**
- Design history file  
- Change control logs  
- Verification & validation evidence  
- Test suite: unit, integration, safety  
- Incident handling & CAPA  
- Release/version governance  

**Risk Management (ISO 14971):**
- Hazard identification  
- Severity & probability scoring  
- Risk controls  
- Traceability matrix  
- Cybersecurity risk assessment  
- Post-market surveillance plan

**Technical File (for MHRA / CE submission):**
- System architecture  
- Algorithm specification  
- Clinical evaluation  
- Software Safety Case  
- IFU (Instructions for Use)  
- GDPR & DPIA documentation  

**Output of Phase 8.3:**  
✔ Elisence becomes **SaMD-Ready**  
✔ Eligible for MHRA / CE / GCC regulatory submission

---

# **Phase 8.4 — Controlled Real-World Deployment (Pilot + Monitoring)**  
### Objective: Validate real-world safety and performance at scale

**Pilot Deployment (NHS / Hospitals):**
- Clinician dashboards  
- Patient-safe UX (no panic messaging)  
- Guidance instead of diagnosis

**Monitoring & Surveillance:**
- Algorithm drift detection  
- Incident reporting system  
- Safety monitoring integrated with Block G  
- Behaviour tracking for “edge cases”

**Human Factors & Usability:**
- Patient usability tests  
- Clinician usability tests  
- Misinterpretation prevention  
- Accessibility & multilingual checks

**Output of Phase 8.4:**  
✔ Real-world verified  
✔ Evidence for full certification

---

# **Phase 8.5 — Full Medical-Grade Certification & Global Launch**  
### Objective: Achieve full SaMD certification and global deployability

**Includes:**
- MHRA Device Registration  
- CE Marking (EU MDR Class IIa expected)  
- Final Clinical Safety Case (DCB0129 / DCB0160)  
- Cybersecurity certification  
- Global multilingual rollout (EN/FA/AR/RO/TR)  
- Integration with GP systems / EHR  
- Onboarding health authorities & insurers

**Output of Phase 8.5:**  
✔ **Elisence = Certified Medical-Grade SaMD**  
✔ Ready for NHS, EU, GCC, insurers, and global expansion

---

# **20-Second Summary**
Elisence is currently at **Phase 8.0 — Working AHE Prototype (v8.0.0-B1)**.  
To reach **100% Medical-Grade**, we execute:

1. **8.1 Scientific Upgrade**  
2. **8.2 Clinical Validation**  
3. **8.3 Regulatory (QMS + SaMD)**  
4. **8.4 Real-World Pilot**  
5. **8.5 Full Certification**

This roadmap matches global leaders (Huma, Ada, Omron, Babylon, Mayo Clinic AI).  
Elisence is now officially on the same trajectory.