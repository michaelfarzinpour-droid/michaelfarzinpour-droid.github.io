"""
AI-assisted weekly marketplace summary.

Usage:
  pip install openai
  export OPENAI_API_KEY="..."
  python ai_weekly_summary.py weekly_kpis.csv

The script compares the latest week to the prior week, computes KPI deltas,
then asks an LLM for a short executive-ready "what moved and why to investigate" summary.
If no API key is present, it prints a deterministic fallback summary.
"""

import csv
import os
import sys

def load_rows(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def pct_change(new, old):
    if old == 0:
        return 0.0
    return (new / old - 1) * 100

def build_metrics(rows):
    prev, curr = rows[-2], rows[-1]
    metrics = {
        "week": curr["week_start"],
        "inventory": int(curr["listings"]),
        "inventory_change_pct": pct_change(float(curr["listings"]), float(prev["listings"])),
        "avg_ask_price": float(curr["avg_ask_price"]),
        "avg_ask_change_pct": pct_change(float(curr["avg_ask_price"]), float(prev["avg_ask_price"])),
        "sell_through_rate": float(curr["sell_through_rate"]) * 100,
        "sell_through_change_pp": (float(curr["sell_through_rate"]) - float(prev["sell_through_rate"])) * 100,
        "avg_days_on_market": float(curr["avg_days_on_market"]),
        "dom_change_days": float(curr["avg_days_on_market"]) - float(prev["avg_days_on_market"]),
    }
    return metrics

def fallback(m):
    return (
        f"Week of {m['week']}: inventory was {m['inventory']:,} listings "
        f"({m['inventory_change_pct']:+.1f}% WoW), while average asking price moved "
        f"{m['avg_ask_change_pct']:+.1f}% to ${m['avg_ask_price']:,.0f}. "
        f"Sell-through was {m['sell_through_rate']:.1f}% "
        f"({m['sell_through_change_pp']:+.1f} pp), and average days on market changed "
        f"{m['dom_change_days']:+.1f} days to {m['avg_days_on_market']:.1f}. "
        "Next step: segment the movement by model, inventory source, and dealer type "
        "to determine whether the shift is mix-driven or broad-based."
    )

def ai_summary(m):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return fallback(m)

    from openai import OpenAI
    client = OpenAI(api_key=api_key)
    prompt = f"""
You are a business operations analyst for a used-EV marketplace.
Write a concise 3-sentence leadership update from these weekly KPIs.

KPIs:
- Week: {m['week']}
- Inventory: {m['inventory']:,} ({m['inventory_change_pct']:+.1f}% WoW)
- Avg ask price: ${m['avg_ask_price']:,.0f} ({m['avg_ask_change_pct']:+.1f}% WoW)
- Sell-through: {m['sell_through_rate']:.1f}% ({m['sell_through_change_pp']:+.1f} pp WoW)
- Avg days on market: {m['avg_days_on_market']:.1f} ({m['dom_change_days']:+.1f} days WoW)

Rules:
1. Do not invent causes.
2. Distinguish observed movement from hypotheses.
3. End with one concrete diagnostic action.
"""
    response = client.responses.create(
        model=os.getenv("OPENAI_MODEL", "gpt-6-luna"),
        input=prompt,
    )
    return response.output_text.strip()

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "weekly_kpis.csv"
    rows = load_rows(path)
    if len(rows) < 2:
        raise SystemExit("Need at least two weeks of KPI data.")
    metrics = build_metrics(rows)
    print(ai_summary(metrics))
