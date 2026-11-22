import os
import re
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image
)
from reportlab.pdfgen import canvas

base_dir = os.path.dirname(os.path.abspath(__file__))
img_dir = os.path.join(base_dir, 'assets', 'proposal_images')

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages after page 1)
        if self._pageNumber > 1:
            self.drawString(54, letter[1] - 36, "Government of Assam • National Health Mission & State TB Cell • NESFIC-D-30")
            self.drawRightString(letter[0] - 54, letter[1] - 36, "NikshayDrishti (Assam TB Sentinel) — Ron Hatibaruah")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, letter[1] - 42, letter[0] - 54, letter[1] - 42)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 45, letter[0] - 54, 45)
        self.drawString(54, 32, "NESFIC 2026 Proposal • Problem NESFIC-D-30 • Applicant: Ron Hatibaruah")
        self.drawRightString(letter[0] - 54, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def clean_inline_markdown(text):
    if not text:
        return ""
    t = text.strip()
    
    code_matches = []
    def save_code(m):
        code_matches.append(m.group(1))
        return f"__CODE_PH_{len(code_matches)-1}__"
    t = re.sub(r'`([^`]+)`', save_code, t)

    t = re.sub(r'\*{3,}', '***', t)

    # Unicode cleanup for Helvetica
    t = t.replace('₹', 'Rs. ')
    t = t.replace('নিশ্চয় দৃষ্টি', 'NikshayDrishti')
    t = t.replace('–', '-').replace('—', ' - ')
    t = t.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    t = t.replace('➔', '->').replace('•', '*').replace('✓', '[X]')

    # LaTeX Math Cleanup
    t = re.sub(r'\\left\s*\(', '(', t)
    t = re.sub(r'\\right\s*\)', ')', t)
    t = re.sub(r'\\text\{([^}]+)\}', r'\1', t)
    t = t.replace(r'\%', '%').replace(r'\_', '_').replace(r'\&', '&')
    t = t.replace(r'\times', '&times;').replace(r'\approx', '≈')
    t = re.sub(r'\$([^\$]+)\$', r'<b>\1</b>', t)
    t = t.replace('$', '')

    # Bold & Italic markdown
    t = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<!\*)\*([a-zA-Z0-9][^\*]*?)\*(?!\*)', r'<i>\1</i>', t)

    # Restore code blocks
    for idx, cb in enumerate(code_matches):
        t = t.replace(f"__CODE_PH_{idx}__", f"<b>{escape(cb)}</b>")

    return t

def safe_paragraph(text, style):
    clean = clean_inline_markdown(text)
    try:
        return Paragraph(clean, style)
    except Exception:
        clean = escape(re.sub(r'<[^>]+>', '', clean))
        return Paragraph(clean, style)

def create_styled_table(data_rows, col_widths=None, available_width=490):
    styles = getSampleStyleSheet()
    header_style = ParagraphStyle(
        'THStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#0f766e')
    )
    cell_style = ParagraphStyle(
        'TDStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#1e293b')
    )

    num_cols = len(data_rows[0])
    if not col_widths:
        w = available_width / num_cols
        col_widths = [w] * num_cols

    table_data = []
    for r_idx, row in enumerate(data_rows):
        cur_row = []
        for c_idx, cell in enumerate(row):
            st = header_style if r_idx == 0 else cell_style
            cur_row.append(safe_paragraph(cell, st))
        table_data.append(cur_row)

    t = Table(table_data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('BOTTOMPADDING', (0,0), (-1,0), 4),
        ('TOPPADDING', (0,0), (-1,0), 4),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#ffffff'), colors.HexColor('#f8fafc')]),
        ('TOPPADDING', (0,1), (-1,-1), 3),
        ('BOTTOMPADDING', (0,1), (-1,-1), 3),
    ]))
    return t

