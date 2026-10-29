import re
import json
from pathlib import Path

data_file = Path("data.js")
content = data_file.read_text(encoding="utf-8")

# Let's extract all Grade 5 quiz items
g5_match = re.search(r"const GRADE_5_ISLANDS = (\[[\s\S]*?\n\];)", content)
if not g5_match:
    print("Could not find GRADE_5_ISLANDS")
    exit(1)

g5_text = g5_match.group(1)

# Find all intros, praises, corrections
intros = re.findall(r'teacherIntro:\s*"([^"]+)"', g5_text)
praises = re.findall(r'teacherPraise:\s*"([^"]+)"', g5_text)
corrections = re.findall(r'teacherCorrection:\s*"([^"]+)"', g5_text)
questions = re.findall(r'question:\s*"([^"]+)"', g5_text)

print(f"GRADE 5 items found:")
print(f"- Teacher Intros: {len(intros)}")
print(f"- Teacher Praises: {len(praises)}")
print(f"- Teacher Corrections: {len(corrections)}")
print(f"- Questions: {len(questions)}")

# Check distinct phrases
print(f"- Distinct Intros: {len(set(intros))}")
print(f"- Distinct Praises: {len(set(praises))}")
print(f"- Distinct Corrections: {len(set(corrections))}")
