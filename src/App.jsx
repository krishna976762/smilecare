import { useState, useEffect, useRef, useCallback } from "react";

// ─── Color Tokens ────────────────────────────────────────────────────────────
const C = {
  navy: "#0a1628",
  blue: "#1a56db",
  teal: "#0891b2",
  cyan: "#06b6d4",
  mint: "#ecfdf5",
  sky: "#eff6ff",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray400: "#9ca3af",
  gray600: "#4b5563",
  gray800: "#1f2937",
  green: "#10b981",
  gold: "#f59e0b",
  red: "#ef4444",
};

// ─── Google Fonts ─────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      color: ${C.gray800};
      background: ${C.white};
      overflow-x: hidden;
    }

    h1,h2,h3 { font-family: 'Playfair Display', serif; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${C.gray100}; }
    ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 3px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes slideRight {
      from { opacity: 0; transform: translateX(-30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(1.05); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes blob {
      0%,100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
      50%      { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-12px); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes waBounce {
      0%,100% { transform: scale(1) rotate(0deg); }
      25%      { transform: scale(1.15) rotate(-5deg); }
      75%      { transform: scale(1.15) rotate(5deg); }
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes progressBar {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes gradShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .animate-fadeUp   { animation: fadeUp 0.7s ease both; }
    .animate-fadeIn   { animation: fadeIn 0.5s ease both; }
    .animate-float    { animation: float 3s ease-in-out infinite; }
    .animate-pulse    { animation: pulse 2s ease-in-out infinite; }
    .animate-blob     { animation: blob 7s ease-in-out infinite; }
    .animate-waBounce { animation: waBounce 1.5s ease-in-out infinite; }
    .animate-spin     { animation: spin 1s linear infinite; }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    .delay-700 { animation-delay: 0.7s; }

    .glass {
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .glass-dark {
      background: rgba(10,22,40,0.7);
      backdrop-filter: blur(12px);
    }

    .gradient-text {
      background: linear-gradient(135deg, ${C.blue}, ${C.cyan});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gradient-btn {
      background: linear-gradient(135deg, ${C.blue} 0%, ${C.teal} 50%, ${C.cyan} 100%);
      background-size: 200% auto;
      transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .gradient-btn:hover {
      background-position: right center;
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(26,86,219,0.35);
    }

    .card-hover {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 48px rgba(26,86,219,0.15);
    }

    .nav-link {
      position: relative;
      font-weight: 500;
      color: ${C.gray600};
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0;
      width: 0; height: 2px;
      background: linear-gradient(90deg, ${C.blue}, ${C.cyan});
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    .nav-link:hover { color: ${C.blue}; }
    .nav-link:hover::after,
    .nav-link.active::after { width: 100%; }
    .nav-link.active { color: ${C.blue}; font-weight: 600; }

    .section-enter { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .section-enter.visible { opacity: 1; transform: translateY(0); }

    .star { color: ${C.gold}; }

    input, select, textarea {
      font-family: 'DM Sans', sans-serif;
      outline: none;
    }

    input:focus, select:focus, textarea:focus {
      border-color: ${C.blue} !important;
      box-shadow: 0 0 0 3px rgba(26,86,219,0.1);
    }

    .masonry { columns: 3; column-gap: 16px; }
    @media (max-width: 768px) { .masonry { columns: 2; } }
    @media (max-width: 480px) { .masonry { columns: 1; } }
    .masonry-item { break-inside: avoid; margin-bottom: 16px; }

    .shimmer-bg {
      background: linear-gradient(90deg, ${C.gray100} 25%, ${C.gray200} 50%, ${C.gray100} 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    @media (max-width: 768px) {
      h1 { font-size: clamp(2rem, 8vw, 3.5rem) !important; }
      h2 { font-size: clamp(1.6rem, 6vw, 2.5rem) !important; }
    }
  `}</style>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { id: 1, icon: "🦷", title: "Teeth Cleaning", desc: "Professional prophylaxis removes plaque and tartar buildup for a healthier smile.", benefits: ["Prevents gum disease", "Removes surface stains", "Fresh breath"], steps: ["Examination", "Scaling", "Polishing", "Fluoride treatment"], price: "Starting ₹800", color: "#e0f2fe" },
  { id: 2, icon: "🔬", title: "Root Canal", desc: "Pain-free endodontic treatment saving your natural tooth from extraction.", benefits: ["Relieves tooth pain", "Saves natural tooth", "Prevents spread"], steps: ["X-ray & diagnosis", "Anesthesia", "Pulp removal", "Sealing & crown"], price: "Starting ₹3,500", color: "#fce7f3" },
  { id: 3, icon: "🦴", title: "Dental Implants", desc: "Permanent tooth replacement that looks, feels and functions like a natural tooth.", benefits: ["Permanent solution", "Natural appearance", "Bone preservation"], steps: ["Consultation", "Implant placement", "Osseointegration", "Crown fitting"], price: "Starting ₹25,000", color: "#ede9fe" },
  { id: 4, icon: "✨", title: "Teeth Whitening", desc: "Advanced laser and bleaching technology for a brilliantly bright smile.", benefits: ["Shades whiter", "Safe & effective", "Long-lasting"], steps: ["Shade assessment", "Gel application", "Light activation", "Post-care guide"], price: "Starting ₹2,500", color: "#fef9c3" },
  { id: 5, icon: "😁", title: "Braces & Aligners", desc: "Invisible and traditional orthodontic solutions for perfectly aligned teeth.", benefits: ["Invisible options", "Corrects bite", "Boosts confidence"], steps: ["Assessment", "Treatment plan", "Custom fitting", "Regular reviews"], price: "Starting ₹15,000", color: "#dcfce7" },
  { id: 6, icon: "💎", title: "Smile Design", desc: "Comprehensive cosmetic transformation creating your dream smile.", benefits: ["Complete makeover", "Custom design", "Natural results"], steps: ["Digital preview", "Mock-up", "Treatment", "Reveal"], price: "Starting ₹40,000", color: "#ffedd5" },
  { id: 7, icon: "👶", title: "Pediatric Dentistry", desc: "Gentle, fun dental care for children in a comfortable environment.", benefits: ["Child-friendly", "Preventive care", "Anxiety-free"], steps: ["Fun exam", "Cleaning", "Fluoride", "Education"], price: "Starting ₹500", color: "#fce7f3" },
  { id: 8, icon: "🩺", title: "Tooth Extraction", desc: "Comfortable, precise extractions with minimal recovery time.", benefits: ["Pain-free procedure", "Quick healing", "Replacement options"], steps: ["Anesthesia", "Extraction", "Clot formation", "Aftercare"], price: "Starting ₹800", color: "#fef9c3" },
  { id: 9, icon: "👑", title: "Dental Crowns", desc: "High-quality porcelain and zirconia crowns that restore strength and beauty.", benefits: ["Restores function", "Natural look", "Durable"], steps: ["Tooth prep", "Impression", "Temp crown", "Final fitting"], price: "Starting ₹5,000", color: "#e0f2fe" },
  { id: 10, icon: "🚨", title: "Emergency Care", desc: "24/7 emergency dental treatment for pain, trauma and urgent situations.", benefits: ["Available 24/7", "Immediate relief", "Expert care"], steps: ["Triage", "Pain relief", "Treatment", "Follow-up"], price: "Call for pricing", color: "#fee2e2" },
];

const TESTIMONIALS = [
  { id: 1, name: "Priya Sharma", role: "Software Engineer", rating: 5, text: "Dr. Mehta transformed my smile completely. The teeth whitening was painless and the results are absolutely stunning! I feel so much more confident now.", avatar: "PS", treatment: "Teeth Whitening" },
  { id: 2, name: "Rajesh Kumar", role: "Business Owner", rating: 5, text: "Had a root canal here and was genuinely surprised — no pain at all! The clinic is spotlessly clean and the staff made me feel completely at ease throughout.", avatar: "RK", treatment: "Root Canal" },
  { id: 3, name: "Anita Desai", role: "Teacher", rating: 5, text: "My daughter was terrified of dentists. SmileCare's pediatric team was so patient and gentle with her. Now she actually looks forward to her visits!", avatar: "AD", treatment: "Pediatric Dentistry" },
  { id: 4, name: "Vikram Patel", role: "Doctor", rating: 5, text: "As a medical professional I appreciate their use of latest technology. My dental implant looks and feels 100% natural. Exceptional work!", avatar: "VP", treatment: "Dental Implants" },
  { id: 5, name: "Sneha Joshi", role: "CA", rating: 5, text: "The invisible aligners changed my life! Completed in 8 months and nobody knew I was wearing them. The results exceeded my expectations.", avatar: "SJ", treatment: "Clear Aligners" },
  { id: 6, name: "Arjun Mehta", role: "Entrepreneur", rating: 5, text: "Premium service at fair prices. The smile design consultation was thorough and the final result looks completely natural. Highly recommend!", avatar: "AM", treatment: "Smile Design" },
];

const FAQS = [
  { q: "How do I book an appointment?", a: "You can book online through our website, call us at +91 98765 43210, or WhatsApp us. We confirm within 2 hours and send a reminder before your visit." },
  { q: "Do you accept dental insurance?", a: "Yes! We partner with all major insurance providers including Star Health, Bajaj Allianz, HDFC Ergo, and more. Bring your card and we handle the paperwork." },
  { q: "Is teeth whitening safe?", a: "Absolutely. We use FDA-approved bleaching agents under professional supervision. The procedure is safe for enamel and produces results up to 8 shades lighter." },
  { q: "How long does a root canal take?", a: "Most root canals are completed in 1–2 appointments of 60–90 minutes each. With modern rotary techniques, it's virtually painless." },
  { q: "What are your working hours?", a: "Mon–Sat: 9 AM – 8 PM, Sunday: 10 AM – 2 PM. Emergency line available 24/7 at +91 98765 43210." },
  { q: "Do you treat children?", a: "Yes! Our pediatric dental team specializes in gentle care for children from age 1. We make dental visits fun and stress-free for kids." },
  { q: "How much do dental implants cost?", a: "Implants start from ₹25,000 per tooth, depending on bone quality and brand. We offer 0% EMI options on all major cards." },
  { q: "Can I get emergency care on weekends?", a: "Yes. We have emergency slots every day including public holidays. Call our emergency line and we'll arrange same-day care." },
];

const TEAM = [
  { name: "Dr. Rohit Mehta", role: "Chief Dental Surgeon & Founder", qual: "BDS, MDS (Oral Surgery)", exp: "15+ years", avatar: "RM", color: "#dbeafe" },
  { name: "Dr. Priya Verma", role: "Cosmetic Dentist", qual: "BDS, MDS (Prosthodontics)", exp: "10+ years", avatar: "PV", color: "#fce7f3" },
  { name: "Dr. Anil Sharma", role: "Orthodontist", qual: "BDS, MDS (Orthodontics)", exp: "12+ years", avatar: "AS", color: "#dcfce7" },
  { name: "Dr. Meera Nair", role: "Pediatric Dentist", qual: "BDS, MDS (Pedodontics)", exp: "8+ years", avatar: "MN", color: "#fef9c3" },
];

const GALLERY_ITEMS = [
  { label: "Smile Makeover", type: "Before/After", h: 280, color: "#dbeafe" },
  { label: "Teeth Whitening", type: "Before/After", h: 200, color: "#fce7f3" },
  { label: "Implant Success", type: "Before/After", h: 320, color: "#dcfce7" },
  { label: "Braces Result", type: "Before/After", h: 240, color: "#fef9c3" },
  { label: "Clinic Interior", type: "Facility", h: 200, color: "#ede9fe" },
  { label: "Modern Equipment", type: "Facility", h: 280, color: "#ffedd5" },
  { label: "Crown Placement", type: "Treatment", h: 240, color: "#e0f2fe" },
  { label: "Pediatric Room", type: "Facility", h: 200, color: "#fce7f3" },
  { label: "Full Mouth Rehab", type: "Before/After", h: 280, color: "#dcfce7" },
];

const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useIntersect(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, visible, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);
  return count;
}

// ─── Shared Components ────────────────────────────────────────────────────────
function Section({ children, style, className = "" }) {
  const [ref, visible] = useIntersect();
  return (
    <div ref={ref} className={`section-enter ${visible ? "visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

function Badge({ children, color = C.blue }) {
  return (
    <span style={{ display: "inline-block", background: `${color}22`, color, border: `1px solid ${color}44`, borderRadius: 999, padding: "4px 14px", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </span>
  );
}

function GradBtn({ children, onClick, style, outline = false, small = false }) {
  return (
    <button
      onClick={onClick}
      className={outline ? "" : "gradient-btn"}
      style={{
        padding: small ? "10px 22px" : "14px 30px",
        borderRadius: 999,
        border: outline ? `2px solid ${C.blue}` : "none",
        background: outline ? "transparent" : undefined,
        color: outline ? C.blue : C.white,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: small ? 14 : 15,
        cursor: "pointer",
        transition: "all 0.25s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function StarRating({ n = 5 }) {
  return <span style={{ color: C.gold, fontSize: 16 }}>{"★".repeat(n)}</span>;
}

function Avatar({ initials, color = "#dbeafe", size = 48 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.33, color: C.blue, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home","About","Services","Appointment","Gallery","Testimonials","Contact","FAQ"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? (dark ? "rgba(10,22,40,0.95)" : "rgba(255,255,255,0.95)") : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.35s ease",
      borderBottom: scrolled ? `1px solid ${dark ? "rgba(255,255,255,0.1)" : C.gray200}` : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 72, gap: 24 }}>
        {/* Logo */}
        <div onClick={() => { setPage("Home"); window.scrollTo(0,0); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#1a56db,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🦷</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18, color: dark ? C.white : C.navy, lineHeight: 1.1 }}>SmileCare</div>
            <div style={{ fontSize: 11, color: C.teal, fontWeight: 600, letterSpacing: "0.08em" }}>DENTAL CLINIC</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4, marginLeft: "auto", alignItems: "center", flexWrap: "wrap" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} onClick={() => { setPage(l); window.scrollTo(0,0); setOpen(false); }}
              className={`nav-link ${page === l ? "active" : ""}`}
              style={{ padding: "6px 10px", fontSize: 14, color: dark ? (page===l ? C.cyan : "#cbd5e1") : undefined, cursor: "pointer", whiteSpace: "nowrap" }}>
              {l}
            </a>
          ))}
          <GradBtn small onClick={() => { setPage("Appointment"); window.scrollTo(0,0); }} style={{ marginLeft: 8 }}>Book Now</GradBtn>
          <button onClick={() => setDark(d => !d)} style={{ marginLeft: 4, background: dark ? "rgba(255,255,255,0.1)" : C.gray100, border: "none", borderRadius: 999, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 24, color: dark ? C.white : C.navy, display: "none" }} className="hamburger">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: dark ? C.navy : C.white, borderTop: `1px solid ${C.gray200}`, padding: "16px 24px 24px" }}>
          {links.map(l => (
            <div key={l} onClick={() => { setPage(l); window.scrollTo(0,0); setOpen(false); }}
              style={{ padding: "12px 0", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray100}`, color: dark ? C.white : C.gray800, fontWeight: page===l ? 600 : 400, cursor: "pointer" }}>
              {l}
            </div>
          ))}
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <GradBtn onClick={() => { setPage("Appointment"); window.scrollTo(0,0); setOpen(false); }}>Book Now</GradBtn>
            <button onClick={() => setDark(d => !d)} style={{ background: dark ? "rgba(255,255,255,0.1)" : C.gray100, border: "none", borderRadius: 999, width: 42, height: 42, cursor: "pointer", fontSize: 18 }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── WhatsApp Button ──────────────────────────────────────────────────────────
function WAButton() {
  return (
    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
      className="animate-waBounce"
      style={{ position: "fixed", bottom: 90, right: 24, zIndex: 999, width: 54, height: 54, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: "0 4px 20px rgba(37,211,102,0.5)", textDecoration: "none" }}
      title="Chat on WhatsApp">
      💬
    </a>
  );
}

// ─── Back to Top ──────────────────────────────────────────────────────────────
function BackTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#1a56db,#06b6d4)", border: "none", color: C.white, fontSize: 18, cursor: "pointer", boxShadow: "0 4px 16px rgba(26,86,219,0.4)", transition: "transform 0.2s ease" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
      ↑
    </button>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{ position: "fixed", bottom: 160, right: 24, zIndex: 2000, background: C.white, border: `2px solid ${C.green}`, borderRadius: 16, padding: "16px 20px", boxShadow: "0 12px 40px rgba(0,0,0,0.15)", animation: "toastIn 0.4s ease", maxWidth: 320 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ fontSize: 24 }}>✅</span>
        <div>
          <div style={{ fontWeight: 700, color: C.green, marginBottom: 4 }}>Success!</div>
          <div style={{ fontSize: 14, color: C.gray600 }}>{msg}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.gray400, marginLeft: "auto", fontSize: 18 }}>✕</button>
      </div>
    </div>
  );
}

// ─── Emergency Banner ─────────────────────────────────────────────────────────
function EmergencyBanner({ setPage }) {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div style={{ background: "linear-gradient(90deg,#dc2626,#b91c1c)", color: C.white, padding: "10px 24px", textAlign: "center", fontSize: 14, fontWeight: 500, position: "relative", zIndex: 999 }}>
      🚨 <strong>Dental Emergency?</strong> Call us anytime — <strong>+91 98765 43210</strong> — 24/7 Emergency Line Available
      <span onClick={() => { setPage("Appointment"); window.scrollTo(0,0); }} style={{ marginLeft: 12, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 999, padding: "3px 12px", cursor: "pointer", fontSize: 13 }}>Book Now →</span>
      <button onClick={() => setShow(false)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.white, cursor: "pointer", fontSize: 18 }}>✕</button>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setPage, dark }) {
  const bg = dark ? "#060e1a" : C.navy;
  return (
    <footer style={{ background: bg, color: "#94a3b8", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#1a56db,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🦷</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18, color: C.white }}>SmileCare</div>
                <div style={{ fontSize: 11, color: C.cyan, letterSpacing: "0.08em" }}>DENTAL CLINIC</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Premium dental care with cutting-edge technology and a personal touch. Your smile is our passion.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["📘","📸","🐦","💼"].map((icon,i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(26,86,219,0.4)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Quick Links</div>
            {["Home","About","Services","Appointment","Gallery","Testimonials","Contact","FAQ"].map(l => (
              <div key={l} onClick={() => { setPage(l); window.scrollTo(0,0); }}
                style={{ cursor: "pointer", marginBottom: 10, fontSize: 14, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.cyan}
                onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                → {l}
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Our Services</div>
            {SERVICES.slice(0,6).map(s => (
              <div key={s.id} onClick={() => { setPage("Services"); window.scrollTo(0,0); }}
                style={{ cursor: "pointer", marginBottom: 10, fontSize: 14, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.cyan}
                onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                {s.icon} {s.title}
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.white, fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Contact Us</div>
            {[
              { icon: "📍", text: "123 Smile Street, Kothrud\nPune, Maharashtra 411038" },
              { icon: "📞", text: "+91 98765 43210" },
              { icon: "✉️", text: "hello@smilecare.in" },
              { icon: "🕐", text: "Mon–Sat: 9 AM – 8 PM\nSun: 10 AM – 2 PM" },
            ].map((item,i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, marginTop: 1 }}>{item.icon}</span>
                <span style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 13 }}>© 2025 SmileCare Dental Clinic. All rights reserved.</div>
          <div style={{ fontSize: 13, display: "flex", gap: 16 }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
            <span style={{ cursor: "pointer" }}>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function StatCounter({ value, label, suffix = "+", dark }) {
  const [ref, visible] = useIntersect();
  const count = useCounter(value, visible);
  return (
    <div ref={ref} style={{ textAlign: "center", animation: visible ? "countUp 0.6s ease both" : "none" }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, background: "linear-gradient(135deg,#1a56db,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 14, color: dark ? "#94a3b8" : C.gray600, fontWeight: 500, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function HomePage({ setPage, dark }) {
  const [tIdx, setTIdx] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([{ from: "bot", text: "👋 Hi! I'm SmileCare AI. How can I help you today?" }]);

  const bg = dark ? C.navy : C.white;
  const text = dark ? C.white : C.gray800;

  const sendChat = async () => {
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg.trim();
    setChatHistory(h => [...h, { from: "user", text: userMsg }]);
    setChatMsg("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a friendly dental clinic assistant for SmileCare Dental Clinic in Pune. Answer questions about dental services, appointments, pricing (in INR), and care tips. Keep responses concise and helpful.",
          messages: [{ role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I'll connect you with our team. Call +91 98765 43210.";
      setChatHistory(h => [...h, { from: "bot", text: reply }]);
    } catch {
      setChatHistory(h => [...h, { from: "bot", text: "Please call us at +91 98765 43210 for assistance!" }]);
    }
  };

  return (
    <div style={{ background: bg, color: text }}>
      {/* Hero */}
      <section style={{ minHeight: "100vh", background: dark ? "linear-gradient(160deg,#0a1628 0%,#0c2060 60%,#0a1628 100%)" : "linear-gradient(160deg,#eff6ff 0%,#ecfdf5 60%,#f0f9ff 100%)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
        {/* Blobs */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", background: "linear-gradient(135deg,rgba(26,86,219,0.12),rgba(6,182,212,0.12))", top: -100, right: -100, animation: "blob 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%", background: "linear-gradient(135deg,rgba(6,182,212,0.1),rgba(26,86,219,0.1))", bottom: -50, left: -50, animation: "blob 10s ease-in-out infinite reverse" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: dark ? "rgba(26,86,219,0.2)" : "rgba(26,86,219,0.08)", border: `1px solid rgba(26,86,219,0.2)`, borderRadius: 999, padding: "6px 16px", marginBottom: 24, animation: "fadeIn 0.5s ease" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.blue }}>Now Accepting New Patients</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, animation: "slideRight 0.7s ease" }}>
              Creating{" "}
              <span className="gradient-text">Beautiful</span>
              {" "}& Healthy Smiles
            </h1>
            <p style={{ fontSize: 18, color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.7, marginBottom: 32, animation: "fadeUp 0.7s 0.2s ease both" }}>
              Professional dental care with modern technology and personalized treatment. Experience the difference of a clinic that truly cares.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp 0.7s 0.3s ease both" }}>
              <GradBtn onClick={() => { setPage("Appointment"); window.scrollTo(0,0); }}>📅 Book Appointment</GradBtn>
              <GradBtn outline onClick={() => window.open("tel:+919876543210")}>📞 Call Now</GradBtn>
            </div>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 20, marginTop: 32, flexWrap: "wrap", animation: "fadeUp 0.7s 0.4s ease both" }}>
              {[{ icon: "✅", text: "ISO Certified" }, { icon: "🏆", text: "Award Winning" }, { icon: "🔬", text: "Latest Tech" }].map((b,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: dark ? "#94a3b8" : C.gray600 }}>
                  <span>{b.icon}</span> <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div style={{ animation: "fadeIn 0.8s 0.2s ease both", display: "flex", justifyContent: "center" }}>
            <div className="animate-float" style={{ position: "relative" }}>
              <div style={{ width: 380, height: 420, borderRadius: 32, background: "linear-gradient(135deg,#1a56db22,#06b6d422)", border: `2px solid rgba(26,86,219,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, boxShadow: "0 32px 80px rgba(26,86,219,0.2)" }}>
                🦷
              </div>
              {/* Floating cards */}
              <div style={{ position: "absolute", top: 24, right: -40, background: dark ? "#1e293b" : C.white, borderRadius: 16, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <span>⭐</span> <span>4.9 Rating</span>
              </div>
              <div style={{ position: "absolute", bottom: 40, left: -50, background: dark ? "#1e293b" : C.white, borderRadius: 16, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>👨‍⚕️</span>
                <div>
                  <div>Dr. Rohit Mehta</div>
                  <div style={{ fontSize: 11, color: C.gray400, fontWeight: 400 }}>Chief Dental Surgeon</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:768px){section > div > div { grid-template-columns: 1fr !important; } section > div > div > div:last-child { display: none; }}`}</style>
      </section>

      {/* Stats */}
      <Section>
        <div style={{ background: dark ? "#0f172a" : C.white, padding: "60px 24px", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray100}`, borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray100}` }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32 }}>
            <StatCounter value={5000} label="Happy Patients" dark={dark} />
            <StatCounter value={10} label="Years Experience" dark={dark} />
            <StatCounter value={15} label="Expert Doctors" dark={dark} />
            <StatCounter value={24} label="Emergency Support" suffix="/7" dark={dark} />
          </div>
        </div>
      </Section>

      {/* Services Preview */}
      <Section>
        <div style={{ padding: "80px 24px", background: dark ? "#0a1628" : C.gray50 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Badge>Our Services</Badge>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700 }}>
                Comprehensive <span className="gradient-text">Dental Care</span>
              </h2>
              <p style={{ color: dark ? "#94a3b8" : C.gray600, marginTop: 12, fontSize: 16 }}>From routine check-ups to complete smile transformations</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
              {SERVICES.slice(0,6).map((s,i) => (
                <div key={s.id} className="card-hover" style={{ background: dark ? "#1e293b" : C.white, borderRadius: 20, padding: 24, border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}`, animation: `fadeUp 0.6s ${i*0.08}s ease both`, cursor: "pointer" }}
                  onClick={() => { setPage("Services"); window.scrollTo(0,0); }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.6 }}>{s.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: C.blue }}>{s.price}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <GradBtn onClick={() => { setPage("Services"); window.scrollTo(0,0); }}>View All Services →</GradBtn>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div style={{ padding: "80px 24px", background: dark ? "#0f172a" : C.white }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <Badge>Why SmileCare</Badge>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, marginBottom: 20 }}>Where Technology Meets <span className="gradient-text">Compassionate Care</span></h2>
              <p style={{ color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.7, marginBottom: 28 }}>We combine state-of-the-art dental technology with a warm, patient-centered approach that puts you at ease from the moment you walk in.</p>
              {[
                { icon: "🔬", title: "Advanced Technology", desc: "3D imaging, laser dentistry, digital impressions" },
                { icon: "💊", title: "Pain-Free Treatments", desc: "Modern anesthesia for completely comfortable procedures" },
                { icon: "🏆", title: "Expert Team", desc: "15+ specialists with international training" },
                { icon: "🛡️", title: "Sterilization Certified", desc: "ISO-standard hygiene protocols every time" },
              ].map((item,i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: dark ? "rgba(26,86,219,0.2)" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: dark ? "#94a3b8" : C.gray600 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🦷", label: "Dental Implants", sub: "Permanent & natural" },
                { icon: "✨", label: "Teeth Whitening", sub: "8 shades brighter" },
                { icon: "😁", label: "Invisible Braces", sub: "Discreet alignment" },
                { icon: "💎", label: "Smile Design", sub: "Complete makeover" },
              ].map((c,i) => (
                <div key={i} style={{ background: dark ? "#1e293b" : C.sky, borderRadius: 20, padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray600, marginTop: 4 }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.why-grid { grid-template-columns: 1fr !important; }}`}</style>
      </Section>

      {/* Testimonials */}
      <Section>
        <div style={{ padding: "80px 24px", background: dark ? "#0a1628" : C.gray50 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Badge>Testimonials</Badge>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700 }}>What Our <span className="gradient-text">Patients Say</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {TESTIMONIALS.slice(tIdx, tIdx + 3).map((t,i) => (
                <div key={t.id} className="card-hover" style={{ background: dark ? "#1e293b" : C.white, borderRadius: 20, padding: 28, border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}`, animation: `fadeUp 0.5s ${i*0.1}s ease both` }}>
                  <StarRating n={t.rating} />
                  <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: dark ? "#cbd5e1" : C.gray600 }}>"{t.text}"</p>
                  <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
                    <Avatar initials={t.avatar} size={40} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray400 }}>{t.role} · {t.treatment}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28 }}>
              {[0,1,2,3].map(i => (
                <button key={i} onClick={() => setTIdx(i)}
                  style={{ width: i === Math.floor(tIdx/3) ? 28 : 10, height: 10, borderRadius: 5, background: i === Math.floor(tIdx/3) ? C.blue : C.gray200, border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Insurance Partners */}
      <Section>
        <div style={{ padding: "48px 24px", background: dark ? "#0f172a" : C.white, borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray100}` }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: dark ? "#94a3b8" : C.gray600, fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>Insurance Partners</p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              {["Star Health", "Bajaj Allianz", "HDFC Ergo", "New India", "LIC", "Aditya Birla"].map(ins => (
                <div key={ins} style={{ padding: "10px 20px", background: dark ? "#1e293b" : C.gray50, borderRadius: 12, border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}`, fontSize: 13, fontWeight: 600, color: dark ? "#94a3b8" : C.gray600 }}>{ins}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Banner */}
      <Section>
        <div style={{ padding: "64px 24px", background: "linear-gradient(135deg,#1a56db 0%,#0891b2 50%,#06b6d4 100%)", backgroundSize: "200% 200%", animation: "gradShift 6s ease infinite" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", color: C.white }}>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, marginBottom: 16 }}>Ready for Your Perfect Smile?</h2>
            <p style={{ opacity: 0.9, marginBottom: 28, fontSize: 16 }}>Book your consultation today — it's the first step toward the confident smile you deserve.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => { setPage("Appointment"); window.scrollTo(0,0); }}
                style={{ padding: "14px 30px", borderRadius: 999, background: C.white, color: C.blue, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
                📅 Book Free Consultation
              </button>
              <button onClick={() => window.open("tel:+919876543210")}
                style={{ padding: "14px 30px", borderRadius: 999, background: "rgba(255,255,255,0.15)", color: C.white, border: "2px solid rgba(255,255,255,0.4)", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
                📞 Call Us Now
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section>
        <div style={{ padding: "80px 24px", background: dark ? "#0a1628" : C.gray50 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <Badge>Find Us</Badge>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700 }}>Our <span className="gradient-text">Location</span></h2>
            </div>
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", height: 400, background: dark ? "#1e293b" : C.sky, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, border: `2px dashed ${dark ? "rgba(255,255,255,0.15)" : C.gray200}` }}>
              <div style={{ fontSize: 60 }}>📍</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>SmileCare Dental Clinic</div>
              <div style={{ color: dark ? "#94a3b8" : C.gray600, textAlign: "center" }}>123 Smile Street, Kothrud, Pune 411038<br />Near HDFC Bank, Maharashtra</div>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ color: C.blue, fontWeight: 600, fontSize: 14 }}>Open in Google Maps →</a>
            </div>
          </div>
        </div>
      </Section>

      {/* AI Chat Widget */}
      {chatOpen && (
        <div style={{ position: "fixed", bottom: 160, right: 24, zIndex: 2000, width: 340, borderRadius: 20, background: dark ? "#1e293b" : C.white, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden", animation: "toastIn 0.3s ease", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "linear-gradient(135deg,#1a56db,#06b6d4)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, color: C.white, fontSize: 14 }}>SmileCare AI</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>● Online — Ask me anything!</div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: C.white, cursor: "pointer", fontSize: 20 }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, maxHeight: 280 }}>
            {chatHistory.map((m,i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", background: m.from === "user" ? "linear-gradient(135deg,#1a56db,#06b6d4)" : (dark ? "#0f172a" : C.gray100), color: m.from === "user" ? C.white : (dark ? C.white : C.gray800), borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 14px", fontSize: 13, lineHeight: 1.5 }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : C.gray200}`, display: "flex", gap: 8 }}>
            <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()}
              placeholder="Ask about appointments..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: 999, border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : C.gray200}`, background: dark ? "#0f172a" : C.gray50, color: dark ? C.white : C.gray800, fontSize: 13 }} />
            <button onClick={sendChat} style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1a56db,#06b6d4)", border: "none", color: C.white, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>→</button>
          </div>
        </div>
      )}
      <button onClick={() => setChatOpen(o => !o)}
        style={{ position: "fixed", bottom: 96, left: 24, zIndex: 999, width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg,#1a56db,#06b6d4)", border: "none", color: C.white, fontSize: 26, cursor: "pointer", boxShadow: "0 4px 20px rgba(26,86,219,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        🤖
      </button>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ dark }) {
  const bg = dark ? C.navy : C.white;
  const text = dark ? C.white : C.gray800;
  return (
    <div style={{ background: bg, color: text }}>
      {/* Hero */}
      <div style={{ paddingTop: 80, background: dark ? "linear-gradient(160deg,#0a1628,#0c2060)" : "linear-gradient(160deg,#eff6ff,#ecfdf5)", padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Badge>About SmileCare</Badge>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, marginBottom: 20 }}>A Decade of Changing <span className="gradient-text">Lives Through Smiles</span></h1>
          <p style={{ fontSize: 18, color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.7 }}>Founded in 2013, SmileCare has grown from a small practice to Pune's most trusted multi-specialty dental clinic, serving over 5,000 patients with world-class care.</p>
        </div>
      </div>

      {/* Dr. Profile */}
      <Section>
        <div style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div style={{ animation: "fadeIn 0.7s ease" }}>
              <div style={{ width: "100%", maxWidth: 380, height: 420, borderRadius: 32, background: "linear-gradient(135deg,#dbeafe,#ccfbf1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, margin: "0 auto", boxShadow: "0 20px 60px rgba(26,86,219,0.15)", position: "relative" }}>
                👨‍⚕️
                <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#1a56db,#06b6d4)", color: C.white, borderRadius: 999, padding: "8px 20px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                  🏆 Top Dentist Award 2023
                </div>
              </div>
            </div>
            <div>
              <Badge>Chief Dentist</Badge>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, marginBottom: 8 }}>Dr. Rohit Mehta</h2>
              <p style={{ color: C.blue, fontWeight: 600, marginBottom: 16 }}>BDS, MDS (Oral & Maxillofacial Surgery) · 15+ Years Experience</p>
              <p style={{ color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.7, marginBottom: 20 }}>Dr. Mehta trained at KEM Hospital Mumbai and completed advanced fellowship in cosmetic dentistry in Germany. He brings international standards of care to every patient.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Specialization", value: "Cosmetic & Implant Surgery" },
                  { label: "Education", value: "KEM Mumbai + Fellowship Germany" },
                  { label: "Languages", value: "English, Hindi, Marathi" },
                  { label: "Certifications", value: "ADA, IDA, IDA Member" },
                ].map((item,i) => (
                  <div key={i} style={{ background: dark ? "#1e293b" : C.sky, borderRadius: 12, padding: "12px 16px" }}>
                    <div style={{ fontSize: 11, color: dark ? "#94a3b8" : C.gray400, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission/Vision */}
      <Section>
        <div style={{ padding: "60px 24px", background: dark ? "#0f172a" : C.gray50 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              { icon: "🎯", title: "Our Mission", text: "To provide exceptional dental care that improves oral health and transforms lives, using the latest technology and personalized treatment plans tailored to every patient." },
              { icon: "🔭", title: "Our Vision", text: "To be Pune's most trusted dental destination — a place where every patient leaves with healthier teeth, a brighter smile, and complete confidence in their care." },
            ].map((item,i) => (
              <div key={i} style={{ background: dark ? "#1e293b" : C.white, borderRadius: 20, padding: 32, border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}` }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.7, fontSize: 15 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section>
        <div style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Badge>Our Team</Badge>
              <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700 }}>Meet Our <span className="gradient-text">Expert Doctors</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
              {TEAM.map((member,i) => (
                <div key={i} className="card-hover" style={{ background: dark ? "#1e293b" : C.white, borderRadius: 24, padding: "32px 24px", textAlign: "center", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}` }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: member.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px", border: `3px solid ${C.blue}22` }}>👨‍⚕️</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{member.name}</div>
                  <div style={{ fontSize: 13, color: C.blue, fontWeight: 600, marginBottom: 6 }}>{member.role}</div>
                  <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray400, marginBottom: 4 }}>{member.qual}</div>
                  <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray400 }}>{member.exp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Awards */}
      <Section>
        <div style={{ padding: "60px 24px", background: dark ? "#0a1628" : C.sky }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <Badge>Recognition</Badge>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, marginBottom: 40 }}>Awards & <span className="gradient-text">Achievements</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20 }}>
              {[
                { icon: "🏆", title: "Best Dental Clinic", year: "2023", org: "Pune Health Awards" },
                { icon: "⭐", title: "5-Star Rated", year: "2022-24", org: "Google Reviews" },
                { icon: "🎖️", title: "Excellence Award", year: "2022", org: "IDA Maharashtra" },
                { icon: "🔬", title: "Technology Pioneer", year: "2021", org: "Dental Today India" },
              ].map((a,i) => (
                <div key={i} style={{ background: dark ? "#1e293b" : C.white, borderRadius: 20, padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>{a.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: C.blue, fontWeight: 600, margin: "4px 0" }}>{a.year}</div>
                  <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray400 }}>{a.org}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage, dark }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ background: dark ? C.navy : C.white, color: dark ? C.white : C.gray800, paddingTop: 72 }}>
      <div style={{ background: dark ? "linear-gradient(160deg,#0a1628,#0c2060)" : "linear-gradient(160deg,#eff6ff,#ecfdf5)", padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Badge>All Services</Badge>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Complete <span className="gradient-text">Dental Solutions</span></h1>
          <p style={{ color: dark ? "#94a3b8" : C.gray600, fontSize: 17 }}>From preventive care to complete smile transformations — everything under one roof.</p>
        </div>
      </div>
      <div style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
          {SERVICES.map((s,i) => (
            <Section key={s.id}>
              <div className="card-hover" style={{ background: dark ? "#1e293b" : C.white, borderRadius: 24, overflow: "hidden", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}`, cursor: "pointer" }}
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                <div style={{ height: 8, background: `linear-gradient(90deg,${C.blue},${C.cyan})` }} />
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{s.icon}</div>
                    <span style={{ fontSize: 20, color: expanded === s.id ? C.blue : C.gray400, transition: "transform 0.3s", display: "inline-block", transform: expanded === s.id ? "rotate(180deg)" : "none" }}>⌄</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.6 }}>{s.desc}</p>
                  <div style={{ marginTop: 12, fontWeight: 700, color: C.blue, fontSize: 15 }}>{s.price}</div>

                  {expanded === s.id && (
                    <div style={{ marginTop: 16, borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : C.gray100}`, paddingTop: 16, animation: "fadeUp 0.3s ease" }}>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.teal }}>✅ Benefits</div>
                        {s.benefits.map((b,j) => <div key={j} style={{ fontSize: 13, marginBottom: 4, color: dark ? "#cbd5e1" : C.gray600 }}>• {b}</div>)}
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.teal }}>📋 Steps</div>
                        {s.steps.map((step,j) => (
                          <div key={j} style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center" }}>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.blue, color: C.white, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>{j+1}</div>
                            <span style={{ fontSize: 13, color: dark ? "#cbd5e1" : C.gray600 }}>{step}</span>
                          </div>
                        ))}
                      </div>
                      <GradBtn small onClick={() => { setPage("Appointment"); window.scrollTo(0,0); }}>Book This Service</GradBtn>
                    </div>
                  )}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── APPOINTMENT PAGE ─────────────────────────────────────────────────────────
function AppointmentPage({ dark, onToast }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit number";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter valid email";
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    if (!form.service) e.service = "Please select a service";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    onToast(`Appointment booked for ${form.date} at ${form.time}! We'll confirm via SMS.`);
    setForm({ name: "", phone: "", email: "", date: "", time: "", service: "", message: "" });
    setErrors({});
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8, color: dark ? "#cbd5e1" : C.gray700 }}>{label}</label>
      <input type={type} value={form[key]} onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: "" })); }}
        placeholder={placeholder}
        style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${errors[key] ? C.red : (dark ? "rgba(255,255,255,0.15)" : C.gray200)}`, background: dark ? "#0f172a" : C.white, color: dark ? C.white : C.gray800, fontSize: 15 }} />
      {errors[key] && <div style={{ color: C.red, fontSize: 12, marginTop: 4 }}>⚠ {errors[key]}</div>}
    </div>
  );

  return (
    <div style={{ background: dark ? C.navy : C.gray50, color: dark ? C.white : C.gray800, paddingTop: 72 }}>
      <div style={{ background: dark ? "linear-gradient(160deg,#0a1628,#0c2060)" : "linear-gradient(160deg,#eff6ff,#ecfdf5)", padding: "80px 24px 60px", textAlign: "center" }}>
        <Badge>Appointment</Badge>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Book Your <span className="gradient-text">Appointment</span></h1>
        <p style={{ color: dark ? "#94a3b8" : C.gray600, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>Fill out the form and we'll confirm your slot within 2 hours.</p>
      </div>

      <div style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "start" }}>
          {/* Info sidebar */}
          <div>
            <div style={{ background: "linear-gradient(135deg,#1a56db,#0891b2)", borderRadius: 24, padding: 28, color: C.white, marginBottom: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, marginBottom: 12 }}>Why Book Online?</h3>
              {["Instant confirmation", "Choose your time slot", "Reminder via SMS & Email", "No waiting at reception", "Easy rescheduling"].map((t,i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 14 }}>
                  <span>✅</span><span>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ background: dark ? "#1e293b" : C.white, borderRadius: 20, padding: 24, border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}` }}>
              <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>📞 Or Call / WhatsApp</div>
              {[{ icon: "📞", label: "Call Now", val: "+91 98765 43210" }, { icon: "💬", label: "WhatsApp", val: "+91 98765 43210" }, { icon: "✉️", label: "Email", val: "hello@smilecare.in" }].map((c,i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray400 }}>{c.label}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: dark ? "#1e293b" : C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}`, boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Patient Details</h2>
            <form onSubmit={submit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div>{field("name", "Full Name *", "text", "John Doe")}</div>
                <div>{field("phone", "Phone Number *", "tel", "98765 43210")}</div>
              </div>
              {field("email", "Email Address *", "email", "john@example.com")}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div>{field("date", "Preferred Date *", "date")}</div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8, color: dark ? "#cbd5e1" : C.gray700 }}>Time Slot *</label>
                  <select value={form.time} onChange={e => { setForm(f => ({ ...f, time: e.target.value })); setErrors(er => ({ ...er, time: "" })); }}
                    style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${errors.time ? C.red : (dark ? "rgba(255,255,255,0.15)" : C.gray200)}`, background: dark ? "#0f172a" : C.white, color: dark ? C.white : C.gray800, fontSize: 15 }}>
                    <option value="">Select time</option>
                    {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                  </select>
                  {errors.time && <div style={{ color: C.red, fontSize: 12, marginTop: 4 }}>⚠ {errors.time}</div>}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8, color: dark ? "#cbd5e1" : C.gray700 }}>Service *</label>
                <select value={form.service} onChange={e => { setForm(f => ({ ...f, service: e.target.value })); setErrors(er => ({ ...er, service: "" })); }}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${errors.service ? C.red : (dark ? "rgba(255,255,255,0.15)" : C.gray200)}`, background: dark ? "#0f172a" : C.white, color: dark ? C.white : C.gray800, fontSize: 15 }}>
                  <option value="">Choose a service</option>
                  {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
                </select>
                {errors.service && <div style={{ color: C.red, fontSize: 12, marginTop: 4 }}>⚠ {errors.service}</div>}
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 8, color: dark ? "#cbd5e1" : C.gray700 }}>Additional Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} placeholder="Any specific concerns or questions..."
                  style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : C.gray200}`, background: dark ? "#0f172a" : C.white, color: dark ? C.white : C.gray800, fontSize: 15, resize: "vertical" }} />
              </div>
              <button type="submit" className="gradient-btn" style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", color: C.white, fontWeight: 700, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><span className="animate-spin" style={{ display: "inline-block" }}>⟳</span> Booking...</> : "📅 Confirm Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .appt-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
function GalleryPage({ dark }) {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Before/After", "Facility", "Treatment"];
  const items = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.type === filter);

  return (
    <div style={{ background: dark ? C.navy : C.white, color: dark ? C.white : C.gray800, paddingTop: 72 }}>
      <div style={{ background: dark ? "linear-gradient(160deg,#0a1628,#0c2060)" : "linear-gradient(160deg,#eff6ff,#ecfdf5)", padding: "80px 24px 60px", textAlign: "center" }}>
        <Badge>Gallery</Badge>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Smile <span className="gradient-text">Transformations</span></h1>
        <p style={{ color: dark ? "#94a3b8" : C.gray600, fontSize: 17 }}>Real patients, real results — see the difference SmileCare makes.</p>
      </div>

      <div style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: "9px 22px", borderRadius: 999, border: `1.5px solid ${filter === f ? C.blue : (dark ? "rgba(255,255,255,0.15)" : C.gray200)}`, background: filter === f ? C.blue : "transparent", color: filter === f ? C.white : (dark ? "#94a3b8" : C.gray600), fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>
                {f}
              </button>
            ))}
          </div>

          <div className="masonry">
            {items.map((item,i) => (
              <div key={i} className="masonry-item" style={{ cursor: "pointer" }} onClick={() => setLightbox(item)}>
                <div style={{ borderRadius: 16, overflow: "hidden", height: item.h, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, transition: "transform 0.3s ease, box-shadow 0.3s ease", position: "relative" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: 48, animation: "float 3s ease-in-out infinite" }}>
                    {item.type === "Before/After" ? "😁" : item.type === "Facility" ? "🏥" : "🔬"}
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.6))", padding: "24px 16px 12px" }}>
                    <div style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{item.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{item.type}</div>
                  </div>
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(26,86,219,0.9)", color: C.white, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>{item.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.3s ease" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: dark ? "#1e293b" : C.white, borderRadius: 24, padding: 32, maxWidth: 480, width: "90%", textAlign: "center" }}>
            <div style={{ height: 280, borderRadius: 16, background: lightbox.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, marginBottom: 20 }}>
              {lightbox.type === "Before/After" ? "😁" : lightbox.type === "Facility" ? "🏥" : "🔬"}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700 }}>{lightbox.label}</h3>
            <p style={{ color: dark ? "#94a3b8" : C.gray600, margin: "8px 0 20px" }}>{lightbox.type} · SmileCare Dental Clinic</p>
            <button onClick={() => setLightbox(null)} style={{ padding: "10px 24px", borderRadius: 999, background: C.gray100, border: "none", cursor: "pointer", fontWeight: 600 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TESTIMONIALS PAGE ────────────────────────────────────────────────────────
function TestimonialsPage({ dark }) {
  return (
    <div style={{ background: dark ? C.navy : C.white, color: dark ? C.white : C.gray800, paddingTop: 72 }}>
      <div style={{ background: dark ? "linear-gradient(160deg,#0a1628,#0c2060)" : "linear-gradient(160deg,#eff6ff,#ecfdf5)", padding: "80px 24px 60px", textAlign: "center" }}>
        <Badge>Testimonials</Badge>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Patient <span className="gradient-text">Stories & Reviews</span></h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginTop: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: C.gold }}>4.9★</div>
            <div style={{ fontSize: 13, color: dark ? "#94a3b8" : C.gray600 }}>Google Rating</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: C.blue }}>500+</div>
            <div style={{ fontSize: 13, color: dark ? "#94a3b8" : C.gray600 }}>Reviews</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: C.green }}>98%</div>
            <div style={{ fontSize: 13, color: dark ? "#94a3b8" : C.gray600 }}>Recommend Us</div>
          </div>
        </div>
      </div>

      <Section>
        <div style={{ padding: "60px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={t.id} className="card-hover" style={{ background: dark ? "#1e293b" : C.white, borderRadius: 24, padding: 28, border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}`, animation: `fadeUp 0.5s ${i*0.08}s ease both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <StarRating n={t.rating} />
                  <div style={{ background: "#ecfdf5", color: C.green, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999 }}>Verified Patient</div>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: dark ? "#cbd5e1" : C.gray600, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray100}`, paddingTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar initials={t.avatar} size={44} />
                  <div>
                    <div style={{ fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray400 }}>{t.role}</div>
                    <div style={{ fontSize: 12, color: C.blue, fontWeight: 600, marginTop: 2 }}>🦷 {t.treatment}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Video placeholders */}
      <Section>
        <div style={{ padding: "60px 24px", background: dark ? "#0f172a" : C.gray50 }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <Badge>Video Stories</Badge>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700 }}>Video <span className="gradient-text">Testimonials</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
              {TESTIMONIALS.slice(0,3).map((t,i) => (
                <div key={t.id} style={{ background: dark ? "#1e293b" : C.white, borderRadius: 20, overflow: "hidden", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}` }}>
                  <div style={{ height: 160, background: `linear-gradient(135deg,${C.sky},#e0f2fe)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(26,86,219,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: C.white }}>▶</div>
                    <div style={{ position: "absolute", bottom: 8, left: 12, fontSize: 12, fontWeight: 600, color: C.gray600 }}>1:3{i} min</div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: dark ? "#94a3b8" : C.gray400, marginTop: 2 }}>Treatment: {t.treatment}</div>
                    <StarRating n={5} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ dark, onToast }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onToast("Message sent! We'll get back to you within 2 hours.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div style={{ background: dark ? C.navy : C.white, color: dark ? C.white : C.gray800, paddingTop: 72 }}>
      <div style={{ background: dark ? "linear-gradient(160deg,#0a1628,#0c2060)" : "linear-gradient(160deg,#eff6ff,#ecfdf5)", padding: "80px 24px 60px", textAlign: "center" }}>
        <Badge>Contact</Badge>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Get In <span className="gradient-text">Touch</span></h1>
        <p style={{ color: dark ? "#94a3b8" : C.gray600, fontSize: 17 }}>We're here to help — reach us through any channel below.</p>
      </div>

      <div style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "start" }}>
          {/* Contact Info */}
          <div>
            {[
              { icon: "📍", title: "Visit Us", lines: ["123 Smile Street, Kothrud", "Pune, Maharashtra 411038", "Near HDFC Bank"] },
              { icon: "📞", title: "Call Us", lines: ["+91 98765 43210 (General)", "+91 98765 43211 (Emergency 24/7)"] },
              { icon: "✉️", title: "Email Us", lines: ["hello@smilecare.in", "appointments@smilecare.in"] },
              { icon: "🕐", title: "Working Hours", lines: ["Mon – Sat: 9:00 AM – 8:00 PM", "Sunday: 10:00 AM – 2:00 PM", "Emergency: 24/7"] },
            ].map((item,i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: dark ? "rgba(26,86,219,0.2)" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  {item.lines.map((l,j) => <div key={j} style={{ fontSize: 14, color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.6 }}>{l}</div>)}
                </div>
              </div>
            ))}
            <div style={{ background: "#fee2e2", borderRadius: 16, padding: 20, border: "1px solid #fca5a5" }}>
              <div style={{ fontWeight: 700, color: "#dc2626", marginBottom: 8, fontSize: 15 }}>🚨 Dental Emergency?</div>
              <div style={{ fontSize: 14, color: "#7f1d1d", lineHeight: 1.6 }}>Call our 24/7 emergency line immediately: <strong>+91 98765 43211</strong></div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: dark ? "#1e293b" : C.white, borderRadius: 24, padding: "36px 32px", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray200}`, boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Send a Message</h2>
            <form onSubmit={submit}>
              {["name","email","phone"].map((key,i) => (
                <div key={key} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 7, color: dark ? "#cbd5e1" : C.gray700 }}>
                    {key === "name" ? "Full Name *" : key === "email" ? "Email *" : "Phone"}
                  </label>
                  <input type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                    value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    required={key !== "phone"}
                    style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : C.gray200}`, background: dark ? "#0f172a" : C.white, color: dark ? C.white : C.gray800, fontSize: 15 }} />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 7, color: dark ? "#cbd5e1" : C.gray700 }}>Message *</label>
                <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4}
                  placeholder="How can we help you?"
                  style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : C.gray200}`, background: dark ? "#0f172a" : C.white, color: dark ? C.white : C.gray800, fontSize: 15, resize: "vertical" }} />
              </div>
              <button type="submit" className="gradient-btn" style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", color: C.white, fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
                {loading ? "Sending..." : "✉️ Send Message"}
              </button>
            </form>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <a href="https://wa.me/919876543210" style={{ flex: 1, padding: "12px", borderRadius: 12, background: "#25d366", color: C.white, fontWeight: 700, fontSize: 14, textAlign: "center", textDecoration: "none", display: "block" }}>💬 WhatsApp Us</a>
              <a href="tel:+919876543210" style={{ flex: 1, padding: "12px", borderRadius: 12, background: C.blue, color: C.white, fontWeight: 700, fontSize: 14, textAlign: "center", textDecoration: "none", display: "block" }}>📞 Call Now</a>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <Section>
        <div style={{ padding: "0 24px 60px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", height: 350, borderRadius: 24, background: dark ? "#1e293b" : C.sky, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, border: `2px dashed ${dark ? "rgba(255,255,255,0.15)" : C.gray200}` }}>
            <div style={{ fontSize: 56 }}>📍</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>123 Smile Street, Kothrud, Pune</div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ color: C.blue, fontWeight: 600 }}>View on Google Maps →</a>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────────────────────
