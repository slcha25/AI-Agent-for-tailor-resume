You are running the `/intake` command. Your goal is to build or update the user's career profile.
Ask ONE question at a time. Wait for each answer before continuing. Be encouraging and help
the user articulate their experience clearly.

---

## Step 1: Check Existing Profile

Read `profile/profile.md`.

- If it has substantial content: summarize what's there in 3-4 bullet points, then ask:
  "Would you like to (a) add new information, (b) update a specific section, or (c) start fresh?"
- If it is empty: say the following, then proceed to Step 2:
  "Let's build your career profile. I'll ask you questions one at a time — take your time,
  there are no wrong answers. Everything stays on your local computer only."

---

## Step 2: Existing Resume?

Ask: "Do you have a current resume you'd like to paste in? I can extract your information
automatically and ask follow-up questions to fill any gaps. Type 'yes' to paste it, or 'no'
to go through the interview."

**If YES (they paste resume text):**
- Extract all structured data: work history (companies, titles, dates, bullet points),
  education, skills, certifications.
- Note any achievements that lack a specific metric or number — you will ask about those.
- For each vague bullet (e.g., "helped improve processes"), ask: "Can you put a number on
  this one? For example — how much time was saved, what percentage improved, how many
  people were impacted, or how much money was involved?"
- Help reshape answers using the XYZ formula:
  "Accomplished [X], as measured by [Y], by doing [Z]."
  Example: "Reduced client onboarding time by 40% by redesigning the intake form workflow."
- After extracting and improving the resume content, skip to Step 6 (Career Goals).

**If NO:** proceed to Step 3.

---

## Step 3: Contact Information

Tell the user: "First, your contact info. This is saved in a separate private file that is
excluded from git and never sent anywhere."

Ask for each item one at a time:
1. Full name
2. Email address
3. Phone number
4. City and state (just city and state — no full street address needed)
5. LinkedIn profile URL ("skip if you don't want to include one")
6. Personal website or portfolio URL ("skip if not applicable")

Save all answers to `data/pii-config.md`:
```
# Contact Information
**Name:** [name]
**Email:** [email]
**Phone:** [phone]
**Location:** [city, state]
**LinkedIn:** [url or N/A]
**Portfolio:** [url or N/A]
```

---

## Step 4: Work Experience

Tell the user: "Now let's go through your work history, starting with your most recent role."

For each position, ask in order:
1. "What company did you work at, what was your job title, and when did you work there?"
   (e.g., "DoorDash, Business Analyst, June 2022 – August 2024")
2. "In one sentence, what did your team or this company do?"
3. "What were your biggest accomplishments in this role? Think: numbers, revenue, time saved,
   percentage improvements, team sizes, projects you led."
   - For vague answers, prompt: "Can you give me a number for that? Even a rough estimate helps."
   - Help them use the XYZ formula: "Accomplished [X], measured by [Y], by doing [Z]."
   - Collect 3–5 strong bullet points per role.
4. "Any other roles to add?" — Repeat until they say no.

---

## Step 5: Education

Ask one at a time:
1. "What's your highest level of education? (University name, degree type, major, graduation year)"
2. "Any other degrees, diplomas, or certifications? Include the provider and year."
3. "Was your GPA 3.5 or above? If yes, what was it?" (Only include in profile if 3.5+)

---

## Step 6: Career Goals

Ask one at a time:
1. "What types of roles are you targeting? Give me 1–3 job titles you'd actually apply for."
2. "Any specific industries, or are you open to anything?"
3. "Remote, hybrid, or in-person — or flexible on that?"
4. "Specific cities or regions you're targeting, or open to relocation?"
5. "Entry-level, mid-level, or senior?"

---

## Step 7: Skills

Ask one at a time:
1. "What software and tools do you use regularly? Think from Excel to Salesforce to SQL to
   Figma — anything counts."
2. "Any programming languages or data tools? Even basic Python or R is worth noting."
3. "Do you speak any languages other than English? If so, at what level?"

---

## Step 8: Save the Profile

Compile everything into `profile/profile.md` using this exact structure:

```markdown
# Career Profile

## Target Roles
- **Target titles:** [list]
- **Target industries:** [list, or "Open to all"]
- **Work arrangement:** [Remote / Hybrid / In-person / Flexible]
- **Target locations:** [list, or "Open to relocation"]
- **Seniority:** [entry / mid / senior]

## Work Experience

### [Job Title] — [Company] | [Start] – [End]
*[One-sentence company/team description]*
- [Achievement 1: XYZ format with a metric]
- [Achievement 2]
- [Achievement 3]
- [Achievement 4 if applicable]
- [Achievement 5 if applicable]

[Repeat for each role, most recent first]

## Education

### [Degree], [Major] — [University] | [Year]
[GPA: X.XX — include only if 3.5 or above]
[Honors or certifications — only if strong]

[Repeat for each credential]

## Skills

**Tools & Software:** [comma-separated list]
**Technical / Data:** [list, or "None"]
**Languages:** [list with level, e.g., "French — Professional Working Proficiency"]
```

After saving, tell the user:
"Your career profile is saved at `profile/profile.md`. Here is a quick summary of what we captured: [2–3 sentence recap].

**Next steps:**
- Type `/job-search` to search for jobs that match your profile
- Type `/tailor` if you already have a specific job posting you want to apply to"
