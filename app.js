let geminiApiKey = localStorage.getItem('geminiApiKey') || '';

// ─── DATA ───────────────────────────────────────────
const issues = [
    { id: 1, title: "Deep pothole causing accidents near school", cat: "road", status: "open", location: "MG Road, near Govt. School, Jaipur", desc: "A 1-foot deep pothole has formed at the corner of MG Road and School Lane. Two bikes have already skidded here this week. The pothole fills with water when it rains, making it invisible to drivers.", votes: 34, time: "2h ago", aiTag: true, aiNote: "High-risk location due to school proximity and rain-season timing. Recommend urgent patching within 48 hours." },
    { id: 2, title: "Water pipe burst — road flooding", cat: "water", status: "progress", location: "Civil Lines, Near Post Office", desc: "A municipal water pipe has burst and water has been flowing since yesterday morning. The road is flooded and a few shops are being affected.", votes: 22, time: "5h ago", aiTag: true, aiNote: "Estimated 5,000 litres/hour loss. Closest municipal valve is 200m west on Civil Lines main road." },
    { id: 3, title: "5 street lights non-functional on highway stretch", cat: "light", status: "open", location: "Ajmer Highway, KM 12-14", desc: "A 2km stretch of the Ajmer Highway has had no street lighting for 3 weeks. The area sees heavy truck traffic at night and is considered unsafe.", votes: 18, time: "1d ago", aiTag: false, aiNote: "High accident risk zone. Recommend emergency lighting or flagging to highway authority." },
    { id: 4, title: "Illegal garbage dumping — health hazard", cat: "waste", status: "resolved", location: "Behind Sindhi Camp Bus Station", desc: "Residents have been dumping garbage behind the bus station for weeks. The pile is now 6 feet high and attracting stray animals.", votes: 41, time: "3d ago", aiTag: true, aiNote: "Potential disease vector. Recommend sanitization followed by CCTV deterrent installation." },
    { id: 5, title: "Broken footpath slabs — fall risk for elderly", cat: "road", status: "progress", location: "Vaishali Nagar Market, Block C", desc: "Multiple footpath slabs are broken or missing near the market area. An elderly resident slipped here yesterday and injured their wrist.", votes: 15, time: "6h ago", aiTag: false, aiNote: "Accessibility concern. Prioritize temporary barricading and repair within 7 days." },
    { id: 6, title: "Sewage overflow near residential colony", cat: "water", status: "open", location: "Mansarovar, Sector 7, Block D", desc: "Sewage has been overflowing from a blocked drain for 4 days. The smell is severe and children are unable to play outside.", votes: 29, time: "4h ago", aiTag: true, aiNote: "Sanitation emergency. Risk of waterborne disease. Recommend immediate drain clearance." },
];

let currentFilter = 'all';
let severity = 'high';
let currentIssueId = null;
let openCount = issues.filter(i => i.status === 'open').length;

const leaderboard = [
    { name: "Ravi Sharma", loc: "Vaishali Nagar", pts: 1240, pct: 100, color: "#f97316" },
    { name: "Priya Meena", loc: "Mansarovar", pts: 980, pct: 79, color: "#8b5cf6" },
    { name: "Arjun Singh", loc: "Civil Lines", pts: 840, pct: 68, color: "#3b82f6" },
    { name: "Kavita Joshi", loc: "Sindhi Camp", pts: 720, pct: 58, color: "#ec4899" },
    { name: "Deepak Verma", loc: "Ajmer Road", pts: 610, pct: 49, color: "#14b8a6" },
    { name: "Sunita Bai", loc: "Jagatpura", pts: 510, pct: 41, color: "#f59e0b" },
    { name: "Mohammed Ali", loc: "Amer Road", pts: 440, pct: 35, color: "#22c55e" },
];

const weekData = [
    { label: "Mon", val: 5 }, { label: "Tue", val: 8 }, { label: "Wed", val: 3 },
    { label: "Thu", val: 11 }, { label: "Fri", val: 7 }, { label: "Sat", val: 9 }, { label: "Sun", val: 4 },
];

