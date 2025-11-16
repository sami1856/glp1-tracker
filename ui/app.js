(async function () {
  const set = (id, ok, warn=false) => {
    const el = document.getElementById(id);
    if (!el) return;
    const dot = el.querySelector(".dot");
    const txt = el.querySelector(".chip-text");
    if (ok) { dot.className="dot dot-ok"; txt.textContent="OK"; }
    else if (warn) { dot.className="dot dot-warn"; txt.textContent="Degraded"; }
    else { dot.className="dot dot-bad"; txt.textContent="Down"; }
  };

  try { const r = await fetch("/v5/healthz",{cache:"no-store"}); set("chip-health", r.ok); }
  catch { set("chip-health", false); }

  try { const r = await fetch("/openapi.json",{cache:"no-store"}); set("chip-openapi", r.ok); }
  catch { set("chip-openapi", false); }
})();
