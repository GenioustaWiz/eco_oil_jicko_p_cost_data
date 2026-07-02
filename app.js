/* =========================================================================
   ECO OIL JICKO — Manufacturing Cost Ledger
   All figures reproduced from the workshop costing spreadsheet.
   Everything below recalculates live in the browser — no server involved.
   ========================================================================= */

/* ---------- 1. Raw material rate card ---------- */
const MATERIALS = {
  sb1:  { name: '1" Square Tube (sb1")',        spec: '16g, 19 ft long', unit: 'in',   packSize: 19*12,            packCost: 850  },
  sb34: { name: '¾" Square Tube (sb¾)',          spec: '16g, 19 ft long', unit: 'in',   packSize: 19*12,            packCost: 700  },
  zb:   { name: '1" Z Bar (zb)',                 spec: '19 ft long',      unit: 'in',   packSize: 19*12,            packCost: 1550 },
  p:    { name: '1¼" Round Pipe (p)',            spec: '16g, 19 ft long', unit: 'in',   packSize: 19*12,            packCost: 1100 },
  pl:   { name: 'Black Plain Sheet (pl)',        spec: '16g, 4ft x 8ft',  unit: 'sq.in',packSize: 48*96,            packCost: 4000 },
  plz:  { name: 'Plain Sheet Zinc Plated (plz)', spec: '1m x 1m',         unit: 'sq.in',packSize: 39.3701*39.3701,  packCost: 400  },
};
function rate(key){ const m = MATERIALS[key]; return m.packCost / m.packSize; }

/* ---------- 2. Cut parts per design ---------- */
const COMPACT_PARTS = [
  ['sb1',  'a (compact)',            1, 9],
  ['sb1',  'b (compact) ×4',         4, 5.75],
  ['sb1',  'c ×2',                   2, 9],
  ['sb1',  'd',                      1, 5],
  ['sb1',  'e ×2',                   2, 1.75],
  ['sb34', 'a',                      1, 4],
  ['zb',   'a',                      1, 7],
  ['zb',   'b (11")',                1, 11],
  ['zb',   'b (10")',                1, 10],
  ['zb',   'c (11")',                1, 11],
  ['zb',   'c (10")',                1, 10],
  ['p',    'a',                      1, 9.5],
  ['p',    'b',                      1, 2.5],
  ['pl',   'a (12½" × 12½")',        1, 12.5*12.5],
  ['pl',   'b (10½" × ¾")',          1, 10.5*0.75],
  ['pl',   'c (3" × 2¼")',           1, 3*2.25],
  ['pl',   'd (5" × 5")',            1, 5*5],
  ['pl',   'e (15½" × 1")',          1, 15.5*1],
  ['plz',  'a (10" × 8")',           1, 10*8],
  ['plz',  'b (33" × 7") — compact only', 1, 33*7],
  ['plz',  'c (10" × 6") — compact only', 1, 10*6],
];

const TALL_STD_PARTS = [
  ['sb1',  'a (tall)',               1, 8],
  ['sb1',  'b (tall) ×4',            4, 10],
  ['sb1',  'c ×2',                   2, 9],
  ['sb1',  'd',                      1, 5],
  ['sb1',  'e ×2',                   2, 1.75],
  ['sb34', 'a',                      1, 4],
  ['zb',   'a',                      1, 7],
  ['zb',   'b (11")',                1, 11],
  ['zb',   'b (10")',                1, 10],
  ['zb',   'c (11")',                1, 11],
  ['zb',   'c (10")',                1, 10],
  ['p',    'a',                      1, 9.5],
  ['p',    'b',                      1, 2.5],
  ['pl',   'a (12½" × 12½")',        1, 12.5*12.5],
  ['pl',   'b (10½" × ¾")',          1, 10.5*0.75],
  ['pl',   'c (3" × 2¼")',           1, 3*2.25],
  ['pl',   'd (5" × 5")',            1, 5*5],
  ['pl',   'e (15½" × 1")',          1, 15.5*1],
  ['plz',  'a (10" × 8")',           1, 10*8],
];

