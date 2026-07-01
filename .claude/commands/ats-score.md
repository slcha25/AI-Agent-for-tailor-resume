You are running the `/ats-score` command. Your goal is to score the tailored resume against
the job description using a local Python script, then give specific, actionable feedback.

---

## Step 1: Identify the Application

Ask the user: "Which job application would you like to score? Just give me the company name
(e.g., 'Stripe') and I'll find the folder."

Look in `applications/` for a folder matching that company name. Confirm it contains both:
- `job-posting.md`
- `resume-draft.md`

If either file is missing, stop and say: "Please run `/tailor` for this job first — I need
both the job posting and a resume draft to score against each other."

---

## Step 2: Install scikit-learn if Needed

Run in PowerShell:
```powershell
python -c "import sklearn; print('OK')"
```

If that fails, install it:
```powershell
pip install scikit-learn -q
```

Tell the user: "Checking for the ATS scoring library... [result]"

---

## Step 3: Run the Scoring Script

Run the following PowerShell command, replacing the placeholders with the actual folder name:
```powershell
python scripts/ats_score.py "applications/<company>-<role>/job-posting.md" "applications/<company>-<role>/resume-draft.md"
```

Capture the full output. Do not interpret or paraphrase yet — read the raw score and
missing keywords list from the output first.

---

## Step 4: Interpret and Present Results in Plain English

Present the score clearly, then follow the appropriate action path below:

---

### If score is 0.80 or above — EXCELLENT
"Your resume scores [score] out of 1.00 — strong alignment with the job description.
The core keywords and requirements are well covered.

You are ready to export. Type `/export` to generate your final PDF and Word files."

---

### If score is 0.60–0.79 — GOOD (minor revisions needed)
"Your resume scores [score] out of 1.00 — good alignment, but there are some keywords
from the job description that are missing or underrepresented. Adding them could meaningfully
improve your ATS ranking.

Here are the top missing keywords:
[list them from the script output]

Want me to weave these into your resume draft now? (yes / no)"

If YES:
- Open `applications/<company>-<role>/resume-draft.md`
- Naturally integrate the missing keywords into the Professional Summary and existing
  bullet points — do NOT keyword-stuff or add duplicate bullet points just for keywords
- Save the updated file
- Re-run the scoring script and show the new score
- Tell the user: "Updated resume saved. New score: [X.XX]. [Proceed / Revise further]"

---

### If score is 0.40–0.59 — AVERAGE (high risk of ATS rejection)
"Your resume scores [score] out of 1.00 — the keyword coverage is low enough that most
ATS systems would rank this application below their threshold before a human ever sees it.

The biggest gaps are in: [missing keywords list]

I recommend rewriting the Professional Summary and the bullet points for your most recent
1–2 roles to mirror the job description's language more closely.

Want me to do that rewrite now? (yes / no)"

If YES:
- Rewrite the Professional Summary (3 lines, dense with JD keywords)
- Revise 3–4 bullet points in the most recent role to use exact verbs and terms from JD
- Save the file, re-run the script, show the new score

---

### If score is below 0.39 — POOR (fundamental mismatch or formatting issue)
"Your resume scores [score] out of 1.00. This is very low and suggests one of two things:

1. **Role mismatch:** Your background may not be close enough to this specific role's
   requirements for a strong application. It might be worth prioritizing a different job
   from your shortlist that is a better fit.

2. **Formatting issue:** If `resume-draft.md` looks correct when you open it, the low
   score might reflect formatting problems. Please review the file manually.

I recommend flagging this one for human review before proceeding."

---

## Step 5: Save Feedback

Save the full results to `applications/<company>-<role>/ats-feedback.md`:

```markdown
# ATS Feedback — [Company] [Job Title]
*Scored: [today's date]*

**Score:** [X.XX] / 1.00
**Tier:** [Excellent / Good / Average / Poor]

## Missing Keywords Identified
[list from script output]

## Revisions Made
[Describe what was changed, or "None — score was sufficient to proceed"]

## Recommendation
[Proceed to export / Revise and re-score / Review manually before applying]
```

Tell the user where the feedback file was saved, and what the recommended next step is.
