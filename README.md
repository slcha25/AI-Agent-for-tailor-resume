<div align="center">

# 🤖 AI Job Search & Resume Tailoring Agent

**A personal AI agent that handles your entire job application pipeline —
from finding the right roles to submitting a polished, ATS-ready resume.**

![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=flat-square&logo=python&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Claude Code](https://img.shields.io/badge/Powered_by-Claude_Code-D97706?style=flat-square&logo=anthropic&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Mac-lightgrey?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

*Built by **Sandra Chan** · [LinkedIn](https://linkedin.com/in/sok-chan) · [GitHub](https://github.com/slcha25)*

</div>

---

## 💡 Why I Built This

Job hunting is a full-time job on its own. Every application needs a rewritten resume, the right keywords to pass automated screening systems, company research before interviews, and a cover letter that doesn't look like a template you found online.

I built this agent to handle all of that in one place — so I can spend less time formatting documents and more time preparing for interviews. It stops and asks for my input at every important decision. Nothing gets saved or submitted without my approval.

---

## ✨ Features at a Glance

| | Feature |
|---|---------|
| ✅ | Searches real job postings via public APIs — no scraping, no ToS violations |
| ✅ | Builds a career profile through a guided interview or by parsing your existing resume |
| ✅ | Shows a side-by-side comparison of job requirements vs. your background before drafting anything |
| ✅ | Refines your **actual** experience to surface the right keywords — never fabricates or exaggerates |
| ✅ | Scores your resume with a local ATS keyword engine — no paid service needed |
| ✅ | Gives a professional recruiter assessment with an honest interview probability estimate |
| ✅ | Exports to PDF or Word with a clean, professional one-page layout |
| ✅ | All data stays on your local machine — nothing personal is uploaded anywhere |

---

## 🔄 The Full Pipeline

```
  ╔══════════════════════════════════════════════════════════════════╗
  ║                   COMPLETE PIPELINE — 6 STEPS                   ║
  ╚══════════════════════════════════════════════════════════════════╝

   📋 /intake        →   Build your career profile (once, reused forever)
         │
         ▼
   🔍 /job-search    →   Search public job board APIs for matching roles
         │
         ▼
   ✍️  /tailor        →   Compare job to your profile → you choose which
         │               experiences to include → refine bullets →
         │               you review & approve resume + cover letter
         ▼
   📊 /ats-score     →   Local keyword match score (0.00 – 1.00)
         │               with specific feedback if score is low
         ▼
   🏆 /review        →   Senior recruiter assessment: strengths,
         │               red flags, interview probability %, verdict
         ▼
   📤 /export        →   Export as PDF or Word — you pick one
```

> 💬 **Every step where you make a decision, the agent stops and waits for you. Nothing moves forward without your approval.**

---

## 🚀 Getting Started

### Prerequisites

| Tool | Purpose | Where to Get It |
|------|---------|-----------------|
| VS Code | The editor the agent runs inside | [code.visualstudio.com](https://code.visualstudio.com) |
| Claude Code extension | The AI chat interface inside VS Code | Extensions panel → search "Claude Code" |
| Claude Pro subscription | Powers the AI | [claude.ai](https://claude.ai) |
| Python 3.x | Runs ATS scoring + Word export scripts | [python.org](https://python.org) |
| Node.js 18+ | Runs the PDF export script | [nodejs.org](https://nodejs.org) |

### Quick Start

```bash
# 1. Clone the repo and open in VS Code
git clone https://github.com/slcha25/AI-Agent-for-tailor-resume.git
cd AI-Agent-for-tailor-resume

# 2. Open VS Code and start a Claude Code session
# 3. Type your first command in the chat panel
/intake
```

> 💬 **First time?** Start with `/intake`. It takes about 10 minutes and only needs to be done once. After that, jump straight to `/job-search` or `/tailor` for every new application.

---

## 📖 Step-by-Step Guide

### 📋 `/intake` — Build Your Career Profile

The agent interviews you about your work history, skills, education, and target roles — one question at a time. If you already have a resume, paste it into the chat and the agent will extract everything automatically, then ask follow-up questions to fill any gaps.

Everything is saved locally to `profile/profile.md`. This is the agent's permanent memory — every other step reads from it. It only needs to be built once and can be updated anytime.

---

### 🔍 `/job-search` — Find Matching Job Postings

The agent searches public job board APIs and returns a shortlist of up to 10 relevant roles. You review the list and choose which one to target next.

**Job sources the agent uses:**

| Source | Type | Best For |
|--------|------|----------|
| Greenhouse, Lever, Ashby | Public company ATS APIs (no login needed) | US tech & startup companies |
| RemoteOK | Public JSON feed | Remote tech roles |
| We Work Remotely | Public RSS feed | Remote-first positions |
| Adzuna | Official developer API — free tier (250 req/day) | Broad US job market |

> ⚠️ **Not used:** LinkedIn, Indeed, or Glassdoor. All three prohibit automated data collection in their Terms of Service. The agent only uses sources it can access without violating platform rules.

---

### ✍️ `/tailor` — Tailor Your Resume and Cover Letter

This is the core step. Here is exactly what happens, in order:

**① Read the full job posting first**
The agent reads the entire job description before doing anything else.

**② Show you a comparison table**
Before drafting anything, you see a clear comparison of which requirements match your profile, which are partial, and which are genuine gaps.

```
JOB REQUIREMENT                  | YOUR PROFILE
─────────────────────────────────┼──────────────────────────────────────
Data analysis (Google Analytics) | ✓  Breaking Games externship
Cross-functional collaboration   | ✓  Collaborated with PMs on budget
Python / SQL                     | ✓  Listed in skills + externship
Marketing attribution modelling  | ✗  Gap — will note in cover letter
```

**③ You choose which experiences to include**
You have full control over what goes on this resume. With a one-page target, selection matters — not every role needs the same experience on it.

**④ It refines your existing bullet points — not replaces them**
The agent takes your real experience and adjusts the language to surface the most relevant keywords from the job description. It does not invent skills, add tools you didn't use, or inflate your results. Gaps are flagged honestly, not papered over.

**⑤ You review before anything is saved**
The full resume and cover letter appear in the chat. You give feedback, changes are made, you approve — only then does the file get saved.

---

### 📊 `/ats-score` — Check Your Keyword Match

Most large employers filter resumes automatically before a human ever reads them. The agent scores your tailored resume against the job description using a local Python script — no paid third-party service needed.

| Score | Tier | What Happens Next |
|-------|------|-------------------|
| 0.80 – 1.00 | 🟢 Excellent | Move to professional review |
| 0.60 – 0.79 | 🟡 Good | Agent suggests specific missing keywords to add |
| 0.40 – 0.59 | 🟠 Average — at risk | Agent proposes targeted rewrites |
| Below 0.40 | 🔴 Poor match | Flagged for your review — possible role mismatch |

> 🔒 Runs entirely on your local machine using TF-IDF cosine similarity. No data is sent to any external service.

---

### 🏆 `/review` — Professional Recruiter Assessment

After scoring, the agent takes on the persona of a senior recruiter with 10+ years of hiring experience and reviews your full application. It produces a structured report:

```
① ATS Screening Result     —  Pass / Borderline / Fail
② Experience Match         —  Requirement by requirement, honest assessment
③ Resume Narrative         —  Does the Professional Summary position you correctly?
④ Cover Letter             —  Does it add value, or just repeat the resume?
⑤ Strengths                —  What is working in your favor
⑥ Red Flags                —  What could get you screened out (no sugarcoating)
⑦ Interview Probability    —  Realistic % estimate with clear reasoning
⑧ Verdict                  —  Ready to Submit / Revise First / Major Rework
⑨ Priority Recommendations —  Ranked: 🔴 High Impact / 🟡 Medium / 🟢 Nice to Have
```

After the review, you decide whether to make changes or move straight to export.

---

### 📤 `/export` — Generate Your Final Documents

You choose one format. The agent exports both your resume and cover letter in that format.

| Format | Best For |
|--------|----------|
| **PDF** | Most online application portals, email attachments |
| **Word (.docx)** | Portals that specifically require a Word file upload |

> 📄 PDFs are generated using headless Chrome (Puppeteer), so they contain **real selectable text** — not a flat image. ATS systems can read and parse them properly.

If you need the other format later, run `/export` again and choose the alternative.

---

## 📁 Project Structure

```
AI-Agent-for-tailor-resume/
│
├── 📄 CLAUDE.md                      ← Agent rules & pipeline map (auto-loaded every session)
├── 📄 workflow.md                    ← Pipeline guide + application status tracker
├── 📄 README.md
│
├── 📁 profile/                       ← 🔒 Local only — not tracked by git
│   └── profile.md                    ← Your career history (built by /intake)
│
├── 📁 data/                          ← 🔒 Local only — not tracked by git
│   └── pii-config.md                 ← Contact info: name, phone, email
│
├── 📁 applications/                  ← One folder per job application
│   └── <company>-<role>/
│       ├── job-posting.md
│       ├── keywords.md
│       ├── company-research.md
│       ├── resume-draft.md
│       ├── cover-letter-draft.md
│       └── ats-feedback.md
│
├── 📁 exports/                       ← 🔒 Local only — not tracked by git
│   └── <company>-<role>/
│       ├── resume.pdf / resume.docx
│       └── cover-letter.pdf / cover-letter.docx
│
├── 📁 scripts/
│   ├── ats_score.py                  ← ATS keyword scoring engine (Python + scikit-learn)
│   ├── export_pdf.js                 ← PDF renderer (Node.js + Puppeteer)
│   └── export_docx.py               ← Word document builder (Python + python-docx)
│
└── 📁 .claude/commands/
    ├── intake.md                     ← /intake instructions
    ├── job-search.md                 ← /job-search instructions
    ├── tailor.md                     ← /tailor instructions
    ├── ats-score.md                  ← /ats-score instructions
    ├── review.md                     ← /review instructions
    └── export.md                     ← /export instructions
```

---

## 🧰 Dependencies — Installed Automatically

You do **not** need to install these manually. Each command checks for what it needs and installs it on first run.

| Library | Installed When | What It Does |
|---------|---------------|--------------|
| `scikit-learn` | First `/ats-score` run | TF-IDF vectorization + cosine similarity scoring |
| `puppeteer` | First `/export` → PDF | Headless Chrome for PDF rendering |
| `marked` | First `/export` → PDF | Converts Markdown to HTML before rendering |
| `python-docx` | First `/export` → Word | Builds native .docx files in OpenXML format |

> ⏱️ **Note:** The first PDF export downloads a sandboxed Chrome browser (~300MB). This happens once and takes 1–2 minutes. Every export after that is fast.

---

## 🔧 Technical Stack

| Component | Technology | Why This Was Chosen |
|-----------|-----------|---------------------|
| AI Agent Interface | Claude Code (Anthropic) | Reads `CLAUDE.md` every session; runs custom slash commands |
| Agent Instructions | Markdown (`.claude/commands/`) | Plain English — readable and editable without coding |
| ATS Scoring | Python + scikit-learn | Local TF-IDF cosine similarity — free, private, no API needed |
| PDF Export | Node.js + Puppeteer + marked | Chrome rendering produces selectable, ATS-readable text |
| Word Export | Python + python-docx | Native OpenXML — compatible with all major ATS parsers |
| Job Search | Greenhouse / Lever / Ashby APIs, RemoteOK, We Work Remotely | Public endpoints — no ToS violations, no login required |

---

## 💡 Resume Tailoring Philosophy — Refine, Not Replace

The number one rule this agent follows: **it only works with what you actually did.**

When tailoring a resume, the agent refines your existing bullet points to surface the most relevant keywords from the job description. It does not write new bullets for experience you don't have, add tools you didn't use, or inflate your results.

**Here's what refinement looks like:**

> **Original bullet:**
> *"Analyzed key performance metrics across Google Analytics, Meta Ads Manager, and Shopify to evaluate campaign effectiveness and identify growth opportunities"*
>
> **Refined for a Marketing Analyst role:**
> *"Analyzed cross-platform campaign performance across Google Analytics, Meta Ads Manager, and Shopify to surface data-driven marketing insights and identify revenue growth opportunities"*

Same experience. Stronger framing. Completely honest.

If a job requires something you genuinely don't have, the agent flags it as a gap in the comparison table — and the cover letter addresses it directly rather than pretending it doesn't exist.

---

## 🔒 Privacy & Data Safety

- All personal data (resume content, contact info, work history) **stays on your local machine**
- `profile/`, `data/`, and `exports/` are excluded from git via `.gitignore` — they will **never** be pushed to GitHub
- The agent never sends your name, phone, email, or salary to any external API
- Job search queries use only anonymized skills and role titles — not personal details

---

## 👤 About

**Sandra Chan** is a data and cybersecurity analyst with a background in economics, full-stack development, and financial services. She built this agent to solve her own job search problem — and open-sourced it so others can use it too.

- 🔗 [linkedin.com/in/sok-chan](https://linkedin.com/in/sok-chan)
- 💻 [github.com/slcha25](https://github.com/slcha25)

---

<div align="center">

*Built with Claude Code · Python · Node.js*

*© 2026 Sandra Chan*

</div>
