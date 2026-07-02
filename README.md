# Eco Oil Jicko — Manufacturing Cost Ledger (website)

A static, no-build website that reproduces the Eco Oil Jicko costing spreadsheet
(Compact design, Tall design as labelled, and Tall design with covers added),
with live recalculation and a spot to add your organisation's logo.

## Files
- `index.html` — page structure
- `styles.css` — visual design
- `app.js` — all the cost data and calculations (edit this file to update prices/parts)
- No build step, no dependencies to install — just static files.

## How to publish it on GitHub Pages

1. Create a new repository on GitHub (e.g. `eco-oil-jicko-costing`).
2. Upload these three files (`index.html`, `styles.css`, `app.js`) to the repository root
   — either by dragging them into the GitHub web UI ("Add file → Upload files"),
   or via git:
   ```bash
   git init
   git add index.html styles.css app.js README.md
   git commit -m "Eco Oil Jicko cost ledger"
   git branch -M main
   git remote add origin https://github.com/<your-username>/eco-oil-jicko-costing.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`, then **Save**.
5. GitHub will give you a link like:
   `https://<your-username>.github.io/eco-oil-jicko-costing/`
   It can take a minute or two to go live. Share that link with anyone.

## Adding your logo
Click the dashed "Add logo" box in the top-left of the page and choose an image.
It's stored only in each visitor's own browser (not uploaded anywhere), so if you want
everyone who opens the link to see your logo automatically, replace the placeholder
with a real image file instead:

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
