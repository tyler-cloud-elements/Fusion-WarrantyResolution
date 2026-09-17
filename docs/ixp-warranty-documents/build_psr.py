"""Render parts-substitution-form.pdf. Run from anywhere; output lands beside this file."""
import os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from psr_doc import DOC

# Reuse the set's own stylesheet so the form is not a stranger among the others.
src = open(os.path.join(HERE, "build_docs.py")).read()
BASE = re.search(r'BASE = """(.*?)"""', src, re.S).group(1)

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
name = "parts-substitution-form.pdf"
html = DOC % BASE
hp = os.path.join(HERE, "_psr.html")
open(hp, "w").write("<!doctype html><meta charset='utf-8'>" + html)
out = os.path.join(HERE, name)
subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                f"--print-to-pdf={out}", "--virtual-time-budget=3000", f"file://{hp}"],
               capture_output=True, timeout=90)
os.remove(hp)
print(f"{os.path.getsize(out):,} bytes  {out}")
