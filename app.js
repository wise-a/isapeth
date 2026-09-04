// Global state
let currentScores = {};

// Initialize application
function init() {
    // Populate default scores
    policies.forEach(p => currentScores[p.id] = p.defaultValue);
    
    buildUI();
    populatePresets();
    updateAll();

    // Event Listeners for actions
    document.getElementById("btn-reset").addEventListener("click", resetAll);
    document.getElementById("btn-export").addEventListener("click", exportProfile);
    document.getElementById("btn-import").addEventListener("click", () => document.getElementById("file-import").click());
    document.getElementById("file-import").addEventListener("change", importProfile);
    document.getElementById("preset-selector").addEventListener("change", updateDistances);
    
    // Bulk Shift Initialization
    populateBulkDropdown();
    document.getElementById("btn-apply-bulk").addEventListener("click", applyBulkShift);
}

// Build the sliders DOM
function buildUI() {
    const econContainer = document.getElementById("economy-policies");
    const otherContainer = document.getElementById("other-policies");

    // Group policies by category
    const groupedEcon = groupBy(policies.filter(p => p.dimension === "economy"), "category");
    const groupedOther = groupBy(policies.filter(p => p.dimension === "other"), "category");

    econContainer.innerHTML = buildCategoryHTML(groupedEcon);
    otherContainer.innerHTML = buildCategoryHTML(groupedOther);

    // Bind event listeners
    policies.forEach(p => {
        const slider = document.getElementById(`slider_${p.id}`);
        const numInput = document.getElementById(`num_${p.id}`);
        
        slider.addEventListener("input", (e) => syncValues(p.id, e.target.value, "slider"));
        numInput.addEventListener("input", (e) => syncValues(p.id, e.target.value, "num"));
    });
}

function buildCategoryHTML(groupedPolicies) {
    let html = "";
    for (const [category, items] of Object.entries(groupedPolicies)) {
        html += `<div class="policy-category">
            <div class="category-title">${category}</div>`;
        items.forEach(p => {
            html += `
            <div class="policy-item">
                <div class="policy-label">${p.label}</div>
                <div class="policy-controls">
                    <input type="range" id="slider_${p.id}" min="-10" max="10" step="0.01" value="${p.defaultValue}">
                    <input type="number" id="num_${p.id}" min="-10" max="10" step="0.01" value="${p.defaultValue.toFixed(2)}">
                </div>
            </div>`;
        });
        html += `</div>`;
    }
    return html;
}

function syncValues(id, value, source) {
    let parsed = parseFloat(value);
    if (isNaN(parsed)) return;
    
    // Clamp
    if (parsed > 10) parsed = 10;
    if (parsed < -10) parsed = -10;

    currentScores[id] = parsed;

    if (source === "slider") {
        document.getElementById(`num_${id}`).value = parsed.toFixed(2);
    } else {
        document.getElementById(`slider_${id}`).value = parsed;
    }

    updateAll();
}

function updateAll() {
    const results = calculateScores();
    updateDashboard(results);
    drawMap(results);
    renderCategorySummaries();
    renderExplanations();
    updateDistances();
}

// Math Engine
function calculateScores(scores = currentScores) {
    let econSum = 0, econWeight = 0;
    let otherSum = 0, otherWeight = 0;
    
    let econVals = [];
    let otherVals = [];

    policies.forEach(p => {
        const val = scores[p.id] !== undefined ? scores[p.id] : p.defaultValue;
        if (p.dimension === "economy") {
            econSum += val * p.weight;
            econWeight += p.weight;
            econVals.push(val);
        } else {
            otherSum += val * p.weight;
            otherWeight += p.weight;
            otherVals.push(val);
        }
    });

    const econScore = Math.max(-10, Math.min(10, econSum / (econWeight || 1)));
    const otherScore = Math.max(-10, Math.min(10, otherSum / (otherWeight || 1)));

    return {
        econ: econScore,
        other: otherScore,
        econDispersion: calculateDispersion(econVals),
        otherDispersion: calculateDispersion(otherVals)
    };
}

function calculateDispersion(values) {
    if (values.length === 0) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
}

// Classification System
function getEconClass(score) {
    if (score < -8) return "Hard Left / Socialist";
    if (score < -6) return "Strong Left / Socialist-Leaning";
    if (score < -4) return "Left-Wing";
    if (score < -2) return "Center-Left";
    if (score < -0.75) return "Left-Leaning Center";
    if (score <= 0.75) return "Economic Center";
    if (score <= 2) return "Right-Leaning Center";
    if (score <= 4) return "Center-Right";
    if (score <= 6) return "Right-Wing";
    if (score <= 8) return "Strong Right / Market Conservative";
    return "Hard Right / Laissez-Faire";
}

