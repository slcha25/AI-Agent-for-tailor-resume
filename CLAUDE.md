# Career Agent — Project Briefing

## Who You Are Working With
This is a personal AI career agent for a non-technical user with a business background.
Communicate in plain English. Explain what you are doing at each step. No jargon assumed.
Never use filler phrases like "Certainly!" or "Great question!" — be direct and concise.

## Agent Objective
Automate the US job search and application pipeline:
**Profile Build → Job Discovery → Company Research → Resume & Cover Letter Tailoring → ATS Scoring → Document Export**

The user's career data stays local on their computer at all times. Nothing personal is uploaded
to third-party services.

---

## Environment
| Tool | Status | Call as |
|------|--------|---------|
| Python 3.14 | Installed | `python` |
| Node.js 24 | Installed | `node` / `npm` |
| Pandoc | NOT installed | — use scripts instead |
| Shell | PowerShell (primary) | Use PowerShell syntax for all commands |

**PDF export:** use `scripts/export_pdf.js` (puppeteer — install via `npm install puppeteer`)
**Word export:** use `scripts/export_docx.py` (python-docx — install via `pip install python-docx`)

---

## Directory Layout
```
extern-workshop/
├── CLAUDE.md                        ← project rules (this file)
├── CLAUDE.local.md                  ← API keys — gitignored, never commit
├── profile/
│   └── profile.md                   ← master career history (never overwrite without explicit user approval)
├── data/
│   └── pii-config.md                ← contact info & salary targets — gitignored
├── applications/
│   └── <company>-<role>/
│       ├── job-posting.md           ← raw job description
│       ├── keywords.md              ← extracted ATS keywords
│       ├── company-research.md      ← pre-interview briefing
│       ├── resume-draft.md          ← tailored resume
│       ├── cover-letter-draft.md    ← tailored cover letter
│       └── ats-feedback.md          ← scoring results and revision notes
└── exports/
    └── <company>-<role>/            ← final PDF and DOCX files — gitignored
        ├── resume.pdf / resume.docx
        └── cover-letter.pdf / cover-letter.docx
```

**Supporting scripts** (pre-written, do not modify):
- `scripts/ats_score.py` — ATS keyword matching engine
- `scripts/export_pdf.js` — PDF renderer via headless Chrome
- `scripts/export_docx.py` — Word document builder

---

## Pipeline Skills (Custom Slash Commands)
Type these in the Claude Code chat to run each stage. See `workflow.md` for the full
pipeline guide and application status tracker.

| Stage | Command | What It Does | Stops & Asks User |
|-------|---------|--------------|-------------------|
| 1 | `/intake` | Interviews user or parses pasted resume → builds `profile/profile.md` | After each question; before saving profile |
| 2 | `/job-search` | Queries Greenhouse/Lever/Ashby/RemoteOK/WeWorkRemotely APIs → shortlist | After showing shortlist — "which job to target?" |
| 3 | `/tailor` | Compares job to profile → confirms which experiences to keep → refines bullets → drafts resume + cover letter | 3× stops: experience selection, resume review, cover letter review |
| 4 | `/ats-score` | Runs local TF-IDF keyword scoring → feedback and optional revisions | After showing score — "revise now or proceed?" |
| 5 | `/review` | Senior recruiter persona: ATS check, experience match, red flags, interview probability estimate, verdict | After showing full review — "make changes or export?" |
| 6 | `/export` | Exports resume + cover letter to PDF **or** Word (user picks one) | Asks company name + format choice before running |

**After every `/tailor` completion:** Claude updates the Application Tracker table in `workflow.md`.

---

## Absolute Constraints — Never Violate These

### Data & Privacy
- NEVER overwrite `profile/profile.md` without the user explicitly saying "yes, go ahead"
- NEVER scrape LinkedIn or Indeed — banned under their Terms of Service; accounts get permanently banned
- NEVER send the user's name, phone number, email, address, or salary to any third-party API
- API payloads should contain only anonymized skills arrays and job titles

### Resume Formatting (ATS Compliance)
- NEVER use tables, text boxes, or multi-column layouts in resumes — ATS parsers read left-to-right and will scramble columns
- NEVER place contact information inside document headers or footers — ATS tools frequently skip these zones
- NEVER use icons, graphics, or visual skill-rating bars — ATS parsers render these as junk characters
- ALWAYS write resumes in single-column Markdown
- ALWAYS keep resumes to ONE page for entry/mid-level candidates (under 10 years experience); maximum TWO pages for senior
- ALWAYS use US English spelling (e.g., "organized" not "organised")
- ALWAYS export PDFs at US Letter size (8.5" × 11"), not A4

### Pipeline Behavior
- ALWAYS stop and ask for explicit user confirmation before running the `/export` command
- ALWAYS tell the user what was created and what the next command to type is after completing each stage
- When asking for information, ask ONE question at a time and wait for the answer

---

## Job Search Sources (ranked by reliability)
1. **Public ATS endpoints** — Greenhouse, Lever, Ashby (no API key, best for named target companies)
2. **RemoteOK** — `https://remoteok.com/api` (public JSON, no key, best for remote tech roles)
3. **We Work Remotely** — `https://weworkremotely.com/remote-jobs.rss` (public RSS, no key)
4. **Adzuna US** — REST API (free tier 250 req/day; store App ID + Key in `CLAUDE.local.md`)
5. **Web search** — fallback for general discovery via WebSearch tool
- DO NOT attempt to scrape LinkedIn, Indeed, or Glassdoor job listings
