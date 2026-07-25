# Akash Mandal — Developer Portfolio Website

A state-of-the-art, high-performance portfolio website built for **Akash Mandal** (B.Tech CSE - AI & DS student, Published ML Researcher in JETIR, and LLM Post-Training Intern at Ethara AI). Built using **AntiGravity IDE** and ready for instant deployment to **GitHub Pages**.

---

## 🚀 Key Highlights & Content

- **Modern Glassmorphic Dark UI**: Custom CSS variables, smooth cyan/indigo gradients, floating stats, and responsive drawer navigation.
- **Interactive Ambient Canvas**: Custom particle mesh system in vanilla JS (`js/particles.js`).
- **Featured Research Publication**: Showcases the JETIR (2025) paper *"PredictiX: A Practical Framework for Multi-Disease Prediction using Supervised Machine Learning"* with a direct link (`http://www.jetir.org/view?paper=JETIR2509375`).
- **Industry Experience**: Highlighted LLM Post Training Internship at Ethara AI (Multimango data annotation, data curation, and model evaluation).
- **IBM Certifications Gallery**: Interactive cards & verification detail modal for all 4 IBM Career Education Program certificates (Business Intelligence, DevOps Agile & Design Thinking, Data Visualisation, Introduction to Python).
- **Filterable Projects Grid**: Category-based filtering for *PredictiX*, *AI Sign Language Interpreter*, *Inventory Management System*, and *Consumer Complaint Dashboard*.

---

## 🛠️ Project Structure

```
i:/Portfolio_1/
├── index.html                  # Main application markup & semantic SEO tags
├── css/
│   ├── styles.css              # Core design tokens, dark palette, glassmorphism
│   └── components.css          # Cards, hero, buttons, timeline, modals, contact form
├── js/
│   ├── main.js                 # Dynamic typewriter, project filters, modal & scroll spy
│   └── particles.js            # Ambient canvas mesh particle system
├── assets/
│   ├── images/                 # Project preview mockups & certificate badges
│   └── docs/                   # Resume and reference documents
├── .github/
│   └── workflows/
│       └── static.yml          # Automated GitHub Actions workflow for Pages deployment
└── README.md                   # Setup & deployment documentation
```

---

## 🌐 Deploying to GitHub Pages (Free Hosting)

### Method 1: Using GitHub Pages Repository Settings (Easiest)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Akash Mandal portfolio"
   git branch -M main
   git remote add origin https://github.com/Akashmandal08/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/Akashmandal08/portfolio`
   - Click **Settings** -> **Pages** (on the left menu).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.

3. **Access Your Live Site**:
   - Within 1-2 minutes, your site will be live at:
   - `https://Akashmandal08.github.io/portfolio/` (or `https://Akashmandal08.github.io` if named `Akashmandal08.github.io`).

---

### Method 2: Using GitHub Actions (Automated CI/CD)

The repository includes `.github/workflows/static.yml`. To enable automated deployment:
1. In your repository on GitHub, go to **Settings** -> **Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Every push to the `main` branch will automatically trigger a build and publish your site!

---

## 💻 Local Testing & Development

To preview the portfolio locally, you can use any static server or Python HTTP server:

```bash
# Using Python
python -m http.server 8000

# Or using Node npx serve
npx serve .
```

Open `http://localhost:8000` in your browser.