function FAQPage({ dark, setPage }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ background: dark ? C.navy : C.white, color: dark ? C.white : C.gray800, paddingTop: 72 }}>
      <div style={{ background: dark ? "linear-gradient(160deg,#0a1628,#0c2060)" : "linear-gradient(160deg,#eff6ff,#ecfdf5)", padding: "80px 24px 60px", textAlign: "center" }}>
        <Badge>FAQ</Badge>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 16 }}>Frequently Asked <span className="gradient-text">Questions</span></h1>
        <p style={{ color: dark ? "#94a3b8" : C.gray600, fontSize: 17 }}>Everything you need to know about dental care at SmileCare.</p>
      </div>

      <div style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {FAQS.map((faq,i) => (
            <Section key={i}>
              <div style={{ marginBottom: 14, background: dark ? "#1e293b" : C.white, borderRadius: 16, border: `1px solid ${open === i ? C.blue : (dark ? "rgba(255,255,255,0.08)" : C.gray200)}`, overflow: "hidden", transition: "border-color 0.3s", boxShadow: open === i ? `0 4px 24px rgba(26,86,219,0.1)` : "none" }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: "100%", padding: "20px 24px", background: "transparent", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 16, textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: dark ? C.white : C.gray800 }}>
                    <span style={{ color: C.blue, marginRight: 8 }}>Q.</span>{faq.q}
                  </div>
                  <span style={{ fontSize: 22, color: C.blue, flexShrink: 0, transition: "transform 0.3s", display: "inline-block", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 20px", animation: "fadeUp 0.3s ease", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : C.gray100}` }}>
                    <p style={{ paddingTop: 16, fontSize: 15, color: dark ? "#94a3b8" : C.gray600, lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            </Section>
          ))}

          {/* Still have questions */}
          <div style={{ marginTop: 40, background: "linear-gradient(135deg,#1a56db,#0891b2)", borderRadius: 24, padding: "36px", color: C.white, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤔</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Still Have Questions?</h3>
            <p style={{ opacity: 0.9, marginBottom: 20, fontSize: 15 }}>Our team is happy to answer any specific questions about your dental care.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => { setPage("Contact"); window.scrollTo(0,0); }}
                style={{ padding: "12px 24px", borderRadius: 999, background: C.white, color: C.blue, border: "none", fontWeight: 700, cursor: "pointer" }}>
                Contact Us
              </button>
              <button onClick={() => window.open("tel:+919876543210")}
                style={{ padding: "12px 24px", borderRadius: 999, background: "rgba(255,255,255,0.15)", color: C.white, border: "2px solid rgba(255,255,255,0.4)", fontWeight: 700, cursor: "pointer" }}>
                📞 Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState(null);

  const onToast = useCallback((msg) => setToast(msg), []);

  const pageProps = { setPage, dark, onToast };

  const renderPage = () => {
    switch (page) {
      case "Home":        return <HomePage {...pageProps} />;
      case "About":       return <AboutPage {...pageProps} />;
      case "Services":    return <ServicesPage {...pageProps} />;
      case "Appointment": return <AppointmentPage {...pageProps} />;
      case "Gallery":     return <GalleryPage {...pageProps} />;
      case "Testimonials":return <TestimonialsPage {...pageProps} />;
      case "Contact":     return <ContactPage {...pageProps} />;
      case "FAQ":         return <FAQPage {...pageProps} />;
      default:            return <HomePage {...pageProps} />;
    }
  };

  return (
    <>
      <FontLink />
      <div style={{ minHeight: "100vh", background: dark ? C.navy : C.white }}>
        {/* <EmergencyBanner setPage={setPage} /> */}
        <Navbar page={page} setPage={setPage} dark={dark} setDark={setDark} />
        <main>{renderPage()}</main>
        <Footer setPage={setPage} dark={dark} />
        <WAButton />
        <BackTop />
        {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      </div>
    </>
  );
}
