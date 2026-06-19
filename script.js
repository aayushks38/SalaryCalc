'use strict';

const html      = document.documentElement;
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('sc-theme-fin') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('sc-theme-fin', next);
});

const form       = document.getElementById('calcForm');
const btnCalc    = document.getElementById('btnCalc');
const btnReset   = document.getElementById('btnReset');


const iCTC       = document.getElementById('iCTC');
const iBonus     = document.getElementById('iBonus');
const iPF        = document.getElementById('iPF');
const iTax       = document.getElementById('iTax');

const tagCTC     = document.getElementById('tagCTC');
const tagBonus   = document.getElementById('tagBonus');

const emptyState = document.getElementById('emptyState');
const resultsBlock = document.getElementById('resultsBlock');

const svMonthly  = document.getElementById('svMonthly');
const subMonthly = document.getElementById('subMonthly');
const svFixed    = document.getElementById('svFixed');
const svAnnual   = document.getElementById('svAnnual');
const svDeduct   = document.getElementById('svDeduct');

const healthPct  = document.getElementById('healthPct');
const healthFill = document.getElementById('healthFill');
const healthNote = document.getElementById('healthNote');

const bInhand    = document.getElementById('bInhand');
const bPF        = document.getElementById('bPF');
const bTax       = document.getElementById('bTax');
const bBonus     = document.getElementById('bBonus');
const pInhand    = document.getElementById('pInhand');
const pPF        = document.getElementById('pPF');
const pTax       = document.getElementById('pTax');
const pBonus     = document.getElementById('pBonus');

const cmpBody    = document.getElementById('cmpBody');

