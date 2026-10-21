import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_path = os.path.join(BASE_DIR, "assets", "docs", "Akash_Mandal_Resume.pdf")
os.makedirs(os.path.dirname(pdf_path), exist_ok=True)

# Tightened margins to fit on 1 page cleanly
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=26,
    rightMargin=26,
    topMargin=22,
    bottomMargin=22
)

styles = getSampleStyleSheet()

style_name = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=20,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#000000')
)

style_contact = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#222222')
)

style_section = ParagraphStyle(
    'SectionStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=12,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#000000'),
    spaceBefore=3,
    spaceAfter=1
)

style_body = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#111111')
)

style_left = ParagraphStyle(
    'LeftStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.8,
    leading=11,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#000000')
)

style_right = ParagraphStyle(
    'RightStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    alignment=TA_RIGHT,
    textColor=colors.HexColor('#333333')
)

style_bullet = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.3,
    leading=10.5,
    leftIndent=10,
    firstLineIndent=-6,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#111111')
)

def create_row(left_html, right_html):
    t = Table([
        [Paragraph(left_html, style_left), Paragraph(right_html, style_right)]
    ], colWidths=[400, 160])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    return t

story = []

# --- HEADER ---
story.append(Paragraph("AKASH MANDAL", style_name))
story.append(Spacer(1, 2))
contact_text = (
    "Shirdi, Maharashtra, India &nbsp;|&nbsp; +91 8668707228 &nbsp;|&nbsp; akashmandal.9490@gmail.com<br/>"
    "<a href='https://www.linkedin.com/in/akash-mandal-8a7277320/'>LinkedIn: akash-mandal</a> &nbsp;|&nbsp; "
    "<a href='https://github.com/Akashmandal08'>GitHub: Akashmandal08</a> &nbsp;|&nbsp; "
    "<a href='https://akashmandal08.github.io/Portfolio/'>Portfolio: akashmandal08.github.io</a>"
)
story.append(Paragraph(contact_text, style_contact))
story.append(Spacer(1, 2))

def add_section_header(title):
    story.append(Paragraph(f"<b>{title.upper()}</b>", style_section))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#000000'), spaceBefore=1, spaceAfter=2))

# --- SUMMARY ---
add_section_header("Professional Summary")
summary_text = (
    "Results-driven B.Tech CSE (AI & DS) student specializing in Python, Machine Learning, Time-Series Forecasting, and LLM Post-Training workflows. Experienced in developing end-to-end ML solutions (PredictiX, Retail Sales Forecasting) and published researcher in JETIR (2025)."
)
story.append(Paragraph(summary_text, style_body))
story.append(Spacer(1, 2))

# --- EXPERIENCE ---
add_section_header("Experience")

# Vaidsys Technologies
story.append(create_row("<b>Vaidsys Technologies</b> &bull; <i>Data Science Intern</i>", "<i>Aug 2026 – Sept 2026 | Remote</i>"))
story.append(Paragraph("&bull; Developed machine learning time-series models for retail sales forecasting and multi-product inventory optimization.", style_bullet))
story.append(Paragraph("&bull; Engineered seasonality, trend, and lag features; achieved &ge;90% accuracy, reducing stockouts by 15% and overstocks by 10%.", style_bullet))
story.append(Spacer(1, 2))

# Ethara AI
story.append(create_row("<b>Ethara AI</b> &bull; <i>LLM Post Training Intern</i>", "<i>Feb 2026 – May 2026 | Gurugram</i>"))
story.append(Paragraph("&bull; Executed data preparation, curation, and quality benchmarks for LLM post-training workflows on Multimango platform.", style_bullet))
story.append(Paragraph("&bull; Collaborated with senior AI engineers to refine data annotation pipelines and dataset quality assurance.", style_bullet))
story.append(Spacer(1, 2))

# JETIR
story.append(create_row("<b>JETIR (Journal of Emerging Technologies & Innovative Research)</b> &bull; <i>Lead Author</i>", "<i>Sept 2025</i>"))
story.append(Paragraph('&bull; Published research: "PredictiX: A Practical Framework for Multi-Disease Prediction using Supervised ML" (Vol 12, Issue 9).', style_bullet))
story.append(Paragraph("&bull; Structured supervised learning pipelines for real-time diagnostic risk assessment and accessible web deployment.", style_bullet))
story.append(Spacer(1, 2))

