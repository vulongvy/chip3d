# -*- coding: utf-8 -*-
import json, re

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Island boundaries in original data.js
matches = list(re.finditer(r'\{\s*\n\s*id:\s*"island-(\d+)"', text))
spans = []
for i in range(len(matches)):
    start = matches[i].start()
    end = matches[i+1].start() if i+1 < len(matches) else text.find('const PLAYER_RANKS = [')
    # clean trailing comma if needed
    block = text[start:end].rstrip()
    if block.endswith(','):
        block = block[:-1].rstrip()
    spans.append(block)

# Islands 1-4 for Grade 1
grade1_islands_raw = spans[0:4]

# Islands 5-8 for Grade 2 (transform IDs and numbers)
grade2_islands_raw = []
for idx, b in enumerate(spans[4:8]):
    # replace islandNumber: 5 -> 1, 6 -> 2, etc.
    old_num = idx + 5
    new_num = idx + 1
    new_stars = idx * 4
    b_mod = re.sub(r'id:\s*"island-' + str(old_num) + '"', f'id: "g2-island-{new_num}"', b)
    b_mod = re.sub(r'islandNumber:\s*' + str(old_num), f'islandNumber: {new_num}', b_mod)
    b_mod = re.sub(r'requiredStars:\s*\d+', f'requiredStars: {new_stars}', b_mod)
    b_mod = re.sub(r'stage-' + str(old_num) + '-', f'g2-stage-{new_num}-', b_mod)
    grade2_islands_raw.append(b_mod)

print("Parsed Grade 1 islands:", len(grade1_islands_raw))
print("Parsed Grade 2 islands:", len(grade2_islands_raw))
