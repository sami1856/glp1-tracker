 clean, investor-ready, Git-ready document you can drop straight into the repo (for example: docs/Elisence_Access_and_Data_Governance_v1.0.md).







Elisence – Global Data Access & Governance Framework (v1.0)





Confidential – Investor, Scientific, and Enterprise Partners








1. Purpose of This Document





This document defines who can access what data in Elisence, under which conditions, and how privacy, security, and compliance are enforced.



It is written for:



Technical & product teams
Investors (VCs, growth funds, family offices)
Scientific partners (universities, hospitals, research institutes)
Enterprise and government partners (insurers, ministries of health, public-health agencies)




The goal is simple:



Explain clearly how Elisence turns individual behaviour into safe, non-identifiable population intelligence – and how different partners can access that intelligence without ever touching personal data.







2. What Elisence Collects – and What It Refuses to Collect







2.1 Collected Data (Non-Identifying by Design)





Elisence is designed as a privacy-first health intelligence platform. It only collects data that can be safely aggregated and anonymised:



Demographics (coarse)
Age band (e.g. 18–25, 25–35, 35–45) – never exact date of birth
BMI band (e.g. 18–25, 25–30, 30–35) – never exact raw BMI
Gender (optional)
Country / region – never city, postcode, or precise address

Clinical & behavioural data
Medication schedules and doses (e.g. GLP-1, insulin, other metabolic drugs)
Weight and weight-change trendlines
Self-reported side-effects and tolerability
Sleep duration and simple quality markers
Daily mood / energy levels (self-reported)
Basic activity levels (e.g. steps band, exercise sessions)
Adherence to treatment plans (taken / missed doses)

App interaction data (high-level)
Feature usage (which modules are used)
Engagement streaks (e.g. days tracked, check-ins completed)
Non-identifying technical metadata (e.g. app version, OS family)





All of these are stored in a way that is intended for aggregation, not for individual tracking outside the user’s own app experience.








2.2 Data Elisence Does 

Not

 Collect





Elisence deliberately refuses to collect or store the following:



Full name
Phone number
Email address
Exact date of birth
Street address, postcode, or GPS coordinates
Contact lists
Device identifiers that can be tied back to the user’s identity
Raw voice or video recordings for external use
Full chat histories as “sellable” or exportable content




This means that even in a worst-case scenario (e.g. hostile actor gains DB read access), the dataset cannot be used to identify an individual person with reasonable effort.








3. From Raw Signals to Safe Intelligence





Elisence is not a “data warehouse” of user identities.

It is an intelligence engine. The core pipeline:



Raw signals → Normalisation → Anonymisation → Aggregation → Privacy Guards → Intelligence Outputs




3.1 Normalisation





All incoming signals are converted into:



Standard units and ranges (aligned with international clinical guidelines)
Consistent coding for drugs, side-effects, and outcomes
Unified demographic bands (age, BMI, region)




This makes data comparable across countries, cohorts, and time.








3.2 Anonymisation Layer





Before any external-facing analytics exist, the platform ensures:



Direct identifiers are not stored at all (see Section 2.2)
Quasi-identifiers (age, BMI, region) are banded or bucketed
Country-level (or region-level) is used rather than city / postcode
Sensitive cohorts are only represented in sufficiently large groups









3.3 k-Anonymity Enforcement





No external analytics endpoint returns data unless a minimum cohort size is satisfied.



Global default threshold: k ≥ 50
If a requested cohort (e.g. “females aged 18–25 in Country X on Drug Y in Week 2”) contains fewer than 50 users, the platform returns:


{

  "status": "insufficient_data",

  "reason": "k_anonymity_threshold_not_met",

  "k_threshold": 50

}



This prevents “small-n hunting” and significantly reduces re-identification risks.








3.4 Differential Privacy (DP Noise)





Where appropriate, Elisence can apply differential-privacy style noise to aggregated metrics.



Adds mathematically controlled micro-noise to counts and percentages
Preserves utility at population and cohort level
Makes reverse-engineering individual contributions impractical