function inr(n) {
  if (!n && n !== 0) return '—';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function lpa(n) {
  if (!n || n <= 0) return '';
  const v = n / 100000;
  return (v % 1 === 0 ? v : parseFloat(v.toFixed(1))) + ' LPA';
}

function countUp(el, target, formatter) {
  const steps    = 30;
  const interval = 500 / steps;
  let   step     = 0;
  
  if (target === 0) {
      el.textContent = formatter(0);
      return;
  }
  
  const id = setInterval(() => {
    step++;
    el.textContent = formatter(Math.round((target / steps) * step));
    if (step >= steps) { 
        clearInterval(id); 
        el.textContent = formatter(target); 
    }
  }, interval);
}

function setErr(fieldId, errId, msg) {
  document.getElementById(fieldId).classList.add('has-err');
  document.getElementById(errId).textContent = msg;
}

function clearErr(fieldId, errId) {
  document.getElementById(fieldId).classList.remove('has-err');
  document.getElementById(errId).textContent = '';
}

function validate() {
  let ok = true;

  const ctc   = parseFloat(iCTC.value);
  const bonus = parseFloat(iBonus.value);
  const pf    = parseFloat(iPF.value);
  const tax   = parseFloat(iTax.value);

  clearErr('fCTC',   'eCTC');
  clearErr('fBonus', 'eBonus');
  clearErr('fPF',    'ePF');
  clearErr('fTax',   'eTax');

  if (!iCTC.value || isNaN(ctc)) {
    setErr('fCTC', 'eCTC', 'CTC is required.'); ok = false;
  } else if (ctc <= 0) {
    setErr('fCTC', 'eCTC', 'Must be > 0.'); ok = false;
  }

  if (!iBonus.value || isNaN(bonus)) {
    setErr('fBonus', 'eBonus', 'Enter 0 if none.'); ok = false;
  } else if (bonus < 0) {
    setErr('fBonus', 'eBonus', 'Cannot be negative.'); ok = false;
  } else if (!isNaN(ctc) && bonus >= ctc) {
    setErr('fBonus', 'eBonus', 'Must be < CTC.'); ok = false;
  }

  if (!iPF.value || isNaN(pf)) {
    setErr('fPF', 'ePF', 'Enter 0 if none.'); ok = false;
  } else if (pf < 0 || pf > 100) {
    setErr('fPF', 'ePF', '0-100 only.'); ok = false;
  }

  if (!iTax.value || isNaN(tax)) {
    setErr('fTax', 'eTax', 'Enter 0 if none.'); ok = false;
  } else if (tax < 0 || tax > 100) {
    setErr('fTax', 'eTax', '0-100 only.'); ok = false;
  }

  if (ok && (pf + tax) > 100) {
    setErr('fTax', 'eTax', 'Total deduction > 100%.'); ok = false;
  }

  return ok;
}

function calc() {
  const ctc     = parseFloat(iCTC.value);
  const bonus   = parseFloat(iBonus.value);
  const pfRate  = parseFloat(iPF.value)  / 100;
  const taxRate = parseFloat(iTax.value) / 100;

  const fixedPay   = ctc - bonus;
  const pfAmt      = fixedPay * pfRate;
  const taxAmt     = fixedPay * taxRate;
  const deductions = pfAmt + taxAmt;
  const annualNet  = fixedPay - deductions;
  const monthlyNet = annualNet / 12;

  return { ctc, bonus, fixedPay, pfAmt, taxAmt, deductions, annualNet, monthlyNet };
}

function render(d) {
  emptyState.style.display = 'none';
  resultsBlock.classList.remove('show');
  
  void resultsBlock.offsetWidth;
  resultsBlock.classList.add('show');

  countUp(svMonthly, d.monthlyNet, inr);
  countUp(svFixed,   d.fixedPay,   inr);
  countUp(svAnnual,  d.annualNet,  inr);
  countUp(svDeduct,  d.deductions, inr);

  subMonthly.textContent = `from ${lpa(d.ctc)} CTC`;

  const deductPct = d.fixedPay > 0 ? (d.deductions / d.fixedPay) * 100 : 0;
  healthPct.textContent = deductPct.toFixed(1) + '%';
  
  setTimeout(() => {
    healthFill.style.width = deductPct + '%';
    healthFill.className = 'health-fill';
    if (deductPct > 30) healthFill.classList.add('bad');
    else if (deductPct > 15) healthFill.classList.add('warn');
  }, 100);

  if (deductPct <= 15) healthNote.textContent = 'Healthy deduction rate.';
  else if (deductPct <= 30) healthNote.textContent = 'Moderate tax bracket.';
  else healthNote.textContent = 'High tax burden detected.';

  const total = d.ctc;
  const pcts = {
    inhand: (d.annualNet / total) * 100,
    pf    : (d.pfAmt     / total) * 100,
    tax   : (d.taxAmt    / total) * 100,
    bonus : (d.bonus     / total) * 100,
  };

  setTimeout(() => {
    bInhand.style.width = pcts.inhand + '%';
    bPF.style.width     = pcts.pf     + '%';
    bTax.style.width    = pcts.tax    + '%';
    bBonus.style.width  = pcts.bonus  + '%';
  }, 100);

  pInhand.textContent = pcts.inhand.toFixed(1) + '%';
  pPF.textContent     = pcts.pf.toFixed(1)     + '%';
  pTax.textContent    = pcts.tax.toFixed(1)    + '%';
  pBonus.textContent  = pcts.bonus.toFixed(1)  + '%';

  renderTable(d);
}

const BENCHMARKS = [500000, 800000, 1200000, 1800000, 2500000, 4000000];

function renderTable(d) {
  const pfRate  = parseFloat(iPF.value)  / 100;
  const taxRate = parseFloat(iTax.value) / 100;

  const list = [...new Set([...BENCHMARKS, d.ctc])].sort((a, b) => a - b);
  cmpBody.innerHTML = '';

  list.forEach(ctc => {
    const bonus = ctc === d.ctc ? d.bonus : (ctc * 0.1); 
    const fixed = ctc - bonus;
    const net   = fixed * (1 - pfRate - taxRate);
    const moNet = net / 12;
    const moGro = ctc / 12;
    const keep  = (net / ctc) * 100;

    const tr = document.createElement('tr');
    if (ctc === d.ctc) tr.className = 'you-row';
    
    let keepClass = '';
    if (keep >= 80) keepClass = 'hi';
    else if (keep < 60) keepClass = 'lo';

    tr.innerHTML = `
      <td>${lpa(ctc)} ${ctc === d.ctc ? '<span style="font-size:10px;background:var(--green);color:#000;padding:2px 6px;border-radius:4px;margin-left:6px;vertical-align:middle;">YOU</span>' : ''}</td>
      <td>${inr(fixed)}</td>
      <td>${inr(moGro)}</td>
      <td>${inr(moNet)}</td>
      <td class="keep-pct ${keepClass}">${keep.toFixed(1)}%</td>
    `;
    cmpBody.appendChild(tr);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (validate()) render(calc());
});

btnReset.addEventListener('click', () => {
  form.reset();
  tagCTC.textContent = '';
  tagCTC.classList.remove('show');
  tagBonus.textContent = '';
  tagBonus.classList.remove('show');

  ['fCTC','fBonus','fPF','fTax'].forEach(id => clearErr(id, id.replace('f','e')));

  emptyState.style.display = 'flex';
  resultsBlock.classList.remove('show');

  healthFill.style.width = '0%';
  [bInhand, bPF, bTax, bBonus].forEach(b => b.style.width = '0%');
  cmpBody.innerHTML = '';
  iCTC.focus();
});

iCTC.addEventListener('input', () => {
  const v = parseFloat(iCTC.value);
  if (v > 0) {
      tagCTC.textContent = lpa(v);
      tagCTC.classList.add('show');
  } else {
      tagCTC.classList.remove('show');
  }
  clearErr('fCTC', 'eCTC');
});

iBonus.addEventListener('input', () => {
  const v = parseFloat(iBonus.value);
  if (v > 0) {
      tagBonus.textContent = lpa(v);
      tagBonus.classList.add('show');
  } else {
      tagBonus.classList.remove('show');
  }
  clearErr('fBonus', 'eBonus');
});

iPF.addEventListener('input',  () => clearErr('fPF',  'ePF'));
iTax.addEventListener('input', () => clearErr('fTax', 'eTax'));

[iCTC, iBonus, iPF, iTax].forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); btnCalc.click(); }
  });
});

