'use strict';

// ─── Initial news data (Iran crisis, 2. März 2026) ───────────────────────────
const INITIAL_NEWS = [
  {
    id: 1,
    headline: '🔴 USA & Israel töten Chamenei – Militäroperation „Epische Wut"',
    body: 'Am 28. Februar 2026 starteten die USA und Israel die Militäroperation „Epische Wut" gegen den Iran. Dabei wurden Irans Staatsoberhaupt Ajatollah Ali Chamenei sowie zahlreiche hochrangige Sicherheitsoffiziere getötet.',
    category: 'militär',
    priority: 'breaking',
    source: 'Al Jazeera / Euronews',
    ts: Date.now() - 1000 * 60 * 60 * 22,
  },
  {
    id: 2,
    headline: 'Trump schließt Einsatz von Bodentruppen gegen Iran nicht mehr aus',
    body: 'US-Präsident Donald Trump deutete an, er schließe den Einsatz amerikanischer Bodentruppen gegen den Iran nun nicht mehr aus, obwohl Verteidigungsminister Hegseth zuvor erklärt hatte, ein Regimewechsel sei nicht das Ziel.',
    category: 'militär',
    priority: 'breaking',
    source: 't-online',
    ts: Date.now() - 1000 * 60 * 60 * 18,
  },
  {
    id: 3,
    headline: 'USA erlangen Kontrolle über iranischen Luftraum',
    body: 'Laut Berichten haben US-Streitkräfte weitgehend die Kontrolle über den Luftraum des Iran erlangt. Trump drohte gleichzeitig mit einer „großen Welle" weiterer Angriffe.',
    category: 'militär',
    priority: 'hoch',
    source: 't-online',
    ts: Date.now() - 1000 * 60 * 60 * 16,
  },
  {
    id: 4,
    headline: 'Iran schlägt mit Raketen & Drohnen gegen Golfstaaten zurück',
    body: 'Der Iran feuerte ballistische Raketen und Drohnen auf Ziele in den Vereinigten Arabischen Emiraten, Katar, Kuwait und Saudi-Arabien. Getroffen wurden u.a. das Fairmont Hotel in Dubai und der Flughafen Dubai International.',
    category: 'militär',
    priority: 'breaking',
    source: 'Bloomberg / Euronews',
    ts: Date.now() - 1000 * 60 * 60 * 20,
  },
  {
    id: 5,
    headline: 'Katar: Luftwaffe schießt zwei iranische Su-24 ab – Energieanlagen getroffen',
    body: 'Die katarische Luftwaffe gab bekannt, zwei iranische Su-24-Kampfflugzeuge, sieben ballistische Raketen und fünf Drohnen abgefangen zu haben. Dennoch wurden zwei Energieanlagen (Mesaieed Energy & QatarEnergy, Ras Laffan) beschädigt.',
    category: 'militär',
    priority: 'hoch',
    source: 'Bloomberg',
    ts: Date.now() - 1000 * 60 * 60 * 15,
  },
  {
    id: 6,
    headline: 'Iran nach Chameneis Tod: Dreiköpfiger Übergangsrat übernimmt Führung',
    body: 'Nach der Tötung Ajatollah Chameneis soll Iran übergangsweise von einem dreiköpfigen Rat regiert werden, bis der Expertenrat aus 88 Geistlichen einen Nachfolger bestimmt hat.',
    category: 'politik',
    priority: 'hoch',
    source: 'ZDF heute',
    ts: Date.now() - 1000 * 60 * 60 * 14,
  },
  {
    id: 7,
    headline: 'Israel kündigt weitere Luftangriffe auf Hisbollah im Libanon an',
    body: 'Israelische Streitkräfte bestätigten neue Angriffswellen gegen Hisbollah-Positionen im Libanon. Ein hochrangiger Kommandeur der Al-Quds-Brigaden (Islamischer Dschihad) wurde laut Haaretz bei Angriffen in Beirut getötet.',
    category: 'militär',
    priority: 'hoch',
    source: 'Al Jazeera / Haaretz',
    ts: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: 8,
    headline: 'EU-Kommission äußert sich „sehr besorgt" – Merz begrüßt Ende des Terrorregimes',
    body: 'EU-Kommissionspräsidentin von der Leyen und Ratspräsident Costa veröffentlichten eine gemeinsame Erklärung zu den „sehr besorgniserregenden Entwicklungen" im Iran. Bundeskanzler Friedrich Merz zeigte sich am 1. März erleichtert über das „absehbare Ende des Terrorregimes".',
    category: 'diplomatie',
    priority: 'normal',
    source: 'EU-Kommission / ARD',
    ts: Date.now() - 1000 * 60 * 60 * 10,
  },
  {
    id: 9,
    headline: 'Ölmärkte unter Druck – Über 450 Flüge in Deutschland gestrichen',
    body: 'Die Eskalation im Nahen Osten belastet die globalen Ölmärkte deutlich. An den acht größten deutschen Flughäfen wurden bis zum 5. März mehr als 450 Flüge gestrichen – Airlines meiden den nahöstlichen Luftraum.',
    category: 'wirtschaft',
    priority: 'hoch',
    source: 'Bloomberg / dpa',
    ts: Date.now() - 1000 * 60 * 60 * 8,
  },
  {
    id: 10,
    headline: 'Analysten warnen vor regionalem Krieg historischen Ausmaßes',
    body: 'Russische und westliche Analysten sehen ein hohes Eskalationsrisiko für einen regionalen Krieg. Fjodor Lukjanow (Russia in Global Affairs): Trump habe dem Iran faktisch eine „Kriegserklärung bis zum Regimewechsel" gestellt. Humanitäre und ökologische Folgen für die gesamte Golfregion werden als „unkalkulierbar" eingestuft.',
    category: 'politik',
    priority: 'hoch',
    source: 'Pravda DE / CNBC',
    ts: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: 11,
    headline: '🔴 Straße von Hormus gesperrt – globale Öl- und Gaslieferungen unterbrochen',
    body: 'Der Iran hat die Straße von Hormus blockiert. Durch diese strategisch wichtige Meerenge fließen rund 20 % des weltweiten Öl- und Gashandels. Öl- und Gasmärkte reagieren mit massiven Preissteigerungen. Die EU hat einen Energie-Krisenstab einberufen.',
    category: 'wirtschaft',
    priority: 'breaking',
    source: 'CBS News / EU-Kommission',
    ts: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: 12,
    headline: 'Chameneis Ehefrau erliegt ihren Verletzungen',
    body: 'Mansoureh Khojasteh Bagherzadeh (79), Ehefrau des getöteten Ajatollah Chamenei, ist nach Angaben der iranischen Nachrichtenagentur Tasnim ihren Verletzungen erlegen. Bereits beim ersten Angriff wurden Tochter, Schwiegersohn und ein Enkelkind getötet.',
    category: 'politik',
    priority: 'hoch',
    source: 'Tasnim / t-online',
    ts: Date.now() - 1000 * 60 * 60 * 4,
  },
  {
    id: 13,
    headline: '🔴 Kuwait schießt versehentlich drei US-amerikanische F-15E ab',
    body: 'Während iranischer Angriffe schoss Kuwait versehentlich drei US-amerikanische F-15E Strike Eagles ab. US Central Command bestätigte: Alle sechs Piloten konnten sich katapultieren und befinden sich in stabilem Zustand.',
    category: 'militär',
    priority: 'breaking',
    source: 'CBS News / US Central Command',
    ts: Date.now() - 1000 * 60 * 60 * 3,
  },
  {
    id: 14,
    headline: 'Vierter US-Soldat gefallen – Trump kündigt Vergeltung an',
    body: 'Das US-Militär bestätigte den Tod eines vierten amerikanischen Soldaten seit Beginn der Operation. Trump erklärte, er werde die Tode „rächen". Der Präsident rechnet mit weiteren US-Opfern und kündigte an, Angriffe könnten noch vier bis fünf Wochen andauern.',
    category: 'militär',
    priority: 'breaking',
    source: 'NPR / CNBC',
    ts: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: 15,
    headline: 'Hisbollah feuert Raketen auf Israel – israelische Gegenschläge im Libanon',
    body: 'Am 2. März startete die Hisbollah erneut Raketenangriffe auf Israel und brach damit den Waffenstillstand von 2024. Israel antwortete sofort mit Luftangriffen auf Stellungen im Libanon. Der Konflikt weitet sich damit auf eine zweite Front aus.',
    category: 'militär',
    priority: 'breaking',
    source: 'CNN / Al Jazeera',
    ts: Date.now() - 1000 * 60 * 60 * 1,
  },
  {
    id: 16,
    headline: 'US-Kongress berät Kriegsvollmachten-Resolution gegen Trump',
    body: 'Senator Tim Kaine (D-VA) bezeichnete den Angriff auf Iran als „illegalen Krieg" und brachte eine War Powers Resolution ein. Diese würde Trump zwingen, die Militäroperation einzustellen. Ein Veto des Präsidenten gilt als sicher – die Debatte belastet Trumps Rückhalt im Kongress.',
    category: 'politik',
    priority: 'hoch',
    source: 'PBS News / CBS News',
    ts: Date.now() - 1000 * 60 * 30,
  },
];