DP settings are governed by policy parameters (e.g. epsilon) that can be tuned by governance rules and are logged in the WORM ledger for auditability.








3.5 Aggregation & Metrics





All external consumers see only aggregated metrics, such as:



Average weight loss by cohort and time horizon
Percentage experiencing a given side-effect in a defined window
Adherence curves for different therapies and dose schedules
Symptom evolution trends (mood, sleep, energy bands)
Comparative outcomes between drug families or interventions




No individual-level timeseries is exposed outside the app experience of the user themselves.








4. Access Roles & Permission Model





Elisence uses a clear Role-Based Access Control (RBAC) and API-key model for all non-user access.





4.1 End User





Who: Everyday individuals using the app.



Interface:



Mobile / web UI
Interaction with the AI coach “Elisa”




What they can see:



Their own progress, insights, trends and recommendations
Educational content, reminders, personalised nudges




What they cannot see or access:



Any other user’s data
Any aggregated dataset beyond their own visualised statistics
Any API endpoint for research or commercial intelligence




No API keys are issued for end users.








4.2 Internal Admin / Core Team





Who: Very small, trusted internal Elisence team (founders, lead engineers, data governance officers).



Interface:



Admin APIs (/v4/admin/..., /v5/admin/...)
Internal dashboards
Monitoring & observability tools




Capabilities:



Manage API keys (create, revoke, label, set roles, set expiry)
View WORM ledger entries for governance and debugging
Check compliance dashboards (k-anonymity status, DP settings, retention, alerts)
Trigger manual archive or retention jobs (where permitted by policy)
Inspect system health, performance, and configuration (not user identities)




Restrictions:



Internal admins do not see personal identifiers, because the system does not store them.
All sensitive actions (key management, export triggers, policy changes) are logged in the WORM ledger and can be audited.









4.3 Research Partners (Universities, Hospitals, Institutes)





Who: Academic or clinical researchers working under a formal agreement and ethical framework.



Interface:



Research APIs (read-only endpoints with strict contracts)
Potentially hosted dashboards curated by Elisence
Export formats aligned with research standards (e.g. STROBE, RECORD-PE)




What they can access:



Aggregated, anonymised, cohort-level metrics
Trendlines (e.g. weight change, adherence, side-effects)
Data slices by region / age band / BMI band / therapy type, where k ≥ 50
Comparative analyses across predefined cohorts




What they cannot access:



Raw user-level data
Direct identifiers or any quasi-identifier at individual level
Any endpoint that returns fewer than k subjects in a cohort
Freeform queries that would bypass governance constraints




Controls:



Access via research-scoped API keys
Fine-grained rate limits and logging
All requests and responses are recorded in the WORM ledger, including parameters and context sufficient for audit (without storing personal data).









4.4 Commercial Partners (Pharma, Insurance, Wellness Companies)





Who: Paying enterprise clients under data-licensing agreements.



Interface:



Commercial analytics APIs (e.g. drug comparison, adherence analytics, risk-trend APIs)
Subscription-based dashboards
Scheduled, governed exports (e.g. quarterly analysis packs)




What they can access:



Drug-level effectiveness and tolerability metrics
Side-effect incidence rates per country/age/BMI band
Adherence and persistence curves (de-identified)
Risk stratification at cohort level (never individual scores)
Forecasts and scenario analyses on aggregated data




What they cannot access:



Raw tables
Row-level histories
User-level adherence or outcomes
Any direct handles back to a person or device




Controls:



Role-scoped API keys (e.g. analytics, pharma_analytics, etc.)
Contractual constraints on usage (e.g. research vs marketing)
Automatic application of k-anonymity & DP noise where required
Strong audit logging for all data deliveries









4.5 Government & Public-Health Partners





Who: Ministries of health, public-health agencies, regulators.



Interface:



High-level dashboards and reports
Pre-configured analytics endpoints aligned with policy needs
Special governance, risk, and compliance views




What they can access:



Population-level statistics across age bands, BMI bands, and regions
Time-evolution of obesity/metabolic markers
Drug and intervention effectiveness at population scale
Early warning signals for adverse outcomes or system-wide risks




