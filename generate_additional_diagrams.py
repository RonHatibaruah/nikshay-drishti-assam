#!/usr/bin/env python3
"""
Generate 5 High-Impact 16:9 Widescreen Infographics for NESFIC-D-30:
- Diagram 8: Phased 12-Month Development Roadmap & Milestones (Field 6)
- Diagram 9: Health Data Ingestion Pipeline & ABDM ABHA Tokenization (Field 7)
- Diagram 10: Multidisciplinary Team Structure & Governance Matrix (Field 8)
- Diagram 11: Zero-Trust ASDC Security, DPDP Act & CDSS Safety Guardrails (Field 10)
- Diagram 12: Dual-District Pilot Demonstrator & Operational Risk Matrix (Field 12)
"""

import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon
import numpy as np

os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib-cache'
base_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(base_dir, 'assets', 'proposal_images')
os.makedirs(out_dir, exist_ok=True)

# Color Palette Matching Existing Diagrams
BG_LIGHT = '#ffffff'
GRID_LIGHT = '#f1f5f9'
NAVY_HEADER = '#0f172a'
NAVY_TEXT = '#0f172a'
MUTED_TEXT = '#475569'
EMERALD_GREEN = '#059669'
TEAL_PRIMARY = '#0f766e'
ROYAL_BLUE = '#1d4ed8'
CYAN_ACCENT = '#0284c7'
AMBER_GOLD = '#d97706'
ROSE_RED = '#dc2626'
PURPLE_ACCENT = '#7c3aed'

def add_blueprint_grid(ax):
    for x in np.linspace(0, 1, 33):
        ax.axvline(x, color=GRID_LIGHT, linewidth=0.6, zorder=0)
    for y in np.linspace(0, 1, 19):
        ax.axhline(y, color=GRID_LIGHT, linewidth=0.6, zorder=0)

