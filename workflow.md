# Career Agent — Workflow Guide & Application Tracker

## How the Pipeline Works

Claude follows this pipeline in order for every job application.
Each step has a clear rule: when to proceed automatically vs. when to STOP and ask the user.

---

### Step-by-Step Pipeline

| Step | Command | What Claude Does | When Claude Stops & Asks |
|------|---------|-----------------|--------------------------|
| **1** | `/intake` | Reads existing `profile/profile.md`. If empty, interviews user to build profile. | Asks one question at a time throughout. Stops before saving — shows draft for confirmation. |
| **2** | `/job-search` | Searches public job board APIs. Fetches up to 10 postings. | Stops after building shortlist — shows list to user, asks: "Which job do you want to target?" |
| **3** | `/tailor` | Fetches job posting → extracts requirements → compares to profile → confirms which experiences to keep → refines resume bullets → drafts cover letter | Stops at 4 points: (a) after showing comparison to confirm experiences, (b) after resume draft to get review/approval, (c) after cover letter draft to get review/approval, (d) asks for final OK before saving |
| **4** | `/ats-score` | Runs local NLP scoring script. Shows score + missing keywords. If score < 0.80: asks if user wants revisions. | Stops after showing score to present options. If revisions requested, updates draft and re-scores. |
| **5** | `/review` | Senior recruiter persona reads job posting + resume + cover letter → produces full professional review | Stops after presenting the review. Asks: "Do you want to make any of these changes, or are you ready to export?" |
| **6** | `/export` | Exports resume + cover letter in one format | Stops first: asks company name + PDF or Word (choose one). Confirms before running. |

---

### Rules for Claude at Every Step

1. **Ask ONE question at a time** — never fire multiple questions in one message
2. **Show before saving** — any draft (resume, cover letter, profile) must be shown to the user and confirmed before being written to a file
3. **Never overwrite approved files** without re-asking
4. **Update the Application Tracker below** after each step completes

---

## Application Tracker

*Claude updates this table after completing each pipeline stage.*

| # | Company | Role | Date Started | Current Stage | ATS Score | Review Verdict | Export Format | Notes |
|---|---------|------|--------------|---------------|-----------|----------------|---------------|-------|
| — | — | — | — | — | — | — | — | Add entries as applications are started |

---

## Tips for Getting the Best Results

- **On `/tailor`:** Claude will show you a comparison table before drafting anything. Review it — if the job is a poor match, it's better to target a different role first.
- **On bullet refinement:** Claude refines your *existing* bullet points to better surface relevant keywords. It does not invent experience you don't have. If a job requires something you don't have, it will flag it as a gap.
- **On the one-page rule:** Tell Claude during `/tailor` which experiences you want to include. With 7 roles in your profile, selection is essential for one-page compliance.
- **On `/review`:** The professional reviewer gives an honest estimate — not an inflated one. A 35% interview probability with specific fixes is more useful than a vague "looks great."
