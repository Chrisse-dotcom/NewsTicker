'use strict';

const STORAGE_KEY = 'newsticker_iran_2026';
let newsItems = [];
let activeFilter = 'alle';
let editingId = null;

// ─── Persistence ─────────────────────────────────────────────────────────────
function loadNews() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    newsItems = stored ? JSON.parse(stored) : [];
  } catch (_) {
    newsItems = [];
  }
}

function saveNews() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newsItems));
  } catch (_) { /* quota exceeded – ignore */ }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function nextId() {
  return newsItems.length ? Math.max(...newsItems.map(n => n.id)) + 1 : 1;
}

function formatTime(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diffMin = Math.round((now - d) / 60000);
  if (diffMin < 1)  return 'Gerade eben';
  if (diffMin < 60) return `vor ${diffMin} Min.`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24)   return `vor ${diffH} Std.`;
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function priorityLabel(p) {
  return { breaking: '🔴 Breaking', hoch: '🟠 Hoch', normal: '🟡 Normal' }[p] || p;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Render ───────────────────────────────────────────────────────────────────
function filteredItems() {
  const sorted = [...newsItems].sort((a, b) => b.ts - a.ts);
  if (activeFilter === 'alle') return sorted;
  if (activeFilter === 'breaking') return sorted.filter(n => n.priority === 'breaking');
  return sorted.filter(n => n.category === activeFilter);
}

function renderCards() {
  const list = document.getElementById('newsList');
  const empty = document.getElementById('emptyState');
  const items = filteredItems();

  if (items.length === 0) {
    list.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  list.innerHTML = items.map(n => `
    <article class="news-card${n.autoFetched ? ' auto-fetched' : ''}" data-id="${n.id}" data-priority="${escapeHtml(n.priority)}" role="listitem">
      <div class="card-meta">
        ${n.autoFetched ? '<span class="badge-auto">RSS</span>' : ''}
        <span class="badge-priority badge-priority--${escapeHtml(n.priority)}">${priorityLabel(n.priority)}</span>
        <span class="badge-category">${escapeHtml(n.category)}</span>
        ${n.source ? `<span class="card-source">${escapeHtml(n.source)}</span>` : ''}
        <span class="card-time">${formatTime(n.ts)}</span>
      </div>
      <h2 class="card-headline">${escapeHtml(n.headline)}</h2>
      ${n.body ? `<p class="card-body">${escapeHtml(n.body)}</p>` : ''}
      <div class="card-actions">
        ${n.link ? `<a class="card-btn source-link" href="${escapeHtml(n.link)}" target="_blank" rel="noopener">&#x1F517; Quelle</a>` : ''}
        <button class="card-btn edit"   data-id="${n.id}">&#9998; Bearbeiten</button>
        <button class="card-btn delete" data-id="${n.id}">&#x1F5D1; Löschen</button>
      </div>
    </article>
  `).join('');
}

function renderTicker() {
  const track = document.getElementById('tickerTrack');
  const items = [...newsItems]
    .sort((a, b) => b.ts - a.ts)
    .filter(n => n.priority === 'breaking' || n.priority === 'hoch')
    .slice(0, 10);

  // Repeat items so ticker loops smoothly
  const content = [...items, ...items]
    .map(n => `<span class="ticker-item">${escapeHtml(n.headline)}</span>`)
    .join('');
  track.innerHTML = content;

  // Adjust animation duration based on content length
  const len = items.reduce((s, n) => s + n.headline.length, 0);
  const dur = Math.max(30, Math.min(120, len * 0.35));
  track.style.animationDuration = dur + 's';
}

function renderStats() {
  const breaking = newsItems.filter(n => n.priority === 'breaking').length;
  document.getElementById('statsTotal').textContent = `${newsItems.length} Meldung${newsItems.length !== 1 ? 'en' : ''}`;
  document.getElementById('statsBreaking').textContent = `${breaking} Breaking`;
  document.getElementById('statsUpdated').textContent =
    'Aktualisiert: ' + new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

function render() {
  renderCards();
  renderTicker();
  renderStats();
}

// ─── Clock ────────────────────────────────────────────────────────────────────
function updateClock() {
  const el = document.getElementById('live-clock');
  const now = new Date();
  el.textContent = now.toLocaleTimeString('de-DE', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function openAdmin() {
  const panel = document.getElementById('adminPanel');
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  document.getElementById('newsHeadline').focus();
}

function closeAdmin() {
  const panel = document.getElementById('adminPanel');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  resetForm();
}

function resetForm() {
  document.getElementById('newsForm').reset();
  document.getElementById('editId').value = '';
  editingId = null;
}

function populateForm(item) {
  document.getElementById('editId').value = item.id;
  document.getElementById('newsHeadline').value = item.headline;
  document.getElementById('newsBody').value = item.body || '';
  document.getElementById('newsCategory').value = item.category;
  document.getElementById('newsPriority').value = item.priority;
  document.getElementById('newsSource').value = item.source || '';
  editingId = item.id;
  openAdmin();
}

// ─── Event Handlers ───────────────────────────────────────────────────────────
document.getElementById('toggleAdmin').addEventListener('click', () => {
  const panel = document.getElementById('adminPanel');
  if (panel.classList.contains('open')) {
    closeAdmin();
  } else {
    openAdmin();
  }
});

document.getElementById('cancelEdit').addEventListener('click', closeAdmin);

document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const headline = document.getElementById('newsHeadline').value.trim();
  if (!headline) return;

  const item = {
    headline,
    body:     document.getElementById('newsBody').value.trim(),
    category: document.getElementById('newsCategory').value,
    priority: document.getElementById('newsPriority').value,
    source:   document.getElementById('newsSource').value.trim(),
    ts:       Date.now(),
  };

  if (editingId !== null) {
    const idx = newsItems.findIndex(n => n.id === editingId);
    if (idx !== -1) {
      newsItems[idx] = { ...newsItems[idx], ...item };
    }
  } else {
    newsItems.push({ id: nextId(), ...item });
  }

  saveNews();
  render();
  closeAdmin();
});

// Card actions (edit / delete) via event delegation
document.getElementById('newsList').addEventListener('click', e => {
  const editBtn  = e.target.closest('.card-btn.edit');
  const delBtn   = e.target.closest('.card-btn.delete');

  if (editBtn) {
    const id = parseInt(editBtn.dataset.id, 10);
    const item = newsItems.find(n => n.id === id);
    if (item) populateForm(item);
  }

  if (delBtn) {
    const id = parseInt(delBtn.dataset.id, 10);
    if (confirm('Meldung wirklich löschen?')) {
      newsItems = newsItems.filter(n => n.id !== id);
      saveNews();
      render();
    }
  }
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCards();
  });
});

// Fetch-Button in der Stats-Bar
document.getElementById('btnFetch').addEventListener('click', () => fetchAndMergeNews());

// FAB → Nachrichten aktualisieren
document.getElementById('fabAdd').addEventListener('click', () => fetchAndMergeNews());

// "Alle löschen" im Admin-Panel
document.getElementById('clearAll').addEventListener('click', () => {
  if (confirm('Wirklich ALLE Meldungen löschen?')) {
    newsItems = [];
    saveNews();
    render();
    closeAdmin();
  }
});

// ─── Auto-Fetch RSS ───────────────────────────────────────────────────────────
const AUTO_FEEDS = [
  { name: 'Al Jazeera',  url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  { name: 'Tagesschau',  url: 'https://www.tagesschau.de/xml/rss2' },
  { name: 'ZDF heute',   url: 'https://www.zdf.de/rss/zdf/nachrichten' },
  { name: 'DW',          url: 'https://rss.dw.com/xml/rss-de-all' },
  { name: 'Euronews DE', url: 'https://feeds.feedburner.com/euronews/de/news/' },
];

const IRAN_KW = [
  'iran', 'irans', 'iranisch', 'iranian',
  'chamenei', 'khamenei',
  'teheran', 'tehran',
  'hisbollah', 'hezbollah',
  'hormus', 'hormuz',
  'irgc', 'nahost', 'nahostkrieg',
  'epische wut', 'epic wrath',
];

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
const FETCH_EVERY  = 10 * 60 * 1000;   // alle 10 Minuten
const MAX_AGE      = 24 * 3600 * 1000; // 24 Stunden – ältere News werden gelöscht

function guessCategory(txt) {
  const t = txt.toLowerCase();
  if (['angriff', 'rakete', 'militär', 'soldat', 'armee', 'luftwaffe', 'bomben',
       'strike', 'attack', 'military', 'troops', 'war', 'drone', 'drohne', 'krieg'].some(k => t.includes(k))) return 'militär';
  if (['wirtschaft', 'öl', 'gas', 'markt', 'preis', 'energie',
       'oil', 'economy', 'market', 'barrel', 'dollar'].some(k => t.includes(k))) return 'wirtschaft';
  if (['diplomatie', 'botschaft', 'sanktion', 'verhandlung',
       'embassy', 'sanction', 'talks'].some(k => t.includes(k))) return 'diplomatie';
  if (['flüchtling', 'humanitär', 'zivilist', 'hilfe',
       'humanitarian', 'civilian', 'refugee'].some(k => t.includes(k))) return 'humanitär';
  return 'politik';
}

function guessPriority(txt) {
  const t = txt.toLowerCase();
  if (['eilmeldung', 'breaking', 'getötet', 'killed', 'explosion',
       'gesperrt', 'blockiert'].some(k => t.includes(k))) return 'breaking';
  if (['krieg', 'war', 'rakete', 'missile', 'eskalation', 'escalation',
       'bomben', 'bombs'].some(k => t.includes(k))) return 'hoch';
  return 'normal';
}

function setFetchStatus(msg, spin = false) {
  document.getElementById('fetchStatus').textContent = msg;
  document.getElementById('btnFetch').classList.toggle('spinning', spin);
  document.getElementById('fabAdd').classList.toggle('spinning', spin);
}

async function fetchOneFeed(feed) {
  const res = await fetch(RSS2JSON_API + encodeURIComponent(feed.url), { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== 'ok') throw new Error(data.message || 'Feed-Fehler');

  return (data.items || []).map(item => {
    const headline = (item.title || '').trim();
    const body     = (item.description || item.content || '')
      .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 350);
    const link     = (item.link || '').trim();

    if (!headline) return null;
    const combined = (headline + ' ' + body).toLowerCase();
    if (!IRAN_KW.some(kw => combined.includes(kw))) return null;

    const ts = item.pubDate ? new Date(item.pubDate).getTime() : Date.now();
    if (isNaN(ts) || Date.now() - ts > MAX_AGE) return null;

    return {
      headline,
      body,
      source: feed.name,
      link,
      ts,
      category: guessCategory(combined),
      priority: guessPriority(combined),
      autoFetched: true,
    };
  }).filter(Boolean);
}

async function fetchAndMergeNews() {
  setFetchStatus('Lade Nachrichten…', true);

  const results = await Promise.allSettled(AUTO_FEEDS.map(fetchOneFeed));
  const fetched = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  // Alle Meldungen älter als 24h entfernen
  newsItems = newsItems.filter(n => Date.now() - n.ts < MAX_AGE);

  // Duplikate herausfiltern (erste 60 Zeichen der Headline)
  const seen = new Set(newsItems.map(n => n.headline.toLowerCase().slice(0, 60)));
  const newItems = fetched.filter(n => !seen.has(n.headline.toLowerCase().slice(0, 60)));

  if (newItems.length > 0) {
    let maxId = newsItems.length ? Math.max(...newsItems.map(n => n.id)) : 0;
    newItems.forEach((n, i) => { n.id = maxId + i + 1; newsItems.push(n); });
    saveNews();
    render();
  }

  const t = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const failed = results.filter(r => r.status === 'rejected').length;
  if (failed === AUTO_FEEDS.length) {
    setFetchStatus(`⚠ Verbindung fehlgeschlagen · ${t}`, false);
  } else if (newItems.length > 0) {
    setFetchStatus(`+${newItems.length} neu · ${t}`, false);
  } else {
    setFetchStatus(`Aktuell · ${t}`, false);
  }
  setTimeout(() => setFetchStatus(''), 12000);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  loadNews();
  render();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(() => renderCards(), 60000);
  fetchAndMergeNews();
  setInterval(fetchAndMergeNews, FETCH_EVERY);

  // Footer date
  document.getElementById('footerDate').textContent =
    new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

document.addEventListener('DOMContentLoaded', init);
