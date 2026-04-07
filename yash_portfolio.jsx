import { useState, useEffect, useRef } from "react";

const ACC = "#f5c518";
const ACC2 = "#d4a800";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

const TYPING_WORDS = ["Full Stack Developer", "Backend Developer", "Frontend Developer", "AI Enthusiast", "Software Engineer"];

const SKILLS = {
  "Languages & Frontend": [
    { name: "Java", level: 88 },
    { name: "JavaScript", level: 82 },
    { name: "SQL", level: 78 },
    { name: "HTML5 / CSS3", level: 90 },
  ],
  "Backend & Database": [
    { name: "Spring Boot", level: 85 },
    { name: "Spring / Servlets / JSP", level: 80 },
    { name: "MySQL / JDBC / Hibernate", level: 75 },
    { name: "Maven", level: 72 },
  ],
  "Tools & Methods": [
    { name: "Git & GitHub", level: 88 },
    { name: "Linux", level: 70 },
    { name: "Agile / Scrum", level: 80 },
    { name: "Debugging & Testing", level: 82 },
  ],
};

const PROJECTS = [
  {
    id: 1,
    title: "SpacePulse",
    tag: "Featured Project",
    desc: "A full-stack space monitoring platform with 200+ active users. Provides real-time satellite tracking, AI-powered space analysis, 3D solar system simulation, ISS tracking, and astronomical event alerts — all powered by NASA DONKI API and Groq AI.",
    tech: ["React 18", "Spring Boot 3.2", "MySQL", "Three.js", "Leaflet.js", "JWT Auth", "WebSocket", "Groq AI", "Docker", "Vercel"],
    features: [
      "Real-time tracker for 20 satellites including ISS, Hubble & 10 ISRO satellites",
      "Interactive 3D Solar System with WebGL via Three.js",
      "NOVA AI Assistant powered by Groq AI (LLaMA model)",
      "Space Weather Dashboard — solar flares, CME & Kp index via NASA DONKI API",
      "Night Sky View with 5000+ star catalog & moon phase rendering",
      "Space Missions, Exoplanet Explorer & Astro Event Calendar",
      "Email alert system via Resend for custom space weather notifications",
    ],
    live: "https://space-pulse-xi.vercel.app",
    github: "https://github.com/yashlase21/SpacePulse",
    video: "https://www.youtube.com/embed/FP_7Xzcy2FY",
    emoji: "🛰️",
  },
  {
    id: 2,
    title: "Student Management System",
    tag: "Web App",
    desc: "Developed a dynamic web application using Java, JDBC, Servlets, JSP, and MySQL with full CRUD functionality and clean MVC architecture.",
    tech: ["Java", "JSP", "Servlets", "JDBC", "MySQL"],
    features: null,
    live: null,
    github: null,
    video: null,
    emoji: "🎓",
  },
];

const CERTS = [
  { title: "Full Stack Development", org: "Q Spiders Pune", icon: "⚡" },
  { title: "Microsoft Career Essentials in Generative AI", org: "Microsoft", icon: "🤖" },
  { title: "Scaler Low-Level Design", org: "Scaler", icon: "🔧" },
];