// ─── PAGE NAV ───────────────────────────────────────
function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    const tabs = { home: 0, report: 1, dashboard: 2, leaderboard: 3 };
    document.querySelectorAll('.nav-tab')[tabs[name]]?.classList.add('active');
    if (name === 'dashboard') renderBarChart();
    if (name === 'leaderboard') renderLeaderboard();
}

// ─── RENDER FEED ────────────────────────────────────
function catClass(c) {
    return { road: 'cat-road', water: 'cat-water', light: 'cat-light', waste: 'cat-waste', other: 'cat-other' }[c] || 'cat-other';
}
function catLabel(c) {
    return { road: '🚧 Road', water: '💧 Water', light: '💡 Lighting', waste: '🗑️ Waste', other: '📌 Other' }[c] || c;
}
function statusClass(s) {
    return { open: 'status-open', progress: 'status-progress', resolved: 'status-resolved' }[s] || '';
}
function statusLabel(s) {
    return { open: 'Open', progress: 'In Progress', resolved: 'Resolved' }[s] || s;
}

function renderFeed() {
    const feed = document.getElementById('issues-feed');
    const filtered = currentFilter === 'all' ? issues : issues.filter(i => i.cat === currentFilter);
    if (!filtered.length) {
        feed.innerHTML = '<div class="empty"><div class="empty-icon">🔍</div><p>No issues in this category yet.<br/>Be the first to report!</p></div>';
        return;
    }
    feed.innerHTML = filtered.map(issue => `
<div class="issue-card" onclick="openModal(${issue.id})">
<div class="issue-card-top">
<span class="issue-cat ${catClass(issue.cat)}">${catLabel(issue.cat)}</span>
<span class="issue-status ${statusClass(issue.status)}">${statusLabel(issue.status)}</span>
</div>
<div class="issue-title">${issue.title}</div>
<div class="issue-desc">${issue.desc.substring(0, 110)}…</div>
<div class="issue-meta">
<span class="issue-loc">📍 ${issue.location}</span>
<button class="vote-btn" onclick="event.stopPropagation();voteIssue(${issue.id},this)">
  ▲ <span class="vote-num">${issue.votes}</span>
</button>
${issue.aiTag ? `<span class="ai-tag">✨ AI Analyzed</span>` : ''}
<span class="issue-time">${issue.time}</span>
</div>
</div>
`).join('');
    document.getElementById('open-count').textContent = issues.filter(i => i.status === 'open').length;
}

function filterIssues(f, el) {
    currentFilter = f;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    renderFeed();
}

function voteIssue(id, btn) {
    const issue = issues.find(i => i.id === id);
    if (!issue) return;
    if (btn.classList.contains('voted')) {
        issue.votes--;
        btn.classList.remove('voted');
    } else {
        issue.votes++;
        btn.classList.add('voted');
    }
    btn.querySelector('.vote-num').textContent = issue.votes;
}

// ─── MODAL ──────────────────────────────────────────
function openModal(id) {
    const issue = issues.find(i => i.id === id);
    if (!issue) return;
    currentIssueId = id;
    document.getElementById('modal-title').textContent = issue.title;
    document.getElementById('modal-cat').innerHTML = `<span class="issue-cat ${catClass(issue.cat)}">${catLabel(issue.cat)}</span> <span class="issue-status ${statusClass(issue.status)}" style="margin-left:6px">${statusLabel(issue.status)}</span>`;
    document.getElementById('modal-loc').textContent = '📍 ' + issue.location;
    document.getElementById('modal-desc').textContent = issue.desc;
    document.getElementById('modal-ai').textContent = issue.aiNote;
    document.getElementById('modal-overlay').classList.add('open');
}
function closeModal(e) { if (e.target === document.getElementById('modal-overlay')) closeModalBtn(); }
function closeModalBtn() { document.getElementById('modal-overlay').classList.remove('open'); }
function verifyIssue() {
    closeModalBtn();
    showToast('✅ Issue verified! +10 XP earned');
}

