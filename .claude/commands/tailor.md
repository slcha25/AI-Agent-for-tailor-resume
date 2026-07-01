You are running the `/tailor` command. Work through each step in sequence.
Ask ONE question at a time. Wait for the user's response before continuing.
Use a professional but human tone — write like a real person, not a keyword machine.

---

## CRITICAL PRINCIPLE — REFINE, DO NOT REPLACE

This applies to every resume bullet point you write. Read this before drafting anything.

You are working with the user's REAL experience. Your job is to refine the language of their
existing bullet points to better surface keywords from the job description — not to write new
bullets that replace or contradict what they actually did.

**ALLOWED (refinement):**
- Adjust the opening action verb to match a stronger or more JD-relevant verb (if the meaning is the same)
- Reframe the sentence to lead with the most job-relevant aspect of the work
- Swap a generic term for the JD's preferred terminology IF they describe the same thing
  (e.g., "growth opportunities" → "revenue growth opportunities" — same activity, sharper framing)
- Add a clarifying detail that makes the impact more concrete (only if grounded in the original)

**NOT ALLOWED (fabrication):**
- Adding tools, platforms, or technologies not mentioned in the user's original bullet
- Inflating metrics, team sizes, revenue figures, or scope beyond what was stated
- Writing a bullet point describing work the user did not do
- Inserting methodology names (e.g., "PKL analysis", "A/B testing", "Agile sprints") unless
  they are already in the user's profile or resume

If the job requires something the user does not have → note it as a gap in the comparison.
Do not invent a match. A gap is honest and can be acknowledged in the cover letter.

---

## Step 1: Select the Job

Ask the user: "Which job would you like to tailor your application for?"
- "Tell me the company name and I'll pull it from your shortlist at `applications/shortlist.md`"
- "Paste the full job description text directly into the chat"
- "Give me the URL and I'll fetch it"

Once you have the full job posting content: **read it entirely and carefully before doing anything else.**

Create the application folder: `applications/<company>-<role>/`
(e.g., `applications/stripe-biz-analyst/` — lowercase, hyphens, no spaces)

Save the raw job posting to `applications/<company>-<role>/job-posting.md`.

---

## Step 2: Extract and Categorize Job Requirements

Analyze the full job posting and extract:

**A. Required Technical Skills** — specific tools, software, platforms, frameworks
**B. Key Responsibilities** — what the role actually does day-to-day
**C. Must-Have Qualifications** — years of experience, degree, certifications stated as required
**D. Preferred / Nice-to-Have** — listed as a plus or preferred
**E. Soft Skills & Behaviors** — how the JD describes the ideal person (collaboration style, communication, working under ambiguity, etc.)
**F. ATS Keywords** — exact terms, verbs, and phrases used repeatedly

Save this to `applications/<company>-<role>/keywords.md`.

---

## Step 3: Compare Job Requirements to the User's Profile — Show to User

Read `profile/profile.md` in full. Produce a comparison and show it in the chat.

Format it clearly:

```
COMPARISON: [Job Title] at [Company]
══════════════════════════════════════════════════════

JOB REQUIREMENT                        | MATCH IN YOUR PROFILE
───────────────────────────────────────┼───────────────────────────────────────────────
[Requirement 1]                        | ✓ [Which experience/skill/education covers this]
[Requirement 2]                        | ✓ [Specific match]
[Requirement 3]                        | ~ Partial — [explain briefly]
[Requirement 4]                        | ✗ Gap — not directly in your profile

TOP STRENGTHS FOR THIS ROLE:
• [Top match 1 — specific]
• [Top match 2 — specific]
• [Top match 3 — specific]

GAPS (honest — not a dealbreaker, noted in cover letter):
• [Gap 1]
• [Gap 2 if applicable]
══════════════════════════════════════════════════════
```

After showing the comparison, say:
"This is how your profile maps to this role. Before I draft anything, let me ask which
experiences you want to include — this resume needs to fit on **one page**."