function getOtherClass(score) {
    if (score < -8) return "Radically Progressive";
    if (score < -6) return "Strongly Progressive";
    if (score < -4) return "Progressive";
    if (score < -2) return "Center-Progressive";
    if (score < -0.75) return "Progressive-Leaning Center";
    if (score <= 0.75) return "Social/Cultural Center";
    if (score <= 2) return "Conservative-Leaning Center";
    if (score <= 4) return "Center-Conservative";
    if (score <= 6) return "Conservative";
    if (score <= 8) return "Strongly Conservative";
    return "Hard Right / Traditionalist";
}

function getHeterogeneityLabel(dispersion) {
    if (dispersion < 2.5) return "Coherent";
    if (dispersion < 4.0) return "Mixed";
    if (dispersion < 5.5) return "Heterodox";
    return "Highly Cross-Pressured";
}

function updateDashboard(res) {
    document.getElementById("score-econ").textContent = (res.econ > 0 ? "+" : "") + res.econ.toFixed(2);
    document.getElementById("score-other").textContent = (res.other > 0 ? "+" : "") + res.other.toFixed(2);
    
    const cEcon = getEconClass(res.econ);
    const cOther = getOtherClass(res.other);
    
    document.getElementById("class-econ").textContent = cEcon;
    document.getElementById("class-other").textContent = cOther;
    
    const hetEcon = getHeterogeneityLabel(res.econDispersion);
    const hetOther = getHeterogeneityLabel(res.otherDispersion);
    
    document.getElementById("het-econ").textContent = hetEcon;
    document.getElementById("het-other").textContent = hetOther;

    document.getElementById("class-combined").textContent = `${cEcon} / ${cOther}`;
    
    // Auto-Description
    const isCross = (res.econDispersion >= 4.0 || res.otherDispersion >= 4.0);
    let desc = `Economically, this profile maps as ${cEcon.toLowerCase()}. On the secondary dimension (social/institutional/foreign), it maps as ${cOther.toLowerCase()}. `;
    if (isCross) {
        desc += "The profile is highly cross-pressured or heterodox, displaying substantial ideological variation across individual issues rather than strictly adhering to a baseline.";
    } else {
        desc += "The profile is relatively coherent, clustering predictably around its average coordinates without extreme internal contradictions.";
    }
    document.getElementById("profile-description").textContent = desc;
}