def add_header(ax, title, subtitle, tag="NESFIC-D-30 TECH FRAMEWORK"):
    banner = FancyBboxPatch((0.02, 0.895), 0.96, 0.085, boxstyle="round,pad=0.01,rounding_size=0.012",
                            facecolor=NAVY_HEADER, edgecolor='#1e293b', linewidth=1.5, zorder=2)
    ax.add_patch(banner)
    
    tag_bg = FancyBboxPatch((0.035, 0.92), 0.175, 0.035, boxstyle="round,pad=0.005,rounding_size=0.008",
                            facecolor='#065f46', edgecolor=EMERALD_GREEN, linewidth=1, zorder=3)
    ax.add_patch(tag_bg)
    ax.text(0.122, 0.937, tag, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#6ee7b7', zorder=4)
    
    ax.text(0.225, 0.942, title, fontsize=10.5, fontweight='bold', color='#ffffff', zorder=4)
    ax.text(0.225, 0.914, subtitle, fontsize=8, color='#38bdf8', zorder=4)
    
    gov_badge = FancyBboxPatch((0.79, 0.92), 0.175, 0.035, boxstyle="round,pad=0.005,rounding_size=0.008",
                               facecolor='#1e293b', edgecolor='#334155', linewidth=1, zorder=3)
    ax.add_patch(gov_badge)
    ax.text(0.877, 0.937, "GOVT OF ASSAM • NHM / NTEP", ha='center', va='center', fontsize=7, fontweight='bold', color='#e2e8f0', zorder=4)

def save_dual(fig, basename):
    plt.tight_layout()
    png_path = os.path.join(out_dir, f"{basename}.png")
    jpg_path = os.path.join(out_dir, f"{basename}.jpg")
    plt.savefig(png_path, dpi=200, bbox_inches='tight')
    plt.savefig(jpg_path, dpi=200, bbox_inches='tight')
    plt.close()
    print(f"Rendered {basename}.png & .jpg (16:9 Widescreen)")

# ==============================================================================
# DIAGRAM 8: 12-Month Development Gantt Chart & Milestones (Field 6)
# ==============================================================================
def create_diagram_8():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "PHASED 12-MONTH DEVELOPMENT ROADMAP & VALIDATION MILESTONES (GANTT SCHEDULE)",
               "Structured 4-Phase Delivery • Dual-District Pilot Deployment • Statewide Scalability (NESFIC-D-30)")

    phases = [
        {"num": "Q1 (M1-M3)", "name": "PHASE 1: INGESTION ARCHITECTURE, RISK MODELING & ALPHA BUILD", "color": TEAL_PRIMARY,
         "bars": [
             ("ASDC Staging Provisioning & Cloud Setup", 0.05, 0.22, 0.76),
             ("Ni-kshay v2.4 API Ingestion Connectors", 0.10, 0.28, 0.70),
             ("XGBoost Risk Model Training (AUROC 0.887)", 0.15, 0.32, 0.64),
             ("SHAP Feature Attribution Pipeline", 0.20, 0.35, 0.58)
         ],
         "milestone": ("M1: Alpha Engine & Schema Clearance (End of M3)", 0.35, 0.78, EMERALD_GREEN)
        },
        {"num": "Q2 (M4-M6)", "name": "PHASE 2: SECURITY HARDENING, VAPT & DUAL-DISTRICT PILOT LAUNCH", "color": CYAN_ACCENT,
         "bars": [
             ("STQC CERT-In VAPT Security Clearance", 0.35, 0.48, 0.50),
             ("ASDC Production Containerization (K8s)", 0.40, 0.54, 0.44),
             ("Dibrugarh & Kamrup Metro Pilot Launch", 0.48, 0.60, 0.38),
             ("Sputum Barcode Tracking Across 30 Facilities", 0.50, 0.62, 0.32)
         ],
         "milestone": ("M2: Validation Readiness & Field Launch (End of M6)", 0.62, 0.52, ROYAL_BLUE)
        },
        {"num": "Q3 (M7-M9)", "name": "PHASE 3: OPERATIONAL PILOT, ACF DISPATCH & DIFFERENTIATED CARE", "color": AMBER_GOLD,
         "bars": [
             ("Critical Inpatient Bed Triage Alerts", 0.60, 0.78, 0.26),
             ("Mobile AI-Xray Van Route Optimization", 0.64, 0.82, 0.20),
             ("Supervisory Priority Index (SPI) Tours", 0.66, 0.85, 0.14)
         ],
         "milestone": ("M3: Mid-Term Clinical Audit (End of M9)", 0.85, 0.28, AMBER_GOLD)
        },
        {"num": "Q4 (M10-M12)", "name": "PHASE 4: EVALUATION, ALGORITHM REFINEMENT & STATEWIDE SCALE", "color": PURPLE_ACCENT,
         "bars": [
             ("30-Day Mortality Reduction Statistical Audit", 0.82, 0.95, 0.08),
             ("Statewide Rollout Configuration across 35 DMCs", 0.88, 0.98, 0.02)
         ],
         "milestone": ("M4: Statewide Expansion Readiness (End of M12)", 0.98, 0.10, '#10b981')
        }
    ]

    # Time Axis Header Bar
    time_bar = FancyBboxPatch((0.03, 0.835), 0.94, 0.045, boxstyle="round,pad=0.005,rounding_size=0.006",
                              facecolor='#1e293b', edgecolor='#334155', linewidth=1, zorder=2)
    ax.add_patch(time_bar)
    months = ["Month 1", "Month 2", "Month 3 (Q1)", "Month 4", "Month 5", "Month 6 (Q2)",
              "Month 7", "Month 8", "Month 9 (Q3)", "Month 10", "Month 11", "Month 12 (Q4)"]
    for idx, m in enumerate(months):
        x_pos = 0.04 + idx * (0.92 / 12) + (0.92 / 24)
        ax.text(x_pos, 0.857, m, ha='center', va='center', fontsize=7.5, fontweight='bold', color='#cbd5e1', zorder=4)

    # Render Gantt Bars
    for p in phases:
        for title, x1, x2, y in p["bars"]:
            bar = FancyBboxPatch((x1, y - 0.018), x2 - x1, 0.036, boxstyle="round,pad=0.002,rounding_size=0.006",
                                 facecolor=p["color"], edgecolor='#ffffff', linewidth=1, alpha=0.9, zorder=3)
            ax.add_patch(bar)
            ax.text(x1 + 0.01, y, title, ha='left', va='center', fontsize=7, fontweight='bold', color='#ffffff', zorder=5)

        # Milestone Marker
        m_title, mx, my, mcolor = p["milestone"]
        ax.plot([mx, mx], [my - 0.05, my + 0.05], color=mcolor, linestyle='--', linewidth=1.5, zorder=4)
        diamond = Polygon([[mx, my + 0.02], [mx + 0.012, my], [mx, my - 0.02], [mx - 0.012, my]],
                          facecolor=mcolor, edgecolor='#ffffff', linewidth=1.2, zorder=6)
        ax.add_patch(diamond)
        ax.text(mx - 0.015, my + 0.03, m_title, ha='right', va='center', fontsize=6.8, fontweight='bold', color=NAVY_TEXT, zorder=6)

    save_dual(fig, "diagram_8_development_roadmap_gantt")

