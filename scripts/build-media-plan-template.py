#!/usr/bin/env python3
"""Build the free media plan template offered at /tools/media-plan-template.

Reads the worked example from src/data/media-plan-template/example.json (the
same file the page renders) and writes:

  public/templates/media-plan-template.xlsx   plan + flowchart, example and blank
  public/templates/media-plan-example.csv     the worked example as plain values

Run from the repo root:  python3 scripts/build-media-plan-template.py
Needs openpyxl (pip install openpyxl).
"""
from __future__ import annotations

import csv
import json
from datetime import date, datetime, timedelta
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.worksheet import Worksheet

ROOT = Path(__file__).resolve().parent.parent
EXAMPLE = ROOT / "src/data/media-plan-template/example.json"
OUT_DIR = ROOT / "public/templates"
XLSX = OUT_DIR / "media-plan-template.xlsx"
CSV = OUT_DIR / "media-plan-example.csv"

# Fixed so rebuilding with unchanged data gives the same workbook metadata.
STAMP = datetime(2026, 11, 17)

INK = "1F2328"
ACCENT = "0F766E"
HEAD_FILL = PatternFill("solid", fgColor="E6F4F1")
INPUT_FILL = PatternFill("solid", fgColor="FFF8E1")
TOTAL_FILL = PatternFill("solid", fgColor="F3F4F6")
FLIGHT_FILL = PatternFill("solid", fgColor="99D5CB")
THIN = Side(style="thin", color="D0D7DE")
BOX = Border(top=THIN, bottom=THIN, left=THIN, right=THIN)
BOLD = Font(bold=True, color=INK)
TITLE = Font(bold=True, size=16, color=INK)
MUTED = Font(italic=True, size=9, color="57606A")
WRAP = Alignment(wrap_text=True, vertical="top")

FMT_MONEY = '"$"#,##0'
FMT_CPM = '"$"#,##0.00'
FMT_INT = "#,##0"
FMT_FREQ = "0.0"
FMT_PCT = "0.0%"
FMT_DATE = "mmm d, yyyy"
FMT_WEEK = "mmm d"

# Plan table columns: (header, width)
COLUMNS = [
    ("Channel", 20),
    ("Tactic / placement", 28),
    ("Vendor / partner", 26),
    ("Flight start", 13),
    ("Flight end", 13),
    ("Weeks", 7),
    ("Budget", 12),
    ("Share of budget", 10),
    ("CPM", 9),
    ("Impressions", 13),
    ("Est. reach", 12),
    ("Frequency", 10),
    ("KPI", 30),
    ("Notes", 48),
]
HEADER_ROW = 11  # plan table header; the campaign block sits above it


def d(s: str) -> date:
    return date.fromisoformat(s)


def weeks_between(start: date, end: date) -> int:
    return round(((end - start).days + 1) / 7)


# ---------------------------------------------------------------- plan sheet


def write_campaign_block(ws: Worksheet, title: str, campaign: dict | None) -> None:
    ws["A1"] = title
    ws["A1"].font = TITLE
    ws["A2"] = (
        "Yellow cells are inputs. Weeks, share, impressions, frequency and totals are formulas: "
        "Impressions = Budget / CPM x 1,000; Frequency = Impressions / Reach."
    )
    ws["A2"].font = MUTED
    fields = [
        ("Campaign", campaign and campaign["name"], None),
        ("Objective", campaign and campaign["objective"], None),
        ("Target audience", campaign and campaign["audience"], None),
        ("Audience size (people)", campaign and campaign["universe"], FMT_INT),
        ("Total budget", campaign and campaign["budget"], FMT_MONEY),
        ("Campaign start (a Monday)", campaign and d(campaign["start"]), FMT_DATE),
    ]
    for i, (label, value, fmt) in enumerate(fields):
        r = 4 + i
        ws.cell(r, 1, label).font = BOLD
        c = ws.cell(r, 2, value)
        c.fill = INPUT_FILL
        c.border = BOX
        c.alignment = Alignment(horizontal="left")
        if fmt:
            c.number_format = fmt
        ws.merge_cells(start_row=r, start_column=2, end_row=r, end_column=4)