const TALL_COV_PARTS = [
  ...TALL_STD_PARTS,
  ['plz', 'b (33" × 7") — added for cover', 1, 33*7],
  ['plz', 'c (10" × 6") — added for cover', 1, 10*6],
];

/* ---------- 3. Bought-in parts (fixed price, not cut from stock) ---------- */
const OTHER_PARTS_BASE = [
  ['½" 1 Foot stand pipe', 1, 100],
  ['½" by ¾" Reducing bush (2pcs)', 1, 100],
  ['¾" by 1" Reducing bush', 1, 60],
  ['½" Cup plug', 1, 30],
  ['¾" Short nipple (alt: ¾" long thread nipple = 70)', 1, 50],
  ['¾" G.I elbow', 1, 50],
  ['½" Washing machine tap', 1, 500],
  ['Sufuria stand (4pcs)', 1, 150],
  ['2" Hinges', 1, 15],
  ['Rivets — a (10pcs)', 1, 50],
  ['Welding rods (30pcs)', 1, 300],
  ['Plza holder', 1, 50],
  ['Pld slider top holder', 1, 20],
  ['Paint — Grey', 1, 50],
  ['Paint — Black', 1, 50],
];
const RIVETS_B = ['Rivets — b (12pcs) — compact design only', 1, 60];

const CONSUMABLES = [
  ['Electricity', 1, 200],
  ['Cutting disc 4"', 1, 100],
  ['Drill bits', 1, 70],
  ['Packing', 1, 50],
];

/* ---------- 4. Design registry ---------- */
const DESIGNS = {
  compact: {
    label: 'Compact',
    parts: COMPACT_PARTS,
    otherParts: [...OTHER_PARTS_BASE, RIVETS_B],
    note: 'Zinc sheet parts b & c (outer/bottom covers) are included as originally labelled for the compact design.',
  },
  tallStd: {
    label: 'Tall — as labelled',
    parts: TALL_STD_PARTS,
    otherParts: [...OTHER_PARTS_BASE],
    note: 'Zinc sheet parts b & c were marked "compact design only" in the original spec, so they are excluded here.',
  },
  tallCov: {
    label: 'Tall — with covers',
    parts: TALL_COV_PARTS,
    otherParts: [...OTHER_PARTS_BASE],
    note: 'Zinc sheet parts b & c are added here too, since they form the outer/bottom covers the tall design also needs.',
  },
};

/* ---------- 5. State (driven by the controls bar) ---------- */
const state = {
  wastePct: 7.5,
  blowerCost: 2500,
  overhead: 0,
  transport: 0,
  target: 7000,
};

/* ---------- 6. Formatting helpers ---------- */
const fmt = (n) => (Math.round(n * 100) / 100).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' KSh';
const fmtInt = (n) => Math.round(n).toLocaleString('en-KE') + ' KSh';

/* ---------- 7. Core calculation ---------- */
function computeDesign(key){
  const d = DESIGNS[key];
  const partRows = d.parts.map(([matKey, label, qty, size]) => {
    const r = rate(matKey);
    const total = qty * size;
    const cost = total * r;
    return { material: MATERIALS[matKey].name, label, qty, size, unit: MATERIALS[matKey].unit, total, rate: r, cost };
  });
  const materialSubtotal = partRows.reduce((s, r) => s + r.cost, 0);

  const otherRows = d.otherParts.map(([item, qty, price]) => ({ item, qty, price, cost: qty * price }));
  const otherSubtotal = otherRows.reduce((s, r) => s + r.cost, 0);

  const consRows = CONSUMABLES.map(([item, qty, price]) => ({ item, qty, price, cost: qty * price }));
  const consSubtotal = consRows.reduce((s, r) => s + r.cost, 0);

  const wasteAmt = materialSubtotal * (state.wastePct / 100);
  const subtotalBeforeBlower = materialSubtotal + otherSubtotal + consSubtotal + wasteAmt;
  const totalCost = subtotalBeforeBlower + state.blowerCost + state.overhead + state.transport;
  const margin = state.target - totalCost;

  return { partRows, materialSubtotal, otherRows, otherSubtotal, consRows, consSubtotal, wasteAmt, subtotalBeforeBlower, totalCost, margin, note: d.note, label: d.label };
}

