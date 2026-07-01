You are running the `/export` command. Your goal is to convert the confirmed resume and
cover letter into a single file format chosen by the user — either PDF or Word, not both.

---

## Step 1: Confirm Before Doing Anything

Ask the user:

"Before I export, a few quick checks:
1. Which application are we exporting? (company name)
2. Have you already reviewed and confirmed both `resume-draft.md` and `cover-letter-draft.md`
   via the `/tailor` command? (If not, run `/tailor` first — it will show you drafts to review
   before saving them.)
3. **Which format do you want?**
   - Type **PDF** — best for most online application portals and email attachments
   - Type **Word** — use this if the portal specifically asks for a .docx file

When you're ready, confirm with the company name and your format choice."

Wait for the user's response. Do not proceed until you have both the company name and the format choice.

---

## Step 2: Identify Files

Locate:
- `applications/<company>-<role>/resume-draft.md`
- `applications/<company>-<role>/cover-letter-draft.md`
- Output directory: `exports/<company>-<role>/`

Create the output directory:
```powershell
New-Item -ItemType Directory -Force -Path "exports/<company>-<role>"
```

---

## Step 3: Install Only the Needed Dependency

### If the user chose PDF:

Check for puppeteer and marked:
```powershell
node -e "require('puppeteer'); require('marked'); print('OK')" 2>&1
```
If either is missing:
```powershell
npm install puppeteer marked
```
Tell the user: "Installing the PDF renderer. On first install, this downloads a small sandboxed
Chrome browser (~300MB) — this only happens once and may take 1–2 minutes."

### If the user chose Word:

Check for python-docx:
```powershell
python -c "import docx; print('OK')" 2>&1
```
If missing:
```powershell
pip install python-docx -q
```

---

## Step 4: Export Resume

### If PDF:
```powershell
node scripts/export_pdf.js "applications/<company>-<role>/resume-draft.md" "exports/<company>-<role>/resume.pdf"
```

### If Word:
```powershell
python scripts/export_docx.py "applications/<company>-<role>/resume-draft.md" "exports/<company>-<role>/resume.docx"
```

---

## Step 5: Export Cover Letter

### If PDF:
```powershell
node scripts/export_pdf.js "applications/<company>-<role>/cover-letter-draft.md" "exports/<company>-<role>/cover-letter.pdf"
```

### If Word:
```powershell
python scripts/export_docx.py "applications/<company>-<role>/cover-letter-draft.md" "exports/<company>-<role>/cover-letter.docx"
```

---

## Step 6: Confirm Completion

After both files are created, tell the user:

**If PDF:**
"Export complete. Your files are in `exports/<company>-<role>/`:
- **resume.pdf**
- **cover-letter.pdf**

PDFs contain real selectable text (not a flat image), so they are fully readable by ATS
systems. Use these for online application portals and email submissions."

**If Word:**
"Export complete. Your files are in `exports/<company>-<role>/`:
- **resume.docx**
- **cover-letter.docx**

These are native Word files — use them when the application portal specifically asks for
a .docx upload."

---

**If the user later wants the other format too:**
They can run `/export` again and choose the alternative format. The drafts in
`applications/<company>-<role>/` are still there and will be used again.