// 2D Canvas Visualization
function drawMap(res) {
    const canvas = document.getElementById("ideology-map");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw Grid & Axes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for(let i = 0; i <= 20; i+=2) {
        let x = (i/20) * width;
        let y = (i/20) * height;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    ctx.strokeStyle = "#a0aec0";
    ctx.lineWidth = 2;
    // X axis
    ctx.beginPath(); ctx.moveTo(0, height/2); ctx.lineTo(width, height/2); ctx.stroke();
    // Y axis
    ctx.beginPath(); ctx.moveTo(width/2, 0); ctx.lineTo(width/2, height); ctx.stroke();

    // Map logic: Econ -10 (Left) to +10 (Right) | Other -10 (Top) to +10 (Bottom)
    const px = ((res.econ + 10) / 20) * width;
    const py = ((res.other + 10) / 20) * height;

    // Draw Preset (if selected)
    const select = document.getElementById("preset-selector");
    if (select.value !== "") {
        const preset = presets[select.value];
        const presRes = calculateScores(preset.scores);
        const preX = ((presRes.econ + 10) / 20) * width;
        const preY = ((presRes.other + 10) / 20) * height;
        
        ctx.beginPath();
        ctx.arc(preX, preY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#718096";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#4a5568";
        ctx.fillText(preset.name, preX + 10, preY + 4);
    }

    // Draw User Point
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "#3182ce";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "#2d3748";
    ctx.fillText("Your Profile", px + 12, py + 5);
}

// Explanation Engine
function renderExplanations() {
    let econPulls = [], otherPulls = [];
    
    policies.forEach(p => {
        const val = currentScores[p.id];
        if (Math.abs(val) > 2) {
            if (p.dimension === "economy") econPulls.push({label: p.label, val: val});
            else otherPulls.push({label: p.label, val: val});
        }
    });

    const formatPulls = (arr) => {
        const prog = arr.filter(a => a.val < 0).sort((a,b) => a.val - b.val).slice(0,3);
        const cons = arr.filter(a => a.val > 0).sort((a,b) => b.val - a.val).slice(0,3);
        
        let html = `<h4>Strongest Progressive Pulls:</h4><ul>`;
        prog.forEach(p => html += `<li><span>${p.label.replace(/.*:\s/, '')}</span> <span class="pull-prog">${p.val.toFixed(1)}</span></li>`);
        if(prog.length===0) html += `<li>None significant</li>`;
        
        html += `</ul><h4 style="margin-top:10px;">Strongest Conservative Pulls:</h4><ul>`;
        cons.forEach(p => html += `<li><span>${p.label.replace(/.*:\s/, '')}</span> <span class="pull-cons">+${p.val.toFixed(1)}</span></li>`);
        if(cons.length===0) html += `<li>None significant</li>`;
        html += `</ul>`;
        return html;
    };

    document.getElementById("explain-econ").innerHTML = formatPulls(econPulls);
    document.getElementById("explain-other").innerHTML = formatPulls(otherPulls);
}

function renderCategorySummaries() {
    const categories = groupBy(policies, "category");
    let html = "";
    
    for (const [cat, items] of Object.entries(categories)) {
        let sum = 0, w = 0;
        items.forEach(i => {
            sum += currentScores[i.id] * i.weight;
            w += i.weight;
        });
        const score = sum / (w || 1);
        const sign = score > 0 ? "+" : "";
        html += `<div class="cat-item"><span>${cat}</span> <strong>${sign}${score.toFixed(2)}</strong></div>`;
    }
    document.getElementById("category-summaries").innerHTML = html;
}

// Distances and Comparisons
function populatePresets() {
    const select = document.getElementById("preset-selector");
    presets.forEach((p, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = p.name;
        select.appendChild(opt);
    });
}

function updateDistances() {
    const select = document.getElementById("preset-selector");
    const readout = document.getElementById("distance-readout");
    if (select.value === "") {
        readout.innerHTML = "Select a profile above to calculate ideological distance.";
        drawMap(calculateScores());
        return;
    }
    
    const preset = presets[select.value];
    const presRes = calculateScores(preset.scores);
    const userRes = calculateScores();

    // Euclidean Distance formula
    const distEcon = Math.abs(userRes.econ - presRes.econ);
    const distOther = Math.abs(userRes.other - presRes.other);
    const distOverall = Math.sqrt(Math.pow(distEcon, 2) + Math.pow(distOther, 2));

    readout.innerHTML = `
        Distance to <strong>${preset.name}</strong>: <strong>${distOverall.toFixed(2)}</strong><br>
        <span style="font-size:0.85rem; color:#718096">
            Econ Diff: ${distEcon.toFixed(2)} | Other Diff: ${distOther.toFixed(2)}
        </span>
    `;
    drawMap(userRes); // Re-draws map to include the preset dot
}

// Utilities and File I/O
function groupBy(arr, key) {
    return arr.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

function resetAll() {
    policies.forEach(p => {
        currentScores[p.id] = p.defaultValue;
        document.getElementById(`slider_${p.id}`).value = p.defaultValue;
        document.getElementById(`num_${p.id}`).value = p.defaultValue.toFixed(2);
    });
    document.getElementById("preset-selector").value = "";
    updateAll();
}

function exportProfile() {
    const data = {
        name: "User Profile Export",
        scores: currentScores
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "ideology_profile.json");
    dlAnchorElem.click();
}

function importProfile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.scores) {
                policies.forEach(p => {
                    const val = imported.scores[p.id] !== undefined ? imported.scores[p.id] : p.defaultValue;
                    syncValues(p.id, val, "import"); // manually calling sync to update UI
                    document.getElementById(`slider_${p.id}`).value = val;
                    document.getElementById(`num_${p.id}`).value = val.toFixed(2);
                });
                updateAll();
            }
        } catch(err) {
            alert("Error parsing JSON file.");
        }
    };
    reader.readAsText(file);
}

// --- Bulk Adjustment Engine ---

function populateBulkDropdown() {
    // Extract unique categories directly from the policies database
    const econCats = [...new Set(policies.filter(p => p.dimension === 'economy').map(p => p.category))];
    const otherCats = [...new Set(policies.filter(p => p.dimension === 'other').map(p => p.category))];

    const optEcon = document.getElementById("opt-econ-cats");
    econCats.forEach(cat => {
        optEcon.innerHTML += `<option value="cat_${cat}">${cat}</option>`;
    });

    const optOther = document.getElementById("opt-other-cats");
    otherCats.forEach(cat => {
        optOther.innerHTML += `<option value="cat_${cat}">${cat}</option>`;
    });
}

function applyBulkShift() {
    const target = document.getElementById("bulk-target").value;
    const amountStr = document.getElementById("bulk-amount").value;
    const amount = parseFloat(amountStr);

    if (isNaN(amount) || amount === 0) return;

    policies.forEach(p => {
        let match = false;
        
        // Check if this policy falls under the selected target
        if (target === "dim_economy" && p.dimension === "economy") match = true;
        else if (target === "dim_other" && p.dimension === "other") match = true;
        else if (target === `cat_${p.category}`) match = true;

        if (match) {
            let newVal = currentScores[p.id] + amount;
            
            // Clamp the values so they can never break the -10 to +10 bounds
            if (newVal > 10) newVal = 10;
            if (newVal < -10) newVal = -10;
            
            // Update internal state and inputs
            currentScores[p.id] = newVal;
            document.getElementById(`slider_${p.id}`).value = newVal;
            document.getElementById(`num_${p.id}`).value = newVal.toFixed(2);
        }
    });

    // Clear the input box after successful shift
    document.getElementById("bulk-amount").value = "";
    
    // Trigger the scoring engine and UI refresh
    updateAll();
}

// Boot
document.addEventListener("DOMContentLoaded", init);