// ─── SETTINGS ───────────────────────────────────────
function openSettingsModal() {
    document.getElementById('api-key-input').value = geminiApiKey;
    document.getElementById('settings-modal-overlay').classList.add('open');
}
function closeSettingsModalEvent(e) { if (e.target === document.getElementById('settings-modal-overlay')) closeSettingsModal(); }
function closeSettingsModal() { document.getElementById('settings-modal-overlay').classList.remove('open'); }
function saveApiKey() {
    geminiApiKey = document.getElementById('api-key-input').value.trim();
    localStorage.setItem('geminiApiKey', geminiApiKey);
    closeSettingsModal();
    showToast('✅ API Key saved securely');
}

// ─── REPORT FORM ────────────────────────────────────
async function fetchWithRetry(url, options, retries = 3) {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.ok) return response;
        const errData = await response.text();
        if (response.status === 503 || response.status === 429 || errData.includes('high demand')) {
            console.warn(`API high demand (Attempt ${i + 1}/${retries}). Retrying in ${i + 1}s...`);
            if (i < retries - 1) {
                await new Promise(r => setTimeout(r, 1000 * (i + 1)));
                continue;
            }
        }
        throw new Error(errData);
    }
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        const img = document.getElementById('preview-img');
        img.src = ev.target.result;
        img.style.display = 'block';
        analyzeImageWithAI(ev.target.result, file.type);
    };
    reader.readAsDataURL(file);
}

async function analyzeImageWithAI(base64Data, mimeType) {
    const box = document.getElementById('ai-analysis');
    const statusEl = document.getElementById('ai-status');
    const contentEl = document.getElementById('ai-analysis-content');
    const chipsEl = document.getElementById('ai-chips');
    box.style.display = 'block';
    const spinnerEl = box.querySelector('.spinner');
    if (spinnerEl) spinnerEl.style.display = 'inline-block';
    statusEl.textContent = 'Analyzing image with Gemini AI…';
    contentEl.textContent = '';
    chipsEl.innerHTML = '';

    if (!geminiApiKey) {
        statusEl.textContent = '⚠️ API Key missing. Please click the ⚙️ icon to set your Gemini API key.';
        return;
    }

    const imageData = base64Data.split(',')[1];
    const imageMediaType = mimeType || 'image/jpeg';

    try {
        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: 'You are an AI assistant for a civic issue reporting platform called CivicGuard. Analyze this image and identify any community infrastructure issues. Respond in JSON. Structure: {"category":"road|water|light|waste|other","title":"Short issue title","description":"2 sentence description of the problem","severity":"low|medium|high","suggestions":["suggestion 1","suggestion 2","suggestion 3"]}. If no issue is visible, use category "other" and describe what you see.' },
                        { inlineData: { mimeType: imageMediaType, data: imageData } }
                    ]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });
        
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        let parsed;
        try { parsed = JSON.parse(text.replace(/```json|```/g, '').trim()); } catch (e) { throw new Error('Parse failed'); }

        const spinnerEl = box.querySelector('.spinner');
        if (spinnerEl) spinnerEl.style.display = 'none';
        statusEl.innerHTML = '✅ AI Analysis Complete';
        contentEl.textContent = `Detected: ${parsed.title}. ${parsed.description}`;

        // Auto-fill form
        if (parsed.title) document.getElementById('issue-title').value = parsed.title;
        if (parsed.description) document.getElementById('issue-desc').value = parsed.description;
        if (parsed.category) document.getElementById('issue-category').value = parsed.category;
        if (parsed.severity) setSeverity(parsed.severity, document.querySelector(`.sev-btn.${parsed.severity}`));

        chipsEl.innerHTML = (parsed.suggestions || []).map(s =>
            `<span class="ai-chip" onclick="appendDesc('${s.replace(/'/g, "\\'")}')">+ ${s}</span>`
        ).join('');
    } catch (err) {
        console.error(err);
        const spinnerEl = box.querySelector('.spinner');
        if (spinnerEl) spinnerEl.style.display = 'none';
        
        let errorMsg = 'AI analysis failed — fill details manually';
        try {
            const parsedErr = JSON.parse(err.message);
            if (parsedErr.error && parsedErr.error.message) {
                errorMsg = 'API Error: ' + parsedErr.error.message;
            }
        } catch(e) { }
        statusEl.textContent = '⚠️ ' + errorMsg;
        contentEl.textContent = '';
    }
}