const canvas =
document.getElementById(
"constellation"
);

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

const mouse = {

x:null,
y:null,
radius:140

};

window.addEventListener(
"mousemove",
e=>{

mouse.x = e.clientX;
mouse.y = e.clientY;

}
);

const stars = [];

const STAR_COUNT =
window.innerWidth < 768
? 35
: 60;

class Star{

constructor(){

this.x =
Math.random() *
canvas.width;

this.y =
Math.random() *
canvas.height;

this.vx =
(Math.random()-0.5)
* 0.4;

this.vy =
(Math.random()-0.5)
* 0.4;

this.radius =
Math.random()*2 + 1;

}

update(){

this.x += this.vx;
this.y += this.vy;

if(this.x < 0 || this.x > canvas.width)
this.vx *= -1;

if(this.y < 0 || this.y > canvas.height)
this.vy *= -1;

if(mouse.x){

const dx =
mouse.x - this.x;

const dy =
mouse.y - this.y;

const dist =
Math.sqrt(
dx*dx + dy*dy
);

if(dist < mouse.radius){

this.x -=
dx * 0.002;

this.y -=
dy * 0.002;

}

}

}

draw(){

const theme =
document.documentElement
.getAttribute(
"data-theme"
);

ctx.beginPath();

ctx.arc(
this.x,
this.y,
this.radius,
0,
Math.PI*2
);

ctx.fillStyle =
theme === "light"
? "rgba(0,0,0,.45)"
: "rgba(255,255,255,.7)";

ctx.fill();

}

}

for(
let i=0;
i<STAR_COUNT;
i++
){

stars.push(
new Star()
);

}

function connectStars(){

const theme =
document.documentElement
.getAttribute(
"data-theme"
);

for(
let a=0;
a<stars.length;
a++
){

for(
let b=a+1;
b<stars.length;
b++
){

const dx =
stars[a].x -
stars[b].x;

const dy =
stars[a].y -
stars[b].y;

const distance =
Math.sqrt(
dx*dx + dy*dy
);

if(distance < 100){

ctx.strokeStyle =
theme === "light"
? `rgba(0,0,0,${
0.08 -
distance/1500
})`
: `rgba(255,255,255,${
0.15 -
distance/1500
})`;

ctx.lineWidth = 1;

ctx.beginPath();

ctx.moveTo(
stars[a].x,
stars[a].y
);

ctx.lineTo(
stars[b].x,
stars[b].y
);

ctx.stroke();

}

}

}

}

function animate(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

stars.forEach(star=>{

star.update();
star.draw();

});

connectStars();

requestAnimationFrame(
animate
);

}

animate();