# ==============================================================================
# DIAGRAM 9: Health Data Ingestion Pipeline & ABDM Tokenization (Field 7)
# ==============================================================================
def create_diagram_9():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "END-TO-END HEALTH DATA INGESTION & ABDM ABHA TOKENIZATION ARCHITECTURE",
               "Sovereign Assam State Data Centre (ASDC) Ingestion • Zero Raw PII Storage • DPDP Act 2023 Compliant")

    cols = [
        {"x": 0.03, "w": 0.20, "title": "1. EXTERNAL DATA SOURCES", "bg": '#f0fdf4', "border": '#86efac',
         "items": [
             ("Ni-kshay v2.4 API (MoHFW)", "Clinical notification, smear microscopy, GeneXpert results, outcomes"),
             ("Nikshay Aushadhi (LIMS)", "Truenat & CBNAAT cartridge stock, batch expiry, consumption logs"),
             ("99DOTS / MERM Telemetry", "Daily digital adherence calls & electronic pillbox openings"),
             ("Survey of India (SOI) GIS", "District/TU boundary shapefiles, tea garden estate polygons")
         ]},
        {"x": 0.26, "w": 0.23, "title": "2. ASDC INGESTION & SECURITY GATEWAY", "bg": '#f8fafc', "border": '#94a3b8',
         "items": [
             ("TLS 1.3 Transport Encryption", "Encrypted mutual TLS tunnels from central servers to ASDC Dispur"),
             ("SHA-256 PII Cryptographic Hashing", "Patient names, mobile numbers, and Aadhaar stripped at gateway"),
             ("ABDM ABHA M1/M2 Tokenization", "Linkage to Ayushman Bharat Health Account (ABHA ID token)"),
             ("Assamese Phonetic Normalization", "Double Metaphone transliteration resolves dialectal variations")
         ]},
        {"x": 0.52, "w": 0.22, "title": "3. ASDC STORAGE & FEATURE STORE", "bg": '#eff6ff', "border": '#93c5fd',
         "items": [
             ("PostgreSQL 16 Enterprise DB", "AES-256 encrypted tables for de-identified patient cohorts"),
             ("PostGIS 3.4 Spatial Indexing", "Spatial point-in-polygon queries for tea gardens & char areas"),
             ("Redis 7.2 Distributed Cache", "Low-latency in-memory cache for 35 district worklists"),
             ("SHA-256 Audit Trail Ledger", "Tamper-proof chronological log for every decision & query")
         ]},
        {"x": 0.77, "w": 0.20, "title": "4. ACTIONABLE OUTPUTS", "bg": '#faf5ff', "border": '#d8b4fe',
         "items": [
             ("Clinical Mortality Triage", "Critical (>75), High, Moderate cohorts with SHAP cards"),
             ("48-Hr Referral SLA Alarms", "Automated SMS/alerts on specimen courier delays"),
             ("Cartridge Depletion Horizon", "14-day advance stockout forecaster for DTOs"),
             ("Supervisory Priority Index", "Algorithmic tour rankings for failing TUs")
         ]}
    ]

    for c in cols:
        card = FancyBboxPatch((c["x"], 0.12), c["w"], 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor=c["bg"], edgecolor=c["border"], linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(c["x"] + c["w"]/2, 0.81, c["title"], ha='center', va='center', fontsize=8, fontweight='bold', color=NAVY_TEXT, zorder=4)

        y_pos = 0.73
        for h, desc in c["items"]:
            item_box = FancyBboxPatch((c["x"] + 0.01, y_pos - 0.055), c["w"] - 0.02, 0.11, boxstyle="round,pad=0.005,rounding_size=0.008",
                                      facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1, zorder=3)
            ax.add_patch(item_box)
            ax.text(c["x"] + 0.02, y_pos + 0.025, h, ha='left', va='center', fontsize=7.2, fontweight='bold', color=TEAL_PRIMARY, zorder=4)
            ax.text(c["x"] + 0.02, y_pos - 0.015, desc, ha='left', va='center', fontsize=6.2, color=MUTED_TEXT, zorder=4, wrap=True)
            y_pos -= 0.145

    # Connectors / Arrows
    for arrow_x in [0.24, 0.50, 0.75]:
        ax.annotate("", xy=(arrow_x + 0.015, 0.48), xytext=(arrow_x - 0.005, 0.48),
                    arrowprops=dict(arrowstyle="->", color=TEAL_PRIMARY, lw=2.5), zorder=5)

    save_dual(fig, "diagram_9_data_pipeline_abdm_tokenization")

# ==============================================================================
# DIAGRAM 10: Multidisciplinary Team Structure & Governance Matrix (Field 8)
# ==============================================================================
def create_diagram_10():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "MULTIDISCIPLINARY GOVTECH TEAM STRUCTURE & PROGRAMMATIC GOVERNANCE MATRIX",
               "Public Health Leadership • Clinical Epidemiology • Health AI & ASDC Infrastructure (NESFIC-D-30)")

    # Top Level: Departmental Steering Committee
    gov_box = FancyBboxPatch((0.25, 0.76), 0.50, 0.09, boxstyle="round,pad=0.01,rounding_size=0.012",
                             facecolor='#064e3b', edgecolor=EMERALD_GREEN, linewidth=1.5, zorder=2)
    ax.add_patch(gov_box)
    ax.text(0.50, 0.815, "PROGRAMMATIC STEERING & ADVISORY COMMITTEE", ha='center', va='center', fontsize=8.5, fontweight='bold', color='#6ee7b7', zorder=4)
    ax.text(0.50, 0.785, "National Health Mission (NHM) Assam & State TB Cell (Directorate of Health Services)", ha='center', va='center', fontsize=7.2, color='#e2e8f0', zorder=4)

    # Lead Innovator Box
    lead_box = FancyBboxPatch((0.30, 0.61), 0.40, 0.10, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor=NAVY_HEADER, edgecolor=CYAN_ACCENT, linewidth=1.5, zorder=2)
    ax.add_patch(lead_box)
    ax.text(0.50, 0.67, "LEAD INNOVATOR & PRINCIPAL INVESTIGATOR", ha='center', va='center', fontsize=8.5, fontweight='bold', color='#38bdf8', zorder=4)
    ax.text(0.50, 0.64, "Ron Hatibaruah (100% Commitment • 12 Months)", ha='center', va='center', fontsize=8, fontweight='bold', color='#ffffff', zorder=4)
    ax.text(0.50, 0.622, "Enterprise GovTech Architecture • Public Sector Innovation • System Design", ha='center', va='center', fontsize=6.8, color='#94a3b8', zorder=4)

    # Connecting line from Steering to Lead
    ax.plot([0.50, 0.50], [0.76, 0.71], color=NAVY_HEADER, linewidth=2, zorder=1)

    # 4 Specialist Tracks
    tracks = [
        {"x": 0.04, "w": 0.21, "title": "CLINICAL & PUBLIC HEALTH", "lead": "Senior Pulmonologist (MD)",
         "desc": "15+ yrs TB/NTEP expertise • Guides clinical risk cutoffs, differentiated care workflows, verbal autopsies & CDSS safety"},
        {"x": 0.275, "w": 0.21, "title": "HEALTH AI & MACHINE LEARNING", "lead": "Lead ML Engineer (M.Tech)",
         "desc": "7+ yrs clinical AI • XGBoost mortality model, SHAP feature attribution, survival curves & inference latency tuning"},
        {"x": 0.51, "w": 0.21, "title": "FULL-STACK & WEBGIS", "lead": "Senior WebGIS Engineer",
         "desc": "6+ yrs React 18, TypeScript, PostGIS & Leaflet • Multi-layer basemap switcher, referral cascade tracker & UI/UX"},
        {"x": 0.745, "w": 0.21, "title": "DEVSECOPS & FIELD OPS", "lead": "DevSecOps & Training Lead",
         "desc": "ASDC Kubernetes staging, STQC VAPT clearance, DPDP Act encryption + Grassroots ASHA/STS training in Dibrugarh/Kamrup"}
    ]

    for t in tracks:
        card = FancyBboxPatch((t["x"], 0.16), t["w"], 0.38, boxstyle="round,pad=0.01,rounding_size=0.01",
                              facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1.2, zorder=2)
        ax.add_patch(card)
        ax.text(t["x"] + t["w"]/2, 0.50, t["title"], ha='center', va='center', fontsize=7.5, fontweight='bold', color=TEAL_PRIMARY, zorder=4)
        ax.text(t["x"] + t["w"]/2, 0.46, t["lead"], ha='center', va='center', fontsize=7, fontweight='bold', color=NAVY_TEXT, zorder=4)
        ax.text(t["x"] + t["w"]/2, 0.32, t["desc"], ha='center', va='center', fontsize=6.5, color=MUTED_TEXT, zorder=4, wrap=True)

        # Connection line from PI
        ax.plot([0.50, t["x"] + t["w"]/2], [0.61, 0.54], color='#94a3b8', linestyle='-', linewidth=1.2, zorder=1)

    save_dual(fig, "diagram_10_team_governance_matrix")

