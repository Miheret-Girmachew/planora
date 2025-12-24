# Planora — Professional Architectural Planner ✨

**A recursive, high-end planning platform built with enterprise SCM discipline.**

---

## 🚀 Overview
Planora is a production-grade planning platform designed and developed under rigorous Software Configuration Management (SCM) principles. The project emphasizes traceability, baseline integrity, and auditable change control while delivering a powerful recursive folder/roadmap editing experience.

---

## 📌 Project Goal
Apply IEEE-grade SCM practices to the software development lifecycle while delivering a robust recursive planning engine and a polished user experience for architects and planning teams.

---

## 👥 SCM Team & Roles
| Name | SCM Role | Technical Responsibility |
|-----:|:--------:|:------------------------|
| Student 1 | Configuration Manager (CM) | Repository owner, release management, maintain `main` branch integrity |
| Student 2 | Infrastructure Lead | CI Register management, Firebase backend, Server Actions |
| Student 3 | Security Architect | Baseline management, Firebase Authentication, Auth UI |
| Student 4 | Core Logic Architect | Versioning control, Recursive Folder Engine, Dashboard UI |
| Student 5 | Documentation Specialist | SCMP (IEEE 828) author, global styles, UX branding |
| Student 6 | QA & Audit Specialist | QA branch owner, PCA/FCA auditing, roadmap synthesis |
| Student 7 | Change Control Lead | CCB secretary, change log management, settings page |

---

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS v4
- **Animations:** Framer Motion (Premium UX Transitions)
- **Backend:** Firebase Firestore (NoSQL), Firebase Auth
- **SCM & CI/CD:** Git, GitHub (Releases/Tags), GitHub Actions

---

## 🌲 Configuration Management Strategy
Planora follows IEEE 828-2012 and Alexis Leon’s Three-Library System to ensure artifact traceability and baseline integrity.

### 1) Branching Model (Enterprise 5-Tier)
- `main` (Production): Official releases and baselines only
- `UAT` (User Acceptance Testing): Final review branch for project lecturer
- `QA` (Quality Assurance): Dedicated branch for PCA/FCA auditing
- `development`: Integration branch where features are unified
- `feat/*`, `fix/*`: Individual development branches for specific tasks

> This hierarchical model protects the product baseline and enforces formal release controls.

### 2) Configuration Identification (CI)
Artifacts use the naming convention: `PLN-[Category]-[Name]-v[Major.Minor]`.
- Example: `PLN-SRC-AuthService-v1.2`
- Categories: `DOC` (Documentation), `SRC` (Source Code), `DB` (Database Schema), `UI` (Design Mockups)

### 3) Change Control Process
- **Submit CR:** Changes start with a formal Change Request (CR) filed by a student
- **Evaluate (CCB):** Configuration Control Board reviews impact and priority
- **Approve:** Approved CRs lead to `fix/` branches and tracked implementations
- **Verify:** QA performs verification before merging to `development`

---

## 📦 Baselines & Releases
- **Baseline 1 — Functional Baseline**
  - Tag: `BL1`
  - Scope: SCMP, CI Register initialized, repo structure, approved requirements
- **Baseline 2 — Product Baseline**
  - Tag: `BL2`
  - Scope: Working dashboard, Recursive Editor, Firebase integration, implemented CRs

**Releases**
- `v1.0` — Initial working system (Auth & Layout)
- `v1.1` — Final system with Synthesis Engine, Dark Mode, Search

---

## 📂 Repository Structure
```
/planora
  ├── /docs          # SCMP, CI Register, CR forms, audit reports
  ├── /src
  │    ├── /app      # Routes & layouts (Next.js App Router)
  │    ├── /features # Modular features (Auth, Folders, Dashboard)
  │    ├── /lib      # Infrastructure & utilities (Firebase, utils)
  │    └── /hooks    # Reusable hooks (real-time listeners)
  ├── /tests         # Functional audit test cases
  └── /releases      # Production build snapshots
```

---

## 🔧 Installation & Development
To replicate the environment baseline locally:

1. Clone the repository
```bash
git clone https://github.com/your-username/planora.git
cd planora
```
2. Install dependencies
```bash
npm install
```
3. Configure environment
- Create `.env.local` and add your Firebase keys (API key, Auth domain, Project ID, etc.)

4. Run development server
```bash
npm run dev
```

---

## 🔍 Audit & Verification
Planora enforces two major audits per SCM principles:
- **PCA (Physical Configuration Audit):** Ensures the Git repo structure matches the CI Register exactly
- **FCA (Functional Configuration Audit):** Verifies every feature (e.g., folder creation, roadmap synthesis) meets functional requirements

Audit artifacts, test cases, CR forms and reports are kept in `/docs` for traceability.

---

## 🤝 Contributing
Follow the SCM workflow:
- Create a CR for any change that affects baselines or production behavior
- Branch from `development` using `feat/*` or `fix/*` naming
- Open PR and request review from assigned CCB or QA owner
- QA validates fixes; only then merge and tag releases

---

## 📞 Contact & Roles
For SCM process inquiries or change control, contact the **Configuration Manager** or **Change Control Lead** listed in the SCM Team table above.

---

## 📝 License
MIT — see `LICENSE` for details.

---

Thank you for contributing to **Planora** — engineered for traceability, baseline integrity, and elegant planning workflows. ✨
