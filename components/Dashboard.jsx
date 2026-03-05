"use client";
import { useState, useCallback, useEffect } from "react";

// ─── COLOUR PALETTE ────────────────────────────────────────────────────────
const C = {
  bg: "#0f0f13",
  panel: "#1a1a22",
  card: "#22222e",
  border: "#2e2e3e",
  accent: "#f97316",   // orange
  accentHover: "#ea6c0a",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#eab308",
  blue: "#3b82f6",
  muted: "#6b7280",
  text: "#e5e7eb",
  textDim: "#9ca3af",
};

// ─── VENUE DATABASE ────────────────────────────────────────────────────────
const VENUE_DB = [
  // ── NSW — SYDNEY ──────────────────────────────────────────────────────────
  { city:"Sydney", state:"NSW", name:"Qudos Bank Arena",        cap:21000, hire:40000, perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Hordern Pavilion",         cap:5500,  hire:7000,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"ICC Sydney Theatre",       cap:8000,  hire:14000, perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Enmore Theatre",           cap:2500,  hire:3500,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Selinas",                  cap:2200,  hire:2800,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"State Theatre",            cap:2000,  hire:4500,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Max Watts Sydney",         cap:1500,  hire:2200,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Roundhouse UNSW",          cap:1600,  hire:2500,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Metro Theatre",            cap:1000,  hire:2000,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Seymour Centre",           cap:1200,  hire:2200,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Manning Bar",              cap:950,   hire:1800,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Factory Theatre",          cap:900,   hire:1800,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Oxford Art Factory",       cap:500,   hire:1500,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Crowbar Sydney",           cap:500,   hire:0,     perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Lansdowne Hotel",          cap:300,   hire:0,     perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Marys Underground",        cap:400,   hire:0,     perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Big Top Luna Park",        cap:2950,  hire:4000,  perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Newtown Social Club",      cap:300,   hire:0,     perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"The Gaelic Club",          cap:600,   hire:800,   perHead:5.5 },
  { city:"Sydney", state:"NSW", name:"Kings Cross Hotel",        cap:500,   hire:0,     perHead:5.5 },
  // ── NSW — NEWCASTLE ───────────────────────────────────────────────────────
  { city:"Newcastle", state:"NSW", name:"Newcastle Entertainment Centre", cap:7000, hire:9000, perHead:5.5 },
  { city:"Newcastle", state:"NSW", name:"Civic Theatre Newcastle",         cap:1550, hire:2500, perHead:5.5 },
  { city:"Newcastle", state:"NSW", name:"Newcastle City Hall",             cap:1000, hire:1800, perHead:5.5 },
  { city:"Newcastle", state:"NSW", name:"Hamilton Station Hotel",          cap:600,  hire:0,    perHead:5.5 },
  { city:"Newcastle", state:"NSW", name:"The Cambridge Hotel",             cap:800,  hire:0,    perHead:5.5 },
  // ── NSW — WOLLONGONG ──────────────────────────────────────────────────────
  { city:"Wollongong", state:"NSW", name:"Waves",                   cap:1000, hire:1500, perHead:5.5 },
  { city:"Wollongong", state:"NSW", name:"Wollongong Town Hall",     cap:700,  hire:1200, perHead:5.5 },
  // ── VIC — MELBOURNE ───────────────────────────────────────────────────────
  { city:"Melbourne", state:"VIC", name:"Rod Laver Arena",          cap:15000, hire:28000, perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"John Cain Arena",          cap:10500, hire:18000, perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Sidney Myer Music Bowl",   cap:12000, hire:20000, perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Festival Hall",            cap:5000,  hire:7000,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Palais Theatre",           cap:3000,  hire:5500,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Northcote Theatre",        cap:1500,  hire:2200,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Hamer Hall",               cap:2600,  hire:6500,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"170 Russell",              cap:1000,  hire:2000,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Max Watts Melbourne",      cap:1300,  hire:1800,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Forum Melbourne",          cap:1100,  hire:2500,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"The Corner Hotel",         cap:800,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Prince Bandroom",          cap:750,   hire:1200,  perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"The Croxton",              cap:900,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Croxton Bandroom",         cap:800,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Northcote Social Club",    cap:300,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Stay Gold",                cap:420,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Howler",                   cap:500,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Milk Bar",                 cap:300,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"The Tote",                 cap:350,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Cherry Bar",               cap:200,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Workers Club",             cap:500,   hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"Esplanade Hotel",          cap:1000,  hire:0,     perHead:5.5 },
  { city:"Melbourne", state:"VIC", name:"The Hi-Fi Melbourne",      cap:1300,  hire:1500,  perHead:5.5 },
  // ── QLD — BRISBANE ────────────────────────────────────────────────────────
  { city:"Brisbane", state:"QLD", name:"Brisbane Entertainment Centre", cap:13500, hire:22000, perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"Riverstage",                    cap:8000,  hire:12000, perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"Fortitude Music Hall",          cap:3000,  hire:4500,  perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"Eatons Hill Hotel",             cap:3000,  hire:4000,  perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"The Tivoli",                    cap:1600,  hire:2500,  perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"The Triffid",                   cap:1000,  hire:1200,  perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"The Brightside",                cap:500,   hire:0,     perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"Crowbar Brisbane",              cap:500,   hire:0,     perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"Black Bear Lodge",              cap:400,   hire:0,     perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"The Zoo",                       cap:600,   hire:800,   perHead:5.5 },
  { city:"Brisbane", state:"QLD", name:"Princess Theatre Brisbane",     cap:800,   hire:1000,  perHead:5.5 },
  // ── QLD — GOLD COAST ──────────────────────────────────────────────────────
  { city:"Gold Coast", state:"QLD", name:"Mo's Desert Clubhouse",  cap:250,  hire:0,    perHead:5.5 },
  { city:"Gold Coast", state:"QLD", name:"Coolangatta Hotel",       cap:1200, hire:0,    perHead:5.5 },
  { city:"Gold Coast", state:"QLD", name:"Miami Marketta",          cap:2000, hire:2000, perHead:5.5 },
  { city:"Gold Coast", state:"QLD", name:"Soundlounge",             cap:400,  hire:0,    perHead:5.5 },
  { city:"Gold Coast", state:"QLD", name:"Gold Coast Convention Centre", cap:6000, hire:10000, perHead:5.5 },
  // ── SA — ADELAIDE ─────────────────────────────────────────────────────────
  { city:"Adelaide", state:"SA", name:"Adelaide Entertainment Centre", cap:11300, hire:18000, perHead:5.5 },
  { city:"Adelaide", state:"SA", name:"Thebarton Theatre",             cap:2800,  hire:4000,  perHead:5.5 },
  { city:"Adelaide", state:"SA", name:"Hindley St Music Hall",         cap:1400,  hire:2200,  perHead:5.5 },
  { city:"Adelaide", state:"SA", name:"The Gov",                       cap:1500,  hire:0,     perHead:5.5 },
  { city:"Adelaide", state:"SA", name:"Lion Arts Factory",             cap:900,   hire:1200,  perHead:5.5 },
  { city:"Adelaide", state:"SA", name:"The Exeter Hotel",              cap:400,   hire:0,     perHead:5.5 },
  { city:"Adelaide", state:"SA", name:"Jive",                          cap:500,   hire:800,   perHead:5.5 },
  // ── WA — PERTH ────────────────────────────────────────────────────────────
  { city:"Perth", state:"WA", name:"RAC Arena",             cap:14800, hire:22000, perHead:5.5 },
  { city:"Perth", state:"WA", name:"HBF Park",              cap:20000, hire:30000, perHead:5.5 },
  { city:"Perth", state:"WA", name:"Astor Theatre",         cap:1200,  hire:2000,  perHead:5.5 },
  { city:"Perth", state:"WA", name:"Metro City",            cap:1200,  hire:2000,  perHead:5.5 },
  { city:"Perth", state:"WA", name:"Rosemount Hotel",       cap:800,   hire:0,     perHead:5.5 },
  { city:"Perth", state:"WA", name:"Amplifier Bar",         cap:700,   hire:800,   perHead:5.5 },
  { city:"Perth", state:"WA", name:"The Bakery",            cap:600,   hire:800,   perHead:5.5 },
  { city:"Perth", state:"WA", name:"Badlands Bar",          cap:400,   hire:0,     perHead:5.5 },
  { city:"Fremantle", state:"WA", name:"Freo Social",       cap:1200,  hire:1500,  perHead:5.5 },
  { city:"Fremantle", state:"WA", name:"The Fly By Night",  cap:500,   hire:800,   perHead:5.5 },
  // ── ACT — CANBERRA ────────────────────────────────────────────────────────
  { city:"Canberra", state:"ACT", name:"Canberra Theatre",   cap:1244, hire:3000, perHead:5.5 },
  { city:"Canberra", state:"ACT", name:"UC Hub",             cap:1200, hire:2000, perHead:5.5 },
  { city:"Canberra", state:"ACT", name:"The Basement",       cap:600,  hire:800,  perHead:5.5 },
  { city:"Canberra", state:"ACT", name:"Smiths Alternative", cap:200,  hire:0,    perHead:5.5 },
  // ── TAS — HOBART & LAUNCESTON ─────────────────────────────────────────────
  { city:"Hobart", state:"TAS", name:"Odeon Theatre",     cap:1000, hire:1500, perHead:5.5 },
  { city:"Hobart", state:"TAS", name:"Altar",             cap:800,  hire:1000, perHead:5.5 },
  { city:"Hobart", state:"TAS", name:"Republic Bar",      cap:400,  hire:0,    perHead:5.5 },
  { city:"Hobart", state:"TAS", name:"The Brisbane Hotel",cap:300,  hire:0,    perHead:5.5 },
  { city:"Launceston", state:"TAS", name:"The Royal Oak", cap:500,  hire:0,    perHead:5.5 },
  { city:"Launceston", state:"TAS", name:"Saloon Bar",    cap:300,  hire:0,    perHead:5.5 },
];

const STATES = [...new Set(VENUE_DB.map(v => v.state))].sort();
const CITIES_BY_STATE = STATES.reduce((acc, s) => {
  acc[s] = [...new Set(VENUE_DB.filter(v => v.state === s).map(v => v.city))].sort();
  return acc;
}, {});

// ─── EXCHANGE RATES (live-ish defaults) ────────────────────────────────────
const DEFAULT_FX = { USD: 1.58, GBP: 2.00, EUR: 1.72 };

// ─── HELPER COMPONENTS ─────────────────────────────────────────────────────
const fmt = (n) => n == null || isNaN(n) ? "—" : "$" + Math.round(n).toLocaleString();
const fmtN = (n) => n == null || isNaN(n) ? "—" : Math.round(n).toLocaleString();
const pct = (n) => n == null || isNaN(n) ? "—" : (n * 100).toFixed(1) + "%";

function Label({ children }) {
  return <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{children}</div>;
}
function Input({ label, value, onChange, type = "number", prefix, style = {} }) {
  return (
    <div style={{ marginBottom: 12, ...style }}>
      {label && <Label>{label}</Label>}
      <div style={{ display: "flex", alignItems: "center", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
        {prefix && <span style={{ padding: "0 8px", color: C.muted, fontSize: 13 }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={e => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
          style={{ background: "transparent", border: "none", outline: "none", color: C.text, padding: "8px 10px", width: "100%", fontSize: 14 }}
        />
      </div>
    </div>
  );
}
function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <Label>{label}</Label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "8px 10px", width: "100%", fontSize: 14 }}
      >
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </div>
  );
}
function Stat({ label, value, sub, color }) {
  return (
    <div style={{ background: C.card, borderRadius: 8, padding: "14px 16px", border: `1px solid ${C.border}` }}>
      <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || C.text }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.textDim, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}
function Section({ title, children, accent }) {
  return (
    <div style={{ background: C.panel, borderRadius: 10, padding: "18px 20px", border: `1px solid ${accent ? C.accent : C.border}`, marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: accent ? C.accent : C.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>{title}</div>
      {children}
    </div>
  );
}
function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
        borderRadius: "8px 8px 0 0", marginRight: 4,
        background: active ? C.accent : C.panel,
        color: active ? "#fff" : C.muted,
        transition: "all 0.15s"
      }}
    >{label}</button>
  );
}

// ─── SHOW ROW for budget ───────────────────────────────────────────────────
function ShowRow({ show, idx, onChange, onRemove, venues }) {
  const venuesForCity = venues.filter(v => v.city === show.city);
  const selVenue = venuesForCity.find(v => v.name === show.venueName);

  const handleCity = (city) => {
    const firstVenue = venues.find(v => v.city === city);
    onChange(idx, { ...show, city, venueName: firstVenue?.name || "", cap: firstVenue?.cap || 0, flatHire: firstVenue?.hire || 0 });
  };
  const handleVenue = (name) => {
    const v = venues.find(vn => vn.name === name);
    onChange(idx, { ...show, venueName: name, cap: v?.cap || show.cap, flatHire: v?.hire || show.flatHire });
  };

  const allCities = [...new Set(venues.map(v => v.city))].sort();
  const grossPerTix = parseFloat(show.ticketPrice) || 0;
  const netPerTix = Math.max(0, grossPerTix - 7.95);
  const sellOutNet = netPerTix * show.cap;
  const forecastNet = netPerTix * show.cap * show.attendPct;

  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontWeight: 700, color: C.accent, fontSize: 13 }}>SHOW {idx + 1}</div>
        <button onClick={() => onRemove(idx)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <div>
          <Label>City</Label>
          <select value={show.city} onChange={e => handleCity(e.target.value)}
            style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "7px 10px", width: "100%", fontSize: 13 }}>
            {allCities.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <Label>Venue</Label>
          <select value={show.venueName} onChange={e => handleVenue(e.target.value)}
            style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "7px 10px", width: "100%", fontSize: 13 }}>
            {venuesForCity.map(v => <option key={v.name}>{v.name}</option>)}
            <option value="__custom__">Custom…</option>
          </select>
        </div>
        <div>
          <Label>Capacity</Label>
          <input type="number" value={show.cap} onChange={e => onChange(idx, { ...show, cap: +e.target.value })}
            style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "7px 10px", width: "100%", fontSize: 13 }} />
        </div>
        <div>
          <Label>Ticket Price (gross)</Label>
          <input type="number" value={show.ticketPrice} onChange={e => onChange(idx, { ...show, ticketPrice: +e.target.value })}
            style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "7px 10px", width: "100%", fontSize: 13 }} />
        </div>
        <div>
          <Label>Flat Hire ($)</Label>
          <input type="number" value={show.flatHire} onChange={e => onChange(idx, { ...show, flatHire: +e.target.value })}
            style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "7px 10px", width: "100%", fontSize: 13 }} />
        </div>
        <div>
          <Label>Forecast Attend %</Label>
          <input type="number" value={Math.round(show.attendPct * 100)} onChange={e => onChange(idx, { ...show, attendPct: (+e.target.value) / 100 })}
            style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "7px 10px", width: "100%", fontSize: 13 }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <div style={{ fontSize: 12, color: C.muted }}>Net/tix: <span style={{ color: C.text }}>{fmt(netPerTix)}</span></div>
        <div style={{ fontSize: 12, color: C.muted }}>Sell-out net: <span style={{ color: C.green }}>{fmt(sellOutNet)}</span></div>
        <div style={{ fontSize: 12, color: C.muted }}>Forecast net: <span style={{ color: C.yellow }}>{fmt(forecastNet)}</span></div>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("estimator");

  // ── TOUR MANAGEMENT ──
  const [tours, setTours] = useState([]);
  const [activeTourId, setActiveTourId] = useState(null);
  const [tourName, setTourName] = useState("New Tour");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [showTourPanel, setShowTourPanel] = useState(false);

  useEffect(() => { loadTourList(); }, []);

  const loadTourList = async () => {
    try {
      const res = await fetch('/api/tours');
      const { tours: t } = await res.json();
      if (t) setTours(t);
    } catch (e) {}
  };

  const loadTour = async (id) => {
    try {
      const res = await fetch(`/api/tours?id=${id}`);
      const { tour } = await res.json();
      if (!tour?.payload) return;
      const p = tour.payload;
      setTourName(tour.name);
      setActiveTourId(tour.id);
      if (p.artist) setArtist(p.artist);
      if (p.shows) setShows(p.shows);
      if (p.party) setParty(p.party);
      if (p.fx) setFx(p.fx);
      setShowTourPanel(false);
      setSaveMsg(`✅ Loaded: ${tour.name}`);
      setTimeout(() => setSaveMsg(""), 3000);
    } catch (e) { setSaveMsg("❌ Load failed"); }
  };

  const saveTour = async () => {
    setSaving(true);
    const payload = { artist, shows, party, fx };
    try {
      if (activeTourId) {
        await fetch('/api/tours', { method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: activeTourId, name: tourName, artist_name: artist.name, status: artist.status, payload }) });
      } else {
        const res = await fetch('/api/tours', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: tourName, artist_name: artist.name, status: artist.status, payload }) });
        const { tour } = await res.json();
        if (tour) setActiveTourId(tour.id);
      }
      setSaveMsg("✅ Saved");
      loadTourList();
    } catch (e) { setSaveMsg("❌ Save failed"); }
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const newTour = () => {
    setActiveTourId(null);
    setTourName("New Tour");
    setArtist({ name: "", agent: "", status: "IN CONSIDERATION", dealCurrency: "USD", dealAmt: 0, dealType: "Flat Guarantee" });
    setShows([defaultShow()]);
    setParty({ band: 4, crew: 2, local: 3, intlFlightCost: 0, intlFlightPax: 0, domLegs: 0, domCostPerLeg: 350, domPax: 0, accomNights: 0, accomRooms: 0, accomRate: 180, sprinterLegs: 0, sprinterCost: 500, vanDays: 0, vans: 1, vanRate: 150, drivers: 0, driverDays: 0, driverRate: 350, perDiemPax: 0, pdRate: 75, pdShows: 0, catering: 0, cateringShows: 0, visaPax: 0, visaFee: 420, union: 150, tourMgrRate: 600, tourMgrDays: 0, stagehandShows: 0, stagehandRate: 440, supportStaff: 0, supportRate: 450, supports: 0, supportFee: 400, backlineShows: 0, backlineCost: 2200, lightingShows: 0, lightingRate: 550, marketing: 500, publicist: 1500, creative: 1000, contingency: 5000, passes: 350 });
    setShowTourPanel(false);
  };

  const deleteTour = async (id) => {
    if (!confirm("Delete this tour?")) return;
    await fetch(`/api/tours?id=${id}`, { method: 'DELETE' });
    if (activeTourId === id) newTour();
    loadTourList();
  };

  // ── FX ──
  const [fx, setFx] = useState({ ...DEFAULT_FX });
  const [fxUpdated, setFxUpdated] = useState(null);
  const [fxLoading, setFxLoading] = useState(true);

  useEffect(() => {
    fetch('/api/fx')
      .then(r => r.json())
      .then(d => {
        setFx({ USD: d.USD, GBP: d.GBP, EUR: d.EUR });
        setFxUpdated(d.updated || null);
      })
      .catch(() => {})
      .finally(() => setFxLoading(false));
  }, []);

  // ── ARTIST ──
  const [artist, setArtist] = useState({ name: "", agent: "", status: "IN CONSIDERATION", dealCurrency: "USD", dealAmt: 0, dealType: "Flat Guarantee" });

  // ── SHOWS ──
  const defaultShow = () => ({ city: "Sydney", venueName: "Metro Theatre", cap: 1000, ticketPrice: 79.95, flatHire: 2000, attendPct: 0.6 });
  const [shows, setShows] = useState([defaultShow()]);
  const updateShow = useCallback((i, s) => setShows(prev => prev.map((x, j) => j === i ? s : x)), []);
  const removeShow = useCallback((i) => setShows(prev => prev.filter((_, j) => j !== i)), []);
  const addShow = () => setShows(prev => [...prev, defaultShow()]);

  // ── TOUR PARTY ──
  const [party, setParty] = useState({ band: 4, crew: 2, local: 3, intlFlightCost: 0, intlFlightPax: 0, domLegs: 0, domCostPerLeg: 350, domPax: 0, accomNights: 0, accomRooms: 0, accomRate: 180, sprinterLegs: 0, sprinterCost: 500, vanDays: 0, vans: 1, vanRate: 150, drivers: 0, driverDays: 0, driverRate: 350, perDiemPax: 0, pdRate: 75, pdShows: 0, catering: 0, cateringShows: 0, visaPax: 0, visaFee: 420, union: 150, tourMgrRate: 600, tourMgrDays: 0, stagehandShows: 0, stagehandRate: 440, supportStaff: 0, supportRate: 450, supports: 0, supportFee: 400, backlineShows: 0, backlineCost: 2200, lightingShows: 0, lightingRate: 550, marketing: 500, publicist: 1500, creative: 1000, contingency: 5000, passes: 350 });
  const p = party;

  // ── ARTIST DEAL ──
  const artistAUD = artist.dealCurrency === "AUD" ? artist.dealAmt : artist.dealAmt * (fx[artist.dealCurrency] || 1);

  // ── TOUR COSTS CALC ──
  const numShows = shows.length;
  const totalCap = shows.reduce((s, v) => s + v.cap, 0);
  const totalSellOutNet = shows.reduce((s, v) => s + Math.max(0, v.ticketPrice - 7.95) * v.cap, 0);
  const totalForecastNet = shows.reduce((s, v) => s + Math.max(0, v.ticketPrice - 7.95) * v.cap * v.attendPct, 0);
  const totalVenueHire = shows.reduce((s, v) => s + (v.flatHire || 0) + (5.5 * v.cap), 0);

  const costs = {
    visa: p.visaPax * (p.visaFee + p.union),
    insurance: 0,
    compliance: 0,
    intlFlights: p.intlFlightPax * p.intlFlightCost,
    domFlights: p.domLegs * p.domPax * p.domCostPerLeg,
    accom: p.accomNights * p.accomRooms * p.accomRate,
    sprinter: p.sprinterLegs * p.sprinterCost,
    van: p.vanDays * p.vans * p.vanRate,
    drivers: p.driverDays * p.drivers * p.driverRate,
    perDiem: p.perDiemPax * p.pdRate * p.pdShows,
    catering: p.catering * p.cateringShows,
    tourMgr: p.tourMgrDays * p.tourMgrRate,
    stagehand: p.stagehandShows * p.stagehandRate,
    supportStaff: p.supportStaff * p.supportRate * numShows,
    supports: p.supports * p.supportFee * numShows,
    backline: p.backlineShows * p.backlineCost,
    lighting: p.lightingShows * p.lightingRate,
    marketing: p.marketing + p.publicist + p.creative,
    contingency: p.contingency,
    passes: p.passes,
  };
  const apra = totalForecastNet * 0.02;
  costs.compliance = (p.visaPax * (p.visaFee + p.union)) + apra;
  costs.visa = 0; // rolled into compliance

  const totalLogistics = costs.intlFlights + costs.domFlights + costs.accom + costs.sprinter + costs.van + costs.drivers;
  const totalShowCosts = costs.perDiem + costs.catering + costs.tourMgr + costs.stagehand + costs.supportStaff + costs.supports + costs.passes;
  const totalProduction = costs.backline + costs.lighting;
  const totalMarketing = costs.marketing;
  const totalMisc = costs.contingency;
  const totalOpEx = totalVenueHire + costs.compliance + totalLogistics + totalShowCosts + totalProduction + totalMarketing + totalMisc;
  const totalExpenses = totalOpEx + artistAUD;

  const profitAtForecast = totalForecastNet - totalExpenses;
  const profitAtSellOut = totalSellOutNet - totalExpenses;

  const scenarioPcts = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const scenarioRevenue = pctVal => shows.reduce((s, v) => s + Math.max(0, v.ticketPrice - 7.95) * v.cap * pctVal, 0);

  // ── OFFER GENERATOR ──
  // Core logic: Revenue at target BE% − OpEx = max artist offer headroom
  const [offerTargetBE, setOfferTargetBE] = useState(60); // adjustable, default 60%
  const [researchOverseasGross, setResearchOverseasGross] = useState(0); // from research tab - what they earn per show overseas
  const [researchNote, setResearchNote] = useState("");
  const revenueAtTargetBE = scenarioRevenue(offerTargetBE / 100);
  const maxOfferHeadroom = Math.max(0, revenueAtTargetBE - totalOpEx);
  const maxOfferHeadroomPerShow = numShows > 0 ? maxOfferHeadroom / numShows : 0;
  // Sense check: what % of their overseas per-show rate is our offer?
  const overseasSenseCheck = researchOverseasGross > 0 && numShows > 0
    ? (maxOfferHeadroomPerShow / researchOverseasGross) * 100
    : null;
  // Offer tiers: conservative / mid / stretch
  const offerConservative = maxOfferHeadroom * 0.7;
  const offerMid = maxOfferHeadroom * 0.85;
  const offerStretch = maxOfferHeadroom;
  // Convert to foreign currency for the actual offer letter
  const toForeignOffer = (audAmt) => {
    if (artist.dealCurrency === "AUD") return audAmt;
    return audAmt / (fx[artist.dealCurrency] || 1);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: C.text }}>
      {/* HEADER */}
      <div style={{ background: C.panel, borderBottom: `2px solid ${C.accent}`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.accent, letterSpacing: -0.5 }}>🎸 TOUR HQ</div>
          <div style={{ fontSize: 11, color: C.muted }}>Silverback / Tribute / Delta Bravo</div>
        </div>

        {/* TOUR SELECTOR */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowTourPanel(p => !p)}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              📁 {tourName || "New Tour"} <span style={{ color: C.muted }}>▾</span>
            </button>
            {showTourPanel && (
              <div style={{ position: "absolute", top: "110%", left: 0, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, minWidth: 280, zIndex: 100, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>Your Tours</div>
                {tours.length === 0 && <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>No saved tours yet</div>}
                {tours.map(t => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, marginBottom: 4, background: activeTourId === t.id ? "rgba(249,115,22,0.15)" : "transparent", cursor: "pointer" }}
                    onClick={() => loadTour(t.id)}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: activeTourId === t.id ? C.accent : C.text }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{t.artist_name} · {t.status}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); deleteTour(t.id); }}
                      style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 8, paddingTop: 8 }}>
                  <button onClick={newTour}
                    style={{ width: "100%", background: C.accent, border: "none", borderRadius: 6, color: "#fff", padding: "8px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                    + New Tour
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tour name input */}
          <input value={tourName} onChange={e => setTourName(e.target.value)}
            style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "7px 10px", fontSize: 13, width: 200 }}
            placeholder="Tour name…" />

          {/* Save button */}
          <button onClick={saveTour} disabled={saving}
            style={{ background: saving ? C.muted : C.green, border: "none", borderRadius: 6, color: "#fff", padding: "7px 16px", cursor: saving ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 13 }}>
            {saving ? "Saving…" : "💾 Save"}
          </button>
          {saveMsg && <span style={{ fontSize: 12, color: saveMsg.startsWith("✅") ? C.green : C.red }}>{saveMsg}</span>}
        </div>

        {/* FX STRIP */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 10, color: C.muted, textAlign: "right" }}>
            {fxLoading ? "Loading rates…" : fxUpdated ? (
              <span style={{ color: C.green }}>🟢 Live rates</span>
            ) : (
              <span style={{ color: C.yellow }}>⚠️ Default rates</span>
            )}
          </div>
          {["USD","GBP","EUR"].map(cur => (
            <div key={cur} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:11, color:C.muted }}>{cur}/AUD</span>
              <input type="number" step="0.01" value={fx[cur]}
                onChange={e => setFx(f => ({...f, [cur]: +e.target.value}))}
                style={{ width:60, background:C.bg, border:`1px solid ${C.border}`, borderRadius:5, color:C.text, padding:"4px 6px", fontSize:12 }} />
            </div>
          ))}
          {activeTourId && (
            <div style={{ fontSize: 10, color: C.muted, textAlign: "right", borderLeft: `1px solid ${C.border}`, paddingLeft: 12 }}>
              <div>Last saved</div>
              <div style={{ color: C.textDim }}>
                {tours.find(t => t.id === activeTourId)?.updated_at
                  ? new Date(tours.find(t => t.id === activeTourId).updated_at).toLocaleString('en-AU', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
                  : "Not saved yet"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div style={{ padding: "0 24px", paddingTop: 16, display: "flex", borderBottom: `1px solid ${C.border}` }}>
        {[
          ["estimator","💰 Budget Estimator"],
          ["showbyshow","📋 Show By Show"],
          ["ticketing","🎫 Ticket Counts"],
          ["venues","🏟️ Venue Database"],
          ["research","📊 Artist Research"],
        ].map(([id,label]) => <Tab key={id} label={label} active={tab===id} onClick={() => setTab(id)} />)}
      </div>

      {/* ── ESTIMATOR TAB ── */}
      {tab === "estimator" && (
        <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>

          {/* TOP STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
            <Stat label="Total Capacity" value={fmtN(totalCap)} sub={`${numShows} show${numShows!==1?"s":""}`} />
            <Stat label="Sell-Out Net" value={fmt(totalSellOutNet)} color={C.green} />
            <Stat label="Forecast Net" value={fmt(totalForecastNet)} sub={`avg ${pct(shows.reduce((s,v)=>s+v.attendPct,0)/Math.max(numShows,1))} fill`} color={C.yellow} />
            <Stat label="OpEx (excl. artist)" value={fmt(totalOpEx)} color={C.red} />
            <Stat label="Max Offer Headroom" value={fmt(maxOfferHeadroom)} sub={`at ${offerTargetBE}% BE target`} color={maxOfferHeadroom > 0 ? C.accent : C.red} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* LEFT COLUMN */}
            <div>
              {/* ARTIST */}
              <Section title="🎤 Artist & Deal" accent>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label="Artist Name" value={artist.name} onChange={v => setArtist(a=>({...a,name:v}))} type="text" />
                  <Input label="Agent" value={artist.agent} onChange={v => setArtist(a=>({...a,agent:v}))} type="text" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Select label="Status" value={artist.status} onChange={v => setArtist(a=>({...a,status:v}))}
                    options={["IN CONSIDERATION","OFFER MADE","CONFIRMED","DECLINED"]} />
                  <Select label="Deal Type" value={artist.dealType} onChange={v => setArtist(a=>({...a,dealType:v}))}
                    options={["Flat Guarantee","Vs Deal","Stepped Deal"]} />
                  <Select label="Currency" value={artist.dealCurrency} onChange={v => setArtist(a=>({...a,dealCurrency:v}))}
                    options={["USD","GBP","EUR","AUD"]} />
                </div>
                <Input label={`Fee in ${artist.dealCurrency}`} value={artist.dealAmt} onChange={v => setArtist(a=>({...a,dealAmt:v}))} prefix={artist.dealCurrency === "AUD" ? "$" : ""} />
                <div style={{ background: C.bg, borderRadius: 6, padding: "10px 14px", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: C.muted, fontSize: 12 }}>AUD Equivalent</span>
                    <span style={{ color: C.accent, fontWeight: 700, fontSize: 16 }}>{fmt(artistAUD)}</span>
                  </div>
                </div>
              </Section>

              {/* SHOWS */}
              <Section title="📍 Shows & Venues">
                {shows.map((s, i) => (
                  <ShowRow key={i} show={s} idx={i} onChange={updateShow} onRemove={removeShow} venues={VENUE_DB} />
                ))}
                <button onClick={addShow}
                  style={{ width: "100%", padding: "10px", border: `2px dashed ${C.border}`, borderRadius: 8, background: "none", color: C.muted, cursor: "pointer", fontSize: 13, marginTop: 4 }}>
                  + Add Show
                </button>
              </Section>

              {/* TOUR PARTY */}
              <Section title="👥 Tour Party">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Input label="Band / Int'l Crew" value={p.band} onChange={v => setParty(x=>({...x,band:v}))} />
                  <Input label="Int'l Crew" value={p.crew} onChange={v => setParty(x=>({...x,crew:v}))} />
                  <Input label="Local Crew" value={p.local} onChange={v => setParty(x=>({...x,local:v}))} />
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: -4, marginBottom: 8 }}>
                  Total tour party: <strong style={{ color: C.text }}>{p.band + p.crew + p.local}</strong> pax
                </div>
              </Section>

              {/* FLIGHTS */}
              <Section title="✈️ Flights">
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textDim, marginBottom: 8 }}>INTERNATIONAL</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label="Pax" value={p.intlFlightPax} onChange={v => setParty(x=>({...x,intlFlightPax:v}))} />
                  <Input label="Est. Cost Per Pax" value={p.intlFlightCost} onChange={v => setParty(x=>({...x,intlFlightCost:v}))} prefix="$" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textDim, marginBottom: 8, marginTop: 4 }}>DOMESTIC</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Input label="Legs" value={p.domLegs} onChange={v => setParty(x=>({...x,domLegs:v}))} />
                  <Input label="Pax" value={p.domPax} onChange={v => setParty(x=>({...x,domPax:v}))} />
                  <Input label="Avg Cost/Leg/Pax" value={p.domCostPerLeg} onChange={v => setParty(x=>({...x,domCostPerLeg:v}))} prefix="$" />
                </div>
              </Section>

              {/* ACCOM */}
              <Section title="🏨 Accommodation">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Input label="Nights" value={p.accomNights} onChange={v => setParty(x=>({...x,accomNights:v}))} />
                  <Input label="Rooms" value={p.accomRooms} onChange={v => setParty(x=>({...x,accomRooms:v}))} />
                  <Input label="Rate/Night" value={p.accomRate} onChange={v => setParty(x=>({...x,accomRate:v}))} prefix="$" />
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>Total: <strong style={{ color: C.text }}>{fmt(costs.accom)}</strong></div>
              </Section>

              {/* GROUND TRANSPORT */}
              <Section title="🚐 Ground Transport">
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textDim, marginBottom: 6 }}>SPRINTER TRANSFERS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label="Legs" value={p.sprinterLegs} onChange={v => setParty(x=>({...x,sprinterLegs:v}))} />
                  <Input label="Per Leg" value={p.sprinterCost} onChange={v => setParty(x=>({...x,sprinterCost:v}))} prefix="$" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textDim, marginBottom: 6, marginTop: 4 }}>VAN RENTAL</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Input label="Days" value={p.vanDays} onChange={v => setParty(x=>({...x,vanDays:v}))} />
                  <Input label="Vans" value={p.vans} onChange={v => setParty(x=>({...x,vans:v}))} />
                  <Input label="Rate/Day" value={p.vanRate} onChange={v => setParty(x=>({...x,vanRate:v}))} prefix="$" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textDim, marginBottom: 6, marginTop: 4 }}>DRIVERS</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Input label="Drivers" value={p.drivers} onChange={v => setParty(x=>({...x,drivers:v}))} />
                  <Input label="Days" value={p.driverDays} onChange={v => setParty(x=>({...x,driverDays:v}))} />
                  <Input label="Day Rate" value={p.driverRate} onChange={v => setParty(x=>({...x,driverRate:v}))} prefix="$" />
                </div>
              </Section>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              {/* COMPLIANCE */}
              <Section title="📋 Compliance">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Input label="Visa Pax" value={p.visaPax} onChange={v => setParty(x=>({...x,visaPax:v}))} />
                  <Input label="Visa Fee" value={p.visaFee} onChange={v => setParty(x=>({...x,visaFee:v}))} prefix="$" />
                  <Input label="Union Fee" value={p.union} onChange={v => setParty(x=>({...x,union:v}))} prefix="$" />
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>Visa total: <strong style={{color:C.text}}>{fmt(p.visaPax*(p.visaFee+p.union))}</strong> + APRA 2% on forecast: <strong style={{color:C.text}}>{fmt(apra)}</strong></div>
              </Section>

              {/* SHOW COSTS */}
              <Section title="🎭 Show Costs">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label="Tour Mgr Rate/Day" value={p.tourMgrRate} onChange={v => setParty(x=>({...x,tourMgrRate:v}))} prefix="$" />
                  <Input label="Tour Mgr Days" value={p.tourMgrDays} onChange={v => setParty(x=>({...x,tourMgrDays:v}))} />
                  <Input label="Stagehand/Shows" value={p.stagehandShows} onChange={v => setParty(x=>({...x,stagehandShows:v}))} />
                  <Input label="Stagehand Rate" value={p.stagehandRate} onChange={v => setParty(x=>({...x,stagehandRate:v}))} prefix="$" />
                  <Input label="Support Staff" value={p.supportStaff} onChange={v => setParty(x=>({...x,supportStaff:v}))} />
                  <Input label="Staff Rate/Show" value={p.supportRate} onChange={v => setParty(x=>({...x,supportRate:v}))} prefix="$" />
                  <Input label="Support Acts" value={p.supports} onChange={v => setParty(x=>({...x,supports:v}))} />
                  <Input label="Support Fee/Show" value={p.supportFee} onChange={v => setParty(x=>({...x,supportFee:v}))} prefix="$" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
                  <Input label="Per Diem Pax" value={p.perDiemPax} onChange={v => setParty(x=>({...x,perDiemPax:v}))} />
                  <Input label="PD Rate/Day" value={p.pdRate} onChange={v => setParty(x=>({...x,pdRate:v}))} prefix="$" />
                  <Input label="PD Show Days" value={p.pdShows} onChange={v => setParty(x=>({...x,pdShows:v}))} />
                  <Input label="Catering/Show" value={p.catering} onChange={v => setParty(x=>({...x,catering:v}))} prefix="$" />
                  <Input label="Catering Shows" value={p.cateringShows} onChange={v => setParty(x=>({...x,cateringShows:v}))} />
                  <Input label="Passes (national)" value={p.passes} onChange={v => setParty(x=>({...x,passes:v}))} prefix="$" />
                </div>
              </Section>

              {/* PRODUCTION */}
              <Section title="🎛️ Production">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Input label="Backline Shows" value={p.backlineShows} onChange={v => setParty(x=>({...x,backlineShows:v}))} />
                  <Input label="Backline/Show" value={p.backlineCost} onChange={v => setParty(x=>({...x,backlineCost:v}))} prefix="$" />
                  <Input label="Lighting Shows" value={p.lightingShows} onChange={v => setParty(x=>({...x,lightingShows:v}))} />
                  <Input label="Lighting Rate" value={p.lightingRate} onChange={v => setParty(x=>({...x,lightingRate:v}))} prefix="$" />
                </div>
              </Section>

              {/* MARKETING */}
              <Section title="📣 Marketing">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <Input label="Social / Digital" value={p.marketing} onChange={v => setParty(x=>({...x,marketing:v}))} prefix="$" />
                  <Input label="Publicist" value={p.publicist} onChange={v => setParty(x=>({...x,publicist:v}))} prefix="$" />
                  <Input label="Creative" value={p.creative} onChange={v => setParty(x=>({...x,creative:v}))} prefix="$" />
                </div>
              </Section>

              {/* MISC */}
              <Section title="⚙️ Misc & Contingency">
                <Input label="Contingency" value={p.contingency} onChange={v => setParty(x=>({...x,contingency:v}))} prefix="$" />
              </Section>

              {/* EXPENSE SUMMARY */}
              <Section title="💸 Expense Summary">
                {[
                  ["Venue Hire (all shows)", totalVenueHire],
                  ["Compliance (Visa + APRA)", costs.compliance],
                  ["Flights & Accommodation", totalLogistics],
                  ["Show Costs", totalShowCosts],
                  ["Production", totalProduction],
                  ["Marketing", totalMarketing],
                  ["Misc / Contingency", totalMisc],
                  ["Artist Fee (AUD)", artistAUD],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                    <span style={{ color: C.textDim }}>{label}</span>
                    <span style={{ color: C.text, fontWeight: 600 }}>{fmt(val)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 16, fontWeight: 800 }}>
                  <span style={{ color: C.text }}>TOTAL EXPENSES</span>
                  <span style={{ color: C.red }}>{fmt(totalExpenses)}</span>
                </div>
              </Section>

              {/* BREAKEVEN + SCENARIOS */}
              <Section title="📈 Revenue Scenarios" accent>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  <Stat label="OpEx Only Break-Even" value={pct(totalOpEx / Math.max(totalSellOutNet,1))} sub={`${fmt(totalOpEx)} to cover ops`} color={C.yellow} />
                  <Stat label="Sell-Out Net Revenue" value={fmt(totalSellOutNet)} color={C.green} />
                </div>
                <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr 1fr", background: C.bg, padding: "8px 12px", fontSize: 11, color: C.muted, textTransform: "uppercase", gap: 8 }}>
                    <span>Fill %</span><span>Net Revenue</span><span>After OpEx</span><span>Headroom for Artist</span><span></span>
                  </div>
                  {scenarioPcts.map(sp => {
                    const rev = scenarioRevenue(sp);
                    const afterOpEx = rev - totalOpEx;
                    const isTarget = Math.round(sp * 100) === offerTargetBE;
                    const isPositive = afterOpEx >= 0;
                    return (
                      <div key={sp} style={{
                        display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr 1fr",
                        padding: "9px 12px", fontSize: 13, borderTop: `1px solid ${C.border}`,
                        background: isTarget ? "rgba(249,115,22,0.12)" : isPositive ? "rgba(34,197,94,0.04)" : "transparent",
                        gap: 8
                      }}>
                        <span style={{ color: isTarget ? C.accent : C.text, fontWeight: isTarget ? 800 : 600 }}>
                          {Math.round(sp * 100)}%{isTarget ? " ◀" : ""}
                        </span>
                        <span style={{ color: C.textDim }}>{fmt(rev)}</span>
                        <span style={{ color: isPositive ? C.green : C.red, fontWeight: 600 }}>{fmt(afterOpEx)}</span>
                        <span style={{ color: isPositive ? C.accent : C.muted, fontWeight: isTarget ? 800 : 400 }}>
                          {isPositive ? fmt(afterOpEx) : "—"}
                        </span>
                        <span style={{ fontSize: 11, color: isTarget ? C.accent : isPositive ? C.green : C.red }}>
                          {isTarget ? "🎯 TARGET BE" : isPositive ? "✅" : "❌"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Section>

              {/* OFFER GENERATOR */}
              <Section title="🤝 Offer Generator" accent>
                {/* CONTROLS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  <div>
                    <Label>Target Break-Even % (your comfort threshold)</Label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input type="range" min={40} max={85} step={5} value={offerTargetBE}
                        onChange={e => setOfferTargetBE(+e.target.value)}
                        style={{ flex: 1, accentColor: C.accent }} />
                      <span style={{ color: C.accent, fontWeight: 800, fontSize: 18, minWidth: 44 }}>{offerTargetBE}%</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                      Revenue at {offerTargetBE}%: <strong style={{ color: C.text }}>{fmt(revenueAtTargetBE)}</strong>
                    </div>
                  </div>
                  <div>
                    <Label>Research: Avg overseas gross per show ({artist.dealCurrency})</Label>
                    <div style={{ display: "flex", alignItems: "center", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
                      <span style={{ padding: "0 8px", color: C.muted, fontSize: 13 }}>{artist.dealCurrency}</span>
                      <input type="number" value={researchOverseasGross}
                        onChange={e => setResearchOverseasGross(+e.target.value)}
                        style={{ background: "transparent", border: "none", outline: "none", color: C.text, padding: "8px 10px", width: "100%", fontSize: 14 }} />
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                      Pull from Research tab — what are they grossing per show?
                    </div>
                  </div>
                </div>

                {/* HEADROOM BREAKDOWN */}
                <div style={{ background: C.bg, borderRadius: 8, padding: "14px 16px", marginBottom: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ fontWeight: 700, color: C.text, marginBottom: 10, fontSize: 13 }}>OFFER HEADROOM CALCULATION</div>
                  {[
                    ["Net revenue at " + offerTargetBE + "% fill", revenueAtTargetBE, C.text],
                    ["Less: OpEx (all expenses excl. artist fee)", -totalOpEx, C.red],
                  ].map(([lbl, val, col]) => (
                    <div key={lbl} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ color: C.muted }}>{lbl}</span>
                      <span style={{ color: col, fontWeight: 600 }}>{val < 0 ? "− " + fmt(Math.abs(val)) : fmt(val)}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, padding: "10px 0 0" }}>
                    <span style={{ color: C.text }}>MAX ARTIST OFFER (AUD)</span>
                    <span style={{ color: maxOfferHeadroom > 0 ? C.accent : C.red }}>{fmt(maxOfferHeadroom)}</span>
                  </div>
                  {numShows > 1 && (
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                      = {fmt(maxOfferHeadroomPerShow)} per show across {numShows} shows
                    </div>
                  )}
                </div>

                {/* OFFER TIERS */}
                {maxOfferHeadroom > 0 ? (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Offer Tiers</div>
                    {[
                      { label: "Conservative", desc: "70% of headroom — strong buffer", aud: offerConservative, color: C.green },
                      { label: "Mid", desc: "85% of headroom — balanced risk", aud: offerMid, color: C.yellow },
                      { label: "Stretch", desc: "Full headroom — break-even at " + offerTargetBE + "%", aud: offerStretch, color: C.red },
                    ].map(tier => {
                      const foreignAmt = toForeignOffer(tier.aud);
                      const perShow = numShows > 0 ? tier.aud / numShows : 0;
                      const perShowForeign = toForeignOffer(perShow);
                      return (
                        <div key={tier.label} style={{ background: C.card, borderRadius: 8, padding: "12px 14px", marginBottom: 8, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontWeight: 700, color: tier.color, fontSize: 14 }}>{tier.label}</div>
                            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{tier.desc}</div>
                            {numShows > 1 && <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{artist.dealCurrency !== "AUD" ? `${artist.dealCurrency} ${Math.round(perShowForeign).toLocaleString()}` : fmt(perShow)} per show</div>}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 20, fontWeight: 800, color: tier.color }}>{fmt(tier.aud)}</div>
                            {artist.dealCurrency !== "AUD" && (
                              <div style={{ fontSize: 13, color: C.textDim, marginTop: 2 }}>
                                {artist.dealCurrency} {Math.round(foreignAmt).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ background: "rgba(239,68,68,0.1)", border: `1px solid ${C.red}`, borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
                    <div style={{ color: C.red, fontWeight: 700 }}>⚠️ No headroom at {offerTargetBE}% fill</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>OpEx ({fmt(totalOpEx)}) exceeds revenue at this attendance level ({fmt(revenueAtTargetBE)}). Adjust ticket prices, reduce costs, or raise your target BE% threshold.</div>
                  </div>
                )}

                {/* OVERSEAS SENSE CHECK */}
                {overseasSenseCheck !== null && (
                  <div style={{ background: C.bg, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}`, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: C.blue, marginBottom: 6, fontSize: 13 }}>🌍 OVERSEAS SENSE CHECK</div>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>
                      Research shows they gross ~{artist.dealCurrency} {Math.round(researchOverseasGross).toLocaleString()} per show overseas.
                      Our max offer per show is {artist.dealCurrency !== "AUD" ? `${artist.dealCurrency} ${Math.round(toForeignOffer(maxOfferHeadroomPerShow)).toLocaleString()}` : fmt(maxOfferHeadroomPerShow)}.
                    </div>
                    {[
                      { label: "Conservative offer", pctOfOverseas: (toForeignOffer(offerConservative / numShows) / researchOverseasGross) * 100 },
                      { label: "Mid offer", pctOfOverseas: (toForeignOffer(offerMid / numShows) / researchOverseasGross) * 100 },
                      { label: "Stretch offer", pctOfOverseas: (toForeignOffer(offerStretch / numShows) / researchOverseasGross) * 100 },
                    ].map(t => {
                      const good = t.pctOfOverseas >= 40;
                      const ok = t.pctOfOverseas >= 25;
                      const icon = good ? "✅" : ok ? "⚠️" : "❌";
                      const col = good ? C.green : ok ? C.yellow : C.red;
                      const note = good ? "likely acceptable" : ok ? "low — may need justification" : "probably too low to land";
                      return (
                        <div key={t.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, padding: "4px 0" }}>
                          <span style={{ color: C.textDim }}>{t.label}</span>
                          <span style={{ color: col }}>{icon} {t.pctOfOverseas.toFixed(0)}% of overseas gross — <em>{note}</em></span>
                        </div>
                      );
                    })}
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 8, fontStyle: "italic" }}>
                      Note: AUS typically 40–60% of US/EU gross is considered a fair market offer.
                    </div>
                  </div>
                )}

                {/* NOTES */}
                <div>
                  <Label>Offer Notes / Justification</Label>
                  <textarea value={researchNote} onChange={e => setResearchNote(e.target.value)}
                    rows={3} placeholder="e.g. Last AUS tour 2022 @ Metro (800 cap, sold out). Competing with X in March. Requesting 6-show flat @ USD 8,000 total..."
                    style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "8px 10px", width: "100%", fontSize: 12, resize: "vertical" }} />
                </div>
              </Section>
            </div>
          </div>
        </div>
      )}

      {/* ── SHOW BY SHOW TAB ── */}
      {tab === "showbyshow" && (
        <div style={{ padding: 24, maxWidth: 1400, margin: "0 auto" }}>
          <ShowByShowTab shows={shows} artist={artist} fx={fx} artistAUD={artistAUD} />
        </div>
      )}

      {/* ── TICKETING TAB ── */}
      {tab === "ticketing" && (
        <div style={{ padding: 24, maxWidth: 1400, margin: "0 auto" }}>
          <TicketingTab shows={shows} artist={artist} />
        </div>
      )}

      {/* ── VENUE DATABASE TAB ── */}
      {tab === "venues" && (
        <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
          <VenueTab />
        </div>
      )}

      {/* ── RESEARCH TAB ── */}
      {tab === "research" && (
        <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
          <ResearchTab />
        </div>
      )}
    </div>
  );
}

// ─── VENUE DATABASE TAB ────────────────────────────────────────────────────
function VenueTab() {
  const [filter, setFilter] = useState({ state: "ALL", search: "" });
  const [venues, setVenues] = useState(VENUE_DB);
  const [adding, setAdding] = useState(false);
  const [newV, setNewV] = useState({ city:"", state:"NSW", name:"", cap:0, hire:0, perHead:5.5 });

  const filtered = venues.filter(v =>
    (filter.state === "ALL" || v.state === filter.state) &&
    (filter.search === "" || v.name.toLowerCase().includes(filter.search.toLowerCase()) || v.city.toLowerCase().includes(filter.search.toLowerCase()))
  );

  const addVenue = () => {
    if (!newV.name || !newV.city) return;
    setVenues(v => [...v, { ...newV }]);
    setAdding(false);
    setNewV({ city:"", state:"NSW", name:"", cap:0, hire:0, perHead:5.5 });
  };

  const states = ["ALL", ...STATES];

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
        <select value={filter.state} onChange={e => setFilter(f=>({...f,state:e.target.value}))}
          style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "8px 12px", fontSize: 13 }}>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
        <input placeholder="Search venues…" value={filter.search} onChange={e => setFilter(f=>({...f,search:e.target.value}))}
          style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, padding: "8px 12px", fontSize: 13, flex: 1 }} />
        <button onClick={() => setAdding(true)}
          style={{ background: C.accent, border: "none", borderRadius: 6, color: "#fff", padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
          + Add Venue
        </button>
      </div>

      {adding && (
        <div style={{ background: C.panel, borderRadius: 8, padding: 16, marginBottom: 16, border: `1px solid ${C.accent}` }}>
          <div style={{ fontWeight: 700, color: C.accent, marginBottom: 12 }}>NEW VENUE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
            <input placeholder="City" value={newV.city} onChange={e=>setNewV(v=>({...v,city:e.target.value}))}
              style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"7px 10px", fontSize:13 }} />
            <select value={newV.state} onChange={e=>setNewV(v=>({...v,state:e.target.value}))}
              style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"7px 10px", fontSize:13 }}>
              {STATES.map(s=><option key={s}>{s}</option>)}
            </select>
            <input placeholder="Venue Name" value={newV.name} onChange={e=>setNewV(v=>({...v,name:e.target.value}))}
              style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"7px 10px", fontSize:13, gridColumn:"span 2" }} />
            <input type="number" placeholder="Capacity" value={newV.cap} onChange={e=>setNewV(v=>({...v,cap:+e.target.value}))}
              style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"7px 10px", fontSize:13 }} />
            <input type="number" placeholder="Hire $" value={newV.hire} onChange={e=>setNewV(v=>({...v,hire:+e.target.value}))}
              style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"7px 10px", fontSize:13 }} />
          </div>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <button onClick={addVenue} style={{ background:C.accent, border:"none", borderRadius:6, color:"#fff", padding:"8px 20px", cursor:"pointer", fontWeight:700 }}>Save</button>
            <button onClick={()=>setAdding(false)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:6, color:C.muted, padding:"8px 20px", cursor:"pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: C.panel, borderRadius: 8, border: `1px solid ${C.border}`, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"80px 120px 1fr 100px 120px 100px", background:C.bg, padding:"10px 16px", fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:1, gap:8 }}>
          <span>State</span><span>City</span><span>Venue</span><span>Capacity</span><span>Flat Hire</span><span>Per Head</span>
        </div>
        {filtered.map((v, i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"80px 120px 1fr 100px 120px 100px", padding:"10px 16px", borderTop:`1px solid ${C.border}`, fontSize:13, gap:8, alignItems:"center" }}>
            <span style={{ background:C.card, borderRadius:4, padding:"2px 6px", fontSize:11, color:C.accent, fontWeight:700, textAlign:"center" }}>{v.state}</span>
            <span style={{ color:C.textDim }}>{v.city}</span>
            <span style={{ color:C.text, fontWeight:600 }}>{v.name}</span>
            <span style={{ color:C.text }}>{v.cap.toLocaleString()}</span>
            <span style={{ color: v.hire > 0 ? C.text : C.muted }}>{v.hire > 0 ? fmt(v.hire) : "Door deal"}</span>
            <span style={{ color:C.textDim }}>{fmt(v.perHead)}</span>
          </div>
        ))}
        <div style={{ padding:"10px 16px", fontSize:12, color:C.muted, borderTop:`1px solid ${C.border}` }}>
          Showing {filtered.length} of {venues.length} venues
        </div>
      </div>
    </div>
  );
}

// ─── RESEARCH TAB ──────────────────────────────────────────────────────────
function ResearchTab() {
  const emptyResearch = {
    artist:"", agent:"", genre:"", period:"",
    fbTotal:"", fbAU:"", igTotal:"", igAU:"",
    ytTotal:"", spotMonthly:"", tiktok:"",
    prevTours:[], overseaShows:[], competing:[], notes:"",
    avgOverseasCap:"", avgOverseasTicket:"", avgAusCap:"", avgAusTicket:"",
    lastPromoter:"", soldOutFlag:"",
  };

  const [r, setR] = useState(emptyResearch);
  const [searching, setSearching] = useState(false);
  const [searchLog, setSearchLog] = useState([]);
  const [searchDone, setSearchDone] = useState(false);

  const iS = { background:C.bg, border:`1px solid ${C.border}`, borderRadius:5, color:C.text, padding:"6px 8px", fontSize:12, width:"100%" };

  const addRow = (field, tmpl) => setR(x=>({...x,[field]:[...x[field],{...tmpl}]}));
  const updRow = (field, i, val) => setR(x=>({...x,[field]:x[field].map((row,j)=>j===i?{...row,...val}:row)}));
  const delRow = (field, i) => setR(x=>({...x,[field]:x[field].filter((_,j)=>j!==i)}));

  const log = (msg) => setSearchLog(l => [...l, msg]);

  const runSearch = async () => {
    if (!r.artist.trim()) return;
    setSearching(true);
    setSearchDone(false);
    setSearchLog([]);
    log(`🔍 Starting research on: ${r.artist}`);

  

    try {
      log("📡 Searching the web for tour history, venues, social stats...");
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistName: r.artist })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const { data: d, error: apiError } = await res.json();
      if (apiError) throw new Error(apiError);

      log("📦 Data received, populating fields...");

      setR(prev => ({
        ...prev,
        agent: d.agent || prev.agent,
        genre: d.genre || prev.genre,
        fbTotal: d.fbTotal || prev.fbTotal,
        igTotal: d.igTotal || prev.igTotal,
        ytTotal: d.ytTotal || prev.ytTotal,
        spotMonthly: d.spotMonthly || prev.spotMonthly,
        tiktok: d.tiktok || prev.tiktok,
        prevTours: d.prevTours?.length ? d.prevTours : prev.prevTours,
        overseaShows: d.overseaShows?.length ? d.overseaShows : prev.overseaShows,
        competing: d.competing?.length ? d.competing : prev.competing,
        notes: d.notes || prev.notes,
        lastPromoter: d.lastPromoter || prev.lastPromoter,
        soldOutFlag: d.soldOutFlag || prev.soldOutFlag,
      }));

      // Compute averages
      if (d.overseaShows?.length) {
        const caps = d.overseaShows.map(s => parseFloat(s.size)).filter(n => !isNaN(n) && n > 0);
        const prices = d.overseaShows.map(s => parseFloat(s.price)).filter(n => !isNaN(n) && n > 0);
        if (caps.length) setR(x => ({...x, avgOverseasCap: Math.round(caps.reduce((a,b)=>a+b,0)/caps.length).toString()}));
        if (prices.length) setR(x => ({...x, avgOverseasTicket: Math.round(prices.reduce((a,b)=>a+b,0)/prices.length).toString()}));
      }
      if (d.prevTours?.length) {
        const caps = d.prevTours.map(s => parseFloat(s.pax)).filter(n => !isNaN(n) && n > 0);
        const prices = d.prevTours.map(s => parseFloat(s.price)).filter(n => !isNaN(n) && n > 0);
        if (caps.length) setR(x => ({...x, avgAusCap: Math.round(caps.reduce((a,b)=>a+b,0)/caps.length).toString()}));
        if (prices.length) setR(x => ({...x, avgAusTicket: Math.round(prices.reduce((a,b)=>a+b,0)/prices.length).toString()}));
      }

      log(`✅ Done! Found ${d.prevTours?.length || 0} AUS shows, ${d.overseaShows?.length || 0} overseas shows.`);
      setSearchDone(true);
    } catch (err) {
      log(`❌ Error: ${err.message}`);
    } finally {
      setSearching(false);
    }
  };

  const avgOvCap = parseFloat(r.avgOverseasCap) || 0;
  const avgOvTix = parseFloat(r.avgOverseasTicket) || 0;
  const avgAusCap = parseFloat(r.avgAusCap) || 0;
  const avgAusTix = parseFloat(r.avgAusTicket) || 0;
  const estOverseasGross = avgOvCap * avgOvTix;
  const estAusGross = avgAusCap * avgAusTix;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>

      {/* SEARCH BAR */}
      <Section title="🔍 Artist Research — Auto Search" accent>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 160px 120px", gap:10, marginBottom:12 }}>
          <div>
            <Label>Artist / Band Name</Label>
            <input value={r.artist} onChange={e=>setR(x=>({...x,artist:e.target.value}))}
              onKeyDown={e=>e.key==="Enter" && !searching && runSearch()}
              placeholder="e.g. Buckcherry, Fozzy, Steel Panther…"
              style={{ ...iS, fontSize:15, padding:"10px 12px" }} />
          </div>
          <div>
            <Label>Agent (optional)</Label>
            <input value={r.agent} onChange={e=>setR(x=>({...x,agent:e.target.value}))}
              placeholder="Agent name"
              style={{ ...iS, padding:"10px 12px" }} />
          </div>
          <div style={{ display:"flex", alignItems:"flex-end" }}>
            <button onClick={runSearch} disabled={searching || !r.artist.trim()}
              style={{ width:"100%", padding:"10px 0", background: searching ? C.muted : C.accent, border:"none", borderRadius:8,
                color:"#fff", fontWeight:800, fontSize:14, cursor: searching ? "not-allowed" : "pointer", transition:"all 0.15s" }}>
              {searching ? "Searching…" : "🔍 Search"}
            </button>
          </div>
        </div>

        {/* LOG */}
        {searchLog.length > 0 && (
          <div style={{ background:C.bg, borderRadius:6, padding:"10px 14px", fontSize:12, fontFamily:"monospace" }}>
            {searchLog.map((l,i) => (
              <div key={i} style={{ color: l.startsWith("❌") ? C.red : l.startsWith("✅") ? C.green : C.textDim, marginBottom:2 }}>{l}</div>
            ))}
          </div>
        )}
      </Section>

      {/* SNAPSHOT STATS — only show once search done */}
      {searchDone && (
        <Section title="📊 Research Snapshot" accent>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
            <Stat label="Avg Overseas Cap" value={avgOvCap > 0 ? fmtN(avgOvCap) : "—"} sub="per show" color={C.blue} />
            <Stat label="Avg Overseas Ticket" value={avgOvTix > 0 ? `$${avgOvTix}` : "—"} sub="USD/local" color={C.blue} />
            <Stat label="Avg AUS Cap" value={avgAusCap > 0 ? fmtN(avgAusCap) : "—"} sub="per show" color={C.yellow} />
            <Stat label="Avg AUS Ticket" value={avgAusTix > 0 ? `$${avgAusTix}` : "—"} sub="AUD" color={C.yellow} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            <Stat label="Est. Overseas Gross/Show" value={estOverseasGross > 0 ? `$${Math.round(estOverseasGross).toLocaleString()}` : "—"} color={C.green} />
            <Stat label="Last AUS Promoter" value={r.lastPromoter || "Unknown"} color={C.text} />
            <Stat label="Last Tour Sold Out?" value={r.soldOutFlag || "Unknown"} color={r.soldOutFlag === "Yes" ? C.green : r.soldOutFlag === "No" ? C.red : C.yellow} />
          </div>
          {r.notes && (
            <div style={{ marginTop:12, background:C.bg, borderRadius:8, padding:"12px 14px", fontSize:13, color:C.textDim, lineHeight:1.6, borderLeft:`3px solid ${C.accent}` }}>
              {r.notes}
            </div>
          )}
        </Section>
      )}

      {/* SOCIALS */}
      <Section title="📱 Social & Streaming Metrics">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[["Facebook",r.fbTotal,"fbTotal"],["Instagram",r.igTotal,"igTotal"],["YouTube Subs",r.ytTotal,"ytTotal"],
            ["Spotify Monthly",r.spotMonthly,"spotMonthly"],["TikTok",r.tiktok,"tiktok"],["Genre",r.genre,"genre"]].map(([lbl,val,key])=>(
            <div key={key}>
              <Label>{lbl}</Label>
              <input value={val} onChange={e=>setR(x=>({...x,[key]:e.target.value}))} style={iS} placeholder="—" />
            </div>
          ))}
        </div>
      </Section>

      {/* PREVIOUS AUS TOURS */}
      <Section title="🇦🇺 Previous Australian Tours">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr 80px 80px 70px 1fr 80px 80px", gap:6, marginBottom:6, fontSize:10, color:C.muted, textTransform:"uppercase" }}>
          <span>City</span><span>Venue</span><span>Cap</span><span>Ticket $</span><span>Year</span><span>Promoter</span><span>Sold Out</span><span></span>
        </div>
        {r.prevTours.map((row,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr 80px 80px 70px 1fr 80px 80px", gap:6, marginBottom:6, alignItems:"center" }}>
            {["city","venue","pax","price","year","promoter"].map(f=>(
              <input key={f} value={row[f]||""} onChange={e=>updRow("prevTours",i,{[f]:e.target.value})} style={iS} placeholder={f} />
            ))}
            <select value={row.soldOut||"Unknown"} onChange={e=>updRow("prevTours",i,{soldOut:e.target.value})}
              style={{ ...iS, color: row.soldOut==="Yes" ? C.green : row.soldOut==="No" ? C.red : C.muted }}>
              <option>Unknown</option><option>Yes</option><option>No</option><option>Partial</option>
            </select>
            <button onClick={()=>delRow("prevTours",i)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:16 }}>×</button>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6 }}>
          <button onClick={()=>addRow("prevTours",{city:"",venue:"",pax:"",price:"",year:"",promoter:"",soldOut:"Unknown"})}
            style={{ background:"none", border:`1px dashed ${C.border}`, borderRadius:6, color:C.muted, padding:"5px 12px", cursor:"pointer", fontSize:12 }}>+ Add Row</button>
          {r.prevTours.length > 0 && (
            <div style={{ fontSize:11, color:C.muted }}>
              Avg cap: <strong style={{color:C.text}}>{avgAusCap > 0 ? fmtN(avgAusCap) : "—"}</strong> &nbsp;|&nbsp;
              Avg ticket: <strong style={{color:C.text}}>{avgAusTix > 0 ? `$${avgAusTix}` : "—"}</strong> AUD &nbsp;|&nbsp;
              Sold out: <strong style={{color:C.green}}>{r.prevTours.filter(t=>t.soldOut==="Yes").length}/{r.prevTours.length}</strong>
            </div>
          )}
        </div>
      </Section>

      {/* OVERSEAS SHOWS */}
      <Section title="🌍 Current / Recent Overseas Shows">
        <div style={{ display:"grid", gridTemplateColumns:"100px 1.5fr 1fr 90px 90px 80px 80px", gap:6, marginBottom:6, fontSize:10, color:C.muted, textTransform:"uppercase" }}>
          <span>Date</span><span>Venue</span><span>City / Country</span><span>Cap</span><span>Ticket $</span><span>Sold Out</span><span></span>
        </div>
        {r.overseaShows.map((row,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"100px 1.5fr 1fr 90px 90px 80px 80px", gap:6, marginBottom:6, alignItems:"center" }}>
            {["date","venue","city","size","price"].map(f=>(
              <input key={f} value={row[f]||""} onChange={e=>updRow("overseaShows",i,{[f]:e.target.value})} style={iS} placeholder={f} />
            ))}
            <select value={row.soldOut||"Unknown"} onChange={e=>updRow("overseaShows",i,{soldOut:e.target.value})}
              style={{ ...iS, color: row.soldOut==="Yes" ? C.green : row.soldOut==="No" ? C.red : C.muted }}>
              <option>Unknown</option><option>Yes</option><option>No</option><option>Partial</option>
            </select>
            <button onClick={()=>delRow("overseaShows",i)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:16 }}>×</button>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6 }}>
          <button onClick={()=>addRow("overseaShows",{date:"",venue:"",city:"",size:"",price:"",soldOut:"Unknown"})}
            style={{ background:"none", border:`1px dashed ${C.border}`, borderRadius:6, color:C.muted, padding:"5px 12px", cursor:"pointer", fontSize:12 }}>+ Add Row</button>
          {r.overseaShows.length > 0 && (
            <div style={{ fontSize:11, color:C.muted }}>
              Avg cap: <strong style={{color:C.text}}>{avgOvCap > 0 ? fmtN(avgOvCap) : "—"}</strong> &nbsp;|&nbsp;
              Avg ticket: <strong style={{color:C.text}}>{avgOvTix > 0 ? `$${avgOvTix}` : "—"}</strong> &nbsp;|&nbsp;
              Est gross/show: <strong style={{color:C.green}}>{estOverseasGross > 0 ? `$${Math.round(estOverseasGross).toLocaleString()}` : "—"}</strong>
            </div>
          )}
        </div>
      </Section>

      {/* COMPETING TOURS */}
      <Section title="⚔️ Competing / Similar Tours in Market">
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 100px 1fr 80px 100px 80px", gap:6, marginBottom:6, fontSize:10, color:C.muted, textTransform:"uppercase" }}>
          <span>Artist</span><span>When</span><span>Promoter</span><span>Ticket $</span><span>Venue Size</span><span></span>
        </div>
        {r.competing.map((row,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1.5fr 100px 1fr 80px 100px 80px", gap:6, marginBottom:6, alignItems:"center" }}>
            {["artist","month","promoter","price","venueSize"].map(f=>(
              <input key={f} value={row[f]||""} onChange={e=>updRow("competing",i,{[f]:e.target.value})} style={iS} placeholder={f} />
            ))}
            <button onClick={()=>delRow("competing",i)} style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:16 }}>×</button>
          </div>
        ))}
        <button onClick={()=>addRow("competing",{artist:"",month:"",promoter:"",price:"",venueSize:""})}
          style={{ background:"none", border:`1px dashed ${C.border}`, borderRadius:6, color:C.muted, padding:"5px 12px", cursor:"pointer", fontSize:12, marginTop:4 }}>+ Add Row</button>
      </Section>

      {/* MANUAL AVERAGE OVERRIDES */}
      <Section title="🧮 Averages & Offer Input (feeds Estimator)">
        <div style={{ fontSize:12, color:C.muted, marginBottom:10 }}>
          These are auto-calculated from the tables above but you can override them. The <strong style={{color:C.accent}}>Avg Overseas Gross/Show</strong> feeds directly into the Offer Generator sense-check.
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[
            ["Avg Overseas Cap","avgOverseasCap"],
            ["Avg Overseas Ticket (USD)","avgOverseasTicket"],
            ["Avg AUS Cap","avgAusCap"],
            ["Avg AUS Ticket (AUD)","avgAusTicket"],
          ].map(([lbl,key])=>(
            <div key={key}>
              <Label>{lbl}</Label>
              <input type="number" value={r[key]||""} onChange={e=>setR(x=>({...x,[key]:e.target.value}))} style={iS} placeholder="0" />
            </div>
          ))}
        </div>
        {estOverseasGross > 0 && (
          <div style={{ marginTop:12, background:C.bg, borderRadius:8, padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:1 }}>Estimated Gross Per Overseas Show</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{fmtN(avgOvCap)} cap × ${avgOvTix} ticket</div>
            </div>
            <div style={{ fontSize:24, fontWeight:800, color:C.green }}>${Math.round(estOverseasGross).toLocaleString()}</div>
          </div>
        )}
      </Section>

      {/* NOTES */}
      <Section title="📝 Notes">
        <textarea value={r.notes} onChange={e=>setR(x=>({...x,notes:e.target.value}))}
          rows={4} placeholder="Career snapshot, market notes, observations from research…"
          style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"10px", width:"100%", fontSize:13, resize:"vertical" }} />
      </Section>
    </div>
  );
}

// ─── SHOW BY SHOW TAB ─────────────────────────────────────────────────────
function ShowByShowTab({ shows, artist, fx, artistAUD }) {
  const numShows = shows.length;

  // ── NATIONAL COSTS (enter once, split across shows) ──
  const [national, setNational] = useState({
    intlFlights: 0, visas: 0, insurance: 0,
    passes: 0, marketing: 0, contingency: 0,
    artistFee: artistAUD,
  });

  // ── PER-SHOW DATA ──
  const blankShow = (s) => ({
    // from estimator
    city: s?.city || "",
    venue: s?.venueName || "",
    cap: s?.cap || 0,
    date: "",
    // ticket scaling
    catAPrice: s?.ticketPrice || 0,
    catACap: s?.cap || 0,
    catAForecast: s?.attendPct || 0.6,
    catBPrice: 0,
    catBCap: 0,
    catBForecast: 0.6,
    // costs — all blank for actuals
    venueFlat: s?.flatHire || 0,
    venuePerHead: 5.5,
    apra: 0,
    domFlights: 0,
    accom: 0,
    transfers: 0,
    vanHire: 0,
    drivers: 0,
    advancingProd: 0,
    prodMgr: 0,
    tourMgr: 0,
    tourMgrOffDays: 0,
    opsMgr: 0,
    stagehands: 0,
    runners: 0,
    tourStaff: 0,
    perDiems: 0,
    catering: 0,
    supports: 0,
    backline: 0,
    lightingTechs: 0,
    miscTechs: 0,
    prodAddOns: 0,
    marketing: 0,
    notes: "",
  });

  const [showData, setShowData] = useState(() => shows.map(s => blankShow(s)));
  const [view, setView] = useState("table"); // "table" | "card"
  const [activeCard, setActiveCard] = useState(0);

  const updShow = (i, key, val) =>
    setShowData(prev => prev.map((s, j) => j === i ? { ...s, [key]: val } : s));

  const natPerShow = numShows > 0 ? {
    intlFlights: national.intlFlights / numShows,
    visas: national.visas / numShows,
    insurance: national.insurance / numShows,
    passes: national.passes / numShows,
    marketing: national.marketing / numShows,
    contingency: national.contingency / numShows,
    artistFee: national.artistFee / numShows,
  } : {};

  const showCalc = (s, i) => {
    const netA = Math.max(0, s.catAPrice - 7.95);
    const netB = Math.max(0, s.catBPrice - 7.95);
    const forecastRevA = netA * s.catACap * s.catAForecast;
    const forecastRevB = netB * s.catBCap * s.catBForecast;
    const sellOutRevA = netA * s.catACap;
    const sellOutRevB = netB * s.catBCap;
    const forecastRev = forecastRevA + forecastRevB;
    const sellOutRev = sellOutRevA + sellOutRevB;

    const venueHire = s.venueFlat + (s.venuePerHead * s.cap);
    const apra = forecastRev * 0.02;
    const compliance = apra + (natPerShow.visas || 0) + (natPerShow.insurance || 0);
    const logistics = s.domFlights + s.accom + s.transfers + s.vanHire + s.drivers
      + (natPerShow.intlFlights || 0);
    const showCosts = s.advancingProd + s.prodMgr + s.tourMgr + s.tourMgrOffDays
      + s.opsMgr + s.stagehands + s.runners + s.tourStaff
      + s.perDiems + s.catering + s.supports
      + (natPerShow.passes || 0);
    const production = s.backline + s.lightingTechs + s.miscTechs + s.prodAddOns;
    const mktg = s.marketing + (natPerShow.marketing || 0);
    const misc = natPerShow.contingency || 0;
    const artistShare = natPerShow.artistFee || 0;

    const totalCosts = venueHire + compliance + logistics + showCosts + production + mktg + misc + artistShare;
    const plForecast = forecastRev - totalCosts;
    const plSellOut = sellOutRev - totalCosts;

    return { forecastRev, sellOutRev, venueHire, compliance, logistics, showCosts, production, mktg, misc, artistShare, totalCosts, plForecast, plSellOut };
  };

  const calcs = showData.map((s, i) => showCalc(s, i));

  const totals = {
    forecastRev: calcs.reduce((a, c) => a + c.forecastRev, 0),
    sellOutRev: calcs.reduce((a, c) => a + c.sellOutRev, 0),
    totalCosts: calcs.reduce((a, c) => a + c.totalCosts, 0),
    plForecast: calcs.reduce((a, c) => a + c.plForecast, 0),
    plSellOut: calcs.reduce((a, c) => a + c.plSellOut, 0),
  };

  const iS = { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 5, color: C.text, padding: "5px 7px", fontSize: 12, width: "100%" };
  const numInput = (i, key, val) => (
    <input type="number" value={val || ""} onChange={e => updShow(i, key, +e.target.value)} style={iS} placeholder="0" />
  );

  const CostRow = ({ label, i, field, val }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 110px", gap: 6, alignItems: "center", marginBottom: 4 }}>
      <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
      {numInput(i, field, val)}
    </div>
  );

  const NatRow = ({ label, field }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 110px", gap: 6, alignItems: "center", marginBottom: 6 }}>
      <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
      <input type="number" value={national[field] || ""} onChange={e => setNational(n => ({ ...n, [field]: +e.target.value }))}
        style={iS} placeholder="0" />
    </div>
  );

  // ── TABLE VIEW ──────────────────────────────────────────────────────────
  const TableView = () => {
    const cols = ["", ...showData.map((s, i) => `Show ${i + 1}`), "TOTAL"];
    const colW = `repeat(${numShows + 2}, 1fr)`;

    const HeaderRow = ({ label, accent }) => (
      <div style={{ display: "grid", gridTemplateColumns: colW, gap: 4, background: accent ? "rgba(249,115,22,0.15)" : C.card, padding: "6px 8px", borderTop: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: accent ? C.accent : C.textDim, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
        {showData.map((_, i) => <span key={i} />)}
        <span />
      </div>
    );

    const DataRow = ({ label, values, total, color, isInput, field }) => (
      <div style={{ display: "grid", gridTemplateColumns: colW, gap: 4, padding: "4px 8px", borderTop: `1px solid ${C.border}`, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
        {showData.map((s, i) => (
          <div key={i}>
            {isInput
              ? <input type="number" value={s[field] || ""} onChange={e => updShow(i, field, +e.target.value)} style={{ ...iS, padding: "3px 5px", fontSize: 11 }} placeholder="0" />
              : <span style={{ fontSize: 11, color: color || C.text }}>{values ? fmt(values[i]) : "—"}</span>
            }
          </div>
        ))}
        <span style={{ fontSize: 11, fontWeight: 700, color: color || C.text }}>{fmt(total)}</span>
      </div>
    );

    const TotalRow = ({ label, values, total, color }) => (
      <div style={{ display: "grid", gridTemplateColumns: colW, gap: 4, padding: "7px 8px", borderTop: `2px solid ${C.border}`, alignItems: "center", background: C.panel }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{label}</span>
        {values.map((v, i) => <span key={i} style={{ fontSize: 12, fontWeight: 700, color: color(v) }}>{fmt(v)}</span>)}
        <span style={{ fontSize: 13, fontWeight: 800, color: color(total) }}>{fmt(total)}</span>
      </div>
    );

    return (
      <div style={{ overflowX: "auto" }}>
        {/* Show headers */}
        <div style={{ display: "grid", gridTemplateColumns: colW, gap: 4, padding: "8px 8px", background: C.panel, borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Show</span>
          {showData.map((s, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 700, color: C.accent }}>
              <div>{s.city || `Show ${i + 1}`}</div>
              <div style={{ color: C.muted, fontWeight: 400 }}>{s.venue}</div>
            </div>
          ))}
          <span style={{ fontSize: 11, fontWeight: 700, color: C.textDim }}>NATIONAL</span>
        </div>

        {/* TICKET REVENUE */}
        <HeaderRow label="🎫 Ticket Revenue" accent />
        <DataRow label="Forecast Net Revenue" values={calcs.map(c => c.forecastRev)} total={totals.forecastRev} color={C.yellow} />
        <DataRow label="Sell-Out Net Revenue" values={calcs.map(c => c.sellOutRev)} total={totals.sellOutRev} color={C.green} />

        {/* VENUE HIRE */}
        <HeaderRow label="🏟️ Venue Hire" />
        <DataRow label="Flat Hire" isInput field="venueFlat" total={showData.reduce((a,s)=>a+s.venueFlat,0)} />
        <DataRow label="Per Head Fee" values={calcs.map((c,i) => showData[i].venuePerHead * showData[i].cap)} total={showData.reduce((a,s)=>a+(s.venuePerHead*s.cap),0)} />
        <TotalRow label="Subtotal — Venue" values={calcs.map(c=>c.venueHire)} total={calcs.reduce((a,c)=>a+c.venueHire,0)} color={v=>C.text} />

        {/* LOGISTICS */}
        <HeaderRow label="✈️ Logistics" />
        <DataRow label="Dom. Flights" isInput field="domFlights" total={showData.reduce((a,s)=>a+s.domFlights,0)} />
        <DataRow label="Accommodation" isInput field="accom" total={showData.reduce((a,s)=>a+s.accom,0)} />
        <DataRow label="Transfers" isInput field="transfers" total={showData.reduce((a,s)=>a+s.transfers,0)} />
        <DataRow label="Van Hire" isInput field="vanHire" total={showData.reduce((a,s)=>a+s.vanHire,0)} />
        <DataRow label="Drivers" isInput field="drivers" total={showData.reduce((a,s)=>a+s.drivers,0)} />
        <DataRow label="Intl Flights (allocated)" values={calcs.map(() => natPerShow.intlFlights||0)} total={national.intlFlights} />
        <TotalRow label="Subtotal — Logistics" values={calcs.map(c=>c.logistics)} total={calcs.reduce((a,c)=>a+c.logistics,0)} color={v=>C.text} />

        {/* SHOW COSTS */}
        <HeaderRow label="🎭 Show Costs" />
        <DataRow label="Tour Manager" isInput field="tourMgr" total={showData.reduce((a,s)=>a+s.tourMgr,0)} />
        <DataRow label="Tour Mgr Off Days" isInput field="tourMgrOffDays" total={showData.reduce((a,s)=>a+s.tourMgrOffDays,0)} />
        <DataRow label="Stagehands" isInput field="stagehands" total={showData.reduce((a,s)=>a+s.stagehands,0)} />
        <DataRow label="Tour Staff" isInput field="tourStaff" total={showData.reduce((a,s)=>a+s.tourStaff,0)} />
        <DataRow label="Per Diems" isInput field="perDiems" total={showData.reduce((a,s)=>a+s.perDiems,0)} />
        <DataRow label="Catering & Riders" isInput field="catering" total={showData.reduce((a,s)=>a+s.catering,0)} />
        <DataRow label="Support Acts" isInput field="supports" total={showData.reduce((a,s)=>a+s.supports,0)} />
        <TotalRow label="Subtotal — Show Costs" values={calcs.map(c=>c.showCosts)} total={calcs.reduce((a,c)=>a+c.showCosts,0)} color={v=>C.text} />

        {/* PRODUCTION */}
        <HeaderRow label="🎛️ Production" />
        <DataRow label="Backline" isInput field="backline" total={showData.reduce((a,s)=>a+s.backline,0)} />
        <DataRow label="Lighting Techs" isInput field="lightingTechs" total={showData.reduce((a,s)=>a+s.lightingTechs,0)} />
        <DataRow label="Misc Techs" isInput field="miscTechs" total={showData.reduce((a,s)=>a+s.miscTechs,0)} />
        <DataRow label="Prod Add-ons" isInput field="prodAddOns" total={showData.reduce((a,s)=>a+s.prodAddOns,0)} />
        <TotalRow label="Subtotal — Production" values={calcs.map(c=>c.production)} total={calcs.reduce((a,c)=>a+c.production,0)} color={v=>C.text} />

        {/* NATIONAL ALLOCATED */}
        <HeaderRow label="🌐 National (Allocated per show)" />
        <DataRow label="Artist Fee (share)" values={calcs.map(()=>natPerShow.artistFee||0)} total={national.artistFee} />
        <DataRow label="Marketing (share)" values={calcs.map(c=>c.mktg)} total={national.marketing} />
        <DataRow label="Contingency (share)" values={calcs.map(()=>natPerShow.contingency||0)} total={national.contingency} />
        <DataRow label="Passes (share)" values={calcs.map(()=>natPerShow.passes||0)} total={national.passes} />

        {/* P&L */}
        <TotalRow label="TOTAL COSTS" values={calcs.map(c=>c.totalCosts)} total={totals.totalCosts} color={v=>C.red} />
        <TotalRow label="P&L — FORECAST" values={calcs.map(c=>c.plForecast)} total={totals.plForecast} color={v=>v>=0?C.green:C.red} />
        <TotalRow label="P&L — SELL OUT" values={calcs.map(c=>c.plSellOut)} total={totals.plSellOut} color={v=>v>=0?C.green:C.red} />
      </div>
    );
  };

  // ── CARD VIEW ───────────────────────────────────────────────────────────
  const CardView = () => {
    const s = showData[activeCard];
    const c = calcs[activeCard];
    if (!s) return null;

    return (
      <div>
        {/* Show selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {showData.map((sd, i) => (
            <button key={i} onClick={() => setActiveCard(i)}
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
                background: activeCard === i ? C.accent : C.panel, color: activeCard === i ? "#fff" : C.muted }}>
              {sd.city || `Show ${i + 1}`}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* LEFT — Show Details + Tickets */}
          <div>
            <Section title={`📍 Show ${activeCard + 1} — ${s.city || "Unnamed"}`} accent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><Label>City</Label>
                  <input value={s.city} onChange={e => updShow(activeCard,"city",e.target.value)} style={iS} /></div>
                <div><Label>Venue</Label>
                  <input value={s.venue} onChange={e => updShow(activeCard,"venue",e.target.value)} style={iS} /></div>
                <div><Label>Date</Label>
                  <input type="date" value={s.date} onChange={e => updShow(activeCard,"date",e.target.value)} style={iS} /></div>
                <div><Label>Capacity</Label>
                  <input type="number" value={s.cap} onChange={e => updShow(activeCard,"cap",+e.target.value)} style={iS} /></div>
              </div>
            </Section>

            <Section title="🎫 Ticket Scaling">
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textDim, marginBottom: 8 }}>CATEGORY A</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
                <div><Label>Gross Price</Label><input type="number" value={s.catAPrice} onChange={e=>updShow(activeCard,"catAPrice",+e.target.value)} style={iS} /></div>
                <div><Label>Allocation</Label><input type="number" value={s.catACap} onChange={e=>updShow(activeCard,"catACap",+e.target.value)} style={iS} /></div>
                <div><Label>Forecast %</Label><input type="number" value={Math.round(s.catAForecast*100)} onChange={e=>updShow(activeCard,"catAForecast",(+e.target.value)/100)} style={iS} /></div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textDim, marginBottom: 8 }}>CATEGORY B (VIP / Premium)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                <div><Label>Gross Price</Label><input type="number" value={s.catBPrice} onChange={e=>updShow(activeCard,"catBPrice",+e.target.value)} style={iS} /></div>
                <div><Label>Allocation</Label><input type="number" value={s.catBCap} onChange={e=>updShow(activeCard,"catBCap",+e.target.value)} style={iS} /></div>
                <div><Label>Forecast %</Label><input type="number" value={Math.round(s.catBForecast*100)} onChange={e=>updShow(activeCard,"catBForecast",(+e.target.value)/100)} style={iS} /></div>
              </div>
              <div style={{ marginTop: 10, background: C.bg, borderRadius: 6, padding: "10px 12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ fontSize: 12, color: C.muted }}>Forecast Net: <strong style={{color:C.yellow}}>{fmt(c.forecastRev)}</strong></div>
                <div style={{ fontSize: 12, color: C.muted }}>Sell-Out Net: <strong style={{color:C.green}}>{fmt(c.sellOutRev)}</strong></div>
              </div>
            </Section>

            <Section title="🏟️ Venue Hire">
              <CostRow label="Flat Hire" i={activeCard} field="venueFlat" val={s.venueFlat} />
              <CostRow label="Per Head Fee (auto)" i={activeCard} field="venuePerHead" val={s.venuePerHead} />
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Venue total: <strong style={{color:C.text}}>{fmt(c.venueHire)}</strong></div>
            </Section>
          </div>

          {/* RIGHT — Costs + P&L */}
          <div>
            <Section title="✈️ Logistics (this show)">
              <CostRow label="Domestic Flights" i={activeCard} field="domFlights" val={s.domFlights} />
              <CostRow label="Accommodation" i={activeCard} field="accom" val={s.accom} />
              <CostRow label="Transfers" i={activeCard} field="transfers" val={s.transfers} />
              <CostRow label="Van Hire" i={activeCard} field="vanHire" val={s.vanHire} />
              <CostRow label="Drivers" i={activeCard} field="drivers" val={s.drivers} />
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>+ Intl flights share: <strong style={{color:C.text}}>{fmt(natPerShow.intlFlights)}</strong></div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Logistics total: <strong style={{color:C.text}}>{fmt(c.logistics)}</strong></div>
            </Section>

            <Section title="🎭 Show Costs">
              <CostRow label="Tour Manager" i={activeCard} field="tourMgr" val={s.tourMgr} />
              <CostRow label="Tour Mgr Off Days" i={activeCard} field="tourMgrOffDays" val={s.tourMgrOffDays} />
              <CostRow label="Stagehands" i={activeCard} field="stagehands" val={s.stagehands} />
              <CostRow label="Tour Staff" i={activeCard} field="tourStaff" val={s.tourStaff} />
              <CostRow label="Per Diems" i={activeCard} field="perDiems" val={s.perDiems} />
              <CostRow label="Catering & Riders" i={activeCard} field="catering" val={s.catering} />
              <CostRow label="Support Acts" i={activeCard} field="supports" val={s.supports} />
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Show costs total: <strong style={{color:C.text}}>{fmt(c.showCosts)}</strong></div>
            </Section>

            <Section title="🎛️ Production">
              <CostRow label="Backline" i={activeCard} field="backline" val={s.backline} />
              <CostRow label="Lighting Techs" i={activeCard} field="lightingTechs" val={s.lightingTechs} />
              <CostRow label="Misc Techs" i={activeCard} field="miscTechs" val={s.miscTechs} />
              <CostRow label="Prod Add-ons" i={activeCard} field="prodAddOns" val={s.prodAddOns} />
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Production total: <strong style={{color:C.text}}>{fmt(c.production)}</strong></div>
            </Section>

            {/* P&L CARD */}
            <div style={{ background: C.panel, borderRadius: 10, padding: "16px", border: `2px solid ${c.plForecast >= 0 ? C.green : C.red}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textDim, textTransform: "uppercase", marginBottom: 12 }}>Show P&L</div>
              {[
                ["Forecast Revenue", c.forecastRev, C.yellow],
                ["Total Show Costs", c.totalCosts, C.red],
              ].map(([lbl,val,col])=>(
                <div key={lbl} style={{ display:"flex", justifyContent:"space-between", fontSize:13, padding:"5px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{color:C.muted}}>{lbl}</span>
                  <span style={{color:col, fontWeight:700}}>{fmt(val)}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:800, padding:"10px 0 4px" }}>
                <span>Forecast P&L</span>
                <span style={{color: c.plForecast>=0?C.green:C.red}}>{fmt(c.plForecast)}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:C.muted }}>
                <span>Sell-Out P&L</span>
                <span style={{color: c.plSellOut>=0?C.green:C.red, fontWeight:700}}>{fmt(c.plSellOut)}</span>
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8, fontStyle: "italic" }}>
                Includes allocated share of: artist fee, intl flights, marketing, contingency, passes
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* NATIONAL COSTS PANEL */}
      <Section title="🌐 National Costs — Enter Once, Allocated Across All Shows" accent>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 10 }}>
          {[
            ["Intl Flights (total)","intlFlights"],
            ["Visas & Permits","visas"],
            ["Insurance","insurance"],
            ["Artist Fee (AUD)","artistFee"],
            ["Passes","passes"],
            ["Marketing (national)","marketing"],
            ["Contingency","contingency"],
          ].map(([lbl,field])=>(
            <div key={field}>
              <Label>{lbl}</Label>
              <input type="number" value={national[field]||""} onChange={e=>setNational(n=>({...n,[field]:+e.target.value}))}
                style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:6, color:C.text, padding:"7px 10px", width:"100%", fontSize:13 }} placeholder="0" />
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"flex-end" }}>
            <div style={{ background:C.bg, borderRadius:6, padding:"8px 12px", width:"100%", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", marginBottom:3 }}>Per Show Share</div>
              <div style={{ fontSize:14, fontWeight:700, color:C.accent }}>
                {fmt(Object.values(national).reduce((a,v)=>a+v,0) / Math.max(numShows,1))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* NATIONAL SUMMARY STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
        <Stat label="Total Forecast Rev" value={fmt(totals.forecastRev)} color={C.yellow} />
        <Stat label="Total Sell-Out Rev" value={fmt(totals.sellOutRev)} color={C.green} />
        <Stat label="Total Costs" value={fmt(totals.totalCosts)} color={C.red} />
        <Stat label="Tour P&L (Forecast)" value={fmt(totals.plForecast)} color={totals.plForecast>=0?C.green:C.red} />
        <Stat label="Tour P&L (Sell-Out)" value={fmt(totals.plSellOut)} color={totals.plSellOut>=0?C.green:C.red} />
      </div>

      {/* VIEW TOGGLE */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {[["table","📊 Table View"],["card","🃏 Card View"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{ padding:"8px 18px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:700, fontSize:13,
              background: view===v ? C.accent : C.panel, color: view===v ? "#fff" : C.muted }}>
            {l}
          </button>
        ))}
      </div>

      {/* VIEWS */}
      <div style={{ background: C.panel, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        {view === "table" ? <TableView /> : <CardView />}
      </div>
    </div>
  );
}

// ─── TICKETING TAB ────────────────────────────────────────────────────────
const AGENTS = ["Oztix", "Moshtix", "Ticketek", "Ticketmaster", "Silverback", "Other"];

function TicketingTab({ shows, artist }) {

  // Each show gets a ticketing record
  const blankRecord = (s) => ({
    city: s?.city || "",
    venue: s?.venueName || "",
    cap: s?.cap || 0,
    ticketPrice: s?.ticketPrice || 0,
    showDate: "",
    selectedAgents: [], // up to 3 selected for this show
    entries: [],
    vipLimit: 0,
    vipIncludesTicket: true,
  });

  const [records, setRecords] = useState(() => shows.map(s => blankRecord(s)));
  const [activeShow, setActiveShow] = useState(0);
  const [view, setView] = useState("entry"); // "entry" | "snapshot"
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().slice(0,10),
    dateType: "single",
    dateFrom: "",
    dateTo: "",
    agents: {},
    vipSold: "",
    vipLimit: "",
    vipIncludesTicket: true,
    notes: "",
  });

  const updRecord = (i, key, val) =>
    setRecords(prev => prev.map((r, j) => j === i ? { ...r, [key]: val } : r));

  const addEntry = (i) => {
    const entry = {
      ...newEntry,
      agents: { ...newEntry.agents },
      id: Date.now(),
    };
    setRecords(prev => prev.map((r, j) => j === i ? { ...r, entries: [...r.entries, entry] } : r));
    setShowAddEntry(false);
    setNewEntry({
      date: new Date().toISOString().slice(0,10),
      dateType: "single",
      dateFrom: "",
      dateTo: "",
      agents: {},
      vipSold: "",
      vipLimit: "",
      vipIncludesTicket: true,
      notes: "",
    });
  };

  const deleteEntry = (showIdx, entryId) => {
    setRecords(prev => prev.map((r, j) => j === showIdx
      ? { ...r, entries: r.entries.filter(e => e.id !== entryId) }
      : r
    ));
  };

  const daysUntil = (dateStr) => {
    if (!dateStr) return null;
    const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const countdownLabel = (dateStr) => {
    const d = daysUntil(dateStr);
    if (d === null) return "";
    if (d < 0) return `${Math.abs(d)}d ago`;
    if (d === 0) return "TODAY";
    if (d === 1) return "TOMORROW";
    if (d < 7) return `${d} days`;
    const weeks = Math.floor(d / 7);
    const days = d % 7;
    return days > 0 ? `${weeks}w ${days}d` : `${weeks} weeks`;
  };

  const countdownColor = (dateStr) => {
    const d = daysUntil(dateStr);
    if (d === null) return C.muted;
    if (d < 0) return C.muted;
    if (d <= 7) return C.red;
    if (d <= 21) return C.yellow;
    return C.green;
  };

  const latestEntry = (r) => {
    if (!r.entries.length) return null;
    return r.entries[r.entries.length - 1];
  };

  const totalTickets = (entry, r) => {
    if (!entry) return 0;
    const agentTotal = Object.values(entry.agents).reduce((a, v) => a + (+v || 0), 0);
    // VIP already counted in agent totals if vipIncludesTicket
    return agentTotal;
  };

  const vipCount = (entry) => {
    if (!entry) return 0;
    return +entry.vipSold || 0;
  };

  const iS = {
    background: C.bg, border: `1px solid ${C.border}`, borderRadius: 5,
    color: C.text, padding: "6px 8px", fontSize: 13, width: "100%"
  };

  // ── ENTRY VIEW ─────────────────────────────────────────────────────────
  const EntryView = () => {
    const r = records[activeShow];
    if (!r) return null;
    const latest = latestEntry(r);
    const total = totalTickets(latest, r);
    const pct = r.cap > 0 ? (total / r.cap * 100) : 0;
    const revenue = total * (r.ticketPrice || 0);
    const vip = vipCount(latest);
    const vipPct = (latest?.vipLimit || r.vipLimit) > 0 ? (vip / (latest?.vipLimit || r.vipLimit) * 100) : null;

    return (
      <div>
        {/* Show selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {records.map((rec, i) => {
            const lat = latestEntry(rec);
            const t = totalTickets(lat, rec);
            const p = rec.cap > 0 ? Math.round(t / rec.cap * 100) : 0;
            return (
              <button key={i} onClick={() => { setActiveShow(i); setShowAddEntry(false); }}
                style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12,
                  background: activeShow === i ? C.accent : C.panel, color: activeShow === i ? "#fff" : C.muted,
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                <span>{rec.city || `Show ${i+1}`}</span>
                {lat && <span style={{ fontSize: 10, fontWeight: 400, color: activeShow === i ? "rgba(255,255,255,0.7)" : C.muted }}>{p}% sold</span>}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* LEFT — Show info + current stats */}
          <div>
            <Section title={`📍 ${r.city || `Show ${activeShow+1}`} — ${r.venue}`} accent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                <div><Label>Show Date</Label>
                  <input type="date" value={r.showDate} onChange={e => updRecord(activeShow, "showDate", e.target.value)} style={iS} />
                </div>
                <div><Label>Ticket Price (AUD)</Label>
                  <input type="number" value={r.ticketPrice || ""} onChange={e => updRecord(activeShow, "ticketPrice", +e.target.value)} style={iS} placeholder="0" />
                </div>
                <div><Label>Capacity</Label>
                  <input type="number" value={r.cap || ""} onChange={e => updRecord(activeShow, "cap", +e.target.value)} style={iS} placeholder="0" />
                </div>
                <div><Label>VIP Limit</Label>
                  <input type="number" value={r.vipLimit || ""} onChange={e => updRecord(activeShow, "vipLimit", +e.target.value)} style={iS} placeholder="0" />
                </div>
              </div>
                <div style={{ marginTop: 10 }}>
                  <Label>Ticketing Agents for this show (max 3)</Label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                    {AGENTS.map(a => {
                      const selected = (r.selectedAgents || []).includes(a);
                      const atMax = (r.selectedAgents || []).length >= 3 && !selected;
                      return (
                        <button key={a} disabled={atMax}
                          onClick={() => {
                            const cur = r.selectedAgents || [];
                            const next = selected ? cur.filter(x => x !== a) : [...cur, a];
                            updRecord(activeShow, "selectedAgents", next);
                          }}
                          style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${selected ? C.accent : C.border}`,
                            cursor: atMax ? "not-allowed" : "pointer", fontSize: 12, fontWeight: selected ? 700 : 400,
                            background: selected ? "rgba(249,115,22,0.15)" : C.bg,
                            color: selected ? C.accent : atMax ? C.muted : C.text, opacity: atMax ? 0.4 : 1 }}>
                          {a}
                        </button>
                      );
                    })}
                  </div>
                  {(r.selectedAgents || []).length === 0 && (
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontStyle: "italic" }}>Select up to 3 agents for this show</div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                  <input type="checkbox" checked={r.vipIncludesTicket}
                    onChange={e => updRecord(activeShow, "vipIncludesTicket", e.target.checked)}
                    style={{ accentColor: C.accent }} />
                  <span style={{ fontSize: 12, color: C.muted }}>VIP package includes ticket (counted in agent totals)</span>
                </div>
            </Section>

            {/* Countdown */}
            {r.showDate && (
              <div style={{ background: C.panel, borderRadius: 10, padding: "14px 16px", marginBottom: 16, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase" }}>Show Date</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>
                    {new Date(r.showDate).toLocaleDateString('en-AU', { weekday:'short', day:'numeric', month:'long', year:'numeric' })}
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: countdownColor(r.showDate) }}>
                  {countdownLabel(r.showDate)}
                </div>
              </div>
            )}

            {/* Current stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 16 }}>
              <div style={{ background: C.panel, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>Tickets Sold</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.accent }}>{total.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: C.muted }}>of {r.cap.toLocaleString()} cap</div>
              </div>
              <div style={{ background: C.panel, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>% Capacity</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: pct >= 80 ? C.green : pct >= 50 ? C.yellow : C.text }}>{pct.toFixed(1)}%</div>
                <div style={{ height: 6, background: C.bg, borderRadius: 3, marginTop: 6 }}>
                  <div style={{ height: 6, borderRadius: 3, width: `${Math.min(pct,100)}%`, background: pct >= 80 ? C.green : pct >= 50 ? C.yellow : C.accent }} />
                </div>
              </div>
              <div style={{ background: C.panel, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>Est. Revenue</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.green }}>{fmt(revenue)}</div>
                <div style={{ fontSize: 11, color: C.muted }}>@ {fmt(r.ticketPrice)} avg</div>
              </div>
              <div style={{ background: C.panel, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>VIP Sold</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.text }}>{vip.toLocaleString()}</div>
                {(r.vipLimit > 0) && (
                  <div style={{ fontSize: 11, color: C.muted }}>
                    of {r.vipLimit} limit — {vipPct?.toFixed(0)}%
                    <div style={{ height: 4, background: C.bg, borderRadius: 2, marginTop: 4 }}>
                      <div style={{ height: 4, borderRadius: 2, width: `${Math.min(vipPct||0,100)}%`, background: C.accent }} />
                    </div>
                  </div>
                )}
                {r.vipIncludesTicket && <div style={{ fontSize: 10, color: C.muted, marginTop: 2, fontStyle: "italic" }}>Included in ticket total</div>}
              </div>
            </div>
          </div>

          {/* RIGHT — Entry log */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>SALES ENTRIES</div>
              <button onClick={() => setShowAddEntry(true)}
                style={{ background: C.accent, border: "none", borderRadius: 6, color: "#fff", padding: "7px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>
                + Add Entry
              </button>
            </div>

            {/* Add entry form */}
            {showAddEntry && (
              <div style={{ background: C.panel, borderRadius: 10, padding: 16, marginBottom: 14, border: `1px solid ${C.accent}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 10 }}>NEW ENTRY</div>

                {/* Date type */}
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  {["single","range"].map(t => (
                    <button key={t} onClick={() => setNewEntry(e => ({...e, dateType: t}))}
                      style={{ padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                        background: newEntry.dateType === t ? C.accent : C.bg, color: newEntry.dateType === t ? "#fff" : C.muted }}>
                      {t === "single" ? "Single Date" : "Date Range"}
                    </button>
                  ))}
                </div>

                {newEntry.dateType === "single" ? (
                  <div style={{ marginBottom: 10 }}>
                    <Label>Date</Label>
                    <input type="date" value={newEntry.date} onChange={e => setNewEntry(n => ({...n, date: e.target.value}))} style={iS} />
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <div><Label>From</Label>
                      <input type="date" value={newEntry.dateFrom} onChange={e => setNewEntry(n => ({...n, dateFrom: e.target.value}))} style={iS} /></div>
                    <div><Label>To</Label>
                      <input type="date" value={newEntry.dateTo} onChange={e => setNewEntry(n => ({...n, dateTo: e.target.value}))} style={iS} /></div>
                  </div>
                )}

                {/* Agent counts — only show selected agents */}
                <div style={{ marginBottom: 10 }}>
                  <Label>Tickets by Agent</Label>
                  {(r.selectedAgents || []).length === 0 ? (
                    <div style={{ fontSize: 12, color: C.red, fontStyle: "italic" }}>No agents selected for this show — go to show settings above and select up to 3.</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {(r.selectedAgents || []).map(a => (
                        <div key={a} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 13, color: C.text, minWidth: 110, fontWeight: 600 }}>{a}</span>
                          <input type="number" value={newEntry.agents[a] || ""} placeholder="0"
                            onChange={e => setNewEntry(n => ({...n, agents: {...n.agents, [a]: e.target.value}}))}
                            style={{ ...iS, width: 120 }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* VIP */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  <div><Label>VIP Sold</Label>
                    <input type="number" value={newEntry.vipSold || ""} placeholder="0"
                      onChange={e => setNewEntry(n => ({...n, vipSold: e.target.value}))} style={iS} /></div>
                  <div><Label>VIP Limit</Label>
                    <input type="number" value={newEntry.vipLimit || ""} placeholder="0"
                      onChange={e => setNewEntry(n => ({...n, vipLimit: e.target.value}))} style={iS} /></div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <Label>Notes (optional)</Label>
                  <input value={newEntry.notes} onChange={e => setNewEntry(n => ({...n, notes: e.target.value}))}
                    style={iS} placeholder="e.g. post presale, after radio campaign…" />
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => addEntry(activeShow)}
                    style={{ flex: 1, background: C.green, border: "none", borderRadius: 6, color: "#fff", padding: "8px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                    Save Entry
                  </button>
                  <button onClick={() => setShowAddEntry(false)}
                    style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, color: C.muted, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Entry history table */}
            {r.entries.length === 0 ? (
              <div style={{ background: C.panel, borderRadius: 8, padding: "24px", textAlign: "center", color: C.muted, fontSize: 13, border: `1px solid ${C.border}` }}>
                No entries yet. Add your first ticket count above.
              </div>
            ) : (
              <div style={{ background: C.panel, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {/* Table header — only selected agents */}
                <div style={{ display: "grid", gridTemplateColumns: `90px repeat(${(r.selectedAgents||[]).length}, 1fr) 80px 80px 30px`, gap: 4, padding: "8px 10px", background: C.card, fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase" }}>
                  <span>Date</span>
                  {(r.selectedAgents||[]).map(a => <span key={a}>{a}</span>)}
                  <span>Total</span>
                  <span>VIP</span>
                  <span></span>
                </div>
                {[...r.entries].reverse().map((entry, ei) => {
                  const agTotal = Object.values(entry.agents).reduce((a,v) => a + (+v||0), 0);
                  const entryPct = r.cap > 0 ? (agTotal / r.cap * 100).toFixed(1) : "—";
                  const dateLabel = entry.dateType === "range"
                    ? `${entry.dateFrom?.slice(5)} – ${entry.dateTo?.slice(5)}`
                    : entry.date?.slice(5);
                  return (
                    <div key={entry.id} style={{ display: "grid", gridTemplateColumns: `90px repeat(${(r.selectedAgents||[]).length}, 1fr) 80px 80px 30px`, gap: 4, padding: "7px 10px", borderTop: `1px solid ${C.border}`, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.muted }}>{dateLabel}</span>
                      {(r.selectedAgents||[]).map(a => (
                        <span key={a} style={{ fontSize: 12, color: +entry.agents[a] > 0 ? C.text : C.muted }}>
                          {+entry.agents[a] > 0 ? (+entry.agents[a]).toLocaleString() : "—"}
                        </span>
                      ))}
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>{agTotal.toLocaleString()}</div>
                        <div style={{ fontSize: 10, color: C.muted }}>{entryPct}%</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: C.text }}>{(+entry.vipSold||0) > 0 ? (+entry.vipSold).toLocaleString() : "—"}</div>
                        {entry.notes && <div style={{ fontSize: 10, color: C.muted, fontStyle: "italic" }}>{entry.notes}</div>}
                      </div>
                      <button onClick={() => deleteEntry(activeShow, entry.id)}
                        style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 16 }}>×</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── NATIONAL SNAPSHOT VIEW ────────────────────────────────────────────
  const SnapshotView = () => {
    const rows = records.map((r, i) => {
      const latest = latestEntry(r);
      const total = totalTickets(latest, r);
      const pct = r.cap > 0 ? (total / r.cap * 100) : 0;
      const revenue = total * (r.ticketPrice || 0);
      const vip = vipCount(latest);
      const days = daysUntil(r.showDate);
      const agentBreakdown = latest
        ? Object.fromEntries((r.selectedAgents||[]).map(a => [a, +latest.agents[a]||0]))
        : Object.fromEntries((r.selectedAgents||[]).map(a => [a, 0]));
      return { r, i, total, pct, revenue, vip, days, agentBreakdown, latest };
    });

    const grandTotal = rows.reduce((a, r) => a + r.total, 0);
    const grandCap = rows.reduce((a, r) => a + r.r.cap, 0);
    const grandRevenue = rows.reduce((a, r) => a + r.revenue, 0);
    const grandVip = rows.reduce((a, r) => a + r.vip, 0);
    const grandPct = grandCap > 0 ? (grandTotal / grandCap * 100) : 0;
    const allAgents = [...new Set(records.flatMap(r => r.selectedAgents||[]))];

    return (
      <div>
        {/* National summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          <Stat label="Total Tickets Sold" value={grandTotal.toLocaleString()} color={C.accent} />
          <Stat label="Overall % Capacity" value={`${grandPct.toFixed(1)}%`} color={grandPct >= 75 ? C.green : grandPct >= 50 ? C.yellow : C.text} />
          <Stat label="Est. Total Revenue" value={fmt(grandRevenue)} color={C.green} />
          <Stat label="Total VIP Sold" value={grandVip.toLocaleString()} color={C.text} />
        </div>

        {/* Snapshot table */}
        <div style={{ background: C.panel, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: `160px 80px 80px ${allAgents.map(()=>'70px').join(' ')} 90px 70px 100px 110px`, gap: 4, padding: "8px 12px", background: C.card, fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase" }}>
            <span>Show</span>
            <span>Cap</span>
            <span>Total</span>
            {allAgents.map(a => <span key={a}>{a}</span>)}
            <span>VIP</span>
            <span>% Cap</span>
            <span>Est. Revenue</span>
            <span>Countdown</span>
          </div>

          {rows.map(({ r, i, total, pct, revenue, vip, days, agentBreakdown }) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: `160px 80px 80px ${allAgents.map(()=>'70px').join(' ')} 90px 70px 100px 110px`, gap: 4, padding: "8px 12px", borderTop: `1px solid ${C.border}`, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.city || `Show ${i+1}`}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{r.venue}</div>
              </div>
              <span style={{ fontSize: 12, color: C.muted }}>{r.cap.toLocaleString()}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: C.accent }}>{total.toLocaleString()}</span>
              {allAgents.map(a => (
                <span key={a} style={{ fontSize: 12, color: (agentBreakdown[a]||0) > 0 ? C.text : C.muted }}>
                  {(agentBreakdown[a]||0) > 0 ? (agentBreakdown[a]||0).toLocaleString() : "—"}
                </span>
              ))}
              <span style={{ fontSize: 12, color: C.text }}>{vip > 0 ? vip.toLocaleString() : "—"}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: pct >= 80 ? C.green : pct >= 50 ? C.yellow : C.text }}>{pct.toFixed(1)}%</div>
                <div style={{ height: 4, background: C.bg, borderRadius: 2, marginTop: 3, width: 60 }}>
                  <div style={{ height: 4, borderRadius: 2, width: `${Math.min(pct,100)}%`, background: pct >= 80 ? C.green : pct >= 50 ? C.yellow : C.accent }} />
                </div>
              </div>
              <span style={{ fontSize: 12, color: C.green }}>{fmt(revenue)}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: countdownColor(r.showDate) }}>
                {r.showDate ? countdownLabel(r.showDate) : "No date set"}
              </span>
            </div>
          ))}

          {/* Totals row */}
          <div style={{ display: "grid", gridTemplateColumns: `160px 80px 80px ${allAgents.map(()=>'70px').join(' ')} 90px 70px 100px 110px`, gap: 4, padding: "10px 12px", borderTop: `2px solid ${C.border}`, background: C.card, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>TOUR TOTAL</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>{grandCap.toLocaleString()}</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: C.accent }}>{grandTotal.toLocaleString()}</span>
            {allAgents.map(a => (
              <span key={a} style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
                {rows.reduce((s, r) => s + (r.agentBreakdown[a]||0), 0).toLocaleString()}
              </span>
            ))}
            <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{grandVip.toLocaleString()}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: grandPct >= 75 ? C.green : C.yellow }}>{grandPct.toFixed(1)}%</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.green }}>{fmt(grandRevenue)}</span>
            <span />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* View toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["entry","📊 Show Entry"], ["snapshot","🗺️ National Snapshot"]].map(([v,l]) => (
          <button key={v} onClick={() => setView(v)}
            style={{ padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
              background: view === v ? C.accent : C.panel, color: view === v ? "#fff" : C.muted }}>
            {l}
          </button>
        ))}
        <div style={{ fontSize: 11, color: C.muted, alignSelf: "center", marginLeft: 8 }}>
          Shows auto-populated from Budget Estimator. Set show dates and add ticket counts per show.
        </div>
      </div>

      {view === "entry" ? <EntryView /> : <SnapshotView />}
    </div>
  );
}