# ==============================================================================
# DIAGRAM 11: Zero-Trust ASDC Security & CDSS Safety Guardrails (Field 10)
# ==============================================================================
def create_diagram_11():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "ZERO-TRUST ASDC SECURITY ARCHITECTURE, DPDP ACT 2023 & CLINICAL SAFETY",
               "100% Sovereign Data Residency in Assam • ABDM Consent Framework • Human-in-the-Loop CDSS Certification")

    pillars = [
        {"x": 0.04, "w": 0.21, "title": "1. SOVEREIGN HOSTING (ASDC)", "color": TEAL_PRIMARY,
         "points": [
             ("Physical Data Residency", "Hosted 100% within Assam State Data Centre (ASDC) in Dispur; zero data egress outside India"),
             ("Zero-Trust Perimeter", "Isolated virtual private cloud with strict firewall DMZ and certified STQC VAPT clearance"),
             ("Cryptographic Encryption", "AES-256 encryption at rest; TLS 1.3 encryption in transit for all endpoints")
         ]},
        {"x": 0.275, "w": 0.21, "title": "2. DPDP ACT 2023 COMPLIANCE", "color": ROYAL_BLUE,
         "points": [
             ("Purpose Limitation", "Strict ingestion of only statutory NTEP clinical variables necessary for risk scoring"),
             ("Pseudonymization", "Direct PII stripped at gateway; SHA-256 tokens replace names and Aadhaar identifiers"),
             ("Granular RBAC", "Role-based access restricting field staff to local TU and DTOs to district aggregates")
         ]},
        {"x": 0.51, "w": 0.21, "title": "3. ABDM M1-M3 COMPLIANCE", "color": PURPLE_ACCENT,
         "points": [
             ("ABHA ID Linkage (M1)", "Tokenized patient accounts created and verified seamlessly via ABDM gateway"),
             ("HIP Diagnostic Feed (M2)", "Secure sharing of NAAT results and risk tiers with treating hospitals on consent"),
             ("Electronic Consent (M3)", "HIU longitudinal view under National Health Consent Architecture")
         ]},
        {"x": 0.745, "w": 0.21, "title": "4. CLINICAL SAFETY (CDSS)", "color": ROSE_RED,
         "points": [
             ("Advisory Decision Support", "Certified non-diagnostic CDSS; explicitly assists rather than replaces clinical decisions"),
             ("Human-in-the-Loop", "Mandatory treating physician sign-off for inpatient bed triage and therapy changes"),
             ("Immutable Audit Trail", "SHA-256 cryptographic logging of every calculation, override, and stock dispatch")
         ]}
    ]

    for p in pillars:
        card = FancyBboxPatch((p["x"], 0.12), p["w"], 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor='#ffffff', edgecolor=p["color"], linewidth=1.5, zorder=2)
        ax.add_patch(card)
        
        # Header banner inside card
        card_header = FancyBboxPatch((p["x"] + 0.008, 0.78), p["w"] - 0.016, 0.055, boxstyle="round,pad=0.003,rounding_size=0.006",
                                     facecolor=p["color"], edgecolor=p["color"], zorder=3)
        ax.add_patch(card_header)
        ax.text(p["x"] + p["w"]/2, 0.807, p["title"], ha='center', va='center', fontsize=7.2, fontweight='bold', color='#ffffff', zorder=4)

        y_pos = 0.70
        for title, desc in p["points"]:
            bullet_box = FancyBboxPatch((p["x"] + 0.01, y_pos - 0.06), p["w"] - 0.02, 0.12, boxstyle="round,pad=0.004,rounding_size=0.006",
                                        facecolor='#f8fafc', edgecolor='#e2e8f0', linewidth=1, zorder=3)
            ax.add_patch(bullet_box)
            ax.text(p["x"] + 0.02, y_pos + 0.035, title, ha='left', va='center', fontsize=7, fontweight='bold', color=NAVY_TEXT, zorder=4)
            ax.text(p["x"] + 0.02, y_pos - 0.01, desc, ha='left', va='center', fontsize=6.2, color=MUTED_TEXT, zorder=4, wrap=True)
            y_pos -= 0.155

    save_dual(fig, "diagram_11_zero_trust_security_cdss_safety")

