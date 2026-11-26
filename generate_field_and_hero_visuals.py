#!/usr/bin/env python3
"""
Generate 5 High-Impact Specialized Visuals for NESFIC-D-30:
1. hero_header_assam_sentinel.jpg: Executive Hero Banner for Page 1 of Proposal PDF
2. diagram_13_assam_field_realities_logistics.jpg: Assam Ground-Level Realities (Tea Gardens, Riverine Chars, DMCs)
3. diagram_14_multi_device_prototype_showcase.jpg: Multi-Device UI Suite Mockup (Laptop, Tablet, Mobile)
4. diagram_15_clinical_shap_waterfall.jpg: Clinical SHAP Waterfall Explainability Decomposition
5. diagram_16_assam_elimination_trajectory.jpg: Assam TB Elimination Trajectory & Impact Scorecard (2015-2026)
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

# Publication Blueprint Palette
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

def add_header(ax, title, subtitle, tag="NESFIC-D-30 CLINICAL FRAMEWORK"):
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

def save_dual(fig, basename, is_banner=False):
    plt.tight_layout()
    png_path = os.path.join(out_dir, f"{basename}.png")
    jpg_path = os.path.join(out_dir, f"{basename}.jpg")
    plt.savefig(png_path, dpi=200, bbox_inches='tight')
    plt.savefig(jpg_path, dpi=200, bbox_inches='tight')
    plt.close()
    print(f"Rendered {basename}.png & .jpg")

# ==============================================================================
# 1. HERO HEADER BANNER: Page 1 Cover Banner for Proposal PDF
# ==============================================================================
def create_hero_banner():
    # 16:4 aspect ratio banner (approx 16 x 4 inches)
    fig, ax = plt.subplots(figsize=(16, 4.2), dpi=200)
    ax.set_facecolor('#042f2e') # Rich Assam Forest Teal
    fig.patch.set_facecolor('#042f2e')
    ax.axis('off')

    # Background subtle telemetry grid
    for x in np.linspace(0, 1, 33):
        ax.axvline(x, color='#0f766e', alpha=0.25, linewidth=0.5)
    for y in np.linspace(0, 1, 9):
        ax.axhline(y, color='#0f766e', alpha=0.25, linewidth=0.5)

    # Left Sentinel Crest / Shield Graphic
    shield_pts = [[0.08, 0.82], [0.13, 0.72], [0.13, 0.35], [0.08, 0.18], [0.03, 0.35], [0.03, 0.72]]
    shield = Polygon(shield_pts, facecolor='#0f766e', edgecolor='#2dd4bf', linewidth=2.5, zorder=3)
    ax.add_patch(shield)
    ax.text(0.08, 0.54, "NIKSHAY", ha='center', va='center', fontsize=9.5, fontweight='bold', color='#ffffff', zorder=4)
    ax.text(0.08, 0.38, "DRISHTI", ha='center', va='center', fontsize=8.5, fontweight='bold', color='#fbbf24', zorder=4)

    # Telemetry Pulse Line Across Banner
    pulse_x = [0.15, 0.22, 0.25, 0.27, 0.29, 0.31, 0.34, 0.40]
    pulse_y = [0.50, 0.50, 0.70, 0.25, 0.78, 0.42, 0.50, 0.50]
    ax.plot(pulse_x, pulse_y, color='#fbbf24', linewidth=2.2, zorder=3)

    # Main Typography
    ax.text(0.42, 0.80, "GOVERNMENT OF ASSAM • NATIONAL HEALTH MISSION & STATE TB CELL",
            fontsize=9.5, fontweight='bold', color='#6ee7b7', zorder=4)
    ax.text(0.42, 0.56, "NikshayDrishti • Assam TB Sentinel Platform",
            fontsize=19, fontweight='bold', color='#ffffff', zorder=4)
    ax.text(0.42, 0.36, "AI-Powered TB Risk Stratification & Programme Decision Support Platform • NESFIC-D-30",
            fontsize=10.5, color='#99f6e4', zorder=4)

    # Badges Strip at Bottom
    badges = [
        ("STREAM 1: GOVT HEALTH TRACK", '#065f46', '#34d399'),
        ("LIVE PROTOTYPE: https://tb-risk-stratification-ai.pages.dev/", '#1e293b', '#38bdf8'),
        ("ASDC ZERO-TRUST HOSTING", '#064e3b', '#a7f3d0'),
        ("CDSS DECISION SUPPORT ONLY", '#831843', '#f472b6')
    ]
    x_badge = 0.42
    for b_text, b_bg, b_fg in badges:
        bw = len(b_text) * 0.0075 + 0.025
        b_patch = FancyBboxPatch((x_badge, 0.12), bw, 0.13, boxstyle="round,pad=0.004,rounding_size=0.01",
                                 facecolor=b_bg, edgecolor=b_fg, linewidth=1, zorder=3)
        ax.add_patch(b_patch)
        ax.text(x_badge + bw/2, 0.185, b_text, ha='center', va='center', fontsize=6.8, fontweight='bold', color=b_fg, zorder=4)
        x_badge += bw + 0.015

    # Right Geographic Hub Nodes
    hubs = [
        ("GUWAHATI (ASDC/HQ)", 0.90, 0.74, '#2dd4bf'),
        ("DIBRUGARH (AMCH)", 0.92, 0.50, '#fbbf24'),
        ("BARPETA (CHAR)", 0.86, 0.32, '#f87171')
    ]
    for h_name, hx, hy, hc in hubs:
        ax.plot(hx, hy, marker='o', markersize=6, color=hc, markeredgecolor='#ffffff', markeredgewidth=1.5, zorder=4)
        ax.text(hx - 0.015, hy, h_name, ha='right', va='center', fontsize=7, fontweight='bold', color='#e2e8f0', zorder=4)

    # Link lines between hubs
    ax.plot([0.86, 0.90, 0.92], [0.32, 0.74, 0.50], color='#2dd4bf', linestyle='--', linewidth=1, alpha=0.6, zorder=2)

    save_dual(fig, "hero_header_assam_sentinel", is_banner=True)

# ==============================================================================
# 2. DIAGRAM 13: Assam Field Epidemiology, Tea Gardens & Molecular Logistics
# ==============================================================================
def create_diagram_13():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "ASSAM TB FIELD EPIDEMIOLOGY: TEA GARDENS, RIVERINE CHARS & MOLECULAR LOGISTICS",
               "Targeting High-Vulnerability Pockets • Diagnostic Cascade Transit & Cartridge Buffer Management (NESFIC-D-30)")

    # 4 Thematic Pillars of Assam Reality
    panels = [
        {"x": 0.03, "w": 0.22, "title": "A. UPPER ASSAM TEA GARDENS", "sub": "Dibrugarh, Tinsukia & Charaideo",
         "bg": '#f0fdf4', "border": '#86efac', "icon": "🌿",
         "metrics": [
             ("800+ Tea Estates", "High-density labor line bastis with occupational dust exposure"),
             ("BMI < 14 in >30% Cases", "Severe chronic undernutrition drives accelerated bacillary progression"),
             ("Alcohol & Delayed Care", "Reluctance to seek early clinic triage leads to advanced cavitation"),
             ("Mobile AI-Xray Camps", "Handheld ultraportable X-ray vans with qXR AI triage on tea roads")
         ]},
        {"x": 0.275, "w": 0.22, "title": "B. RIVERINE CHAR SANDBARS", "sub": "Barpeta, Dhubri & South Salmara",
         "bg": '#eff6ff', "border": '#93c5fd', "icon": "⛵",
         "metrics": [
             ("3,000+ Riverine Chars", "Flood-prone sandbars completely cut off during monsoon inundation"),
             ("Country Boat Couriers", "Specimen runners navigate Brahmaputra waterways in cold-chain cooler boxes"),
             ("Diagnostic Cascade Lag", "Transit times historically exceed >7 days without digital SLA tracking"),
             ("48-Hr SLA Automated Alarms", "Automated alerts dispatched to STLS/DTO when courier transit breaches SLA")
         ]},
        {"x": 0.52, "w": 0.22, "title": "C. MOLECULAR DIAGNOSTICS (DMC)", "sub": "Truenat & CBNAAT Universal DST",
         "bg": '#fefce8', "border": '#fde047', "icon": "🔬",
         "metrics": [
             ("Truenat Quattro Devices", "Battery-operated 4-channel molecular NAAT deployed in remote CHCs"),
             ("GeneXpert CBNAAT Labs", "High-throughput cartridge testing at District Hospitals & Medical Colleges"),
             ("Cartridge Stockout Risk", "Unpredicted buffer depletion halts Universal Drug Susceptibility Testing (UDST)"),
             ("Guwahati Central Buffer", "14-day advance forecaster triggers 1-click stock dispatch to deficit stores")
         ]},
        {"x": 0.765, "w": 0.21, "title": "D. 74% EARLY DEATH DRIVERS", "sub": "Verbal Autopsy & Root Causes",
         "bg": '#fef2f2', "border": '#fca5a5', "icon": "⚠️",
         "metrics": [
             ("42% Extreme Undernutrition", "Patients presenting with BMI < 13.5 collapse within first 2 weeks"),
             ("28% Diagnostic Lag (>14d)", "Delayed molecular testing allows bilateral parenchymal destruction"),
             ("18% Undetected MDR-TB", "Initial empirical 1st-line regimen fails without rapid rifampicin DST"),
             ("12% Pre-Treatment Default", "Dropouts between microscopy detection and first-dose therapy")
         ]}
    ]

    for p in panels:
        card = FancyBboxPatch((p["x"], 0.12), p["w"], 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor=p["bg"], edgecolor=p["border"], linewidth=1.5, zorder=2)
        ax.add_patch(card)
        ax.text(p["x"] + p["w"]/2, 0.81, p['title'], ha='center', va='center', fontsize=8, fontweight='bold', color=NAVY_TEXT, zorder=4)
        ax.text(p["x"] + p["w"]/2, 0.775, p["sub"], ha='center', va='center', fontsize=6.8, color=TEAL_PRIMARY, zorder=4)

        y_pos = 0.71
        for title, desc in p["metrics"]:
            box = FancyBboxPatch((p["x"] + 0.01, y_pos - 0.055), p["w"] - 0.02, 0.11, boxstyle="round,pad=0.005,rounding_size=0.008",
                                 facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1, zorder=3)
            ax.add_patch(box)
            ax.text(p["x"] + 0.02, y_pos + 0.025, title, ha='left', va='center', fontsize=7.2, fontweight='bold', color=NAVY_TEXT, zorder=4)
            ax.text(p["x"] + 0.02, y_pos - 0.015, desc, ha='left', va='center', fontsize=6.2, color=MUTED_TEXT, zorder=4, wrap=True)
            y_pos -= 0.145

    save_dual(fig, "diagram_13_assam_field_realities_logistics")

# ==============================================================================
# 3. DIAGRAM 14: Multi-Device Software Suite & Prototype Mockup
# ==============================================================================
def create_diagram_14():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "NIKSHAYDRISHTI MULTI-DEVICE SOFTWARE SUITE & PRODUCTION UI INTERFACES",
               "Live Working Prototype Deployed at https://tb-risk-stratification-ai.pages.dev/ • Verified on Desktop, Tablet & Mobile")

    # Device Mockup 1: Desktop / Laptop (State TB Officer Cockpit) - Left
    desk_frame = FancyBboxPatch((0.03, 0.16), 0.45, 0.65, boxstyle="round,pad=0.01,rounding_size=0.015",
                                facecolor='#0f172a', edgecolor='#334155', linewidth=2, zorder=2)
    ax.add_patch(desk_frame)
    # Screen
    desk_screen = FancyBboxPatch((0.04, 0.22), 0.43, 0.57, boxstyle="round,pad=0.005,rounding_size=0.008",
                                 facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1, zorder=3)
    ax.add_patch(desk_screen)
    # Screen Header Strip
    desk_top = FancyBboxPatch((0.04, 0.74), 0.43, 0.05, boxstyle="round,pad=0.002,rounding_size=0.005",
                              facecolor='#0f766e', edgecolor='#0f766e', zorder=4)
    ax.add_patch(desk_top)
    ax.text(0.055, 0.765, "NikshayDrishti • Assam TB Sentinel | Executive Command (State TB Officer)", fontsize=7, fontweight='bold', color='#ffffff', zorder=5)
    # Desktop UI content preview
    ax.text(0.055, 0.70, "35 Districts Monitored • 1,248 Active Cohorts • 142 Critical Triage Alerts", fontsize=6.5, fontweight='bold', color=NAVY_TEXT, zorder=5)
    
    # Mini KPI Cards
    for i, (k_num, k_lbl, kc) in enumerate([("142", "Critical Care", ROSE_RED), ("92.4%", "Referral SLA", TEAL_PRIMARY), ("14 Days", "Buffer Horizon", AMBER_GOLD)]):
        k_card = FancyBboxPatch((0.055 + i*0.13, 0.58), 0.12, 0.09, boxstyle="round,pad=0.003,rounding_size=0.006",
                                facecolor='#ffffff', edgecolor=kc, linewidth=1, zorder=4)
        ax.add_patch(k_card)
        ax.text(0.115 + i*0.13, 0.635, k_num, ha='center', va='center', fontsize=8.5, fontweight='bold', color=kc, zorder=5)
        ax.text(0.115 + i*0.13, 0.60, k_lbl, ha='center', va='center', fontsize=5.8, color=MUTED_TEXT, zorder=5)

    # Mini Table in screen
    table_bg = FancyBboxPatch((0.055, 0.25), 0.40, 0.30, boxstyle="round,pad=0.003,rounding_size=0.006",
                              facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1, zorder=4)
    ax.add_patch(table_bg)
    ax.text(0.07, 0.52, "Patient ID | District | BMI | Smear | Risk | CDSS Action", fontsize=5.8, fontweight='bold', color=NAVY_TEXT, zorder=5)
    sample_rows = [
        ("NK-AS-84920", "Dibrugarh (Tea)", "13.8", "3+", "89% (Critical)", "Inpatient Bed Approved", ROSE_RED),
        ("NK-AS-77312", "Barpeta (Char)", "15.2", "2+", "78% (Critical)", "Nutrition Kit Dispatched", ROSE_RED),
        ("NK-AS-61204", "Darrang", "17.1", "1+", "56% (High)", "Bi-Weekly STS Home Visit", AMBER_GOLD),
        ("NK-AS-32118", "Dhubri", "18.0", "Neg", "42% (Moderate)", "Standard DOTS Monitoring", EMERALD_GREEN)
    ]
    for r_idx, (pid, dist, bmi, sm, rk, act, rcol) in enumerate(sample_rows):
        y_r = 0.47 - r_idx * 0.05
        ax.text(0.07, y_r, f"{pid} | {dist} | {bmi} | {sm} |", fontsize=5.5, color=MUTED_TEXT, zorder=5)
        ax.text(0.30, y_r, rk, fontsize=5.5, fontweight='bold', color=rcol, zorder=5)

    # Laptop Stand
    ax.add_patch(FancyBboxPatch((0.18, 0.12), 0.15, 0.04, boxstyle="round,pad=0.002,rounding_size=0.004", facecolor='#334155', edgecolor='#475569', zorder=2))
    ax.text(0.255, 0.08, "DESKTOP / LAPTOP CONSOLE: State & District Elimination Cockpit", ha='center', va='center', fontsize=7.5, fontweight='bold', color=NAVY_TEXT, zorder=4)

    # Device Mockup 2: Tablet / GIS Map View - Center
    tab_frame = FancyBboxPatch((0.51, 0.16), 0.28, 0.65, boxstyle="round,pad=0.01,rounding_size=0.015",
                               facecolor='#1e293b', edgecolor='#475569', linewidth=2, zorder=2)
    ax.add_patch(tab_frame)
    tab_screen = FancyBboxPatch((0.52, 0.18), 0.26, 0.61, boxstyle="round,pad=0.005,rounding_size=0.008",
                                facecolor='#e0f2fe', edgecolor='#38bdf8', linewidth=1, zorder=3)
    ax.add_patch(tab_screen)
    # Basemap Switcher preview
    b_switch = FancyBboxPatch((0.64, 0.62), 0.13, 0.15, boxstyle="round,pad=0.003,rounding_size=0.006",
                              facecolor='#ffffff', edgecolor='#0f766e', linewidth=1, zorder=5)
    ax.add_patch(b_switch)
    ax.text(0.705, 0.74, "4-Layer Basemap", ha='center', va='center', fontsize=5.5, fontweight='bold', color=TEAL_PRIMARY, zorder=6)
    ax.text(0.65, 0.70, "• Satellite Imagery (Esri)", fontsize=5, color=NAVY_TEXT, zorder=6)
    ax.text(0.65, 0.67, "• Clean Street Map (Carto)", fontsize=5, color=NAVY_TEXT, zorder=6)
    ax.text(0.65, 0.64, "• Positron Light Canvas", fontsize=5, color=NAVY_TEXT, zorder=6)
    # Clusters on map
    ax.plot([0.58, 0.68, 0.62], [0.35, 0.45, 0.52], marker='o', markersize=8, color=ROSE_RED, markeredgecolor='#ffffff', zorder=4)
    ax.text(0.58, 0.30, "Dibrugarh Tea Bastis", fontsize=5.5, fontweight='bold', color=NAVY_TEXT, zorder=5)
    ax.text(0.65, 0.08, "TABLET GIS CONSOLE: 4-Layer Geospatial ACF", ha='center', va='center', fontsize=7.5, fontweight='bold', color=NAVY_TEXT, zorder=4)

    # Device Mockup 3: Mobile App (Frontline MO / ASHA) - Right
    mob_frame = FancyBboxPatch((0.82, 0.16), 0.15, 0.65, boxstyle="round,pad=0.01,rounding_size=0.015",
                               facecolor='#0f172a', edgecolor='#334155', linewidth=2, zorder=2)
    ax.add_patch(mob_frame)
    mob_screen = FancyBboxPatch((0.83, 0.20), 0.13, 0.57, boxstyle="round,pad=0.005,rounding_size=0.008",
                                facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1, zorder=3)
    ax.add_patch(mob_screen)
    # Mobile header
    mob_top = FancyBboxPatch((0.83, 0.71), 0.13, 0.06, boxstyle="round,pad=0.002,rounding_size=0.004",
                             facecolor='#0f766e', edgecolor='#0f766e', zorder=4)
    ax.add_patch(mob_top)
    ax.text(0.895, 0.74, "MO-TC Portal", ha='center', va='center', fontsize=6.5, fontweight='bold', color='#ffffff', zorder=5)
    # Patient Alert Card
    m_card = FancyBboxPatch((0.84, 0.52), 0.11, 0.16, boxstyle="round,pad=0.003,rounding_size=0.006",
                            facecolor='#fef2f2', edgecolor=ROSE_RED, linewidth=1, zorder=4)
    ax.add_patch(m_card)
    ax.text(0.85, 0.64, "ALERT: CRITICAL", fontsize=6, fontweight='bold', color=ROSE_RED, zorder=5)
    ax.text(0.85, 0.60, "Ramesh Karmakar", fontsize=5.8, fontweight='bold', color=NAVY_TEXT, zorder=5)
    ax.text(0.85, 0.56, "BMI 13.8 • Cavitary CXR", fontsize=5.2, color=MUTED_TEXT, zorder=5)
    ax.text(0.85, 0.53, "[Approve Inpatient Bed]", fontsize=5.2, fontweight='bold', color=ROYAL_BLUE, zorder=5)
    
    # Barcode Scan Button
    b_btn = FancyBboxPatch((0.84, 0.38), 0.11, 0.08, boxstyle="round,pad=0.003,rounding_size=0.006",
                           facecolor='#0f766e', edgecolor='#0f766e', zorder=4)
    ax.add_patch(b_btn)
    ax.text(0.895, 0.42, "Scan Sputum Barcode\n(48-Hr SLA Active)", ha='center', va='center', fontsize=5.5, fontweight='bold', color='#ffffff', zorder=5)

    ax.text(0.895, 0.08, "MOBILE: Frontline Triage", ha='center', va='center', fontsize=7.5, fontweight='bold', color=NAVY_TEXT, zorder=4)

    save_dual(fig, "diagram_14_multi_device_prototype_showcase")

# ==============================================================================
# 4. DIAGRAM 15: Clinical SHAP Waterfall Explainability
# ==============================================================================
def create_diagram_15():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "EXPLAINABLE CLINICAL DECISION SUPPORT: PATIENT RISK ATTRIBUTION (SHAP WATERFALL)",
               "Transparent Biomarker Risk Attribution • Validated on Assam Cohort (Case: NK-AS-84920, Dibrugarh)")

    # Left Patient Dossier Card
    p_card = FancyBboxPatch((0.03, 0.12), 0.28, 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                            facecolor='#f8fafc', edgecolor='#94a3b8', linewidth=1.5, zorder=2)
    ax.add_patch(p_card)
    ax.text(0.17, 0.81, "PATIENT CLINICAL PROFILE", ha='center', va='center', fontsize=8.5, fontweight='bold', color=NAVY_TEXT, zorder=4)
    ax.text(0.17, 0.775, "Ni-kshay ID: NK-AS-84920 (Assam Medical College)", ha='center', va='center', fontsize=6.8, color=TEAL_PRIMARY, zorder=4)

    p_fields = [
        ("Patient Name", "Ramesh Karmakar (48y / Male)"),
        ("Location", "Chabua TU, Dibrugarh (Tea Garden)"),
        ("Nutritional Status", "Severe Undernutrition (BMI 13.8 kg/m²)"),
        ("Bacteriology", "Sputum Smear 3+ (High Bacillary Load)"),
        ("Chest Radiography", "Bilateral Upper Lobe Cavitation"),
        ("Drug Resistance", "Rifampicin Resistant (MDR-TB)"),
        ("Comorbidities", "Uncontrolled Diabetes (HbA1c 9.4%)"),
        ("Adherence Telemetry", "MERM Electronic Box: 94% Compliant"),
        ("CDSS Recommendation", "MANDATORY INPATIENT STABILIZATION")
    ]
    y_pf = 0.72
    for label, val in p_fields:
        ax.text(0.05, y_pf, label + ":", fontsize=6.5, fontweight='bold', color=NAVY_TEXT, zorder=4)
        ax.text(0.05, y_pf - 0.024, val, fontsize=6.2, color=ROSE_RED if "Severe" in val or "Resistant" in val or "MANDATORY" in val else MUTED_TEXT, zorder=4)
        y_pf -= 0.065

    # Right SHAP Waterfall Plot
    shap_card = FancyBboxPatch((0.33, 0.12), 0.64, 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                               facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.5, zorder=2)
    ax.add_patch(shap_card)
    ax.text(0.65, 0.81, "SHAP (SHapley Additive exPlanations) WATERFALL RISK DECOMPOSITION", ha='center', va='center', fontsize=8.5, fontweight='bold', color=NAVY_TEXT, zorder=4)
    ax.text(0.65, 0.775, "Deconstructs 88.8% Composite Risk Score into Exact Biological & Social Contributors", ha='center', va='center', fontsize=6.8, color=MUTED_TEXT, zorder=4)

    # Base Value Line
    ax.plot([0.38, 0.93], [0.73, 0.73], color='#cbd5e1', linestyle='--', linewidth=1, zorder=3)
    ax.text(0.38, 0.745, "Base Population Mortality Risk: E[f(x)] = 12.4%", fontsize=7, fontweight='bold', color=MUTED_TEXT, zorder=4)

    bars = [
        ("Severe Undernutrition (BMI 13.8 kg/m²)", 0.124, 0.486, "+36.2%", ROSE_RED, 0.65),
        ("Bilateral Cavitary CXR Lesions", 0.486, 0.701, "+21.5%", ROSE_RED, 0.57),
        ("Rifampicin Resistant (MDR-TB)", 0.701, 0.849, "+14.8%", ROSE_RED, 0.49),
        ("Sputum Smear Grade 3+", 0.849, 0.931, "+8.2%", ROSE_RED, 0.41),
        ("Age 48 Years (> 45y cohort)", 0.931, 0.972, "+4.1%", ROSE_RED, 0.33),
        ("High Adherence (MERM 94%)", 0.972, 0.888, "-8.4%", EMERALD_GREEN, 0.25)
    ]

    for title, start_val, end_val, delta_str, b_color, y_b in bars:
        # Scale to diagram width: 0.38 is 0%, 0.92 is 100%
        x_start = 0.38 + start_val * (0.92 - 0.38)
        x_end = 0.38 + end_val * (0.92 - 0.38)
        x_left = min(x_start, x_end)
        w_bar = abs(x_end - x_start)
        
        b_patch = FancyBboxPatch((x_left, y_b - 0.02), w_bar, 0.04, boxstyle="round,pad=0.002,rounding_size=0.005",
                                 facecolor=b_color, edgecolor='#ffffff', linewidth=1, zorder=4)
        ax.add_patch(b_patch)
        ax.text(0.38, y_b + 0.028, title, fontsize=6.8, fontweight='bold', color=NAVY_TEXT, zorder=5)
        ax.text(max(x_start, x_end) + 0.01, y_b, delta_str, va='center', fontsize=6.8, fontweight='bold', color=b_color, zorder=5)

    # Final Score Badge
    final_box = FancyBboxPatch((0.55, 0.14), 0.38, 0.065, boxstyle="round,pad=0.004,rounding_size=0.008",
                               facecolor='#991b1b', edgecolor='#ffffff', linewidth=1.5, zorder=5)
    ax.add_patch(final_box)
    ax.text(0.74, 0.172, "COMPOSITE MORTALITY RISK: 88.8% • CRITICAL TIER (INPATIENT TRIAGE)",
            ha='center', va='center', fontsize=7.5, fontweight='bold', color='#ffffff', zorder=6)

    save_dual(fig, "diagram_15_clinical_shap_waterfall")

# ==============================================================================
# 5. DIAGRAM 16: Assam TB Elimination Trajectory & Impact Scorecard (2015-2026)
# ==============================================================================
def create_diagram_16():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=200)
    ax.set_facecolor(BG_LIGHT)
    fig.patch.set_facecolor(BG_LIGHT)
    ax.axis('off')
    add_blueprint_grid(ax)

    add_header(ax, "ASSAM STATE TB ELIMINATION TRAJECTORY & IMPACT SCORECARD (2015 - 2026)",
               "Targeted 30-Day Mortality Reduction • Universal Drug Susceptibility & 48-Hour Referral Closure (NESFIC-D-30)")

    kpis = [
        {"num": "1", "title": "30-DAY EARLY TB MORTALITY", "now": "74% of all TB deaths", "target": "< 25% by 2026",
         "desc": "Aggressive upfront inpatient triage of patients with BMI < 14 and bilateral cavitation halts early collapse.",
         "color": ROSE_RED, "trend": [74, 71, 65, 48, 24]},
        {"num": "2", "title": "48-HR SAMPLES CLOSED-LOOP", "now": "54% transit completion", "target": "> 92% SLA closure",
         "desc": "Barcoded specimen courier pipeline with automated alerts eliminates pre-treatment attrition across chars & tea gardens.",
         "color": TEAL_PRIMARY, "trend": [54, 59, 68, 82, 93]},
        {"num": "3", "title": "UNIVERSAL DRUG SUSCEPTIBILITY", "now": "68% coverage", "target": "> 96% UDST tested",
         "desc": "14-day predictive Truenat/CBNAAT cartridge burn-rate forecaster prevents stockouts at all 35 district centers.",
         "color": ROYAL_BLUE, "trend": [68, 72, 79, 88, 97]},
        {"num": "4", "title": "NIKSHAY POSHAN DBT VELOCITY", "now": "45% within 30 days", "target": "> 98% within 7 days",
         "desc": "Automated high-risk flagging triggers expedited ₹1,000/mo nutrition DBT release to bank accounts upon notification.",
         "color": AMBER_GOLD, "trend": [45, 52, 64, 85, 98]}
    ]

    for idx, k in enumerate(kpis):
        x_card = 0.04 + idx * 0.235
        card = FancyBboxPatch((x_card, 0.12), 0.215, 0.73, boxstyle="round,pad=0.01,rounding_size=0.012",
                              facecolor='#ffffff', edgecolor=k["color"], linewidth=1.5, zorder=2)
        ax.add_patch(card)

        # Header Badge
        h_badge = FancyBboxPatch((x_card + 0.008, 0.78), 0.199, 0.055, boxstyle="round,pad=0.003,rounding_size=0.006",
                                 facecolor=k["color"], edgecolor=k["color"], zorder=3)
        ax.add_patch(h_badge)
        ax.text(x_card + 0.107, 0.807, f"KPI {k['num']}: {k['title']}", ha='center', va='center', fontsize=6.8, fontweight='bold', color='#ffffff', zorder=4)

        # Current vs Target Big Text
        ax.text(x_card + 0.015, 0.72, "CURRENT STATUS (NTEP):", fontsize=6, fontweight='bold', color=MUTED_TEXT, zorder=4)
        ax.text(x_card + 0.015, 0.68, k["now"], fontsize=8, fontweight='bold', color=NAVY_TEXT, zorder=4)

        ax.text(x_card + 0.015, 0.61, "NIKSHAYDRISHTI TARGET (2026):", fontsize=6, fontweight='bold', color=MUTED_TEXT, zorder=4)
        ax.text(x_card + 0.015, 0.56, k["target"], fontsize=10, fontweight='bold', color=k["color"], zorder=4)

        # Mini Sparkline Trend
        y_pts = [0.38 + (v / 100.0) * 0.12 for v in k["trend"]]
        x_pts = [x_card + 0.02 + j * 0.042 for j in range(5)]
        ax.plot(x_pts, y_pts, color=k["color"], marker='o', markersize=4, linewidth=2, zorder=4)
        ax.text(x_card + 0.02, 0.34, "2015", fontsize=5.5, color=MUTED_TEXT, zorder=4)
        ax.text(x_card + 0.18, 0.34, "2026", fontsize=5.5, fontweight='bold', color=k["color"], zorder=4)

        # Description text
        desc_box = FancyBboxPatch((x_card + 0.01, 0.14), 0.195, 0.17, boxstyle="round,pad=0.004,rounding_size=0.006",
                                  facecolor='#f8fafc', edgecolor='#e2e8f0', linewidth=1, zorder=3)
        ax.add_patch(desc_box)
        ax.text(x_card + 0.02, 0.23, k["desc"], fontsize=6.2, color=MUTED_TEXT, zorder=4, wrap=True)

    save_dual(fig, "diagram_16_assam_elimination_trajectory")

if __name__ == '__main__':
    print("Generating 5 specialized visual artifacts...")
    create_hero_banner()
    create_diagram_13()
    create_diagram_14()
    create_diagram_15()
    create_diagram_16()
    print("All 5 specialized visuals generated successfully!")