---

## Step 4: Confirm Which Experiences to Include

List every work experience from the profile, numbered, with company and dates.
List every credential (education/certification) lettered.

Then ask:
"Which ones do you want on this resume? You can say the numbers/letters, say 'keep all and
you choose the best fit,' or tell me to leave specific ones out.

Keep in mind: with a one-page limit, 3–4 roles and 2–3 credentials usually work best."

Wait for the user's response.

If the user says "keep all" or "you choose": select the 3–4 most relevant experiences and
2–3 most relevant credentials based on the comparison analysis. Briefly explain your choices
("I'm including X, Y, Z because they directly address requirements A, B, C") and ask:
"Does this selection work for you, or would you like to swap anything?"

Do NOT proceed to drafting until the user explicitly confirms the selection.

---

## Step 5: Research the Company

Use WebSearch and WebFetch. Search for:
"[Company] news 2025 2026", "[Company] Crunchbase", "[Company] Glassdoor",
"[Company] about us", "[Company] product", "[Company] mission"

Gather:
1. What the company does — core product, business model, customers
2. Stage and recent news — funding, headcount, recent launches or milestones
3. Why this role likely exists — based on the JD and company news
4. Culture signals — values, tone of the JD, employee review themes
5. **Three sharp, specific interview questions** the user can ask (not generic)

Save to `applications/<company>-<role>/company-research.md`.

---

## Step 6: Determine Resume Section Order

Based on the job type, decide which section order best positions the user:

- **Tech / Cybersecurity / Engineering roles:** Skills → Technical Projects → Experience → Education
- **Business / Marketing / Analyst roles:** Experience → Skills → Technical Projects (if relevant) → Education
- **Banking / Finance / Operations roles:** Experience → Education → Skills

Tell the user the order you're using and why, in one sentence.

---

## Step 7: Draft the Tailored Resume

Using the confirmed experiences, the keyword analysis, and your comparison from Step 3,
write the resume. **Follow the REFINE NOT REPLACE principle at all times.**

### For each bullet point, follow this process:

1. Take the **original bullet from profile.md**
2. Identify which job requirement(s) it relates to
3. Refine the language:
   - Lead with the job's preferred action verb (if meaning is the same)
   - Surface the most relevant aspect of the work upfront
   - Use the job's preferred terminology where it genuinely applies
   - Keep all facts, tools, metrics, and scope accurate to the original