# ==============================================================================
# DIAGRAM 12: Dual-District Pilot Demonstrator & Risk Matrix (Field 12)
# ==============================================================================
def create_diagram_12():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "TWO-DISTRICT PILOT DEMONSTRATOR ARCHITECTURE & OPERATIONAL RISK MITIGATION",
               "Contrasting Epidemiological Testbeds: Dibrugarh (Tea Gardens) vs. Kamrup Metro (Urban Hub) • NESFIC-D-30")

    # Left Box: Dual Pilot Districts
    left_card = FancyBboxPatch((0.03, 0.12), 0.45, 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                               facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.5, zorder=2)
    ax.add_patch(left_card)
    ax.text(0.255, 0.81, "DUAL-DISTRICT COMPARATIVE PILOT TESTBEDS", ha='center', va='center', fontsize=8.5, fontweight='bold', color=NAVY_TEXT, zorder=4)

    # District 1: Dibrugarh
    d1_box = FancyBboxPatch((0.05, 0.48), 0.41, 0.28, boxstyle="round,pad=0.006,rounding_size=0.008",
                            facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.2, zorder=3)
    ax.add_patch(d1_box)
    ax.text(0.07, 0.72, "DISTRICT 1: DIBRUGARH (UPPER ASSAM)", fontsize=8, fontweight='bold', color=TEAL_PRIMARY, zorder=4)
    ax.text(0.07, 0.68, "• Context: >140 organized tea garden estates & indigenous line bastis", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.64, "• Primary Burden: Severe undernutrition (BMI < 14 in 32%), delayed presentation", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.60, "• Pilot Focus: Mobile AI-Xray van route optimization + upfront inpatient nutrition", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.56, "• Key Facilities: Assam Medical College (AMCH) CBNAAT lab & 18 peripheral AAMs", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.52, "• Frontline Cadre: 14 STS/STLS supervisors + 180 ASHA community mobilizers", fontsize=6.8, color=MUTED_TEXT, zorder=4)

    # District 2: Kamrup Metro
    d2_box = FancyBboxPatch((0.05, 0.16), 0.41, 0.28, boxstyle="round,pad=0.006,rounding_size=0.008",
                            facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.2, zorder=3)
    ax.add_patch(d2_box)
    ax.text(0.07, 0.40, "DISTRICT 2: KAMRUP METROPOLITAN (GUWAHATI)", fontsize=8, fontweight='bold', color=ROYAL_BLUE, zorder=4)
    ax.text(0.07, 0.36, "• Context: Dense urban capital, transient migrant workers & informal slums", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.32, "• Primary Burden: High initial default, private-to-public dropouts, MDR clusters", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.28, "• Pilot Focus: Closed-loop 48-hr referral tracking & Double Metaphone deduplication", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.24, "• Key Facilities: Gauhati Medical College (GMCH), State TB Centre & 12 DMC labs", fontsize=6.8, color=MUTED_TEXT, zorder=4)
    ax.text(0.07, 0.20, "• Frontline Cadre: 14 STS/STLS supervisors + municipal health posts", fontsize=6.8, color=MUTED_TEXT, zorder=4)

    # Right Box: Risk Matrix
    right_card = FancyBboxPatch((0.51, 0.12), 0.46, 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                                facecolor='#faf5ff', edgecolor='#d8b4fe', linewidth=1.5, zorder=2)
    ax.add_patch(right_card)
    ax.text(0.74, 0.81, "OPERATIONAL RISK SCORECARD & CONCRETE MITIGATIONS", ha='center', va='center', fontsize=8.5, fontweight='bold', color=NAVY_TEXT, zorder=4)

    risks = [
        ("Ni-kshay API Latency / Central Outages", "HIGH", ROSE_RED,
         "Redis distributed caching at ASDC; offline-first queuing buffers queries and syncs asynchronously on reconnection."),
        ("Frontline Clinician Alert Fatigue", "MEDIUM", AMBER_GOLD,
         "Calibrated strict risk thresholds (>75) restrict high-priority alerts to top 10-12% most critical patients."),
        ("Tea Garden Cellular Connectivity Drops", "MEDIUM", AMBER_GOLD,
         "Local SQLite offline caching on frontline mobile devices; auto-syncs when returning to cellular coverage range."),
        ("Diagnostic Cartridge Buffer Stockouts", "MEDIUM", AMBER_GOLD,
         "14-day predictive burn-rate forecaster alerts State TB Cell to trigger inter-district buffer dispatch from Guwahati.")
    ]

    y_risk = 0.73
    for r_title, sev, scolor, r_mit in risks:
        r_box = FancyBboxPatch((0.53, y_risk - 0.055), 0.42, 0.11, boxstyle="round,pad=0.005,rounding_size=0.008",
                               facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1, zorder=3)
        ax.add_patch(r_box)
        ax.text(0.55, y_risk + 0.025, r_title, fontsize=7.2, fontweight='bold', color=NAVY_TEXT, zorder=4)
        
        # Severity tag
        s_tag = FancyBboxPatch((0.87, y_risk + 0.01), 0.065, 0.03, boxstyle="round,pad=0.002,rounding_size=0.004",
                               facecolor=scolor, edgecolor=scolor, zorder=4)
        ax.add_patch(s_tag)
        ax.text(0.902, 0.025 + y_risk, sev, ha='center', va='center', fontsize=6, fontweight='bold', color='#ffffff', zorder=5)

        ax.text(0.55, y_risk - 0.02, r_mit, fontsize=6.2, color=MUTED_TEXT, zorder=4, wrap=True)
        y_risk -= 0.145

    save_dual(fig, "diagram_12_dual_district_pilot_validation")

if __name__ == '__main__':
    print("Generating additional 5 widescreen diagrams...")
    create_diagram_8()
    create_diagram_9()
    create_diagram_10()
    create_diagram_11()
    create_diagram_12()
    print("All 5 additional diagrams successfully generated in assets/proposal_images/!")