/* ---------- 8. Gauge (SVG semicircle dial) ---------- */
function gaugeSVG(marginRatio, size = 'small'){
  // marginRatio: margin / target, clamp -0.5..0.6 mapped to 0..180deg
  const clamped = Math.max(-0.5, Math.min(0.6, marginRatio));
  const t = (clamped + 0.5) / 1.1; // 0..1
  const angle = -180 + t * 180; // -180 (left) to 0 (right), degrees, needle points along top half
  const cx = 100, cy = 100, r = 78;
  const rad = (angle * Math.PI) / 180;
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad);
  const color = marginRatio < 0 ? '#B23A2E' : (marginRatio < 0.15 ? '#B8863B' : '#4C7A52');

  // arc segments: red 0-33%, brass 33-66%, green 66-100% of the 180deg sweep
  function arcPath(startDeg, endDeg){
    const sRad = (startDeg * Math.PI) / 180, eRad = (endDeg * Math.PI) / 180;
    const sx = cx + r * Math.cos(sRad), sy = cy + r * Math.sin(sRad);
    const ex = cx + r * Math.cos(eRad), ey = cy + r * Math.sin(eRad);
    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  }

  return `
  <svg viewBox="0 0 200 115" xmlns="http://www.w3.org/2000/svg">
    <path d="${arcPath(-180,-120)}" stroke="#B23A2E" stroke-width="14" fill="none" stroke-linecap="butt"/>
    <path d="${arcPath(-120,-60)}"  stroke="#B8863B" stroke-width="14" fill="none" stroke-linecap="butt"/>
    <path d="${arcPath(-60,0)}"     stroke="#4C7A52" stroke-width="14" fill="none" stroke-linecap="butt"/>
    <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="${color}"/>
  </svg>`;
}