What they cannot access:



Re-identifiable data
Direct access to internal raw storage or infra
Individual health profiles or chat content




Controls:



Government-scoped roles with strict contracts
Cross-border data-flow controls in line with UK/EU/GCC laws
Tailored retention and audit policies, visible in the compliance dashboard









4.6 Engineering / Operations (Infra Access)





Who: Platform engineers, SREs, operations staff.



Scope:



Access to infrastructure, not to user identities.
Logs, metrics, and traces designed to exclude PII by construction.
Role separation: infra access ≠ data export access.




All access is controlled via cloud IAM, SSH policies, and internal security standards, in addition to Elisence’s own RBAC.








5. How Access is Technically Enforced







5.1 API Keys & Roles





Each external integration uses an API key tied to a specific role (e.g. researcher, commercial, admin).
Keys can have:
Labels (who/what it belongs to)
Expiry timestamps
Active/inactive status





All key operations are logged in the WORM ledger.








5.2 Governance Engine & Policy Checks





Every high-risk endpoint is guarded by governance rules:
Minimum cohort size (k-anonymity threshold)
DP noise configuration
Export eligibility checks
Region or product scoping as per contract





If any rule fails, the endpoint refuses to return data and records the event as an alert.








5.3 WORM Ledger (Write-Once-Read-Many)





All important events are written to a tamper-resistant, append-only ledger, including:



Data exports
Research queries
Compliance checks
Alert emissions
Policy changes
API key lifecycle events




Each entry carries:



Timestamps
Event type
Structured details (JSON)
Integrity hashes (before/after where appropriate)
Status (success/fail)




This forms a resilient audit trail for regulators, investors, and internal QA.








5.4 Encryption & Secure Storage





Encryption at rest using modern, industry-standard algorithms (e.g. AES-256-GCM).
Encryption in transit via TLS.
Sensitive aggregates can be additionally encrypted using governance keys.
No storage of raw PII means that even if encryption is compromised, there is no identity layer to reveal.









5.5 Retention & Deletion





Time-bound retention for derived datasets and exports based on governance policy.
Automatic cleanup of old exports and derived artefacts.
Ability to enforce legal retention or accelerated deletion where required by law.









6. Example Access Scenarios







6.1 University Study





A university wants to study long-term weight loss on GLP-1 therapies in women aged 25–45 in two countries.



Elisence provides:
Anonymised cohort analytics
Trendlines at country and BMI-band level
Side-effect incidence and adherence curves

University never receives:
Names, emails, phone numbers
Raw timestamps per person
GPS locations or addresses





All queries are logged.








6.2 Pharmaceutical Partner





A pharma company asks:



“How does our drug compare to Competitor X in terms of 6-month adherence and GI side-effects in GCC countries?”


Elisence returns:



Aggregated comparative stats
Country and age band breakdowns (subject to k-anonymity)
Confidence intervals and noise-aware summaries




No single patient can be traced from this data.








6.3 Ministry of Health





A ministry wants to track obesity and GLP-1 usage trends nationally.



Elisence provides:



National and sub-regional trend dashboards
Cohort breakdown by age/BMI bands
Effectiveness of current treatment patterns




Zero individual identities are exposed; everything remains population-level.








7. Why This Model is Attractive to Investors and Partners





High Commercial Value, Low Legal Risk
Rich, longitudinal health intelligence
No PII in the commercial data layer
Strong compliance story for GDPR, UK, EU, US, and GCC regulators

Scalable, Repeatable Revenue
B2B and B2G licensing
Research collaborations
Enterprise subscriptions
Government contracts

Defensible Architecture
Built-in governance, privacy, and provenance from the start
Not just a “tracker app” – a full Global Data Intelligence and Governance Platform.










8. One-Sentence Summary





Elisence is a multi-layer health intelligence platform that converts de-identified user behaviour into safe, high-value, population-level insights, and exposes those insights to researchers, enterprises, and governments through tightly governed, role-based access – never by exposing personal data.