// ─── State ────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'newsticker_iran_2026';
const STORAGE_VERSION = '3'; // Erhöhen wenn INITIAL_NEWS sich ändert
const VERSION_KEY = 'newsticker_version';
let newsItems = [];
let activeFilter = 'alle';
let editingId = null;

// ─── Persistence ─────────────────────────────────────────────────────────────
function loadNews() {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored && storedVersion === STORAGE_VERSION) {
      newsItems = JSON.parse(stored);
      // Merge in any new INITIAL_NEWS items not yet in storage
      const storedIds = new Set(newsItems.map(n => n.id));
      const newItems = INITIAL_NEWS.filter(n => !storedIds.has(n.id));
      if (newItems.length > 0) {
        newsItems = newsItems.concat(newItems.map(n => ({ ...n })));
        saveNews();
      }
    } else {
      // Version veraltet oder kein Eintrag: Nutzer-Meldungen behalten, INITIAL_NEWS neu laden
      let userItems = [];
      if (stored && storedVersion !== STORAGE_VERSION) {
        const oldItems = JSON.parse(stored);
        const initialIds = new Set(INITIAL_NEWS.map(n => n.id));
        // Nur manuell hinzugefügte Meldungen (IDs > max INITIAL_NEWS ID) behalten
        userItems = oldItems.filter(n => !initialIds.has(n.id));
      }
      newsItems = [...INITIAL_NEWS.map(n => ({ ...n })), ...userItems];
      saveNews();
    }
  } catch (_) {
    newsItems = INITIAL_NEWS.map(n => ({ ...n }));
  }
}

