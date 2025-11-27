### 4.2 Model Set
| Condition | Model | Notes |
|----------|--------|-------|
| Heart Attack | Modified Pooled Cohort + behavioural modifiers | Includes sleep, HRV, fatigue |
| Stroke | QRISK-like + sleep fragmentation | Fully explainable |
| CKD | Early-detection scoring (behavioural + hydration patterns) |  |
| Liver Disease | alcohol + metabolic load + temp/sleep modifiers | non-diagnostic |
| Diabetes Deterioration | GLP-1 history + HRV fatigue + sleep | extremely high value for GCC/UK |

Models are rule-based + weighted (v1.0).  
ML models attach in v2 without breaking API.

---

## 5. Scoring Pipeline
1. Get profile (age/sex/weight/region).  
2. Pull 30-day biometrics (A).  
3. Pull symptoms (B).  
4. Pull pathways (C).  
5. Pull long-term risks (D).  
6. Pull medication + historic KPIs (Ph1–4).  
7. Apply condition rules (threshold, trend, ratios, HRV flags).  
8. Aggregate → RiskScoreRecord.  
9. Pass through Safety Shield (G).  
10. Prepare output based on audience:
   - user (soft, calm, non-diagnostic)
   - clinician (full)
   - organisation (anonymised cohort)

---

## 6. API Contracts (v8 Risk Engine)

### 6.1 Clinician
`GET /v8/risk/score/{patient_id}`  
→ full RiskScoreRecord

### 6.2 User-safe
`GET /v8/risk/user/{patient_id}`  
→ soft_summary (gentle explanation)

### 6.3 Organisation / Government
`GET /v8/risk/population?region=...&condition=...`  
→ anonymised cohort distribution (k-anonymity ≥ 50)

### 6.4 Retention
- PII stays local region  
- Aggregated data globally shareable  
- Crisis signals auto-escalate to G

---

## 7. Safety & Ethics (Block G)

### Requirements
- No catastrophic terms to users  
- Tone: calm, warm, supportive  
- Clinician-only fields hidden from patients  
- All outputs logged in AHEEvent ledger  

### Strict Rules
- NEVER say: “you will have a heart attack / stroke / kidney failure”  
- ALWAYS say: “your data shows some patterns worth discussing with a doctor”.

---

## 8. Chart Integration (Block I)

Risk outputs flow into:
- patient overview chart  
- cardio risk trend chart  
- fatigue–sleep–risk correlation chart  
- metabolic deterioration curve  
- clinician multi-layer charts
- organisation-level heatmaps & risk clusters

Charts support:
- toggle series  
- zoom  
- dark/light mode  
- PDF/PNG export  
- colour-blind safe palettes  

---

## 9. Region Adaptation (GCC/UK/EU)

### GCC (Saudi/UAE/Qatar)
- Strong appetite for predictive models  
- Want dashboards + population insights  
- Fast-track if compliant  
- Ideal early-adopters

### UK/NHS
- Stricter evidence  
- NICE DHT framework required

### EU
- Strong GDPR + audit requirements  
- k-anonymity mandatory  

---

## 10. Performance & Scaling
- Response time < 150ms  
- In-memory compute (v1.0)  
- Async pipeline  
- Horizontal scale via region clusters  
- Audit trail + version control

---

## 11. Versioning & Audit
- `risk_engine_version: "1.0.0"`  
- Every request logged  
- Model changes require version bump  
- Release snapshots archived

---

## 12. Roadmap
**v1.0** – full rule-based engine + charts + safety  
**v1.1** – population overlays  
**v2.0** – ML hybrid with explainability  
**v3.0** – doctor-in-the-loop optimisation  

---

## 13. Acceptance Criteria
A release is “green” only if:
- Startup shows “AHE Risk Engine ready (v1.0)”
- All 3 API layers pass (user/clinician/org)
- Safety Shield softening validated
- Charts receive live feeds
- 1k req/sec load test passed
- Region configs validated
- Logs and audit trails complete