4. If a bullet has no relevance to this role → drop it (don't force a connection)
5. If a bullet partially matches → refine what's there, don't add what isn't

### Resume Format — Match This Exactly:

```markdown
# [FULL NAME]
[City, State] | [Phone] | [Email] | [LinkedIn URL] | [GitHub URL if applicable]

## Professional Summary
[3–4 line paragraph — NO bullet points. Lead with the most role-relevant aspect of the
user's background. Written from their actual profile materials — not fabricated.
Mirror the job's key terminology naturally. Do not start with "I".]

## Skills
**[Category 1]:** [comma-separated list — mirror JD terminology]
**[Category 2]:** [comma-separated list]
**[Category 3]:** [comma-separated list]

## Technical Projects
[Include this section ONLY if the role values technical/project work — e.g., tech, data, cyber roles.
For purely business/marketing roles, skip this section.]

**[Project Name](GitHub URL)** — [tech stack used]
- [Refined bullet — max 2 bullets per project]

## Professional Experience

### [Job Title] | [Company] | [Start Month Year] – [End Month Year or Present]
- [Refined bullet 1 — starts with action verb from JD]
- [Refined bullet 2 — includes a metric]
- [Refined bullet 3 — shows behavior the JD emphasizes]
[Maximum 3 bullets per role]

[Repeat for each confirmed role, most recent first]

## Education
**[Institution]** — [Program / Degree] | [Year]
[One-line description — keep brief, include only the most relevant coursework if space allows]

[Repeat for each confirmed credential, most recent or most relevant first]
```

### One-Page Enforcement Rules:
- Professional Summary: maximum 4 lines
- Each role: maximum 3 bullets
- Each project: maximum 2 bullets
- Education entries: one line each, no multi-line descriptions unless space allows
- Skills: maximum 4 categories, one line each
- If still too long: tighten language and cut the weakest bullets first — do not shrink important content

### ATS Compliance Rules (always):
- **Single column only** — no tables, no side-by-side layouts
- **Contact info in the body at the very top** — never inside a document header or footer
- **No graphics, icons, decorative symbols, or skill bars**
- **US English spelling** throughout

---

## Step 8: Show Resume Draft for Review — DO NOT SAVE YET

Display the complete resume in the chat using a markdown code block.

Then ask:
"Here is the tailored resume for [Company] — [Role].

Before I save it, please review:
- Does the Professional Summary position you correctly for this role?
- Are all bullet points accurate to your actual experience?
- Is there anything missing, anything to remove, or any wording to adjust?

Say 'looks good' and I'll save it, or tell me what to change."

Wait for the user's response. Make any requested changes and show the updated version.
Repeat until the user confirms. Only then save to `applications/<company>-<role>/resume-draft.md`.

---

## Step 9: Draft the Tailored Cover Letter

Write a cover letter using the company research from Step 5 and the comparison from Step 3.
Do not simply repeat the resume — the cover letter should add new context and demonstrate
genuine knowledge of the company.

### Structure:

**Opening Hook (2–3 sentences):**
Do NOT open with "I am writing to express my interest..." — this is immediately generic.
Open with a specific, quantified achievement connected to the company's core business challenge
or a recent development you found in research.

**Evidence — Paragraph 1:**
One real anecdote from the user's work history that maps to a primary JD requirement.
3–4 sentences. Use JD-relevant language naturally — not stuffed.

**Evidence — Paragraph 2:**
A second anecdote covering a different JD requirement. No overlap with Paragraph 1.
3–4 sentences.

**Company Alignment (1 paragraph):**
One concrete piece of company research — a product launch, a strategic initiative, a value
clearly stated in the JD — proving this is a tailored application. 2–3 sentences.

**Closing (2–3 sentences):**
Confident, forward-looking. Skip "I look forward to hearing from you."
State specifically what you would contribute to this team.

**Tone rules:**
- Confident but not arrogant. Human but professional.
- No adverbs ("incredibly passionate", "highly motivated")
- No clichés ("team player", "self-starter", "detail-oriented")
- Max 4 sentences per paragraph. Under 350 words total.

---

## Step 10: Show Cover Letter for Review — DO NOT SAVE YET

Display the full cover letter in the chat.

Ask:
"Here is the cover letter draft.

Before I save it:
- Does the opening hook feel like the right first impression?
- Do the two evidence paragraphs feel true to your experience?
- Does the company section show enough research?

Say 'looks good' to save, or tell me what to adjust."

Make any requested changes, show the updated version, and repeat until confirmed.
Then save to `applications/<company>-<role>/cover-letter-draft.md`.

---

## Step 11: Update the Workflow Tracker

Open `workflow.md`. Find the Application Tracker table. Add or update a row for this application:

| [#] | [Company] | [Role] | [today's date] | Tailored — ready for /ats-score | — | — | — | — |

---

## Step 12: Confirm Completion

Tell the user:
"Both documents are saved in `applications/<company>-<role>/`:
- `resume-draft.md` — tailored resume
- `cover-letter-draft.md` — tailored cover letter
- `keywords.md` — ATS keyword extraction
- `company-research.md` — company briefing + 3 interview questions

**Suggested next steps in order:**
1. Type `/ats-score` — score the resume against this job description
2. Type `/review` — get a professional recruiter's assessment before finalizing
3. Type `/export` — generate your PDF or Word file when ready"