const SOCIAL = [
  { icon: "GH", label: "GitHub", href: "https://github.com/yashlase21", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> },
  { icon: "LI", label: "LinkedIn", href: "https://www.linkedin.com/in/yash-lase-117723232/", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { icon: "EM", label: "Email", href: "mailto:laseyash205@gmail.com", svg: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> },
];

// ---- Global Styles ----
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0a0a0a; color: #e2e2e2; font-family: 'Poppins', sans-serif; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #111; }
    ::-webkit-scrollbar-thumb { background: ${ACC}; border-radius: 4px; }
    a { text-decoration: none; }
    @keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes fade-up { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fade-left { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fade-right { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
    @keyframes progress-fill { from{width:0} to{width:var(--w)} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes scroll-prog { from{width:0} to{width:100%} }
    @keyframes ring-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .nav-link { color: #ccc; font-size: 14px; font-weight: 500; transition: color 0.3s; }
    .nav-link:hover { color: ${ACC}; }
    .btn-red { background: ${ACC}; color: white; font-weight: 600; padding: 13px 30px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; font-family: 'Poppins',sans-serif; transition: all 0.3s; display: inline-block; }
    .btn-red:hover { background: ${ACC2}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,69,69,0.35); }
    .btn-outline-red { background: transparent; color: ${ACC}; border: 2px solid ${ACC}; padding: 11px 28px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; font-family: 'Poppins',sans-serif; transition: all 0.3s; display: inline-block; }
    .btn-outline-red:hover { background: ${ACC}; color: white; transform: translateY(-2px); }
    .card { background: #141414; border: 1px solid #222; border-radius: 12px; transition: all 0.3s; }
    .card:hover { border-color: ${ACC}44; box-shadow: 0 8px 32px rgba(232,69,69,0.1); transform: translateY(-4px); }
    .section-label { color: ${ACC}; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
    .section-title { font-size: clamp(28px,4vw,42px); font-weight: 800; color: white; margin-bottom: 8px; }
    .divider { width: 50px; height: 3px; background: ${ACC}; border-radius: 2px; margin-bottom: 48px; }
    .social-icon { width: 42px; height: 42px; border-radius: 8px; border: 1px solid #2a2a2a; display: flex; align-items: center; justify-content: center; color: #aaa; transition: all 0.3s; cursor: pointer; }
    .social-icon:hover { border-color: ${ACC}; color: ${ACC}; background: rgba(232,69,69,0.08); }
  `}</style>
);

// ---- Scroll Progress ----
function ScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      setProg((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "#1a1a1a" }}>
      <div style={{ height: "100%", width: `${prog}%`, background: ACC, transition: "width 0.1s" }} />
    </div>
  );
}

// ---- Navbar ----
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 3, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid #1f1f1f" : "none",
      padding: "0 5%", transition: "all 0.4s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>
          Yash<span style={{ color: ACC }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <a href="#contact" className="btn-red" style={{ fontSize: 13, padding: "10px 24px" }}>Hire Me</a>
      </div>
    </nav>
  );
}

// ---- Typing Effect ----
function Typing() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = TYPING_WORDS[idx];
    const timeout = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1800);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setIdx((i) => (i + 1) % TYPING_WORDS.length); }
      }
    }, del ? 55 : 95);
    return () => clearTimeout(timeout);
  }, [text, del, idx]);
  return (
    <span style={{ color: ACC }}>
      {text}<span style={{ animation: "cursor-blink 1s infinite", borderRight: `2px solid ${ACC}`, marginLeft: 1 }} />
    </span>
  );
}

// ---- Hero ----
function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5%", paddingTop: 70 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left */}
        <div style={{ animation: "fade-left 0.8s ease forwards" }}>
          <p style={{ fontSize: 15, color: "#aaa", fontWeight: 400, marginBottom: 12, letterSpacing: 1 }}>HELLO, I'M</p>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
            <span style={{ color: ACC }}>Yash </span>
            <span style={{ color: "white" }}>Lase</span>
          </h1>
          <h2 style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 600, marginBottom: 28, minHeight: 40 }}>
            <Typing />
          </h2>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.9, marginBottom: 40, maxWidth: 480 }}>
            Aspiring Software Engineer with hands-on experience building scalable full-stack applications using
            {" "}<span style={{ color: ACC, fontWeight: 500 }}>Spring Boot</span> and{" "}
            <span style={{ color: ACC, fontWeight: 500 }}>React</span>. Passionate about AI, cybersecurity, and space-based technologies.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 44 }}>
            <a href="#contact" className="btn-red">Contact Me</a>
            <a href="#projects" className="btn-outline-red">View Projects</a>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-icon" title={s.label}>
                {s.svg}
              </a>
            ))}
          </div>
        </div>
        {/* Right — Photo */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", animation: "fade-right 0.8s ease forwards" }}>
          <div style={{ position: "relative", width: 380, height: 380 }}>
            {/* Rotating dashed ring */}
            <div style={{
              position: "absolute", inset: -14, borderRadius: "50%",
              border: `2px dashed ${ACC}55`,
              animation: "ring-rotate 12s linear infinite",
            }} />
            {/* Solid ring */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: `4px solid ${ACC}`,
              boxShadow: `0 0 40px ${ACC}44, inset 0 0 40px ${ACC}11`,
            }} />
            <img
              src="/profile.png"
              alt="Yash Lase"
              style={{
                width: "100%", height: "100%", borderRadius: "50%",
                objectFit: "cover", objectPosition: "top",
                display: "block", position: "relative", zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Stats Bar ----
function Stats() {
  const items = [
    { val: "5+", label: "Projects Completed" },
    { val: "200+", label: "Active Users" },
    { val: "15+", label: "Technologies" },
    { val: "1", label: "Internship" },
  ];
  return (
    <section style={{ background: "#111", borderTop: "1px solid #1f1f1f", borderBottom: "1px solid #1f1f1f", padding: "32px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
        {items.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "clamp(28px,3vw,42px)", fontWeight: 800, color: ACC }}>{s.val}</div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- About ----
function About() {
  return (
    <section id="about" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        {/* Photo side */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 340, height: 380 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: `2px solid ${ACC}`, transform: "translate(12px, 12px)" }} />
            <img src="/profile.png" alt="Yash Lase" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", borderRadius: 16, position: "relative", zIndex: 1, display: "block" }} />
            <div style={{ position: "absolute", bottom: 24, left: -20, background: ACC, borderRadius: 10, padding: "14px 20px", zIndex: 2, boxShadow: "0 8px 24px rgba(232,69,69,0.4)" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>200+</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}>Active Users</div>
            </div>
          </div>
        </div>
        {/* Text side */}
        <div>
          <p className="section-label">— About Me —</p>
          <h2 className="section-title">Who I Am</h2>
          <div className="divider" />
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.9, marginBottom: 20 }}>
            I'm a Software Engineer specializing in building scalable full-stack applications. With expertise in <span style={{ color: ACC }}>Spring Boot</span> and <span style={{ color: ACC }}>React</span>, I develop REST APIs, dynamic frontends, and AI-integrated platforms.
          </p>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.9, marginBottom: 32 }}>
            Strong problem-solving abilities with a focus on delivering efficient and user-centric solutions. Passionate about <span style={{ color: ACC }}>AI</span>, <span style={{ color: ACC }}>cybersecurity</span>, and <span style={{ color: ACC }}>space-based technologies</span>.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 36 }}>
            {[
              { label: "Email", val: "laseyash205@gmail.com" },
              { label: "Phone", val: "+91 9922569337" },
              { label: "Location", val: "Pune, Maharashtra" },
              { label: "Available", val: "Open to Opportunities" },
            ].map((i) => (
              <div key={i.label}>
                <span style={{ color: "#555", fontSize: 13 }}>{i.label}: </span>
                <span style={{ color: "#ccc", fontSize: 13, fontWeight: 500 }}>{i.val}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-icon" title={s.label}>
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Skills ----
function Skills() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id="skills" style={{ padding: "100px 5%", background: "#0d0d0d" }} ref={ref}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="section-label">— My Arsenal —</p>
          <h2 className="section-title">Technical Skills</h2>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="card" style={{ padding: 32 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: ACC, marginBottom: 28, textTransform: "uppercase", letterSpacing: 1 }}>{cat}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {items.map((sk) => (
                  <div key={sk.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: "#ccc", fontWeight: 500 }}>{sk.name}</span>
                      <span style={{ fontSize: 13, color: "#555" }}>{sk.level}%</span>
                    </div>
                    <div style={{ height: 5, background: "#222", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 3, background: ACC,
                        width: vis ? `${sk.level}%` : "0%",
                        transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
                        boxShadow: `0 0 8px ${ACC}66`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Projects ----
function ProjectCard({ p }) {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="card" style={{ overflow: "hidden", borderColor: hover ? `${ACC}44` : "#222" }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {/* Thumbnail */}
        <div style={{ height: 180, background: "#181818", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid #222" }}>
          <div style={{ fontSize: 72, transition: "transform 0.4s", transform: hover ? "scale(1.15)" : "scale(1)" }}>{p.emoji}</div>
          {p.tag && <span style={{ position: "absolute", top: 14, right: 14, background: ACC, color: "white", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 4 }}>{p.tag}</span>}
        </div>
        <div style={{ padding: 28 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 10 }}>{p.title}</h3>
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
          {p.features && (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
              {p.features.map((f) => (
                <li key={f} style={{ fontSize: 12.5, color: "#666", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: ACC, flexShrink: 0, marginTop: 1 }}>▸</span>{f}
                </li>
              ))}
            </ul>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
            {p.tech.map((t) => <span key={t} style={{ background: "#1c1c1c", border: "1px solid #2a2a2a", color: "#888", fontSize: 11.5, padding: "3px 10px", borderRadius: 4 }}>{t}</span>)}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-red" style={{ fontSize: 12.5, padding: "8px 18px" }}>🌐 Live Demo</a>}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline-red" style={{ fontSize: 12.5, padding: "7px 16px" }}>⭐ GitHub</a>}
            {p.video && <button className="btn-outline-red" style={{ fontSize: 12.5, padding: "7px 16px" }} onClick={() => setModal(true)}>▶ Watch Demo</button>}
          </div>
        </div>
      </div>
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setModal(false)}>
          <div style={{ background: "#111", borderRadius: 16, border: `1px solid ${ACC}44`, padding: 24, maxWidth: 820, width: "100%" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "white" }}>{p.title} — Demo</h3>
              <button onClick={() => setModal(false)} style={{ background: "#222", border: "none", color: "white", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>×</button>
            </div>
            <div style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "16/9" }}>
              <iframe src={p.video + "?autoplay=1"} style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay; fullscreen" allowFullScreen title="Demo" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="section-label">— My Work —</p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 28 }}>
          {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

// ---- Experience ----
function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 5%", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="section-label">— Work History —</p>
          <h2 className="section-title">Experience</h2>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom,${ACC},${ACC}33,transparent)` }} />
          <div className="card" style={{ marginLeft: 52, padding: 32, position: "relative" }}>
            <div style={{ position: "absolute", left: -42, top: 28, width: 14, height: 14, borderRadius: "50%", background: ACC, boxShadow: `0 0 16px ${ACC}88` }} />
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "white" }}>Java Developer Intern</h3>
              <span style={{ background: `${ACC}18`, border: `1px solid ${ACC}44`, color: ACC, fontSize: 12.5, padding: "4px 14px", borderRadius: 4 }}>Jan 2024 – Mar 2024</span>
            </div>
            <div style={{ color: ACC, fontWeight: 600, marginBottom: 20, fontSize: 14 }}>Cognifyz Technology</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Built and maintained REST APIs using Spring Boot for scalable backend services",
                "Developed CRUD operations with JDBC and Hibernate ORM for MySQL databases",
                "Collaborated in Agile sprints, delivering features on schedule with team coordination",
                "Debugged and optimized performance bottlenecks, improving response time by 30%",
                "Gained hands-on experience with Git, Linux environments, and CI/CD pipelines",
              ].map((r) => (
                <li key={r} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "#777", fontSize: 14, lineHeight: 1.65 }}>
                  <span style={{ color: ACC, marginTop: 2, flexShrink: 0 }}>▸</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Education ----
function Education() {
  const edu = [
    { degree: "B.E. in Information Technology", school: "Sinhgad College of Engineering, Pune, Maharashtra", grade: "CGPA: 7.18/10", years: "Dec 2021 – July 2025", icon: "🎓" },
    { degree: "12th (HSC)", school: "Netaji Subhash Chandra Bose High School, Kandhar, Maharashtra", grade: "85.17 / 100", years: "Aug 2020 – June 2021", icon: "📚" },
    { degree: "10th (SSC)", school: "Kai Vishvanat Rav Nalge Junior School, Loha, Maharashtra", grade: "86.60 / 100", years: "June 2018 – March 2019", icon: "🏫" },
  ];
  return (
    <section id="education" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="section-label">— Academic Background —</p>
          <h2 className="section-title">Education</h2>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 24, marginBottom: 60 }}>
          {edu.map((e, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: `${ACC}18`, border: `1px solid ${ACC}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18 }}>{e.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 8 }}>{e.degree}</h3>
              <p style={{ color: "#666", fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>{e.school}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ background: `${ACC}18`, border: `1px solid ${ACC}33`, color: ACC, fontSize: 12, padding: "4px 12px", borderRadius: 4, fontWeight: 600 }}>{e.grade}</span>
                <span style={{ fontSize: 12, color: "#444" }}>{e.years}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Certifications */}
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 28, textAlign: "center" }}>Certifications</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {CERTS.map((c) => (
              <div key={c.title} className="card" style={{ padding: 22, display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: `${ACC}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "white", marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: ACC }}>{c.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Contact ----
function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 5%", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="section-label">— Get In Touch —</p>
          <h2 className="section-title">Contact Me</h2>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 14 }}>Let's build something amazing</h3>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, marginBottom: 36, textAlign: "center" }}>Whether you have a project in mind, an opportunity to share, or just want to connect — my inbox is always open.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
            {[
              { icon: "📧", label: "Email", val: "laseyash205@gmail.com", href: "mailto:laseyash205@gmail.com" },
              { icon: "📞", label: "Phone", val: "+91 9922569337", href: "tel:+919922569337" },
              { icon: "🔗", label: "LinkedIn", val: "yash-lase-117723232", href: "https://www.linkedin.com/in/yash-lase-117723232/" },
              { icon: "🐙", label: "GitHub", val: "github.com/yashlase21", href: "https://github.com/yashlase21" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 16, alignItems: "center", textDecoration: "none" }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: `${ACC}12`, border: `1px solid ${ACC}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 12, color: "#555", marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13.5, color: "#ccc", fontWeight: 500 }}>{c.val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1a1a1a", padding: "32px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>Yash<span style={{ color: ACC }}>.</span></div>
      <div style={{ fontSize: 13, color: "#444" }}>
        © {new Date().getFullYear()} <span style={{ color: ACC }}>Yash Lase</span>. All rights reserved.
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {SOCIAL.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-icon" title={s.label}>
            {s.svg}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ---- App ----
export default function App() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <GlobalStyles />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