def write_plan(ws: Worksheet, title: str, campaign: dict | None, lines: list[dict], rows: int) -> dict:
    """Write a plan sheet. Returns cell references the flowchart needs."""
    write_campaign_block(ws, title, campaign)

    for col, (header, width) in enumerate(COLUMNS, start=1):
        c = ws.cell(HEADER_ROW, col, header)
        c.font = BOLD
        c.fill = HEAD_FILL
        c.border = BOX
        c.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[get_column_letter(col)].width = width
    ws.row_dimensions[HEADER_ROW].height = 30

    first = HEADER_ROW + 1
    last = first + rows - 1
    total_row = last + 1
    for i in range(rows):
        r = first + i
        line = lines[i] if i < len(lines) else None
        inputs = {
            1: line and line["channel"],
            2: line and line["tactic"],
            3: line and line["vendor"],
            4: line and d(line["start"]),
            5: line and d(line["end"]),
            7: line and line["budget"],
            9: line and line["cpm"],
            11: line and line["reach"],
            13: line and line["kpi"],
            14: line and line["notes"],
        }
        for col, value in inputs.items():
            c = ws.cell(r, col, value)
            c.fill = INPUT_FILL
        ws.cell(r, 6, f'=IF(OR(D{r}="",E{r}=""),"",ROUND((E{r}-D{r}+1)/7,0))')
        ws.cell(r, 8, f'=IF(G{r}="","",G{r}/$G${total_row})')
        ws.cell(r, 10, f'=IF(OR(G{r}="",I{r}="",I{r}=0),"",G{r}/I{r}*1000)')
        ws.cell(r, 12, f'=IF(OR(J{r}="",K{r}="",K{r}=0),"",J{r}/K{r})')
        for col in range(1, len(COLUMNS) + 1):
            c = ws.cell(r, col)
            c.border = BOX
            c.alignment = WRAP
        for col, fmt in {4: FMT_DATE, 5: FMT_DATE, 6: "0", 7: FMT_MONEY, 8: FMT_PCT, 9: FMT_CPM,
                         10: FMT_INT, 11: FMT_INT, 12: FMT_FREQ}.items():
            ws.cell(r, col).number_format = fmt

    rng = lambda col: f"{col}{first}:{col}{last}"  # noqa: E731
    totals = {
        1: "Total",
        7: f"=SUM({rng('G')})",
        8: f"=SUM({rng('H')})",
        9: f'=IF(J{total_row}=0,"",G{total_row}/J{total_row}*1000)',
        10: f"=SUM({rng('J')})",
        # Reach can't be summed across lines (people see more than one channel).
        # Combined reach assumes random overlap: 1 - product of (1 - line reach / audience).
        11: f'=IF(OR($B$7="",$B$7=0,COUNT({rng("K")})=0),"",'
            f'$B$7*(1-EXP(SUMPRODUCT(LN(1-{rng("K")}/$B$7)))))',
        12: f'=IF(OR(K{total_row}="",K{total_row}=0),"",J{total_row}/K{total_row})',
        13: "Blended CPM, combined reach and average frequency",
    }
    for col in range(1, len(COLUMNS) + 1):
        c = ws.cell(total_row, col, totals.get(col))
        c.font = BOLD
        c.fill = TOTAL_FILL
        c.border = BOX
    for col, fmt in {7: FMT_MONEY, 8: FMT_PCT, 9: FMT_CPM, 10: FMT_INT, 11: FMT_INT, 12: FMT_FREQ}.items():
        ws.cell(total_row, col).number_format = fmt

    ws.cell(total_row + 1, 1, "Budget left to place").font = BOLD
    left = ws.cell(total_row + 1, 7, f'=IF($B$8="","",$B$8-G{total_row})')
    left.number_format = FMT_MONEY
    left.font = BOLD
    ws.cell(total_row + 3, 1,
            "Combined reach uses the random-duplication method: it assumes each line reaches people "
            "independently of the others. Treat it as an estimate; platform reach planners and "
            "cross-media tools model overlap more accurately.").font = MUTED
    ws.cell(total_row + 4, 1,
            "For lines bought on CPC or CPV, enter the effective CPM (Budget / expected impressions x 1,000) "
            "and note the buy type, as the paid search row in the example does.").font = MUTED

    ws.freeze_panes = ws.cell(HEADER_ROW + 1, 3)
    ws.sheet_view.zoomScale = 100
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    return {"sheet": ws.title, "first": first, "last": last}


# ----------------------------------------------------------- flowchart sheet


