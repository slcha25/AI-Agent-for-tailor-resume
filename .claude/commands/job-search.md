You are running the `/job-search` command. Your goal is to find job postings that match the
user's career profile and save a reviewed shortlist for them to pick from.

---

## Step 1: Load the Profile

Read `profile/profile.md`. Extract:
- Target job titles
- Target industries
- Work arrangement preference (remote / hybrid / in-person / flexible)
- Target locations or regions
- Seniority level

If `profile/profile.md` is empty, stop immediately and say:
"Please run `/intake` first so I know what kinds of roles to search for."

---

## Step 2: Confirm Search Parameters

Summarize what you found from the profile in one sentence. Then ask:
"Does this look right for today's search, or would you like to adjust anything — such as
focusing on a specific title, adding a company, or narrowing the location?"

Wait for their response. Apply any adjustments.

Then ask: "Do you have any specific companies you'd love to work at? If so, name them and
I'll check their job boards directly."

---

## Step 3: Search Job Sources

Use your WebFetch and WebSearch tools to search the following sources. Try them in order.

### Source A: Public ATS Endpoints (for named target companies — no API key needed)

For each company the user named, attempt these endpoints in order:

**Greenhouse:**
Fetch `https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true`
Common slugs: doordash, stripe, airbnb, coinbase, figma, notion, linear, robinhood, scale-ai

**Lever:**
Fetch `https://api.lever.co/v0/postings/{slug}?mode=json`

**Ashby** (used by many US startups — Ramp, Brex, Rippling, Linear):
Fetch `https://api.ashbyhq.com/posting-api/job-board/{slug}?includeCompensation=true`

For each response: parse the JSON and filter for job titles that match the user's targets.
If a company is on none of these, note it and fall back to a web search for that company's
careers page.

### Source B: RemoteOK (best for remote tech/startup roles — public, no key)

Fetch: `https://remoteok.com/api`
Filter results where `position` or `tags` match the user's target titles.
Focus on entries tagged with "USA" or "Worldwide" location.

### Source C: We Work Remotely (best for remote roles — public RSS)

Fetch: `https://weworkremotely.com/remote-jobs.rss`
Parse the RSS XML and filter entries matching target titles.

### Source D: General Web Search (fallback)

Use WebSearch with queries like:
- "[job title] jobs [city or 'remote'] 2026 site:greenhouse.io OR site:lever.co OR site:ashbyhq.com"
- "[job title] [industry] jobs [location] 2026"

DO NOT attempt to scrape LinkedIn or Indeed — these violate their Terms of Service.

---

## Step 4: Save the Shortlist

Create or overwrite `applications/shortlist.md` with up to 10 postings, sorted by relevance.
Use this format for each entry:

```markdown
# Job Search Shortlist
*Last updated: [today's date]*

---

## [Company Name] — [Job Title]
- **Source:** [Greenhouse / Lever / Ashby / RemoteOK / We Work Remotely / Web Search]
- **Location:** [City, State / Remote / Hybrid]
- **Posting URL:** [url]
- **Compensation:** [range if listed, or "Not disclosed"]
- **Key Requirements (top 5):**
  - [requirement 1]
  - [requirement 2]
  - [requirement 3]
  - [requirement 4]
  - [requirement 5]
- **Why It Matches Your Profile:** [1–2 sentences on fit]
- **Status:** Not started

---
```

---

## Step 5: Present Results

Tell the user:
- How many postings you found total
- A 1-sentence description of the top 3 matches and why they match well

Then say:
"The full shortlist is saved at `applications/shortlist.md`. Review it and pick the role
you want to apply to first.

When you're ready, type `/tailor` and tell me the company name — I'll extract the keywords,
research the company, and draft your tailored resume and cover letter."
