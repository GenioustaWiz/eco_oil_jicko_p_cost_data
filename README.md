# Eco Oil Jicko — Manufacturing Cost Ledger (website)

A static, no-build website that reproduces the Eco Oil Jicko costing spreadsheet
(Compact design, Tall design as labelled, and Tall design with covers added),
with live recalculation and a spot to add your organisation's logo.

## Files
- `index.html` — page structure
- `styles.css` — visual design
- `app.js` — all the cost data and calculations (edit this file to update prices/parts)
- No build step, no dependencies to install — just static files.

## Adding your logo

1. Add your logo file to the repo, e.g. `logo.png`.
2. In `index.html`, find the `<img id="logoImg" ...>` tag and set `src="logo.png"`,
   remove the `hidden` attribute, and hide the placeholder `<span id="logoPlaceholder">`
   by adding `hidden` to it instead.

## Editing prices or parts
Everything — material prices, part sizes, bought-in part prices, defaults for
waste %, blower cost, target price — lives in the data tables at the top of `app.js`.
Change a number there, save, and refresh the page (or re-push to GitHub).

## What's adjustable on the live page
- Waste allowance % (slider)
- Blower fan: Standard (2,500 KSh) or Economy (1,200 KSh)
- Factory overhead (KSh) — left blank/0 by default, add your real figure
- Transport (KSh) — left blank/0 by default, add your real figure
- Target selling price (KSh)

Changing any of these updates every table and gauge on the page instantly.