function saveNews() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newsItems));
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
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

// FAB "+ Neue Meldung" → öffnet Eingabeformular
document.getElementById('fabAdd').addEventListener('click', () => {
  resetForm();
  openAdmin();
});

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

const CORS_PROXY   = 'https://api.allorigins.win/raw?url=';
const FETCH_EVERY  = 10 * 60 * 1000;    // alle 10 Minuten
const AUTO_MAX_AGE = 72 * 3600 * 1000;  // 72 Stunden vorhalten

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
}

async function fetchOneFeed(feed) {
  const res = await fetch(CORS_PROXY + encodeURIComponent(feed.url), { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const xml  = new DOMParser().parseFromString(text, 'text/xml');
  if (xml.querySelector('parsererror')) throw new Error('XML-Fehler');

  return [...xml.querySelectorAll('item')].map(item => {
    const headline = (item.querySelector('title')?.textContent || '').trim();
    const body     = (item.querySelector('description')?.textContent || '')
      .replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 350);
    const pubDate  = item.querySelector('pubDate')?.textContent?.trim() || '';
    const link     = (item.querySelector('link')?.textContent ||
                      item.querySelector('guid')?.textContent || '').trim();

    if (!headline) return null;
    const combined = (headline + ' ' + body).toLowerCase();
    if (!IRAN_KW.some(kw => combined.includes(kw))) return null;

    const ts = pubDate ? new Date(pubDate).getTime() : Date.now();
    if (isNaN(ts) || Date.now() - ts > AUTO_MAX_AGE) return null;

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

  // Veraltete Auto-Meldungen entfernen
  newsItems = newsItems.filter(n => !n.autoFetched || Date.now() - n.ts < AUTO_MAX_AGE);

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
  setFetchStatus(newItems.length > 0 ? `+${newItems.length} neu · ${t}` : `Aktuell · ${t}`, false);
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