def parse_markdown_content(raw_lines, available_width=490):
    styles = getSampleStyleSheet()
    h3_style = ParagraphStyle(
        'H3Style', parent=styles['Heading3'], fontName='Helvetica-Bold',
        fontSize=10, leading=13, textColor=colors.HexColor('#0f766e'), spaceBefore=6, spaceAfter=2
    )
    h4_style = ParagraphStyle(
        'H4Style', parent=styles['Heading4'], fontName='Helvetica-Bold',
        fontSize=9, leading=12, textColor=colors.HexColor('#0f766e'), spaceBefore=4, spaceAfter=2
    )
    body_style = ParagraphStyle(
        'BodyStyle', parent=styles['Normal'], fontName='Helvetica',
        fontSize=8, leading=11.5, textColor=colors.HexColor('#1e293b'), spaceAfter=4
    )
    bullet_style = ParagraphStyle(
        'BulletStyle', parent=styles['Normal'], fontName='Helvetica',
        fontSize=8, leading=11.5, textColor=colors.HexColor('#1e293b'), leftIndent=12, firstLineIndent=-8, spaceAfter=2
    )

    flowables = []
    table_buffer = []
    in_table = False

    def flush_table():
        nonlocal table_buffer, in_table
        if table_buffer:
            t = create_styled_table(table_buffer, available_width=available_width)
            flowables.append(t)
            flowables.append(Spacer(1, 4))
            table_buffer = []
        in_table = False

    for line in raw_lines:
        line_str = line.strip()

        # Handle Markdown Tables
        if line_str.startswith('|') and line_str.endswith('|'):
            # Check if divider line
            if re.match(r'^\|[\s\-:|]+\|$', line_str):
                in_table = True
                continue
            cols = [c.strip() for c in line_str.strip('|').split('|')]
            table_buffer.append(cols)
            continue
        else:
            if in_table or table_buffer:
                flush_table()

        if not line_str:
            continue

        if line_str.startswith('### '):
            flowables.append(safe_paragraph(line_str[4:], h3_style))
        elif line_str.startswith('#### '):
            flowables.append(safe_paragraph(line_str[5:], h4_style))
        elif line_str.startswith('• ') or line_str.startswith('* ') or line_str.startswith('- '):
            flowables.append(safe_paragraph("&bull; " + line_str[2:], bullet_style))
        elif re.match(r'^\d+\.\s+', line_str):
            m = re.match(r'^(\d+\.\s+)(.*)$', line_str)
            flowables.append(safe_paragraph(f"<b>{m.group(1)}</b>{m.group(2)}", bullet_style))
        else:
            flowables.append(safe_paragraph(line_str, body_style))

    if table_buffer:
        flush_table()

    return flowables