/* ---------- 9. Render: Material Rates panel ---------- */
function renderRates(){
  const rows = Object.values(MATERIALS).map(m => {
    const r = m.packCost / m.packSize;
    return `<tr>
      <td>${m.name}</td>
      <td>${m.spec}</td>
      <td>${m.unit === 'in' ? 'per inch' : 'per sq.in'}</td>
      <td class="num">${m.packSize.toFixed(2)}</td>
      <td class="num">${fmtInt(m.packCost)}</td>
      <td class="num">${r.toFixed(4)}</td>
    </tr>`;
  }).join('');
  document.getElementById('panel-rates').innerHTML = `
    <h2>Raw Material Rate Card</h2>
    <p class="panel-sub">Cost per pack ÷ pack size. Every part cost in the other tabs is derived from this rate.</p>
    <table>
      <thead><tr><th>Material</th><th>Spec / Pack</th><th>Unit</th><th class="num">Pack size</th><th class="num">Pack cost</th><th class="num">Rate</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

/* ---------- 10. Render: a single design panel ---------- */
function renderDesign(panelId, key){
  const c = computeDesign(key);
  const partRows = c.partRows.map(r => `<tr>
    <td>${r.material}</td>
    <td>${r.label}</td>
    <td class="num">${r.qty}</td>
    <td class="num">${(r.size).toFixed(3).replace(/\.?0+$/,'')}</td>
    <td>${r.unit}</td>
    <td class="num">${r.total.toFixed(3).replace(/\.?0+$/,'')}</td>
    <td class="num">${r.rate.toFixed(4)}</td>
    <td class="num">${fmt(r.cost)}</td>
  </tr>`).join('');

  const otherRows = c.otherRows.map(r => `<tr>
    <td colspan="2">${r.item}</td>
    <td class="num">${r.qty}</td>
    <td colspan="3"></td>
    <td class="num">${fmtInt(r.price)}</td>
    <td class="num">${fmt(r.cost)}</td>
  </tr>`).join('');

  const consRows = c.consRows.map(r => `<tr>
    <td colspan="2">${r.item}</td>
    <td class="num">${r.qty}</td>
    <td colspan="3"></td>
    <td class="num">${fmtInt(r.price)}</td>
    <td class="num">${fmt(r.cost)}</td>
  </tr>`).join('');

  const marginClass = c.margin < 0 ? 'negative' : '';

  document.getElementById(panelId).innerHTML = `
    <h2>${c.label} Design</h2>
    <p class="panel-sub">${c.note}</p>

    <div class="section-block">
      <p class="section-title"><span class="tag">A</span> Cut parts — tube / bar / pipe / sheet stock</p>
      <table>
        <thead><tr><th>Material</th><th>Part</th><th class="num">Qty</th><th class="num">Size/pc</th><th>Unit</th><th class="num">Total</th><th class="num">Rate</th><th class="num">Cost</th></tr></thead>
        <tbody>${partRows}
          <tr class="subtotal"><td colspan="7">Material subtotal</td><td class="num">${fmt(c.materialSubtotal)}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-block">
      <p class="section-title"><span class="tag">B</span> Other parts — bought-in, fixed price</p>
      <table>
        <tbody>${otherRows}
          <tr class="subtotal"><td colspan="7">Other parts subtotal</td><td class="num">${fmt(c.otherSubtotal)}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-block">
      <p class="section-title"><span class="tag">D</span> Consumables / workshop costs</p>
      <table>
        <tbody>${consRows}
          <tr class="subtotal"><td colspan="7">Consumables subtotal</td><td class="num">${fmt(c.consSubtotal)}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-block">
      <p class="section-title"><span class="tag">E</span> Waste allowance &amp; grand total</p>
      <table>
        <tbody>
          <tr><td colspan="7">Waste allowance (${state.wastePct}% of material subtotal)</td><td class="num">${fmt(c.wasteAmt)}</td></tr>
          <tr><td colspan="7">Blower fan</td><td class="num">${fmtInt(state.blowerCost)}</td></tr>
          <tr><td colspan="7">Factory overhead</td><td class="num">${fmtInt(state.overhead)}</td></tr>
          <tr><td colspan="7">Transport</td><td class="num">${fmtInt(state.transport)}</td></tr>
          <tr class="grand"><td colspan="7">TOTAL PRODUCTION COST</td><td class="num">${fmt(c.totalCost)}</td></tr>
          <tr class="margin ${marginClass}"><td colspan="7">Margin at target price of ${fmtInt(state.target)}</td><td class="num">${fmt(c.margin)}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="gauge-row">
      <div class="gauge-card">
        <h3>${c.label} margin</h3>
        ${gaugeSVG(c.margin / state.target)}
        <div class="val">${fmt(c.margin)}</div>
      </div>
    </div>
  `;
}

/* ---------- 11. Render: Summary panel ---------- */
function renderSummary(){
  const keys = ['compact', 'tallStd', 'tallCov'];
  const results = keys.map(k => computeDesign(k));

  function line(label, field, isMoney = true, cls = ''){
    const cells = results.map(r => `<td class="num">${isMoney ? fmt(r[field]) : r[field]}</td>`).join('');
    return `<tr class="${cls}"><td>${label}</td>${cells}</tr>`;
  }

  const gaugeCards = results.map(r => `
    <div class="gauge-card">
      <h3>${r.label}</h3>
      ${gaugeSVG(r.margin / state.target)}
      <div class="val">${fmt(r.margin)}</div>
    </div>`).join('');

  document.getElementById('panel-summary').innerHTML = `
    <h2>Cost Summary — All Scenarios</h2>
    <p class="panel-sub">Adjust waste %, blower option, overhead, transport, or target price above — every table on this page updates instantly.</p>

    <div class="compare-wrap">
      <table class="compare">
        <thead><tr><th>Cost component</th><th>Compact</th><th>Tall — as labelled</th><th>Tall — with covers</th></tr></thead>
        <tbody>
          ${line('Material subtotal', 'materialSubtotal')}
          ${line('Other parts subtotal', 'otherSubtotal')}
          ${line('Consumables subtotal', 'consSubtotal')}
          ${line('Waste allowance', 'wasteAmt')}
          <tr class="subtotal"><td>Blower fan</td>${keys.map(()=>`<td class="num">${fmtInt(state.blowerCost)}</td>`).join('')}</tr>
          <tr class="subtotal"><td>Factory overhead + transport</td>${keys.map(()=>`<td class="num">${fmtInt(state.overhead + state.transport)}</td>`).join('')}</tr>
          <tr class="grand"><td>TOTAL PRODUCTION COST</td>${results.map(r=>`<td class="num">${fmt(r.totalCost)}</td>`).join('')}</tr>
          <tr class="subtotal"><td>Target selling price</td>${keys.map(()=>`<td class="num">${fmtInt(state.target)}</td>`).join('')}</tr>
          ${line('Margin', 'margin', true, 'margin')}
        </tbody>
      </table>
    </div>

    <div class="warn">Margins include factory overhead &amp; transport only if you've entered them above — set them to match your real workshop costs before quoting.</div>

    <div class="gauge-row">${gaugeCards}</div>
  `;
}

/* ---------- 12. Header gauge (uses cheapest scenario: Compact) ---------- */
function renderHeaderGauge(){
  const c = computeDesign('compact');
  document.getElementById('headerGauge').innerHTML = gaugeSVG(c.margin / state.target).match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1];
  document.getElementById('headerGaugeValue').textContent = fmt(c.margin);
}

/* ---------- 13. Render everything ---------- */
function renderAll(){
  renderRates();
  renderDesign('panel-compact', 'compact');
  renderDesign('panel-tallStd', 'tallStd');
  renderDesign('panel-tallCov', 'tallCov');
  renderSummary();
  renderHeaderGauge();
}

/* ---------- 14. Controls wiring ---------- */
const wasteRange = document.getElementById('wasteRange');
const wasteRangeVal = document.getElementById('wasteRangeVal');
const blowerSelect = document.getElementById('blowerSelect');
const overheadInput = document.getElementById('overheadInput');
const transportInput = document.getElementById('transportInput');
const targetInput = document.getElementById('targetInput');
const resetBtn = document.getElementById('resetBtn');

function syncStateFromControls(){
  state.wastePct = parseFloat(wasteRange.value);
  wasteRangeVal.textContent = state.wastePct + '%';
  state.blowerCost = parseFloat(blowerSelect.value);
  state.overhead = parseFloat(overheadInput.value) || 0;
  state.transport = parseFloat(transportInput.value) || 0;
  state.target = parseFloat(targetInput.value) || 0;
  renderAll();
}

[wasteRange, blowerSelect, overheadInput, transportInput, targetInput].forEach(el => {
  el.addEventListener('input', syncStateFromControls);
});

resetBtn.addEventListener('click', () => {
  wasteRange.value = 7.5;
  blowerSelect.value = 2500;
  overheadInput.value = 0;
  transportInput.value = 0;
  targetInput.value = 7000;
  syncStateFromControls();
});

/* ---------- 15. Tabs ---------- */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

/* ---------- 16. Logo upload (persisted locally in the browser) ---------- */
const logoInput = document.getElementById('logoInput');
const logoImg = document.getElementById('logoImg');
const logoPlaceholder = document.getElementById('logoPlaceholder');
const removeLogoBtn = document.getElementById('removeLogo');
const logoSlot = document.getElementById('logoSlot');

function showLogo(dataUrl){
  logoImg.src = dataUrl;
  logoImg.hidden = false;
  logoPlaceholder.hidden = true;
  removeLogoBtn.hidden = false;
}
function clearLogo(){
  logoImg.hidden = true;
  logoImg.src = '';
  logoPlaceholder.hidden = false;
  removeLogoBtn.hidden = true;
  try { localStorage.removeItem('jickoLogo'); } catch(e) {}
}

logoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    showLogo(ev.target.result);
    try { localStorage.setItem('jickoLogo', ev.target.result); } catch(e) {}
  };
  reader.readAsDataURL(file);
});

removeLogoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearLogo();
});

logoSlot.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); logoInput.click(); }
});

(function restoreLogo(){
  try {
    const saved = localStorage.getItem('jickoLogo');
    if (saved) showLogo(saved);
  } catch(e) {}
})();

/* ---------- 17. Boot ---------- */
renderAll();
