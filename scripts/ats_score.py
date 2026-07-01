"""
ATS Scoring Engine
==================
Scores a tailored resume against a job description using TF-IDF cosine similarity.
Based on the methodology from computational linguistics research on resume screening
(cosine similarity of 0.74 ~ recruiter rating of 7.5/10).

Usage:
    python scripts/ats_score.py <job-posting.md> <resume-draft.md>

Example:
    python scripts/ats_score.py applications/stripe-biz-analyst/job-posting.md applications/stripe-biz-analyst/resume-draft.md
"""

import sys
import re
import subprocess

# ── Dependency check ──────────────────────────────────────────────────────────

def ensure_sklearn():
    try:
        import sklearn
    except ImportError:
        print("Installing scikit-learn (required for ATS scoring)...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "scikit-learn", "-q"])

ensure_sklearn()

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ── Text processing ───────────────────────────────────────────────────────────

def load_text(path):
    with open(path, encoding="utf-8") as f:
        return f.read()

def preprocess(text):
    """Strip markdown syntax and normalize for TF-IDF."""
    text = text.lower()
    text = re.sub(r'[#*_`\[\]()\-|>]', ' ', text)   # remove markdown symbols
    text = re.sub(r'https?://\S+', ' ', text)          # remove URLs
    text = re.sub(r'\d{4}[-/]\d{2}[-/]\d{2}', ' ', text)  # remove dates
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# ── Scoring ───────────────────────────────────────────────────────────────────

def score_resume(job_text, resume_text):
    """
    Returns (similarity_score: float, missing_keywords: list[str])
    similarity_score is in [0.0, 1.0] — higher = better keyword alignment.
    """
    job_clean = preprocess(job_text)
    resume_clean = preprocess(resume_text)

    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),   # unigrams + bigrams (catches "data analysis", "cross-functional" etc.)
        stop_words="english",
        min_df=1,
        max_features=5000
    )

    try:
        tfidf_matrix = vectorizer.fit_transform([job_clean, resume_clean])
    except ValueError:
        # Empty document edge case
        return 0.0, []

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

    # Find high-weight JD terms absent from resume
    feature_names = vectorizer.get_feature_names_out()
    job_weights = tfidf_matrix[0].toarray()[0]
    top_indices = job_weights.argsort()[-40:][::-1]
    top_jd_terms = [feature_names[i] for i in top_indices if job_weights[i] > 0.0]

    missing = [t for t in top_jd_terms if t not in resume_clean and len(t) > 3][:12]

    return float(similarity), missing

# ── Scoring rubric ────────────────────────────────────────────────────────────

def interpret(score):
    if score >= 0.80:
        return (
            "EXCELLENT — Interview Ready",
            "Strong keyword alignment. Core hard skills and seniority markers are clearly mirrored.\n"
            "Proceed to export: type /export"
        )
    elif score >= 0.60:
        return (
            "GOOD — Minor Revisions Needed",
            "Moderate alignment. Injecting the missing keywords below into your experience\n"
            "bullets or Professional Summary should push you above the 0.80 threshold."
        )
    elif score >= 0.40:
        return (
            "AVERAGE — High Risk of ATS Rejection",
            "Low keyword density. Most ATS systems would rank this application below the\n"
            "screening threshold before a human reviews it. Recommend rewriting the\n"
            "Professional Summary and recent experience bullets to mirror JD language."
        )
    else:
        return (
            "POOR — Fatal Mismatch or Formatting Issue",
            "Very low overlap. This may indicate a fundamental mismatch between your profile\n"
            "and this role's requirements, or a resume formatting issue. Review manually."
        )

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)

    job_path, resume_path = sys.argv[1], sys.argv[2]

    try:
        job_text = load_text(job_path)
        resume_text = load_text(resume_path)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        print("Make sure you have run /tailor for this job first.")
        sys.exit(1)

    similarity, missing_keywords = score_resume(job_text, resume_text)
    tier_name, action = interpret(similarity)

    divider = "=" * 60
    print(f"\n{divider}")
    print(f"  ATS COMPATIBILITY SCORE: {similarity:.2f} / 1.00")
    print(f"  TIER: {tier_name}")
    print(divider)
    print(f"\n{action}")

    if missing_keywords:
        print(f"\nTOP MISSING KEYWORDS — add these to your resume:")
        for kw in missing_keywords:
            print(f"  - {kw}")
    else:
        print("\nNo critical missing keywords detected.")

    print(f"\n{divider}\n")

if __name__ == "__main__":
    main()
