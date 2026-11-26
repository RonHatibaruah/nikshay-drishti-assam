# NikshayDrishti • নিশ্চয় দৃষ্টি (Assam TB Sentinel)
### AI-Powered TB Risk Stratification & Programme Decision Support System
**National Health Mission (NHM) & State TB Cell, Government of Assam**

[![Live Demo](https://img.shields.io/badge/Live_Prototype-nikshay--drishti.pages.dev-0f766e?style=for-the-badge&logo=cloudflarepages)](https://nikshay-drishti.pages.dev/)
[![Government of Assam](https://img.shields.io/badge/Government_of_Assam-Health_%26_Family_Welfare-065f46?style=for-the-badge)](https://nhm.assam.gov.in/)
[![Challenge ID](https://img.shields.io/badge/NESFIC_2026-Stream_1_--_NESFIC--D--30-0284c7?style=for-the-badge)](https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-30)
[![NTEP Ni-kshay](https://img.shields.io/badge/Integrated_with-Ni--kshay_%7C_NTEP-e11d48?style=for-the-badge)](https://www.nikshay.in/)
[![React 18](https://img.shields.io/badge/Frontend-React_18_%7C_TypeScript_%7C_Tailwind-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Leaflet GIS](https://img.shields.io/badge/Geospatial-Leaflet_%7C_PostGIS-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)

> 🌐 **Live Interactive Prototype:** **[https://nikshay-drishti.pages.dev/](https://nikshay-drishti.pages.dev/)**  
> 📖 **Interactive Tutorial & User Guide:** **[https://nikshay-drishti.pages.dev/?tutorial=true](https://nikshay-drishti.pages.dev/?tutorial=true)**  
> Explore the Clinical Risk Stratification Worklist, Assam Vulnerability & ACF Map, Closed-Loop Referral Cascade, Facility Supervision & Cartridge Stockout Forecaster, Fuzzy De-Duplication Engine, and State Executive Command Center.
>
> ⚡ **Edge Serverless API:** `https://nikshay-drishti.pages.dev/api/health`  
> 💻 **GitHub Repository:** [https://github.com/flugelsoft-01/tb-risk-stratification-ai](https://github.com/flugelsoft-01/tb-risk-stratification-ai)

---

## 🏛️ Executive Summary

**NikshayDrishti (নিশ্চয় দৃষ্টি)** is an AI-powered clinical decision support system (CDSS) and programmatic intelligence platform developed for the **National Health Mission (NHM) and State TB Cell, Department of Health & Family Welfare, Government of Assam** under **NESFIC-D-30 (Stream 1 — Government Track: Health Sector)**.

Tuberculosis control in Assam faces distinct geographical and socio-economic hurdles: high disease vulnerability in tea garden worker communities (*Line Bastis*), flood-induced isolation in riverine sandbars (*Char areas*), urban migrant worker density in Guwahati, and delayed health-seeking behaviour leading to high early mortality (where ~74% of patient deaths occur within the first 30 days of treatment initiation). Furthermore, peripheral health facilities suffer from diagnostic specimen referral dropouts and unpredictable Truenat cartridge stock-outs.

**NikshayDrishti transitions Assam’s TB control from passive retrospective reporting to proactive, explainable predictive intervention across all 7 departmental opportunity areas:**

1. **Multi-Dimensional Mortality & Unfavourable-Outcome Risk Stratification:** Ingests Ni-kshay clinical biomarkers (severe undernutrition BMI < 14, smear 3+, cavitary lesions, rifampicin resistance, HIV/Diabetes) to generate an Explainable Risk Score (0–100) and triages patients into *Critical (Inpatient Triage)*, *High Risk*, *Moderate*, and *Standard* cohorts.
2. **Clinical Decision Support (CDSS) Guardrails:** Strictly adheres to statutory guidelines—risk outputs provide clinical decision-support and differentiated care recommendations without replacing medical officers' authorized diagnostic authority.
3. **Geospatial Vulnerability & Active Case Finding (ACF) Micro-Targeting:** PostGIS spatial clustering identifies high-yield priority pockets across Assam's 35 districts and optimizes daily routes for Mobile AI-Xray vans (equipped with handheld X-ray + qXR AI and battery Truenat machines).
4. **Zero-Leakage Closed-Loop Referral Cascade:** Tracks sputum specimen couriers from Ayushman Arogya Mandirs (SC-HWCs) to molecular NAAT laboratories with automated 48-hour SLA breach escalations to prevent diagnostic dropouts.
5. **Facility Supportive Supervision & Predictive Logistics:** Forecasts Truenat/CBNAAT cartridge burn rates 14 days before stock depletion and generates algorithmic Supervisory Priority Index (SPI) tour itineraries for District TB Officers (DTOs) and Senior Treatment Supervisors (STS).
6. **Algorithmic Fuzzy De-Duplication:** Reconciles fragmented patient registrations across private clinics and public facilities using Double Metaphone Assamese phonetic transliteration, phone number hashes, and geographic residence clustering.
7. **60-Day Early Mortality Verbal Autopsy Analytics:** Analyzes systemic root causes of early mortality to institute targeted clinical admission and nutritional intervention protocols.

---

## 📸 Architectural Visualizations & Evidentiary Diagrams

### 1. Paradigm Shift: Passive TB Reporting vs. NikshayDrishti Proactive Decision Support
![Paradigm Shift](assets/proposal_images/diagram_1_before_after_workflow.jpg)

### 2. ASDC Enterprise Architecture & Explainable ML Data Pipeline
![Enterprise Architecture](assets/proposal_images/diagram_2_dual_system_reconciliation.jpg)

### 3. Multi-Tier Clinical Risk Stratification & Differentiated Care Workflow
![Risk Stratification](assets/proposal_images/diagram_3_cadastral_anomaly_catalog.jpg)

### 4. Geospatial Vulnerability Mapping & Active Case Finding (ACF) Engine
![Geospatial Vulnerability](assets/proposal_images/diagram_4_land_health_score_hierarchy.jpg)

### 5. 5-Stage Closed-Loop Diagnostic & Treatment Referral Pipeline
![Referral Pipeline](assets/proposal_images/diagram_5_lat_mandal_mobile_app.jpg)

### 6. Facility Supervision Tours (SPI) & Predictive Cartridge Logistics
![Facility Supervision](assets/proposal_images/diagram_6_citizen_land_health_certificate.jpg)

### 7. Algorithmic De-Duplication & Early Mortality Verbal Autopsy Analytics
![De-duplication & Death Audit](assets/proposal_images/diagram_7_enterprise_system_architecture.jpg)

---

## 💻 Tech Stack & Infrastructure

- **Web Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **WebGIS Engine:** Leaflet 1.9.4, CartoDB Positron / OpenStreetMap vector tile renderers
- **Predictive ML Core:** Python 3.11, XGBoost / LightGBM regularized gradient boosted trees, SHAP (SHapley Additive exPlanations) for clinical explainability
- **Fuzzy De-Duplication:** Double Metaphone Assamese phonetic transliteration, Jaro-Winkler string similarity, Haversine spatial clustering
- **Edge Deployment:** Cloudflare Pages (Instant global CDN, zero-cold-start edge compute)
- **Target Government Environment:** Assam State Data Centre (ASDC), Kubernetes (K8s), PostgreSQL 16 + PostGIS 3.4, Redis 7.2, ABDM / ABHA M1–M3 APIs, DPDP Act 2023 compliance enclave

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm
- Python 3.10+ (for PDF & Diagram generation scripts)

### Local Development
```bash
# 1. Clone repository
git clone https://github.com/flugelsoft-01/tb-risk-stratification-ai.git
cd tb-risk-stratification-ai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Compiled production assets are output to `dist/`.

### Generate Official Submission PDFs & Form Text Files
```bash
# Render all architectural diagrams (300 DPI)
python3 generate_diagrams.py

# Generate publication-grade PDFs
python3 generate_pdfs.py

# Generate text-only form versions for official portal copy-paste
python3 generate_text_versions.py
```

---

## 🛡️ Statutory Disclaimer & Privacy Compliance

> **Mandatory Implementation Guardrail:** All risk predictions, vulnerability indices, and differentiated care plans generated by NikshayDrishti are **decision-support tools only** and do not replace clinical diagnosis or authorized programme decisions by qualified medical officers.
>
> **Data Privacy:** Fully aligned with the **Digital Personal Data Protection (DPDP) Act 2023** and **Ayushman Bharat Digital Mission (ABDM)** standards. Patient data is tokenized using cryptographic identifiers (ABHA ID), with de-identified datasets utilized for model training.

---

## 👥 Authorship & Submission Metadata

- **Challenge:** North East Seva First Innovation Challenge (NESFIC 2026)
- **Problem Statement ID:** NESFIC-D-30 (Stream 1 — Government Track: Health Sector)
- **Sponsoring Department:** National Health Mission (NHM) & State TB Cell, Department of Health & Family Welfare, Government of Assam
- **Lead Applicant & Principal Investigator:** **Kalyanjit Hatibaruah**
- **Organization:** **Flugelsoft Labs**
- **Contact:** `Kalyanjit@gmail.com`
- **Copyright:** Copyrights Flugelsoft Labs • © 2026 Flugelsoft Labs. All Rights Reserved.