def write_flowchart(ws: Worksheet, title: str, plan: dict, weeks: int) -> None:
    p = f"'{plan['sheet']}'!"
    ws["A1"] = title
    ws["A1"].font = TITLE
    ws["A2"] = (
        "Weekly spend by line, filled in from the plan tab's flight dates. Each line's budget is spread "
        "evenly across its live weeks; change the dates or budget on the plan tab and this updates."
    )
    ws["A2"].font = MUTED
    ws["A3"] = "Campaign start"
    ws["A3"].font = BOLD
    ws["B3"] = f"={p}$B$9"
    ws["B3"].number_format = FMT_DATE

    hr = 5
    fixed = [("Channel", 20), ("Tactic / placement", 28), ("Budget", 12)]
    for col, (header, width) in enumerate(fixed, start=1):
        c = ws.cell(hr, col, header)
        ws.column_dimensions[get_column_letter(col)].width = width
    first_week_col = len(fixed) + 1
    for w in range(weeks):
        col = first_week_col + w
        ws.cell(hr - 1, col, f"Wk {w + 1}").font = BOLD
        ws.cell(hr - 1, col).alignment = Alignment(horizontal="center")
        c = ws.cell(hr, col, f'=IF($B$3="","",$B$3+{7 * w})')
        c.number_format = FMT_WEEK
        ws.column_dimensions[get_column_letter(col)].width = 10
    for col in range(1, first_week_col + weeks):
        c = ws.cell(hr, col)
        c.font = BOLD
        c.fill = HEAD_FILL
        c.border = BOX
        c.alignment = Alignment(horizontal="center" if col >= first_week_col else "left")

    n = plan["last"] - plan["first"] + 1
    first = hr + 1
    last = first + n - 1
    for i in range(n):
        r = first + i
        src = plan["first"] + i
        ws.cell(r, 1, f'=IF({p}A{src}="","",{p}A{src})')
        ws.cell(r, 2, f'=IF({p}B{src}="","",{p}B{src})')
        ws.cell(r, 3, f'=IF({p}G{src}="","",{p}G{src})').number_format = FMT_MONEY
        for w in range(weeks):
            col = first_week_col + w
            wk = f"{get_column_letter(col)}${hr}"
            # Live if the week starting on this date overlaps the flight.
            formula = (
                f'=IF(OR({p}$G{src}="",{p}$D{src}="",{p}$E{src}="",{p}$F{src}=0,{wk}=""),"",'
                f'IF(AND({wk}<={p}$E{src},{wk}+6>={p}$D{src}),{p}$G{src}/{p}$F{src},""))'
            )
            c = ws.cell(r, col, formula)
            c.number_format = FMT_MONEY
        for col in range(1, first_week_col + weeks):
            ws.cell(r, col).border = BOX

    total = last + 1
    cumulative = last + 2
    ws.cell(total, 1, "Weekly total").font = BOLD
    ws.cell(cumulative, 1, "Cumulative spend").font = BOLD
    ws.cell(total, 3, f"=SUM(C{first}:C{last})").number_format = FMT_MONEY
    for w in range(weeks):
        col = first_week_col + w
        L = get_column_letter(col)
        ws.cell(total, col, f"=SUM({L}{first}:{L}{last})").number_format = FMT_MONEY
        prev = f"+{get_column_letter(col - 1)}{cumulative}" if w > 0 else ""
        ws.cell(cumulative, col, f"={L}{total}{prev}").number_format = FMT_MONEY
    for r in (total, cumulative):
        for col in range(1, first_week_col + weeks):
            c = ws.cell(r, col)
            c.fill = TOTAL_FILL
            c.border = BOX
            c.font = BOLD

    # Shade live weeks so the sheet reads as a Gantt chart.
    tl = f"{get_column_letter(first_week_col)}{first}"
    br = f"{get_column_letter(first_week_col + weeks - 1)}{last}"
    ws.conditional_formatting.add(
        f"{tl}:{br}", FormulaRule(formula=[f'ISNUMBER({tl})'], fill=FLIGHT_FILL)
    )
    ws.freeze_panes = ws.cell(first, first_week_col)
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.sheet_properties.pageSetUpPr.fitToPage = True


# ------------------------------------------------------------------ read me


