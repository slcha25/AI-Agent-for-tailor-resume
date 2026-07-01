/**
 * PDF Export Script
 * =================
 * Converts a Markdown resume or cover letter to an ATS-friendly PDF.
 * Visual style matches the Bloomberg resume format:
 *   - Blue section headers
 *   - Right-aligned dates on role lines
 *   - Tight one-page spacing
 *   - Clean Calibri font
 *
 * Usage:
 *   node scripts/export_pdf.js <input.md> <output.pdf>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Dependency check ──────────────────────────────────────────────────────────

function ensureDeps() {
  const missing = [];
  try { require('puppeteer'); } catch { missing.push('puppeteer'); }
  try { require('marked'); } catch { missing.push('marked'); }
  if (missing.length > 0) {
    console.log(`Installing: ${missing.join(', ')} — first install may take 1–2 minutes...`);
    execSync(`npm install ${missing.join(' ')}`, { stdio: 'inherit', cwd: process.cwd() });
  }
}

ensureDeps();

const puppeteer = require('puppeteer');
const { marked } = require('marked');

// ── Pre-process Markdown before parsing ───────────────────────────────────────

function preprocessMarkdown(md) {
  const lines = md.split('\n');
  const out = [];

  for (const line of lines) {
    // Detect role header pattern: ### Title | Company | Date Range
    // The last segment separated by " | " that contains a year is treated as the date
    if (line.startsWith('### ')) {
      const content = line.slice(4);
      const parts = content.split(' | ');

      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1].trim();
        // Check if last segment looks like a date (contains 4-digit year)
        if (/\d{4}/.test(lastPart)) {
          const dateStr = lastPart;
          const rest = parts.slice(0, -1).join(' | ');
          // Emit as a special HTML block (won't be touched by marked)
          out.push(`<div class="role-header"><span class="role-info">${rest}</span><span class="role-date">${dateStr}</span></div>`);
          continue;
        }
      }
      // Fallback: render as normal h3
      out.push(line);
      continue;
    }

    // Detect project header pattern: **Project Name** — tech stack (line starting with **)
    // Leave these for marked to handle — they become <strong> inside <p>
    out.push(line);
  }

  return out.join('\n');
}

// ── CSS — matches Bloomberg resume visual style ───────────────────────────────

const CSS = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.3;
    color: #000000;
    padding: 0.45in 0.55in;
    max-width: 8.5in;
  }

  /* ── Name (h1) ── */
  h1 {
    font-size: 20pt;
    font-weight: 700;
    color: #003087;
    margin-bottom: 2px;
    letter-spacing: 0.01em;
  }

  /* ── Contact line (paragraph immediately after h1) ── */
  h1 + p {
    font-size: 9.5pt;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  /* ── Section headers (h2) — blue with bottom border ── */
  h2 {
    font-size: 10.5pt;
    font-weight: 700;
    color: #0070C0;
    border-bottom: 1.5px solid #0070C0;
    margin-top: 9px;
    margin-bottom: 3px;
    padding-bottom: 1px;
    letter-spacing: 0.03em;
  }

  /* ── Role header row (preprocessed) ── */
  .role-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 5px;
    margin-bottom: 2px;
  }

  .role-info {
    font-weight: 700;
    font-size: 10pt;
    color: #000;
  }

  .role-date {
    font-size: 9.5pt;
    color: #333;
    white-space: nowrap;
    margin-left: 8px;
  }

  /* ── Standard h3 fallback (project names, etc.) ── */
  h3 {
    font-size: 10pt;
    font-weight: 700;
    margin-top: 5px;
    margin-bottom: 2px;
    color: #000;
  }

  /* ── Body paragraphs ── */
  p {
    margin-bottom: 3px;
    font-size: 10pt;
    line-height: 1.3;
  }

  /* ── Bullet lists ── */
  ul {
    margin-left: 13px;
    margin-bottom: 3px;
    margin-top: 1px;
  }

  li {
    margin-bottom: 1.5px;
    font-size: 10pt;
    line-height: 1.3;
  }

  /* ── Bold skill category labels ── */
  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  /* ── Hyperlinks (GitHub, LinkedIn) ── */
  a {
    color: #0070C0;
    text-decoration: none;
  }

  /* ── Horizontal rules (section dividers) ── */
  hr {
    border: none;
    border-top: 0.75px solid #ccc;
    margin: 5px 0;
  }

  /* ── Professional Summary paragraph ── */
  h2:first-of-type + p,
  .summary p {
    font-size: 10pt;
    line-height: 1.4;
  }
`;

// ── Build HTML document ───────────────────────────────────────────────────────

function buildHtml(rawMarkdown) {
  const processedMd = preprocessMarkdown(rawMarkdown);
  const body = marked.parse(processedMd, { gfm: true, breaks: false });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>${CSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

// ── PDF export via puppeteer ──────────────────────────────────────────────────

async function exportPdf(inputPath, outputPath) {
  const markdown = fs.readFileSync(inputPath, 'utf-8');
  const html = buildHtml(markdown);

  // Ensure output directory exists
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: outputPath,
      format: 'Letter',        // US Letter = 8.5 × 11 inches
      printBackground: false,
      margin: {
        top: '0.05in',
        right: '0.05in',
        bottom: '0.05in',
        left: '0.05in'
      }
    });

    console.log(`PDF exported: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

// ── Entry point ───────────────────────────────────────────────────────────────

const [,, inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.log('Usage: node scripts/export_pdf.js <input.md> <output.pdf>');
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Error: File not found: ${inputPath}`);
  process.exit(1);
}

exportPdf(inputPath, outputPath).catch(err => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