function appendDesc(text) {
    const ta = document.getElementById('issue-desc');
    ta.value = (ta.value ? ta.value + ' ' : '') + text;
}

function setSeverity(val, btn) {
    severity = val;
    document.querySelectorAll('.sev-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

async function getAIAdvice() {
    const title = document.getElementById('issue-title').value;
    const desc = document.getElementById('issue-desc').value;
    const cat = document.getElementById('issue-category').value;
    const box = document.getElementById('ai-advice-box');
    const content = document.getElementById('ai-advice-content');
    box.style.display = 'block';
    content.innerHTML = '<span class="spinner"></span> Getting AI suggestions…';

    if (!geminiApiKey) {
        content.innerHTML = '⚠️ API Key missing. Please click the ⚙️ icon to set your Gemini API key.';
        return;
    }

    try {
        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: `You are a civic infrastructure AI advisor. A citizen in India is reporting this issue: Title: "${title || 'Infrastructure issue'}", Category: "${cat || 'general'}", Description: "${desc || 'Not provided'}". Provide 3 specific, actionable suggestions for: 1) Immediate temporary fix citizens can do, 2) What the municipal authority should do, 3) Preventive measures. Keep it concise and practical. Format as plain text, no markdown.` }
                    ]
                }]
            })
        });
        
        if (!response.ok) {
            const errData = await response.text();
            console.error('API Error Details:', errData);
            throw new Error(errData);
        }
        
        const data = await response.json();
        if (!data.candidates || !data.candidates[0].content) {
            throw new Error(JSON.stringify({ error: { message: "AI response was empty or blocked by safety filters." } }));
        }
        content.textContent = data.candidates[0].content.parts[0].text;
    } catch (err) {
        console.error(err);
        let errorMsg = 'AI suggestions unavailable right now. Please describe the issue manually.';
        try {
            const parsedErr = JSON.parse(err.message);
            if (parsedErr.error && parsedErr.error.message) {
                errorMsg = 'API Error: ' + parsedErr.error.message;
            }
        } catch(e) { }
        content.textContent = errorMsg;
    }
}

function submitIssue() {
    const title = document.getElementById('issue-title').value.trim();
    const desc = document.getElementById('issue-desc').value.trim();
    const location = document.getElementById('issue-location').value.trim();
    const cat = document.getElementById('issue-category').value;

    if (!title || !location) { showToast('⚠️ Please fill in title and location', true); return; }

    const newIssue = {
        id: issues.length + 1,
        title, cat: cat || 'other', status: 'open',
        location, desc: desc || 'No description provided.',
        votes: 0, time: 'Just now', aiTag: false,
        aiNote: 'AI analysis pending. Issue submitted for review.'
    };
    issues.unshift(newIssue);

    // Reset form
    document.getElementById('issue-title').value = '';
    document.getElementById('issue-desc').value = '';
    document.getElementById('issue-location').value = '';
    document.getElementById('issue-category').value = '';
    document.getElementById('preview-img').style.display = 'none';
    document.getElementById('ai-analysis').style.display = 'none';
    document.getElementById('ai-advice-box').style.display = 'none';

    // Update stats
    const total = parseInt(document.getElementById('stat-total').textContent) + 1;
    document.getElementById('stat-total').textContent = total;

    showToast('🎉 Issue reported! +25 XP earned. Thank you, Hero!');
    renderFeed();
    showPage('home');
}