# --- EDUCATION ---
add_section_header("Education")
story.append(create_row("<b>Sanjivani University</b> &bull; B.Tech Computer Science Engineering (AI & DS) — <b>CGPA: 8.03</b>", "<i>2022 – Present | Maharashtra</i>"))
story.append(create_row("<b>Sai Nirman Junior College</b> &bull; Intermediate (HSC)", "<i>2022 – 2024 | Shirdi</i>"))
story.append(create_row("<b>St. John's English Medium School</b> &bull; Secondary School (SSC)", "<i>2012 – 2022 | Rahata</i>"))
story.append(Spacer(1, 2))

# --- TECHNICAL SKILLS ---
add_section_header("Technical Skills")
skills_text = (
    "<b>Languages:</b> Python, Java, C/C++, SQL &nbsp;|&nbsp; <b>ML & DS:</b> Scikit-learn, Time-Series Forecasting, Pandas, NumPy, Feature Engineering<br/>"
    "<b>Computer Vision:</b> OpenCV, MediaPipe &nbsp;|&nbsp; <b>Tools:</b> Tableau, Git, GitHub, Jupyter, VS Code, Multimango Platform<br/>"
    "<b>Core Concepts:</b> Object-Oriented Programming, Data Structures, Problem Solving, Technical Writing"
)
story.append(Paragraph(skills_text, style_body))
story.append(Spacer(1, 2))

# --- PROJECTS ---
add_section_header("Projects")

# Project 1: Retail Sales Forecasting
story.append(create_row("<b>Retail Sales Forecasting & Inventory Optimization</b> | <i>Python, Scikit-learn, Time-Series</i>", "<i>Vaidsys Internship</i>"))
story.append(Paragraph("&bull; Built predictive forecasting models on retail sales data, achieving &ge;90% accuracy to prevent inventory overstock/stockouts.", style_bullet))
story.append(Spacer(1, 2))

# Project 2: PredictiX
story.append(create_row("<b>PredictiX – Multi-Disease Prediction Web App</b> | <i>Python, Scikit-learn, Pandas</i>", "<i>JETIR Published</i>"))
story.append(Paragraph("&bull; Designed an automated ML classification pipeline with web interface for real-time risk predictions across multiple diseases.", style_bullet))
story.append(Spacer(1, 2))

# Project 3: AI Sign Language Interpreter
story.append(create_row("<b>AI Sign Language Interpreter</b> | <i>Python, OpenCV, MediaPipe</i>", "<i>Computer Vision</i>"))
story.append(Paragraph("&bull; Developed real-time hand gesture landmark tracking and sign-to-text translation system for accessibility.", style_bullet))
story.append(Spacer(1, 2))

# Project 4: Professional Inventory Management System
story.append(create_row("<b>Professional Inventory Management System</b> | <i>Java, OOP</i>", "<i>Desktop System</i>"))
story.append(Paragraph("&bull; Implemented OOP-based stock tracking, dynamic product catalogs, transaction logs, and inventory workflows.", style_bullet))
story.append(Spacer(1, 2))

# Project 5: Consumer Complaint Dashboard
story.append(create_row("<b>Consumer Complaint Dashboard</b> | <i>Tableau, Analytics</i>", "<i>Business Intelligence</i>"))
story.append(Paragraph("&bull; Interactive Tableau dashboard visualizing complaint bottlenecks, resolution SLAs, and operational KPI trends.", style_bullet))
story.append(Spacer(1, 2))

# --- CERTIFICATIONS & ACHIEVEMENTS ---
add_section_header("Certifications & Achievements")
story.append(Paragraph("&bull; <b>Vaidsys Technologies:</b> Certified Data Science Intern (Cert ID: VST0826652)", style_bullet))
story.append(Paragraph("&bull; <b>IBM Career Education:</b> Business Intelligence, DevOps Agile, Data Visualization, Introduction to Python", style_bullet))
story.append(Paragraph("&bull; <b>ISRO / IIRS:</b> Space Technology START 2025 Programme (Score: 85%)", style_bullet))
story.append(Paragraph("&bull; <b>E-Cell IIT Bombay:</b> Illuminate Entrepreneurship Bootcamp &bull; <b>FutureSkills Prime:</b> Digital 101", style_bullet))

doc.build(story)
print("PDF compiled successfully to:", pdf_path)
