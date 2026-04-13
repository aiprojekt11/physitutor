import json
import sys

with open(r"c:\Users\barto\Desktop\fizyka\projektewef.ipynb", "r", encoding="utf-8") as f:
    data = json.load(f)

for cell in data.get("cells", []):
    if cell.get("cell_type") == "code":
        source = cell["source"]
        if isinstance(source, list):
            source_str = "".join(source)
            source_str = source_str.replace("\n,→ ", " ")
            
            # Put it back to list of lines
            lines = source_str.split("\n")
            new_source = [line + "\n" for line in lines[:-1]] + ([lines[-1]] if lines[-1] else [])
            cell["source"] = new_source

with open(r"c:\Users\barto\Desktop\fizyka\projektewef.ipynb", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=1)

print("Fixed syntax errors in .ipynb")