// ─── DASHBOARD ──────────────────────────────────────
function renderBarChart() {
    const max = Math.max(...weekData.map(d => d.val));
    document.getElementById('bar-chart').innerHTML = weekData.map(d => `
<div class="bar-wrap">
<div class="bar-val">${d.val}</div>
<div class="bar" style="height:${Math.round((d.val / max) * 90)}px"></div>
<div class="bar-label">${d.label}</div>
</div>
`).join('');
}

async function getAIInsight() {
    const box = document.getElementById('ai-insight-content');
    box.innerHTML = '<div style="background:var(--surface2);padding:12px;border-radius:8px"><div class="loading-bar"></div><div style="font-size:0.82rem;color:var(--muted);margin-top:8px">Gemini AI is analyzing this week\'s data…</div></div>';

    if (!geminiApiKey) {
        box.innerHTML = `<div style="font-size:0.85rem;color:var(--muted);padding:12px">⚠️ API Key missing. Please click the ⚙️ icon in the top right to set your Gemini API key.</div>`;
        return;
    }

    try {
        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: `You are a civic data analyst AI. Here is this week's community issue data for Jaipur: Total reports: 47. Categories: Road/Potholes 38%, Water leakage 24%, Street lighting 18%, Waste management 12%, Other 8%. Resolution rate: 66%. Average resolution time: 2.4 days. Peak report day: Thursday (11 reports). Provide 3 predictive insights and recommendations for the municipal corporation. Be specific and data-driven. Keep to 150 words max. No markdown.` }
                    ]
                }]
            })
        });
        
        if (!response.ok) {
            const errData = await response.text();
            console.error('API Error Details:', errData);
            throw new Error(errData);
        }
        
        const data = await response.json();
        if (!data.candidates || !data.candidates[0].content) {
            throw new Error(JSON.stringify({ error: { message: "AI response was empty or blocked by safety filters." } }));
        }
        const text = data.candidates[0].content.parts[0].text;
        box.innerHTML = `<div style="background:var(--surface2);border:1px solid rgba(34,197,94,0.2);border-radius:10px;padding:14px"><div style="font-size:0.78rem;color:var(--accent);font-weight:600;margin-bottom:8px">✨ AI Predictive Insights</div><div style="font-size:0.85rem;line-height:1.6;color:var(--text)">${text}</div></div>`;
    } catch (err) {
        console.error(err);
        let errorMsg = 'AI insights unavailable right now.';
        try {
            const parsedErr = JSON.parse(err.message);
            if (parsedErr.error && parsedErr.error.message) {
                errorMsg = 'API Error: ' + parsedErr.error.message;
            }
        } catch(e) { }
        box.innerHTML = `<div style="font-size:0.85rem;color:var(--warn);padding:12px">⚠️ ${errorMsg}</div>`;
    }
}

// ─── LEADERBOARD ────────────────────────────────────
function renderLeaderboard() {
    const ranks = ['🥇', '🥈', '🥉'];
    const colors = ['rank-1', 'rank-2', 'rank-3'];
    document.getElementById('lb-list').innerHTML = leaderboard.map((u, i) => `
<div class="lb-row">
<div class="lb-rank ${colors[i] || ''}">${ranks[i] || i + 1}</div>
<div class="lb-avatar" style="background:${u.color}20;color:${u.color}">${u.name[0]}</div>
<div>
<div class="lb-name">${u.name}</div>
<div class="lb-loc">📍 ${u.loc}</div>
</div>
<div class="xp-bar-wrap">
<div class="xp-bar-bg"><div class="xp-bar-fill" style="width:${u.pct}%"></div></div>
</div>
<div class="lb-pts">${u.pts} <span>XP</span></div>
</div>
`).join('');
}

// ─── TOAST ──────────────────────────────────────────
let toastTimer;
function showToast(msg, warn = false) {
    const t = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    t.style.borderColor = warn ? 'var(--warn)' : 'var(--accent)';
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ─── INIT ────────────────────────────────────────────
renderFeed();
renderLeaderboard();