def build_proposal_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=15, leading=19,
        textColor=colors.HexColor('#065f46'), alignment=0, spaceAfter=2
    )
    subtitle_style = ParagraphStyle(
        'DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12.5,
        textColor=colors.HexColor('#0f766e'), spaceAfter=4
    )
    meta_style = ParagraphStyle(
        'MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155')
    )
    h2_style = ParagraphStyle(
        'H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=colors.HexColor('#065f46'), spaceBefore=8, spaceAfter=4, keepWithNext=True
    )

    story = []
    story.append(safe_paragraph("NORTH EAST SEVA FIRST INNOVATION CHALLENGE (NESFIC 2026)", subtitle_style))
    story.append(safe_paragraph("STREAM 1 — GOVERNMENT TRACK • OFFICIAL SOLUTION PROPOSAL", title_style))
    story.append(safe_paragraph("<b>NikshayDrishti (Assam TB Sentinel)</b> — AI-Powered TB Risk Stratification & Decision Support", subtitle_style))

    meta_data = [
        [safe_paragraph("<b>Challenge ID:</b> NESFIC-D-30 (Govt Track)", meta_style), safe_paragraph("<b>Department:</b> NHM & State TB Cell, Govt of Assam", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Application Format:</b> USPR Standard Proposal (PDF)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://nikshay-drishti.pages.dev/", meta_style), safe_paragraph("<b>GitHub:</b> github.com/RonHatibaruah/nikshay-drishti-assam", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    prop_md = os.path.join(base_dir, 'proposal_contents.md')
    with open(prop_md) as f:
        content = f.read()

    sections = content.split('## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if 'Field 1:' in sec_title:
            img = os.path.join(img_dir, 'diagram_1_before_after_workflow.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 2:' in sec_title:
            img = os.path.join(img_dir, 'diagram_3_cadastral_anomaly_catalog.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 3:' in sec_title:
            img = os.path.join(img_dir, 'diagram_4_land_health_score_hierarchy.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 4:' in sec_title:
            img = os.path.join(img_dir, 'diagram_2_dual_system_reconciliation.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 5:' in sec_title:
            img = os.path.join(img_dir, 'diagram_5_lat_mandal_mobile_app.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 6:' in sec_title:
            img = os.path.join(img_dir, 'diagram_8_development_roadmap_gantt.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 7:' in sec_title:
            img = os.path.join(img_dir, 'diagram_9_data_pipeline_abdm_tokenization.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 8:' in sec_title:
            img = os.path.join(img_dir, 'diagram_10_team_governance_matrix.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 9:' in sec_title:
            img = os.path.join(img_dir, 'diagram_7_enterprise_system_architecture.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 10:' in sec_title:
            img = os.path.join(img_dir, 'diagram_11_zero_trust_security_cdss_safety.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 11:' in sec_title:
            img = os.path.join(img_dir, 'diagram_6_citizen_land_health_certificate.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif 'Field 12:' in sec_title:
            img = os.path.join(img_dir, 'diagram_12_dual_district_pilot_validation.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {output_path}")

def build_proof_of_work_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=15, leading=19,
        textColor=colors.HexColor('#065f46'), alignment=0, spaceAfter=2
    )
    subtitle_style = ParagraphStyle(
        'DocSub', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=12.5,
        textColor=colors.HexColor('#0f766e'), spaceAfter=4
    )
    meta_style = ParagraphStyle(
        'MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155')
    )
    h2_style = ParagraphStyle(
        'H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14,
        textColor=colors.HexColor('#065f46'), spaceBefore=8, spaceAfter=4, keepWithNext=True
    )

    story = []
    story.append(safe_paragraph("PROOF OF WORK & SOLUTION EVIDENCE DOSSIER", title_style))
    story.append(safe_paragraph("NikshayDrishti (Assam TB Sentinel) — AI Decision Support System", subtitle_style))
    story.append(safe_paragraph("<b>Empirical Machine Learning Benchmarks, SHAP Validation & Prototype Architecture</b>", subtitle_style))

    meta_data = [
        [safe_paragraph("<b>Challenge ID:</b> NESFIC-D-30 (Govt Track)", meta_style), safe_paragraph("<b>Department:</b> NHM & State TB Cell, Govt of Assam", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Format:</b> Solution Evidence (PDF < 10 MB)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://nikshay-drishti.pages.dev/", meta_style), safe_paragraph("<b>Verification Status:</b> Fully Built & Benchmarked", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    pow_md = os.path.join(base_dir, 'proof_of_work_dossier.md')
    with open(pow_md) as f:
        content = f.read()

    sections = content.split('## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0f766e'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if '1. Executive Summary' in sec_title:
            img = os.path.join(img_dir, 'diagram_1_before_after_workflow.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '2. Machine Learning Model Architecture' in sec_title:
            img = os.path.join(img_dir, 'diagram_3_cadastral_anomaly_catalog.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '3. Algorithmic De-Duplication' in sec_title:
            img = os.path.join(img_dir, 'diagram_7_enterprise_system_architecture.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))
        elif '4. Closed-Loop Referral' in sec_title:
            img = os.path.join(img_dir, 'diagram_5_lat_mandal_mobile_app.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275.6))
                story.append(Spacer(1, 5))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {output_path}")

if __name__ == '__main__':
    proposal_pdf = os.path.join(base_dir, 'NESFIC_D30_Proposal_Ron_Hatibaruah.pdf')
    pow_pdf = os.path.join(base_dir, 'NESFIC_D30_Proof_of_Work_Ron_Hatibaruah.pdf')
    
    build_proposal_pdf(proposal_pdf)
    build_proof_of_work_pdf(pow_pdf)