def write_readme(ws: Worksheet, campaign: dict) -> None:
    ws.column_dimensions["A"].width = 24
    ws.column_dimensions["B"].width = 100
    ws["A1"] = "Media plan template"
    ws["A1"].font = TITLE
    ws["A2"] = "From mediaplanningtool.com/tools/media-plan-template. Free to use and adapt."
    ws["A2"].font = MUTED
    rows = [
        ("Tabs", ""),
        ("Example plan", f"A filled-in plan: {campaign['name'].lower()}, "
                         f"${campaign['budget']:,} over {campaign['weeks']} weeks. Type over it or use it as a reference."),
        ("Example flowchart", "The same plan week by week (a media flowchart). It fills itself in from the plan's flight dates."),
        ("Blank plan", "An empty plan with 25 rows and every formula in place."),
        ("Blank flowchart", "A 13-week flowchart linked to the blank plan. Set the campaign start date on the blank plan."),
        ("", ""),
        ("How to use it", ""),
        ("1", "Fill in the campaign block: name, objective, audience, audience size, budget and a Monday start date."),
        ("2", "Add one row per line item: channel, tactic, vendor, flight dates, budget, CPM, estimated reach, KPI."),
        ("3", "Impressions, share of budget, frequency and the totals calculate themselves. Only edit the yellow cells."),
        ("4", "Check 'Budget left to place' under the totals: it should reach $0 when the plan is complete."),
        ("5", "Open the flowchart tab to check pacing week by week, then share or print (it is set to fit one landscape page)."),
        ("", ""),
        ("Formulas", ""),
        ("Impressions", "Budget / CPM x 1,000"),
        ("Frequency", "Impressions / Reach (average times each person reached sees the ad)"),
        ("Blended CPM", "Total budget / total impressions x 1,000"),
        ("Combined reach", "Audience size x (1 - product of (1 - line reach / audience size)): the random-duplication estimate"),
        ("Weekly spend", "Line budget / weeks live, shown in each week the flight runs"),
        ("", ""),
        ("Reach estimates", "Get line-level reach from each platform's reach planner (Meta, Google, TikTok, your DSP) "
                            "for your audience and budget. The template doesn't guess it for you."),
    ]
    for i, (a, b) in enumerate(rows):
        r = 4 + i
        ca, cb = ws.cell(r, 1, a), ws.cell(r, 2, b)
        cb.alignment = Alignment(wrap_text=True, vertical="top")
        ca.alignment = Alignment(vertical="top")
        if a and not b:
            ca.font = Font(bold=True, size=12, color=ACCENT)
        elif a:
            ca.font = BOLD


# --------------------------------------------------------------------- main


def compute(campaign: dict, lines: list[dict]) -> list[dict]:
    """Plain values for the CSV, using the same formulas as the workbook."""
    total = sum(l["budget"] for l in lines)
    out = []
    for l in lines:
        weeks = weeks_between(d(l["start"]), d(l["end"]))
        imps = l["budget"] / l["cpm"] * 1000
        out.append({
            "Channel": l["channel"],
            "Tactic / placement": l["tactic"],
            "Vendor / partner": l["vendor"],
            "Flight start": l["start"],
            "Flight end": l["end"],
            "Weeks": weeks,
            "Budget": l["budget"],
            "Share of budget": f"{l['budget'] / total:.1%}",
            "CPM": f"{l['cpm']:.2f}",
            "Impressions": round(imps),
            "Est. reach": l["reach"],
            "Frequency": f"{imps / l['reach']:.1f}",
            "KPI": l["kpi"],
            "Notes": l["notes"],
        })
    return out


def main() -> None:
    data = json.loads(EXAMPLE.read_text())
    campaign, lines = data["campaign"], data["lines"]
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    wb = Workbook()
    wb.properties.creator = "mediaplanningtool.com"
    wb.properties.title = "Media plan template"
    wb.properties.created = STAMP
    wb.properties.modified = STAMP
    write_readme(wb.active, campaign)
    wb.active.title = "Read me"

    example = write_plan(wb.create_sheet("Example plan"), f"Media plan: {campaign['name']}", campaign, lines, len(lines))
    write_flowchart(wb.create_sheet("Example flowchart"), f"Media flowchart: {campaign['name']}", example, campaign["weeks"])
    blank = write_plan(wb.create_sheet("Blank plan"), "Media plan", None, [], 25)
    write_flowchart(wb.create_sheet("Blank flowchart"), "Media flowchart", blank, 13)

    wb.calculation.fullCalcOnLoad = True
    wb.active = 1  # open on the example plan
    wb.save(XLSX)

    rows = compute(campaign, lines)
    with CSV.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    total_budget = sum(l["budget"] for l in lines)
    total_imps = sum(l["budget"] / l["cpm"] * 1000 for l in lines)
    keep = 1.0
    for l in lines:
        keep *= 1 - l["reach"] / campaign["universe"]
    reach = campaign["universe"] * (1 - keep)
    print(f"wrote {XLSX.relative_to(ROOT)} and {CSV.relative_to(ROOT)}")
    print(f"budget {total_budget:,} (campaign {campaign['budget']:,}), impressions {total_imps:,.0f}, "
          f"blended CPM {total_budget / total_imps * 1000:.2f}, combined reach {reach:,.0f} "
          f"({reach / campaign['universe']:.1%}), avg frequency {total_imps / reach:.2f}")
    start = d(campaign["start"])
    weekly = []
    for w in range(campaign["weeks"]):
        ws_ = start + timedelta(days=7 * w)
        weekly.append(sum(
            l["budget"] / weeks_between(d(l["start"]), d(l["end"]))
            for l in lines if ws_ <= d(l["end"]) and ws_ + timedelta(days=6) >= d(l["start"])
        ))
    print("weekly spend", [round(x, 2) for x in weekly], "sum", round(sum(weekly), 2))


if __name__ == "__main__":
    main()
