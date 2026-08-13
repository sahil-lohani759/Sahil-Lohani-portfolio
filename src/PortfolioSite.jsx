import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* =========================================================
   SHARED DATA
========================================================= */

const CHECKPOINTS = [
  { t: 0.1, icon: "education", side: "right", eyebrow: "2021 — 2027", title: "Education",
    lines: ["M.B.A. Marketing Management — DPGU School of Management & Research (2025–2027), CGPA 7.59",
            "B.Com. Commerce — Delhi College of Arts & Commerce (2021–2024)"],
    tags: ["MBA", "B.Com"], active: false },
  { t: 0.26, icon: "founder", side: "left", eyebrow: "Jun 2024 — Present", title: "Thrift Cartell", sub: "Founder · Social Media / E-Commerce",
    lines: ["Ran end-to-end e-commerce operations, growing an organic Instagram-led brand from scratch.",
            "Designed 100+ visual assets in Canva; tracked CAC and margins in Excel to drive inventory calls."],
    tags: ["Entrepreneurship", "CRM", "Content"], active: false },
  { t: 0.46, icon: "wellness", side: "right", eyebrow: "Dec 2025 — Mar 2026", title: "Happy Living", sub: "Social Media Intern · Wellness / Fitness",
    lines: ["Built inbound campaigns reaching vulnerable populations with accessible mental-health content.",
            "Managed cross-functional remote work focused on community engagement."],
    tags: ["Video Editing", "Content Curation"], active: false },
  { t: 0.64, icon: "seo", side: "left", eyebrow: "Jun 2026 — Present", title: "Henry Harvin", sub: "SEO Intern · E-Learning / Edtech",
    lines: ["Runs technical + off-page SEO: sitemaps, metadata, backlinks, guest posting.",
            "Working on GEO/AEO — optimizing visibility inside AI-powered search results."],
    tags: ["SEO", "GEO", "AEO"], active: true },
  { t: 0.82, icon: "research", side: "right", eyebrow: "2025 — 2026", title: "Research & Projects",
    lines: ["Amazon return/refund delay study — 101 respondents, consumer-retention insights.",
            "Toyota SERVQUAL analysis · McDonald's retail ops study · HUL/FMCG desk research."],
    tags: ["Market Research", "Data Analysis"], active: false },
  { t: 0.97, icon: "certification", side: "left", eyebrow: "Certified", title: "Certifications", sub: "HubSpot Academy",
    lines: ["Digital Marketing Specialist Certificate", "Inbound Marketing Certificate"],
    tags: ["CRM", "SEM", "Automation"], active: false },
];

const SKILL_CATEGORIES = [
  { id: "marketing", label: "Marketing & Growth", color: "#ffb454",
    skills: [
      { name: "Social Media", blurb: "Grew Thrift Cartell through organic Instagram campaigns and brand storytelling." },
      { name: "Content Marketing", blurb: "Designed 100+ visual assets and used Instagram Insights to optimize performance." },
      { name: "Video Editing", blurb: "Produced and curated video content for Happy Living's wellness campaigns." },
      { name: "Canva", blurb: "Primary design tool for Thrift Cartell's visual identity — 100+ assets created." },
    ]},
  { id: "data", label: "Data & Research", color: "#7c6cff",
    skills: [
      { name: "Microsoft Excel", blurb: "Tracked CAC and profit margins to guide inventory decisions." },
      { name: "Market Research", blurb: "Led a 101-respondent study on Amazon return/refund delays and consumer retention." },
      { name: "Data Analysis", blurb: "Interpreted consumer behavior trends across research projects like Toyota's SERVQUAL study." },
      { name: "CRM", blurb: "Managed customer relationships and repeat-purchase tracking at Thrift Cartell." },
    ]},
  { id: "seo", label: "Technical SEO", color: "#5fd1c9",
    skills: [
      { name: "SEO", blurb: "Optimizing meta titles, sitemaps, and backlinks at Henry Harvin." },
      { name: "GEO / AEO", blurb: "Working on Generative & Answer Engine Optimization — visibility in AI search results." },
      { name: "Inbound Marketing", blurb: "HubSpot-certified; applied inbound techniques to reach audiences at Happy Living." },
    ]},
  { id: "ops", label: "Operations", color: "#e7e4d9",
    skills: [
      { name: "Inventory Management", blurb: "Informed stock decisions using CAC and margin data." },
      { name: "Entrepreneurship", blurb: "Founded and ran Thrift Cartell end-to-end since June 2024." },
      { name: "Communication", blurb: "Cross-functional remote collaboration across internships and team projects." },
    ]},
];

const EXPERIENCE = [
  { order: "01", company: "THRIFT CARTELL", role: "Founder", domain: "Social Media / E-Commerce", dates: "Jun 2024 — Present",
    tags: ["Entrepreneurship", "CRM", "Content Marketing"], color: "#ffb454",
    blurb: "Ran end-to-end e-commerce operations, designed 100+ visual assets in Canva, and tracked CAC and margins to guide inventory decisions.", live: false },
  { order: "02", company: "HAPPY LIVING", role: "Social Media Intern", domain: "Wellness / Fitness / Sports", dates: "Dec 2025 — Mar 2026",
    tags: ["Video Editing", "Content Curation"], color: "#5fd1c9",
    blurb: "Built inbound campaigns reaching vulnerable populations with accessible mental-health content, managing cross-functional remote work.", live: false },
  { order: "03", company: "HENRY HARVIN", role: "SEO Intern", domain: "E-Learning / Edtech", dates: "Jun 2026 — Present",
    tags: ["SEO", "GEO", "AEO"], color: "#7c6cff",
    blurb: "Running technical and off-page SEO — sitemaps, metadata, backlinks — while working on GEO/AEO to improve visibility in AI-powered search.", live: true },
];

const PROJECTS = [
  { id: "amazon", title: "Amazon Returns\n& Consumer Retention", category: "Market Research", dates: "Apr — May 2026",
    mentor: "Mr. Mayur Kamble", team: "Team of 1", tags: ["Market Research", "Consumer Behaviour", "Data Analysis"], color: "#ffb454",
    blurb: "Studied the impact of Amazon's return and refund delays on consumer retention — 101 survey respondents, analyzed in Excel, with data-driven recommendations for customer loyalty.",
    link: "https://drive.google.com/drive/folders/11iUi4rrqX51vOGcUjM8rw2LR3yWjX514?usp=sharing", chart: [0.4, 0.65, 0.5, 0.8, 0.6] },
  { id: "toyota", title: "Toyota\nService Market Analysis", category: "Customer Service", dates: "Feb — Mar 2026",
    mentor: "Prof. Harshali Bhalerao", team: "Team of 6", tags: ["Market Research", "Customer Service"], color: "#5fd1c9",
    blurb: "Applied the SERVQUAL model to show how Toyota's reliability, responsiveness, and service recovery build long-term customer trust and loyalty.",
    link: "https://drive.google.com/file/d/1eP_T7jja5SrBjwFOUey5gASWSaVxf1dl/view?usp=drive_link", chart: [0.7, 0.5, 0.75, 0.55, 0.85] },
  { id: "mcdonalds", title: "McDonald's\nRetail Analysis", category: "Market Analysis", dates: "Oct — Nov 2025",
    mentor: "Dr. Nilesh Patil", team: "Team of 8", tags: ["Market Analysis", "Market Research"], color: "#7c6cff",
    blurb: "Examined how the Wakad, Pune outlet blends global brand standards with local preferences — covering pricing, CRM, tech, and supply chain.",
    link: "https://drive.google.com/file/d/1Bh9gv0JRZLjWMFHwFUY06gPWT-_FlRQ3/view?usp=drive_link", chart: [0.55, 0.6, 0.4, 0.7, 0.9] },
  { id: "fmcg", title: "FMCG Industry\nDesk Research (HUL)", category: "White Paper", dates: "6 Authors",
    mentor: "Dr. Nilesh Patil", team: "6 Authors", tags: ["Market Analysis", "Market Research"], color: "#c9c6ba",
    blurb: "Analyzed Hindustan Unilever's five-year financials and brand trust against ITC and Nestlé, concluding that FMCG success hinges on financial discipline and consumer insight.",
    link: null, chart: [0.5, 0.55, 0.65, 0.7, 0.75] },
];

const BADGES = [
  { id: "dms", kind: "CERTIFICATION", label: "Digital Marketing Specialist", provider: "HubSpot Academy", date: "Certified · Jan 2027",
    tags: ["CRM", "SEO", "SEM", "Social Media Mgmt", "Content Strategy"], color: "#ffb454", radius: 2.1, speed: 0.18, phase: 0, height: 1.9 },
  { id: "inbound", kind: "CERTIFICATION", label: "Inbound Marketing", provider: "HubSpot Academy", date: "Certified · Feb 2028",
    tags: ["Marketing Automation", "Market Segmentation", "Marketing Strategy", "Content Strategy"], color: "#7c6cff", radius: 2.4, speed: -0.14, phase: 2.1, height: 2.5 },
  { id: "debate", kind: "ACHIEVEMENT", label: "Debate Competition — Winner", provider: "College · #1 Winner", date: "Achievement",
    tags: ["Communication", "Public Speaking"], color: "#5fd1c9", radius: 1.8, speed: 0.22, phase: 4.2, height: 1.5 },
  { id: "contact", kind: "CONTACT", label: "Let's Connect", provider: "sahillohaniworks@gmail.com", date: "+91 79036 57646",
    tags: [], color: "#e7e4d9", radius: 2.2, speed: -0.19, phase: 1.1, height: 2.1,
    email: "sahillohaniworks@gmail.com", phone: "+917903657646", location: "Pune, Maharashtra, India",
    linkedin: "https://www.linkedin.com/in/sahil-lohani-03bab6229",
    work: "https://drive.google.com/drive/folders/1IrV9eDaR4rp7vHPF3TEdO_Ef1JTsZ5ig" },
];

const SECTIONS_NAV = [
  { id: "path", label: "Path" },
  { id: "skills", label: "Skills" },
  { id: "storefront", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/* =========================================================
   SHARED CANVAS-TEXTURE HELPERS
========================================================= */

function makeCardTexture({ title, category, color, chart, w = 512, h = 640 }) {
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#12131e"; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.font = "600 20px 'Arial', sans-serif"; ctx.fillStyle = color; ctx.textBaseline = "top";
  ctx.fillText(category.toUpperCase(), 34, 40);
  ctx.font = "bold 34px 'Arial', sans-serif"; ctx.fillStyle = "#e7e4d9";
  title.split("\n").forEach((line, i) => ctx.fillText(line, 34, 90 + i * 44));
  const chartTop = h - 220, chartHeight = 140;
  const barWidth = (w - 100) / chart.length - 14;
  chart.forEach((v, i) => {
    const bx = 50 + i * (barWidth + 14), bh = chartHeight * v;
    ctx.fillStyle = color; ctx.globalAlpha = 0.85;
    ctx.fillRect(bx, chartTop + (chartHeight - bh), barWidth, bh);
    ctx.globalAlpha = 1;
  });
  ctx.strokeStyle = "rgba(139,143,163,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(50, chartTop + chartHeight); ctx.lineTo(w - 50, chartTop + chartHeight); ctx.stroke();
  ctx.font = "16px 'Arial', sans-serif"; ctx.fillStyle = "#8b8fa3"; ctx.fillText("click to flip →", 34, h - 46);
  const tex = new THREE.CanvasTexture(canvas); tex.needsUpdate = true;
  return tex;
}

function makeBackTexture({ mentor, team, dates, color, w = 512, h = 640 }) {
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#0d0e17"; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.strokeRect(10, 10, w - 20, h - 20);
  ctx.font = "600 18px 'Arial', sans-serif"; ctx.fillStyle = color; ctx.textBaseline = "top";
  ctx.fillText("PROJECT DETAIL", 34, 40);
  const rows = [["Mentor", mentor], ["Team", team], ["Timeline", dates]];
  rows.forEach((r, i) => {
    const y = 110 + i * 60;
    ctx.font = "16px 'Arial', sans-serif"; ctx.fillStyle = "#8b8fa3"; ctx.fillText(r[0].toUpperCase(), 34, y);
    ctx.font = "bold 22px 'Arial', sans-serif"; ctx.fillStyle = "#e7e4d9"; ctx.fillText(r[1], 34, y + 24);
  });
  ctx.font = "16px 'Arial', sans-serif"; ctx.fillStyle = "#8b8fa3"; ctx.fillText("↓ full detail below", 34, h - 46);
  const tex = new THREE.CanvasTexture(canvas); tex.needsUpdate = true;
  return tex;
}

function buildUFO(color) {
  const group = new THREE.Group();

  const bodyGeo = new THREE.SphereGeometry(0.55, 24, 12);
  const bodyMat = new THREE.MeshStandardMaterial({ color: "#8b8fa3", metalness: 0.7, roughness: 0.25 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.y = 0.28;
  group.add(body);

  const domeGeo = new THREE.SphereGeometry(0.32, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.55, emissive: color, emissiveIntensity: 0.5, roughness: 0.15, metalness: 0.1 });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 0.06;
  group.add(dome);

  const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.05, 12, 32), new THREE.MeshStandardMaterial({ color: "#e7e4d9", metalness: 0.8, roughness: 0.3 }));
  ringMesh.rotation.x = Math.PI / 2;
  group.add(ringMesh);

  const lightBulbs = [];
  const bulbCount = 8;
  for (let i = 0; i < bulbCount; i++) {
    const a = (i / bulbCount) * Math.PI * 2;
    const bulbMat = new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 1 });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), bulbMat);
    bulb.position.set(Math.cos(a) * 0.56, -0.02, Math.sin(a) * 0.56);
    group.add(bulb);
    lightBulbs.push({ mesh: bulb, mat: bulbMat, phase: a });
  }

  const hitGeo = new THREE.SphereGeometry(0.7, 12, 12);
  const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
  const hitbox = new THREE.Mesh(hitGeo, hitMat);
  group.add(hitbox);

  const beamHeight = 3.2;
  const beamGeo = new THREE.CylinderGeometry(0.06, 0.55, beamHeight, 20, 1, true);
  beamGeo.translate(0, -beamHeight / 2, 0);
  const beamMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
  const beamMesh = new THREE.Mesh(beamGeo, beamMat);
  beamMesh.position.y = -0.15;
  beamMesh.scale.y = 0.001;
  group.add(beamMesh);

  const beamLight = new THREE.PointLight(color, 0, 4);
  beamLight.position.y = -1.5;
  group.add(beamLight);

  return { group, hitbox, beamMesh, beamMat, beamLight, lightBulbs };
}

/* small hook: pause heavy work when a section scrolls off-screen */
function makeIDCardTexture(company, role, dates, color, w = 420, h = 580) {
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#292b38";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = color; ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, w - 6, h - 6);

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, 96);

  ctx.fillStyle = "#0a0a12";
  ctx.beginPath(); ctx.ellipse(w / 2, 40, 28, 10, 0, 0, Math.PI * 2); ctx.fill();

  const initials = company.split(" ").map((s) => s[0]).slice(0, 2).join("");
  ctx.fillStyle = "#0d0e17";
  ctx.fillRect(40, 140, 130, 130);
  ctx.strokeStyle = color; ctx.lineWidth = 3;
  ctx.strokeRect(40, 140, 130, 130);
  ctx.fillStyle = color;
  ctx.font = "bold 54px 'Arial', sans-serif";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(initials, 105, 210);

  ctx.textAlign = "left";
  ctx.fillStyle = "#e7e4d9";
  ctx.font = "bold 30px 'Arial', sans-serif";
  const words = company.split(" ");
  let lines = [], cur = "";
  words.forEach((word) => {
    const test = cur ? cur + " " + word : word;
    if (ctx.measureText(test).width > 220 && cur) { lines.push(cur); cur = word; } else cur = test;
  });
  if (cur) lines.push(cur);
  lines.slice(0, 2).forEach((line, i) => ctx.fillText(line, 190, 175 + i * 36));

  ctx.fillStyle = "#8b8fa3";
  ctx.font = "20px 'Arial', sans-serif";
  ctx.fillText(role, 190, 175 + lines.length * 36 + 14);

  ctx.fillStyle = color;
  ctx.font = "16px 'Arial', sans-serif";
  ctx.fillText("EMPLOYEE ACCESS", 40, 320);

  ctx.fillStyle = "#8b8fa3";
  ctx.font = "18px 'Arial', sans-serif";
  ctx.fillText(dates, 40, 350);

  let bx = 40;
  const barcodeY = h - 90;
  while (bx < w - 40) {
    const bw = 2 + Math.random() * 6;
    ctx.fillStyle = Math.random() > 0.5 ? "#c9c6ba" : "#4a4d5c";
    ctx.fillRect(bx, barcodeY, bw, 50);
    bx += bw + 3;
  }
  ctx.fillStyle = "#8b8fa3";
  ctx.font = "14px 'Arial', sans-serif";
  ctx.fillText("click to present badge", 40, h - 24);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createStarfield(count = 180, spread = 22, color = "#ffffff", size = 0.03) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread * 2;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.4;
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 2 - spread * 0.3;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  return new THREE.Points(geo, mat);
}

function makeGlowTexture(color) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.4, color);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function addNebulaGlows(scene, colors, spread = 14) {
  colors.forEach((color, i) => {
    const tex = makeGlowTexture(color);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    const scale = 7 + i * 2.5;
    sprite.scale.set(scale, scale, 1);
    const angle = (i / colors.length) * Math.PI * 2 + 0.6;
    sprite.position.set(Math.cos(angle) * spread * 0.5, (i % 2 === 0 ? 1 : -1) * 2.5, -spread * 0.6 - i * 2);
    scene.add(sprite);
  });
}


function createCheckpointIcon(type, color) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.65, roughness: 0.4, metalness: 0.15 });
  const paleMat = new THREE.MeshStandardMaterial({ color: "#e7e4d9", roughness: 0.55, metalness: 0.1 });

  if (type === "education") {
    const pageGeo = new THREE.BoxGeometry(0.52, 0.028, 0.38);
    const left = new THREE.Mesh(pageGeo, paleMat);
    left.position.x = -0.25; left.rotation.z = 0.34; left.rotation.y = 0.1;
    const right = new THREE.Mesh(pageGeo, paleMat);
    right.position.x = 0.25; right.rotation.z = -0.34; right.rotation.y = -0.1;
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.075, 0.39), mat);
    group.add(left, right, spine);
  } else if (type === "founder") {
    // trophy: cup + handles + stem + base
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.11, 0.26, 20), mat);
    cup.position.y = 0.2;
    group.add(cup);

    const handleGeo = new THREE.TorusGeometry(0.095, 0.022, 8, 16, Math.PI * 1.1);
    const handleL = new THREE.Mesh(handleGeo, mat);
    handleL.position.set(-0.215, 0.2, 0);
    handleL.rotation.set(0, Math.PI / 2, -Math.PI / 2 + 0.2);
    const handleR = new THREE.Mesh(handleGeo, mat);
    handleR.position.set(0.215, 0.2, 0);
    handleR.rotation.set(0, Math.PI / 2, Math.PI / 2 - 0.2);
    group.add(handleL, handleR);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.055, 0.16, 12), mat);
    stem.position.y = 0.01;
    group.add(stem);

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.055, 0.18), mat);
    base.position.y = -0.09;
    group.add(base);
  } else if (type === "wellness") {
    // hashtag — Happy Living was a social-media role
    const barH = new THREE.BoxGeometry(0.46, 0.065, 0.065);
    const barV = new THREE.BoxGeometry(0.065, 0.46, 0.065);
    const h1 = new THREE.Mesh(barH, mat); h1.position.y = 0.09;
    const h2 = new THREE.Mesh(barH, mat); h2.position.y = -0.09;
    const v1 = new THREE.Mesh(barV, mat); v1.position.x = -0.09;
    const v2 = new THREE.Mesh(barV, mat); v2.position.x = 0.09;
    group.add(h1, h2, v1, v2);
  } else if (type === "seo") {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 12, 28), mat);
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.34, 10), mat);
    handle.position.set(0.2, -0.2, 0); handle.rotation.z = Math.PI / 4;
    group.add(ring, handle);
  } else if (type === "research") {
    const heights = [0.2, 0.34, 0.26];
    heights.forEach((h, i) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.1, h, 0.1), mat);
      bar.position.set((i - 1) * 0.15, h / 2 - 0.16, 0);
      group.add(bar);
    });
  } else if (type === "certification") {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.045, 24), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.75, metalness: 0.6, roughness: 0.25 }));
    disc.rotation.x = Math.PI / 2;
    const ribbonGeo = new THREE.BoxGeometry(0.055, 0.32, 0.02);
    const ribbonL = new THREE.Mesh(ribbonGeo, paleMat); ribbonL.position.set(-0.06, -0.28, 0); ribbonL.rotation.z = 0.16;
    const ribbonR = new THREE.Mesh(ribbonGeo, paleMat); ribbonR.position.set(0.06, -0.28, 0); ribbonR.rotation.z = -0.16;
    group.add(disc, ribbonL, ribbonR);
  }

  return group;
}

function useVisible(ref) {
  const visibleRef = useRef(true);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting; }, { threshold: 0.05 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return visibleRef;
}

/* =========================================================
   SECTION 1 — GROWTH PATH (scroll-driven camera)
========================================================= */

function GrowthPathSection() {
  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const scrollRef = useRef({ t: 0 });
  const panelRefs = useRef([]);
  const dotRef = useRef(null);
  const heroRef = useRef(null);
  const visibleRef = useVisible(wrapperRef);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth, height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0c16");
    scene.fog = new THREE.FogExp2("#0a0c16", 0.028);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight("#2a2450", 1.1));
    const pointLight = new THREE.PointLight("#ffb454", 3, 30);
    scene.add(pointLight);
    const rim = new THREE.DirectionalLight("#7c6cff", 0.6);
    rim.position.set(-5, 8, 5);
    scene.add(rim);

    const anchors = [
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(2.5, 1.2, -6), new THREE.Vector3(-2, 2.6, -13),
      new THREE.Vector3(2.8, 4.2, -20), new THREE.Vector3(-2.4, 5.8, -27), new THREE.Vector3(1.6, 7.4, -34),
      new THREE.Vector3(0, 9, -40),
    ];
    const curve = new THREE.CatmullRomCurve3(anchors, false, "catmullrom", 0.4);

    const tubeGeo = new THREE.TubeGeometry(curve, 300, 0.22, 10, false);
    const tubeMat = new THREE.MeshStandardMaterial({ color: "#ffb454", emissive: "#ffb454", emissiveIntensity: 0.9, metalness: 0.2, roughness: 0.4 });
    scene.add(new THREE.Mesh(tubeGeo, tubeMat));

    const glowGeo = new THREE.TubeGeometry(curve, 300, 0.45, 10, false);
    const glowMat = new THREE.MeshBasicMaterial({ color: "#ffb454", transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    const markers = CHECKPOINTS.map((cp, cpIndex) => {
      const pos = curve.getPointAt(cp.t);
      const tangent = curve.getTangentAt(cp.t).normalize();
      const side = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
      if (side.lengthSq() < 0.01) side.set(1, 0, 0);
      const sideMultiplier = cpIndex % 2 === 0 ? 1 : -1;
      const offsetPos = pos.clone().add(side.clone().multiplyScalar(1.1 * sideMultiplier)).add(new THREE.Vector3(0, 0.35, 0));

      const color = cp.active ? "#7c6cff" : "#ffb454";

      // dark backing disc so the icon reads clearly even against the bright tube glow
      const backingMat = new THREE.MeshBasicMaterial({ color: "#0a0a12", transparent: true, opacity: 0.75, depthWrite: false });
      const backing = new THREE.Mesh(new THREE.CircleGeometry(0.5, 32), backingMat);
      backing.position.copy(offsetPos);
      backing.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent.clone().negate());
      scene.add(backing);

      const icon = createCheckpointIcon(cp.icon, color);
      icon.scale.setScalar(cp.active ? 2.0 : 1.7);
      icon.position.copy(offsetPos);
      icon.quaternion.copy(backing.quaternion);
      scene.add(icon);

      const glowMat = new THREE.SpriteMaterial({ map: makeGlowTexture(color), transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(0.95, 0.95, 0.95);
      glow.position.copy(offsetPos);
      scene.add(glow);

      // thin connector line back to the path so the icon still reads as "on" the route
      const connectorGeo = new THREE.BufferGeometry().setFromPoints([pos, offsetPos]);
      const connectorMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
      scene.add(new THREE.Line(connectorGeo, connectorMat));

      return { mesh: icon, glow, backing, t: cp.t };
    });

    // ambient drifting motes for liveliness, especially noticeable on the still opening frame
    const moteCount = 110;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    const moteSpeed = new Float32Array(moteCount);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 14;
      motePos[i * 3 + 1] = Math.random() * 8 - 1;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 10 + 2;
      moteSpeed[i] = 0.002 + Math.random() * 0.004;
    }
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({ color: "#ffb454", size: 0.045, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    scene.add(createStarfield(200, 26, "#ffffff", 0.03));
    addNebulaGlows(scene, ["#ffb454", "#7c6cff"], 20);

    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      scrollRef.current.t = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let raf;
    let lastActive = -1;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      const elapsed = clock.getElapsedTime();
      const t = scrollRef.current.t;

      const camT = Math.min(t * 0.98, 0.985);
      const lookT = Math.min(camT + 0.02, 1);
      const camPoint = curve.getPointAt(camT);
      const lookPoint = curve.getPointAt(lookT);

      const idleBobX = Math.sin(elapsed * 0.35) * 0.06;
      const idleBobY = Math.sin(elapsed * 0.5) * 0.05;
      camera.position.set(camPoint.x + idleBobX, camPoint.y + 1.1 + idleBobY, camPoint.z + 2.4);
      camera.lookAt(lookPoint.x, lookPoint.y + 0.4, lookPoint.z);
      pointLight.position.set(camPoint.x, camPoint.y + 2, camPoint.z);
      pointLight.intensity = 2.6 + Math.sin(elapsed * 1.4) * 0.5;

      markers.forEach((m, i) => {
        const dist = Math.abs(t - m.t);
        const baseScale = CHECKPOINTS[i].active ? 2.0 : 1.7;
        const pulse = CHECKPOINTS[i].active ? 1 + Math.sin(elapsed * 2.2) * 0.12 : dist < 0.05 ? 1 + Math.sin(elapsed * 4) * 0.15 : 1;
        m.mesh.scale.setScalar(baseScale * pulse);
        m.mesh.rotation.y += 0.004;
        m.glow.material.opacity = 0.35 + Math.sin(elapsed * 1.6 + i) * 0.1;
        const panel = panelRefs.current[i];
        if (panel) {
          const opacity = Math.max(0, 1 - dist / 0.05);
          panel.style.opacity = opacity.toFixed(2);
          panel.style.transform = `translateY(${(1 - opacity) * 16}px)`;
          panel.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
        }
      });

      let nearestIdx = -1, nearestDist = Infinity;
      CHECKPOINTS.forEach((cp, i) => {
        const d = Math.abs(t - cp.t);
        if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
      });
      if (nearestDist < 0.05 && nearestIdx !== lastActive) lastActive = nearestIdx;
      else if (nearestDist >= 0.05 && lastActive !== -1) lastActive = -1;

      for (let i = 0; i < moteCount; i++) {
        motePos[i * 3 + 1] += moteSpeed[i];
        if (motePos[i * 3 + 1] > 8) motePos[i * 3 + 1] = -1;
      }
      moteGeo.attributes.position.needsUpdate = true;

      if (dotRef.current) dotRef.current.style.top = `${t * 100}%`;

      if (heroRef.current) {
        const heroOpacity = Math.max(0, 1 - t / 0.022);
        heroRef.current.style.opacity = heroOpacity.toFixed(2);
        heroRef.current.style.transform = `translate(-50%, calc(-50% - ${t * 260}px))`;
        heroRef.current.style.pointerEvents = "none";
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="section-path" data-section-id="path" className="site-section" ref={wrapperRef} style={{ position: "relative", height: "650vh", background: "#0a0c16" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div ref={heroRef} style={styles.hero}>
          <div style={styles.heroName}>Sahil Lohani</div>
          <div style={styles.heroRole}>Founder · Marketing &amp; Growth Strategist</div>
          <div style={styles.heroTagline}>The Growth Path</div>
          <div style={styles.heroSub}>Scroll to travel the route — MBA to founder to SEO strategist.</div>
          <div style={styles.scrollHint}>↓ scroll</div>
        </div>

        <div ref={mountRef} style={styles.canvasMount} />

        <div style={styles.minimap}>
          <div style={styles.minimapTrack}><div ref={dotRef} style={styles.minimapDot} /></div>
        </div>

        {CHECKPOINTS.map((cp, i) => (
          <div key={cp.title} ref={(el) => (panelRefs.current[i] = el)}
            style={{ ...styles.panel, ...(cp.side === "left" ? styles.panelLeft : styles.panelRight), opacity: 0 }}>
            <div style={styles.panelEyebrow}>{cp.eyebrow}</div>
            <div style={styles.panelTitle}>{cp.title}{cp.active && <span style={styles.liveDot} />}</div>
            {cp.sub && <div style={styles.panelSub}>{cp.sub}</div>}
            <div style={styles.panelBody}>{cp.lines.map((l, li) => <p key={li} style={styles.panelLine}>{l}</p>)}</div>
            <div style={styles.tagRow}>{cp.tags.map((t) => <span key={t} style={styles.tag}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SECTION 2 — SKILLS CONSTELLATION
========================================================= */

function SkillsSection() {
  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const categoryLabelRefs = useRef({});
  const visibleRef = useVisible(wrapperRef);

  const stateRef = useRef({ mouse: new THREE.Vector2(-10, -10), dragging: false, lastX: 0, lastY: 0, rotY: 0, rotX: -0.15, velY: 0.0009 });

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth, height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0c16");
    scene.fog = new THREE.FogExp2("#0a0c16", 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight("#2a2450", 1.2));
    const key = new THREE.PointLight("#ffffff", 2, 40);
    key.position.set(0, 4, 10);
    scene.add(key);
    const fillLight = new THREE.PointLight("#7c6cff", 1, 30);
    fillLight.position.set(-6, -3, 6);
    scene.add(fillLight);

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    const hubGeo = new THREE.IcosahedronGeometry(0.55, 3);
    const hubMat = new THREE.MeshStandardMaterial({ color: "#e7e4d9", emissive: "#e7e4d9", emissiveIntensity: 0.5, roughness: 0.45, metalness: 0.1 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    graphGroup.add(hub);

    const hubWireGeo = new THREE.IcosahedronGeometry(0.72, 1);
    const hubWireMat = new THREE.MeshBasicMaterial({ color: "#ffb454", wireframe: true, transparent: true, opacity: 0.35 });
    const hubWire = new THREE.Mesh(hubWireGeo, hubWireMat);
    graphGroup.add(hubWire);

    const hubRingGeo = new THREE.TorusGeometry(1.05, 0.012, 8, 64);
    const hubRingMat = new THREE.MeshBasicMaterial({ color: "#7c6cff", transparent: true, opacity: 0.5 });
    const hubRing = new THREE.Mesh(hubRingGeo, hubRingMat);
    hubRing.rotation.x = Math.PI / 2.4;
    graphGroup.add(hubRing);
    const hubRing2 = new THREE.Mesh(hubRingGeo.clone(), new THREE.MeshBasicMaterial({ color: "#ffb454", transparent: true, opacity: 0.35 }));
    hubRing2.rotation.x = Math.PI / 1.6;
    hubRing2.rotation.y = 0.6;
    graphGroup.add(hubRing2);

    const electrons = [];
    for (let i = 0; i < 3; i++) {
      const eGeo = new THREE.SphereGeometry(0.05, 10, 10);
      const eMat = new THREE.MeshStandardMaterial({ color: "#ffb454", emissive: "#ffb454", emissiveIntensity: 1.2 });
      const eMesh = new THREE.Mesh(eGeo, eMat);
      graphGroup.add(eMesh);
      electrons.push({ mesh: eMesh, radius: 1.05 + i * 0.02, speed: 0.7 + i * 0.35, tilt: (i / 3) * Math.PI, phase: i * 2.1 });
    }

    const clickable = [{ mesh: hub, data: { type: "hub", name: "Sahil Lohani", blurb: "MBA candidate blending formal marketing education with hands-on founder experience." } }];
    const categoryMeshes = [];

    const R1 = 4.2;
    SKILL_CATEGORIES.forEach((cat, ci) => {
      const angle = (ci / SKILL_CATEGORIES.length) * Math.PI * 2;
      const catPos = new THREE.Vector3(Math.cos(angle) * R1, Math.sin(angle * 1.3) * 0.9, Math.sin(angle) * R1);

      const catGeo = new THREE.IcosahedronGeometry(0.32, 2);
      const catMat = new THREE.MeshStandardMaterial({ color: cat.color, emissive: cat.color, emissiveIntensity: 0.6, roughness: 0.5, metalness: 0.1 });
      const catMesh = new THREE.Mesh(catGeo, catMat);
      catMesh.position.copy(catPos);
      graphGroup.add(catMesh);
      clickable.push({ mesh: catMesh, data: { type: "category", name: cat.label, blurb: `${cat.skills.length} skills`, color: cat.color } });
      categoryMeshes.push({ mesh: catMesh, id: cat.id, name: cat.label, color: cat.color });

      const catWireGeo = new THREE.IcosahedronGeometry(0.42, 0);
      const catWireMat = new THREE.MeshBasicMaterial({ color: cat.color, wireframe: true, transparent: true, opacity: 0.4 });
      const catWire = new THREE.Mesh(catWireGeo, catWireMat);
      catWire.position.copy(catPos);
      graphGroup.add(catWire);
      categoryMeshes[categoryMeshes.length - 1].wire = catWire;

      const glowSpriteMat = new THREE.SpriteMaterial({ color: new THREE.Color(cat.color), transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false });
      const glowSprite = new THREE.Sprite(glowSpriteMat);
      glowSprite.scale.set(1.4, 1.4, 1.4);
      glowSprite.position.copy(catPos);
      graphGroup.add(glowSprite);

      const lineGeo1 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), catPos]);
      const lineMat1 = new THREE.LineBasicMaterial({ color: cat.color, transparent: true, opacity: 0.3 });
      graphGroup.add(new THREE.Line(lineGeo1, lineMat1));

      cat.skills.forEach((skill, si) => {
        const skillAngle = angle + (si - (cat.skills.length - 1) / 2) * 0.5;
        const skillRadius = 1.9;
        const skillPos = new THREE.Vector3(
          catPos.x + Math.cos(skillAngle) * skillRadius,
          catPos.y + (si % 2 === 0 ? 0.5 : -0.5) + Math.sin(skillAngle * 2) * 0.4,
          catPos.z + Math.sin(skillAngle) * skillRadius
        );
        const skillGeo = new THREE.IcosahedronGeometry(0.16, 1);
        const skillMat = new THREE.MeshStandardMaterial({ color: "#c9c6ba", emissive: cat.color, emissiveIntensity: 0.3, roughness: 0.55, metalness: 0.05 });
        const skillMesh = new THREE.Mesh(skillGeo, skillMat);
        skillMesh.position.copy(skillPos);
        graphGroup.add(skillMesh);
        const skillId = cat.id + "-" + skill.name;
        clickable.push({ mesh: skillMesh, data: { type: "skill", id: skillId, name: skill.name, blurb: skill.blurb, color: cat.color } });

        const lineGeo2 = new THREE.BufferGeometry().setFromPoints([catPos, skillPos]);
        const lineMat2 = new THREE.LineBasicMaterial({ color: cat.color, transparent: true, opacity: 0.22 });
        graphGroup.add(new THREE.Line(lineGeo2, lineMat2));
      });
    });

    const moteCount = 90;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 16;
      motePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({ color: "#8b8fa3", size: 0.03, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    scene.add(createStarfield(160, 20, "#ffffff", 0.028));
    addNebulaGlows(scene, ["#ffb454", "#7c6cff", "#5fd1c9"], 16);

    graphGroup.rotation.x = stateRef.current.rotX;

    const dom = renderer.domElement;
    const onPointerDown = (e) => { stateRef.current.dragging = true; stateRef.current.lastX = e.clientX; stateRef.current.lastY = e.clientY; };
    const onPointerUp = () => (stateRef.current.dragging = false);
    const onPointerMove = (e) => {
      const rect = dom.getBoundingClientRect();
      stateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (stateRef.current.dragging) {
        const dx = e.clientX - stateRef.current.lastX, dy = e.clientY - stateRef.current.lastY;
        stateRef.current.rotY += dx * 0.005;
        stateRef.current.rotX = Math.max(-0.9, Math.min(0.9, stateRef.current.rotX + dy * 0.005));
        stateRef.current.lastX = e.clientX; stateRef.current.lastY = e.clientY;
        stateRef.current.velY = dx * 0.0002;
      }
    };
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const raycaster = new THREE.Raycaster();
    let raf;
    const clock = new THREE.Clock();
    let hoveredMesh = null;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      const t = clock.getElapsedTime();

      if (!stateRef.current.dragging) {
        stateRef.current.rotY += stateRef.current.velY;
        stateRef.current.velY *= 0.98;
        stateRef.current.rotY += 0.0009;
      }
      graphGroup.rotation.y = stateRef.current.rotY;
      graphGroup.rotation.x = stateRef.current.rotX;

      hub.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
      hubMat.emissiveIntensity = 0.45 + Math.sin(t * 1.2) * 0.15;
      hubWire.rotation.y += 0.003;
      hubWire.rotation.x += 0.0015;
      hubRing.rotation.z += 0.004;
      hubRing2.rotation.z -= 0.003;
      electrons.forEach((e) => {
        const a = t * e.speed + e.phase;
        e.mesh.position.set(
          Math.cos(a) * e.radius,
          Math.sin(a) * e.radius * Math.sin(e.tilt),
          Math.sin(a) * e.radius * Math.cos(e.tilt)
        );
      });
      categoryMeshes.forEach((c, i) => {
        c.mesh.material.emissiveIntensity = 0.5 + Math.sin(t * 1.4 + i * 1.1) * 0.2;
        if (c.wire) { c.wire.rotation.y += 0.006; c.wire.rotation.x += 0.003; }
      });

      for (let i = 0; i < moteCount; i++) {
        motePos[i * 3 + 1] += 0.002;
        if (motePos[i * 3 + 1] > 6) motePos[i * 3 + 1] = -6;
      }
      moteGeo.attributes.position.needsUpdate = true;

      categoryMeshes.forEach((c) => {
        const labelEl = categoryLabelRefs.current[c.id];
        if (!labelEl) return;
        const worldPos = c.mesh.getWorldPosition(new THREE.Vector3());
        worldPos.y += 0.45;
        const proj = worldPos.clone().project(camera);
        const rect = dom.getBoundingClientRect();
        const sx = (proj.x * 0.5 + 0.5) * rect.width;
        const sy = (-proj.y * 0.5 + 0.5) * rect.height;
        const behind = proj.z > 1;
        labelEl.style.left = sx + "px";
        labelEl.style.top = sy + "px";
        labelEl.style.opacity = behind ? "0" : "0.95";
      });

      raycaster.setFromCamera(stateRef.current.mouse, camera);
      const meshes = clickable.map((c) => c.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const found = clickable.find((c) => c.mesh === intersects[0].object);
        if (found && found.mesh !== hoveredMesh) { hoveredMesh = found.mesh; setHovered(found.data); dom.style.cursor = "pointer"; }
        const vector = intersects[0].object.getWorldPosition(new THREE.Vector3()).project(camera);
        const rect = dom.getBoundingClientRect();
        setTooltipPos({ x: (vector.x * 0.5 + 0.5) * rect.width, y: (-vector.y * 0.5 + 0.5) * rect.height });
      } else if (hoveredMesh) { hoveredMesh = null; setHovered(null); dom.style.cursor = "grab"; }

      renderer.render(scene, camera);
    };
    animate();

    const onClick = () => {
      if (hoveredMesh) {
        const found = clickable.find((c) => c.mesh === hoveredMesh);
        setSelected(found ? found.data : null);
      }
    };
    dom.addEventListener("click", onClick);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("click", onClick);
      mount.removeChild(dom);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="section-skills" data-section-id="skills" className="site-section" ref={wrapperRef} style={styles.page}>
      <div style={styles.header}>
        <div style={styles.mono}>02 — KEY EXPERTISE</div>
        <div style={styles.title}>Skills Constellation</div>
        <div style={styles.sub}>Drag to rotate · hover a sub-skill · click for detail</div>
      </div>
      <div ref={mountRef} style={styles.canvasMount} />
      {SKILL_CATEGORIES.map((cat) => (
        <div key={cat.id} ref={(el) => (categoryLabelRefs.current[cat.id] = el)} style={{ ...styles.skillLabel, color: cat.color, borderColor: cat.color }}>
          {cat.label}
        </div>
      ))}
      {hovered && !selected && (
        <div style={{ ...styles.tooltip, left: tooltipPos.x, top: tooltipPos.y }}>{hovered.name}</div>
      )}
      {selected && (
        <div style={styles.detailPanel}>
          <button style={styles.closeBtn} onClick={() => setSelected(null)}>×</button>
          <div style={{ ...styles.detailEyebrow, color: selected.color || "#ffb454" }}>
            {selected.type === "hub" ? "PROFILE" : selected.type === "category" ? "CATEGORY" : "SKILL"}
          </div>
          <div style={styles.detailTitle}>{selected.name}</div>
          <p style={styles.detailBlurb}>{selected.blurb}</p>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SECTION 3 — STOREFRONT ROW (experience)
========================================================= */

function StorefrontSection() {
  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const hoveredIdxRef = useRef(null);
  const selectedIdxRef = useRef(null);
  const visibleRef = useVisible(wrapperRef);
  const stateRef = useRef({ mouse: new THREE.Vector2(-10, -10) });

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth, height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0c16");
    scene.fog = new THREE.FogExp2("#0a0c16", 0.04);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 8.5);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight("#2a2450", "#0a0c16", 0.9));
    const key = new THREE.DirectionalLight("#fff2df", 0.8);
    key.position.set(3, 6, 6);
    scene.add(key);
    const fill = new THREE.PointLight("#7c6cff", 0.8, 20);
    fill.position.set(-4, 1, 4);
    scene.add(fill);

    const rig = new THREE.Group();
    scene.add(rig);

    // rack bar the badges hang from
    const rackWidth = (EXPERIENCE.length - 1) * 2.7 + 2;
    const rackGeo = new THREE.CylinderGeometry(0.05, 0.05, rackWidth, 12);
    const rackMat = new THREE.MeshStandardMaterial({ color: "#2a2c3a", roughness: 0.4, metalness: 0.8 });
    const rack = new THREE.Mesh(rackGeo, rackMat);
    rack.rotation.z = Math.PI / 2;
    rack.position.y = 2.3;
    rig.add(rack);

    // ambient dust for atmosphere
    const moteCount = 70;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 12;
      motePos[i * 3 + 1] = Math.random() * 4 - 1;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({ color: "#8b8fa3", size: 0.03, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false });
    scene.add(new THREE.Points(moteGeo, moteMat));

    scene.add(createStarfield(150, 18, "#ffffff", 0.028));
    addNebulaGlows(scene, ["#7c6cff", "#ffb454"], 14);

    const badges = [];
    EXPERIENCE.forEach((exp, i) => {
      const x = (i - (EXPERIENCE.length - 1) / 2) * 2.7;

      // pivot sits at the rack attachment point; the whole assembly swings from here
      const pivot = new THREE.Group();
      pivot.position.set(x, 2.3, 0);
      rig.add(pivot);

      const clipGeo = new THREE.TorusGeometry(0.09, 0.025, 8, 16);
      const clipMat = new THREE.MeshStandardMaterial({ color: exp.live ? "#7c6cff" : "#8b8fa3", metalness: 0.8, roughness: 0.3 });
      const clip = new THREE.Mesh(clipGeo, clipMat);
      pivot.add(clip);

      const strapGeo = new THREE.BoxGeometry(0.1, 1.1, 0.02);
      const strapMat = new THREE.MeshStandardMaterial({ color: exp.color, roughness: 0.6 });
      const strap = new THREE.Mesh(strapGeo, strapMat);
      strap.position.y = -0.55;
      pivot.add(strap);

      const cardGroup = new THREE.Group();
      cardGroup.position.y = -1.85;
      pivot.add(cardGroup);

      const cardTex = makeIDCardTexture(exp.company, exp.role, exp.dates, exp.color);
     const cardMat = new THREE.MeshBasicMaterial({
  map: cardTex
});
      const cardGeo = new THREE.BoxGeometry(1.45, 2.0, 0.05);
      const card = new THREE.Mesh(cardGeo, cardMat);
      cardGroup.add(card);

      const edgeGlowGeo = new THREE.BoxGeometry(1.53, 2.08, 0.03);
      const edgeGlowMat = new THREE.MeshStandardMaterial({ color: exp.color, emissive: exp.color, emissiveIntensity: exp.live ? 0.9 : 0.4, transparent: true, opacity: 0.5 });
      const edgeGlow = new THREE.Mesh(edgeGlowGeo, edgeGlowMat);
      edgeGlow.position.z = -0.03;
      cardGroup.add(edgeGlow);

      badges.push({
        pivot, cardGroup, edgeGlowMat, data: exp, index: i,
        swingPhase: i * 1.7, swingSpeed: 0.9 + i * 0.15,
        basePivotPos: pivot.position.clone(),
      });
    });

    const dom = renderer.domElement;
    const onPointerMove = (e) => {
      const rect = dom.getBoundingClientRect();
      stateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    const raycaster = new THREE.Raycaster();
    let hoveredMesh = null;
    const onClick = () => {
      if (hoveredMesh) {
        const found = badges.find((b) => b.cardGroup.children[0] === hoveredMesh);
        if (found) {
          const next = selectedIdxRef.current === found.index ? null : found.index;
          selectedIdxRef.current = next;
          setSelected(next === null ? null : found.data);
        }
      }
    };
    dom.addEventListener("click", onClick);

    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      const t = clock.getElapsedTime();

      badges.forEach((b) => {
        const isSelected = selectedIdxRef.current === b.index;
        const isHovered = hoveredIdxRef.current === b.index;
        const damping = isSelected || isHovered ? 0.15 : 1;
        const swingAngle = Math.sin(t * b.swingSpeed + b.swingPhase) * 0.12 * damping;
        b.pivot.rotation.z = swingAngle;

        if (isSelected) {
          b.pivot.position.lerp(new THREE.Vector3(b.basePivotPos.x * 0.3, 2.6, 2.2), 0.09);
        } else {
          b.pivot.position.lerp(b.basePivotPos, 0.09);
        }

        const targetGlow = isSelected ? 1.1 : b.data.live ? 0.7 + Math.sin(t * 3) * 0.2 : isHovered ? 0.8 : 0.4;
        b.edgeGlowMat.emissiveIntensity += (targetGlow - b.edgeGlowMat.emissiveIntensity) * 0.1;

        const targetScale = isSelected ? 1.25 : isHovered ? 1.08 : 1;
        b.cardGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      });

      raycaster.setFromCamera(stateRef.current.mouse, camera);
      const meshes = badges.map((b) => b.cardGroup.children[0]);
      const intersects = raycaster.intersectObjects(meshes, false);
      if (intersects.length > 0) {
        hoveredMesh = intersects[0].object;
        const found = badges.find((b) => b.cardGroup.children[0] === hoveredMesh);
        if (found && found.index !== hoveredIdxRef.current) { hoveredIdxRef.current = found.index; setHoveredIdx(found.index); }
        dom.style.cursor = "pointer";
      } else {
        hoveredMesh = null;
        if (hoveredIdxRef.current !== null) { hoveredIdxRef.current = null; setHoveredIdx(null); }
        dom.style.cursor = "default";
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("click", onClick);
      mount.removeChild(dom);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="section-storefront" data-section-id="storefront" className="site-section" ref={wrapperRef} style={styles.page}>
      <div style={styles.header}>
        <div style={styles.mono}>03 — EXPERIENCE</div>
        <div style={styles.title}>Badge Rack</div>
        <div style={styles.sub}>Hover a badge to still it · click to present it</div>
      </div>
      <div ref={mountRef} style={styles.canvasMount} />
      <div style={styles.legend}>
        {EXPERIENCE.map((exp, i) => (
          <div key={exp.company} style={{ ...styles.legendItem, opacity: hoveredIdx === i || hoveredIdx === null ? 1 : 0.4 }}>
            <span style={{ ...styles.legendOrder, color: exp.color }}>{exp.order}</span>
            <div>
              <div style={styles.legendCompany}>{exp.company}{exp.live && <span style={styles.liveBadge}>LIVE</span>}</div>
              <div style={styles.legendDates}>{exp.dates}</div>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={styles.detailPanel}>
          <button style={styles.closeBtn} onClick={() => { selectedIdxRef.current = null; setSelected(null); }}>×</button>
          <div style={{ ...styles.detailEyebrow, color: selected.color }}>{selected.order} · {selected.dates}</div>
          <div style={styles.detailTitle}>{selected.company}{selected.live && <span style={styles.liveBadge}>LIVE</span>}</div>
          <div style={styles.detailSub}>{selected.role} · {selected.domain}</div>
          <p style={styles.detailBlurb}>{selected.blurb}</p>
          <div style={styles.tagRow}>{selected.tags.map((tg) => <span key={tg} style={styles.tag}>{tg}</span>)}</div>
        </div>
      )}
    </div>
  );
}


/* =========================================================
   SECTION 4 — PROJECT DATA CARDS
========================================================= */

function ProjectsSection() {
  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const hoveredIdRef = useRef(null);
  const selectedIdRef = useRef(null);
  const visibleRef = useVisible(wrapperRef);
  const stateRef = useRef({ mouse: new THREE.Vector2(-10, -10), dragging: false, lastX: 0, rotY: 0, velY: 0.0007 });

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth, height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0c16");
    scene.fog = new THREE.FogExp2("#0a0c16", 0.035);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 10.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight("#2a2450", 1.1));
    const key = new THREE.DirectionalLight("#ffffff", 1.1);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight("#7c6cff", 1.6, 20);
    rim.position.set(-4, -2, 4);
    scene.add(rim);

    const rig = new THREE.Group();
    scene.add(rig);

    const gridHelper = new THREE.GridHelper(30, 24, "#1c1e2c", "#1c1e2c");
    gridHelper.position.set(0, -4, -6);
    rig.add(gridHelper);

    const moteCount = 80;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 18;
      motePos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({ color: "#8b8fa3", size: 0.035, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false });
    rig.add(new THREE.Points(moteGeo, moteMat));

    scene.add(createStarfield(150, 20, "#ffffff", 0.028));
    addNebulaGlows(scene, ["#ffb454", "#5fd1c9", "#7c6cff"], 16);

    const cardW = 2.6, cardH = 3.25, cardT = 0.08;
    const cards = [];

    PROJECTS.forEach((proj, i) => {
      const frontTex = makeCardTexture({ title: proj.title, category: proj.category, color: proj.color, chart: proj.chart });
      const backTex = makeBackTexture({ mentor: proj.mentor, team: proj.team, dates: proj.dates, color: proj.color });

      const edgeMat = new THREE.MeshStandardMaterial({ color: "#1a1c28", roughness: 0.7 });
      const frontMat = new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.5, metalness: 0.1 });
      const backMat = new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.5, metalness: 0.1 });

      const geo = new THREE.BoxGeometry(cardW, cardH, cardT);
      const mesh = new THREE.Mesh(geo, [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat]);

      const holder = new THREE.Group();
      const baseX = (i - (PROJECTS.length - 1) / 2) * 3.3;
      const baseY = Math.sin(i * 1.4) * 0.5;
      const baseZ = Math.cos(i * 1.1) * 0.6 - i * 0.05;
      holder.position.set(baseX, baseY, baseZ);
      holder.add(mesh);
      rig.add(holder);

      cards.push({ id: proj.id, data: proj, holder, mesh, baseX, baseY, baseZ, rotTarget: 0, currentRot: 0, phase: i * 1.3 });
    });

    const dom = renderer.domElement;
    const onPointerDown = (e) => { stateRef.current.dragging = true; stateRef.current.lastX = e.clientX; };
    const onPointerUp = () => (stateRef.current.dragging = false);
    const onPointerMove = (e) => {
      const rect = dom.getBoundingClientRect();
      stateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (stateRef.current.dragging) {
        const dx = e.clientX - stateRef.current.lastX;
        stateRef.current.rotY += dx * 0.004;
        stateRef.current.lastX = e.clientX;
        stateRef.current.velY = dx * 0.0002;
      }
    };
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const raycaster = new THREE.Raycaster();
    let hoveredMesh = null;
    const onClick = () => {
      if (hoveredMesh) {
        const found = cards.find((c) => c.mesh === hoveredMesh);
        if (found) {
          const next = selectedIdRef.current === found.id ? null : found.id;
          selectedIdRef.current = next;
          setSelectedId(next);
        }
      }
    };
    dom.addEventListener("click", onClick);

    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      const t = clock.getElapsedTime();

      if (!stateRef.current.dragging) { rig.rotation.y += stateRef.current.velY; stateRef.current.velY *= 0.97; rig.rotation.y += 0.0006; }
      else rig.rotation.y = stateRef.current.rotY;

      cards.forEach((c) => {
        const isSelected = selectedIdRef.current === c.id;
        const isHovered = hoveredIdRef.current === c.id;
        c.rotTarget = isSelected ? Math.PI : 0;
        c.currentRot += (c.rotTarget - c.currentRot) * 0.08;
        c.mesh.rotation.y = c.currentRot;

        const bob = Math.sin(t * 0.8 + c.phase) * 0.12;
        const sway = isSelected ? 0 : Math.sin(t * 0.5 + c.phase) * 0.05;
        c.holder.position.y = c.baseY + bob;
        c.mesh.rotation.z = sway;

        const targetScale = isSelected ? 1.18 : isHovered ? 1.06 : 1;
        c.holder.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const targetZ = isSelected ? c.baseZ + 1.4 : c.baseZ;
        c.holder.position.z += (targetZ - c.holder.position.z) * 0.08;
      });

      raycaster.setFromCamera(stateRef.current.mouse, camera);
      const meshes = cards.map((c) => c.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);
      if (intersects.length > 0) {
        hoveredMesh = intersects[0].object;
        const found = cards.find((c) => c.mesh === hoveredMesh);
        if (found && found.id !== hoveredIdRef.current) { hoveredIdRef.current = found.id; setHoveredId(found.id); }
        dom.style.cursor = "pointer";
      } else {
        hoveredMesh = null;
        if (hoveredIdRef.current !== null) { hoveredIdRef.current = null; setHoveredId(null); }
        dom.style.cursor = "grab";
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("click", onClick);
      mount.removeChild(dom);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  return (
    <div id="section-projects" data-section-id="projects" className="site-section" ref={wrapperRef} style={styles.page}>
      <div style={styles.header}>
        <div style={styles.mono}>04 — RESEARCH & PROJECTS</div>
        <div style={styles.title}>Data Cards</div>
        <div style={styles.sub}>Drag to rotate the shelf · click a card to flip it</div>
      </div>
      <div ref={mountRef} style={styles.canvasMount} />
      {selectedProject && (
        <div style={styles.detailPanel}>
          <button style={styles.closeBtn} onClick={() => { selectedIdRef.current = null; setSelectedId(null); }}>×</button>
          <div style={{ ...styles.detailEyebrow, color: selectedProject.color }}>{selectedProject.category} · {selectedProject.dates}</div>
          <div style={styles.detailTitle}>{selectedProject.title.replace("\n", " ")}</div>
          <div style={styles.detailSub}>{selectedProject.mentor} · {selectedProject.team}</div>
          <p style={styles.detailBlurb}>{selectedProject.blurb}</p>
          <div style={styles.tagRow}>{selectedProject.tags.map((tg) => <span key={tg} style={styles.tag}>{tg}</span>)}</div>
          {selectedProject.link && (
            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" style={{ ...styles.linkBtn, borderColor: selectedProject.color, color: selectedProject.color }}>
              Open full study →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SECTION 5 — CERTIFICATIONS & CONTACT
========================================================= */

function ContactSection() {
  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const hoveredIdRef = useRef(null);
  const selectedIdRef = useRef(null);
  const labelRefs = useRef({});
  const revealTimeoutRef = useRef(null);
  const anchorRef = useRef(null);
  const visibleRef = useVisible(wrapperRef);
  const stateRef = useRef({ mouse: new THREE.Vector2(-10, -10), dragging: false, lastX: 0, rotY: 0.4, velY: 0.0003 });

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth, height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0c16");
    scene.fog = new THREE.FogExp2("#0a0c16", 0.045);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 8.5);
    camera.lookAt(0, 1.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight("#3a3560", "#0a0c16", 0.8));
    const key = new THREE.DirectionalLight("#fff2df", 1.1);
    key.position.set(5, 8, 5);
    key.castShadow = true;
    scene.add(key);
    const violetRim = new THREE.PointLight("#7c6cff", 2, 12);
    violetRim.position.set(-3, 2, 2);
    scene.add(violetRim);
    const amberRim = new THREE.PointLight("#ffb454", 1.6, 12);
    amberRim.position.set(3, 1.5, 2);
    scene.add(amberRim);

    const rig = new THREE.Group();
    scene.add(rig);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 0.4, 48), new THREE.MeshStandardMaterial({ color: "#14151f", roughness: 0.6, metalness: 0.3 }));
    base.position.y = -0.2;
    base.receiveShadow = true;
    rig.add(base);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.05, 16, 64), new THREE.MeshStandardMaterial({ color: "#e7e4d9", emissive: "#e7e4d9", emissiveIntensity: 0.8, roughness: 0.3 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.02;
    rig.add(ring);

    const glow = new THREE.Mesh(new THREE.CircleGeometry(3.4, 48), new THREE.MeshBasicMaterial({ color: "#7c6cff", transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending }));
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.03;
    rig.add(glow);

    const badgeMeshes = [];
    BADGES.forEach((b) => {
      const ufo = buildUFO(b.color);
      rig.add(ufo.group);
      badgeMeshes.push({
        mesh: ufo.hitbox, animTarget: ufo.group, data: b,
        beamProgress: 0, beamMat: ufo.beamMat, beamMesh: ufo.beamMesh, beamLight: ufo.beamLight, lightBulbs: ufo.lightBulbs,
      });
    });

    const emberCount = 60;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberSpeed = new Float32Array(emberCount);
    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 5;
      emberPos[i * 3 + 1] = Math.random() * 4;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      emberSpeed[i] = 0.004 + Math.random() * 0.006;
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({ color: "#ffb454", size: 0.05, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
    rig.add(new THREE.Points(emberGeo, emberMat));

    scene.add(createStarfield(180, 22, "#ffffff", 0.03));
    addNebulaGlows(scene, ["#7c6cff", "#ffb454", "#5fd1c9"], 18);

    const dom = renderer.domElement;
    const onPointerDown = (e) => { stateRef.current.dragging = true; stateRef.current.lastX = e.clientX; };
    const onPointerUp = () => (stateRef.current.dragging = false);
    const onPointerMove = (e) => {
      const rect = dom.getBoundingClientRect();
      stateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (stateRef.current.dragging) {
        const dx = e.clientX - stateRef.current.lastX;
        stateRef.current.rotY += dx * 0.005;
        stateRef.current.lastX = e.clientX;
        stateRef.current.velY = dx * 0.00025;
      }
    };
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const raycaster = new THREE.Raycaster();
    let hoveredMesh = null;
    const onClick = () => {
      if (!hoveredMesh) return;
      const found = badgeMeshes.find((b) => b.mesh === hoveredMesh);
      if (!found) return;
      const next = selectedIdRef.current === found.data.id ? null : found.data.id;
      selectedIdRef.current = next;
      setSelectedId(next);

      if (revealTimeoutRef.current) { clearTimeout(revealTimeoutRef.current); revealTimeoutRef.current = null; }

      if (next === null) {
        setPanelVisible(false);
      } else {
        setPanelVisible(false);
        revealTimeoutRef.current = setTimeout(() => setPanelVisible(true), 750);
      }
    };
    dom.addEventListener("click", onClick);

    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      const t = clock.getElapsedTime();

      if (!stateRef.current.dragging) { rig.rotation.y += stateRef.current.velY; stateRef.current.velY *= 0.97; rig.rotation.y += 0.0007; }
      else rig.rotation.y = stateRef.current.rotY;

      const labelPositions = [];

      badgeMeshes.forEach((b) => {
        const isSelected = selectedIdRef.current === b.data.id;
        const isHovered = hoveredIdRef.current === b.data.id;
        const angle = t * b.data.speed + b.data.phase;
        const target = b.animTarget;

        if (isSelected) {
          const desiredWorld = new THREE.Vector3(0, 2.6, 2.6);
          const localTarget = desiredWorld.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -rig.rotation.y);
          target.position.lerp(localTarget, 0.08);
          target.rotation.y += 0.01;
        } else {
          const ox = Math.cos(angle) * b.data.radius, oz = Math.sin(angle) * b.data.radius;
          const oy = b.data.height + Math.sin(t * 0.7 + b.data.phase) * 0.12;
          target.position.lerp(new THREE.Vector3(ox, oy, oz), 0.06);
          target.rotation.y = -rig.rotation.y + angle + Math.PI / 2;
        }

        const targetScale = isSelected ? 1.6 : isHovered ? 1.12 : 1;
        target.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const beamTarget = isSelected ? 1 : 0;
        b.beamProgress += (beamTarget - b.beamProgress) * 0.05;
        b.beamMesh.scale.y = 0.001 + b.beamProgress * 1;
        b.beamMat.opacity = b.beamProgress * 0.55;
        b.beamLight.intensity = b.beamProgress * 2.5;
        b.lightBulbs.forEach((bulb) => {
          bulb.mat.emissiveIntensity = 0.6 + Math.sin(t * 4 + bulb.phase) * 0.4;
        });

        if (isSelected && anchorRef.current) {
          const beamHeight = 3.2;
          const worldPos = target.getWorldPosition(new THREE.Vector3());
          const groundWorld = new THREE.Vector3(
            worldPos.x,
            worldPos.y - 0.15 - beamHeight * b.beamProgress,
            worldPos.z
          );
          const proj = groundWorld.clone().project(camera);
          const rect = dom.getBoundingClientRect();
          const sx = (proj.x * 0.5 + 0.5) * rect.width;
          const sy = (-proj.y * 0.5 + 0.5) * rect.height;
          const halfPanelW = Math.min(190, rect.width * 0.43);
          const maxX = Math.max(halfPanelW, rect.width - halfPanelW);
          const maxY = Math.max(80, rect.height - 320);
          const clampedX = Math.max(halfPanelW, Math.min(maxX, sx));
          const clampedY = Math.max(80, Math.min(maxY, sy));
          anchorRef.current.style.left = `${clampedX}px`;
          anchorRef.current.style.top = `${clampedY}px`;
        }

        const labelEl = labelRefs.current[b.data.id];
        if (labelEl) {
          const worldPos = b.mesh.getWorldPosition(new THREE.Vector3());
          worldPos.y += 0.55;
          const proj = worldPos.clone().project(camera);
          const rect = dom.getBoundingClientRect();
          const sx = (proj.x * 0.5 + 0.5) * rect.width;
          const sy = (-proj.y * 0.5 + 0.5) * rect.height;
          const behindCamera = proj.z > 1;
          labelPositions.push({ el: labelEl, sx, sy, depth: proj.z, opacity: behindCamera ? 0 : isSelected ? 0 : 1 });
        }
      });

      // collision avoidance: nudge overlapping labels apart, farther one yields to nearer one
      const minDist = 85;
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < labelPositions.length; i++) {
          for (let j = i + 1; j < labelPositions.length; j++) {
            const a = labelPositions[i], c = labelPositions[j];
            const dx = c.sx - a.sx, dy = c.sy - a.sy;
            const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
            if (dist < minDist) {
              const nx = dx / dist, ny = dy / dist;
              const overlap = minDist - dist;
              const farther = a.depth > c.depth ? a : c;
              const sign = farther === c ? 1 : -1;
              farther.sx += sign * nx * overlap;
              farther.sy += sign * ny * overlap;
            }
          }
        }
      }

      labelPositions.forEach((p) => {
        p.el.style.left = `${p.sx}px`;
        p.el.style.top = `${p.sy}px`;
        p.el.style.opacity = String(p.opacity);
      });

      for (let i = 0; i < emberCount; i++) { emberPos[i * 3 + 1] += emberSpeed[i]; if (emberPos[i * 3 + 1] > 4.5) emberPos[i * 3 + 1] = 0; }
      emberGeo.attributes.position.needsUpdate = true;

      raycaster.setFromCamera(stateRef.current.mouse, camera);
      const meshes = badgeMeshes.map((b) => b.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);
      if (intersects.length > 0) {
        hoveredMesh = intersects[0].object;
        const found = badgeMeshes.find((b) => b.mesh === hoveredMesh);
        if (found && found.data.id !== hoveredIdRef.current) hoveredIdRef.current = found.data.id;
        dom.style.cursor = "pointer";
      } else { hoveredMesh = null; hoveredIdRef.current = null; dom.style.cursor = "grab"; }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("click", onClick);
      mount.removeChild(dom);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedBadge = BADGES.find((b) => b.id === selectedId);

  return (
    <div id="section-contact" data-section-id="contact" className="site-section" ref={wrapperRef} style={styles.page}>
      <div style={styles.header}>
        <div style={styles.mono}>05 — CERTIFICATIONS</div>
        <div style={styles.title}>Journey Complete</div>
        <div style={styles.sub}>Drag to rotate · click any UFO to beam down its details</div>
      </div>
      <div ref={mountRef} style={styles.canvasMount} />
      {BADGES.map((b) => (
        <div key={b.id} ref={(el) => (labelRefs.current[b.id] = el)} style={{ ...styles.floatLabel, borderColor: b.color, color: b.color }}>
          {b.kind}
        </div>
      ))}
      {selectedBadge && (
        <div ref={anchorRef} style={styles.beamAnchor}>
          <div
            key={selectedId}
            style={{
              ...styles.detailPanel,
              ...styles.beamPanel,
              opacity: panelVisible ? 1 : 0,
              transform: panelVisible ? "scale(1) translateY(0px)" : "scale(0.85) translateY(-10px)",
              transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
              animation: panelVisible ? "beamMaterialize 0.7s ease-out" : "none",
            }}
          >
            <button
              style={styles.closeBtn}
              onClick={() => {
                selectedIdRef.current = null;
                setSelectedId(null);
                setPanelVisible(false);
                if (revealTimeoutRef.current) { clearTimeout(revealTimeoutRef.current); revealTimeoutRef.current = null; }
              }}
            >
              ×
            </button>
            <div style={{ ...styles.detailEyebrow, color: selectedBadge.color }}>{selectedBadge.kind}</div>
            <div style={styles.detailTitle}>{selectedBadge.label}</div>
            <div style={styles.detailSub}>{selectedBadge.provider} · {selectedBadge.date}</div>
            {selectedBadge.kind === "CONTACT" ? (
              <div style={styles.contactLinksInPanel}>
                <a href={`mailto:${selectedBadge.email}`} style={{ ...styles.tag, ...styles.contactLinkTag }}>{selectedBadge.email}</a>
                <a href={`tel:${selectedBadge.phone}`} style={{ ...styles.tag, ...styles.contactLinkTag }}>{selectedBadge.phone}</a>
                <a href={selectedBadge.linkedin} target="_blank" rel="noopener noreferrer" style={{ ...styles.tag, ...styles.contactLinkTag }}>LinkedIn ↗</a>
                <a href={selectedBadge.work} target="_blank" rel="noopener noreferrer" style={{ ...styles.tag, ...styles.contactLinkTag }}>Work / Portfolio ↗</a>
                <span style={styles.tag}>{selectedBadge.location}</span>
              </div>
            ) : (
              <div style={styles.tagRow}>{selectedBadge.tags.map((tg) => <span key={tg} style={styles.tag}>{tg}</span>)}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   TOP-LEVEL SECTION NAV
========================================================= */

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={styles.progressTrack}>
      <div ref={barRef} style={styles.progressBar} />
    </div>
  );
}

function SectionNav() {
  const [active, setActive] = useState("path");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".site-section"));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((e) => { if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) best = e; });
        if (best) setActive(best.target.dataset.sectionId);
      },
      { threshold: [0.2, 0.4, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.navWrap}>
      {SECTIONS_NAV.map((s) => (
        <button key={s.id} onClick={() => jump(s.id)} style={styles.navItem}>
          <span style={{ ...styles.navDot, background: active === s.id ? "#ffb454" : "rgba(139,143,163,0.5)" }} />
          <span style={{ ...styles.navLabel, opacity: active === s.id ? 1 : 0, color: "#e7e4d9" }}>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   ROOT
========================================================= */

/* =========================================================
   FADE WRAPPER — crossfades each section in/out at its
   viewport edges so the page reads as one continuous flow
========================================================= */

function FadeSection({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const fadeZone = Math.min(vh * 0.4, 320);
        let opacity = 1;

        if (rect.top > vh - fadeZone) {
          opacity = Math.max(0, Math.min(1, (vh - rect.top) / fadeZone));
        } else if (rect.bottom < fadeZone) {
          opacity = Math.max(0, Math.min(1, rect.bottom / fadeZone));
        }

        const eased = opacity * opacity * (3 - 2 * opacity);
        el.style.opacity = eased.toFixed(3);
        el.style.transform = eased >= 0.999 ? "none" : `translateY(${(1 - eased) * 24}px)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} style={{ willChange: "opacity" }}>
      {children}
    </div>
  );
}

export default function PortfolioSite() {
  return (
    <div style={{ background: "#0a0c16" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0c16; }
        @keyframes beamMaterialize {
          0% { opacity: 0; filter: brightness(2.6); clip-path: inset(0 0 100% 0); }
          12% { opacity: 0.55; filter: brightness(2.2); clip-path: inset(0 0 82% 0); }
          22% { opacity: 0.25; filter: brightness(1.9); clip-path: inset(0 0 68% 0); }
          38% { opacity: 0.75; filter: brightness(1.5); clip-path: inset(0 0 40% 0); }
          55% { opacity: 0.5; clip-path: inset(0 0 18% 0); }
          75% { opacity: 0.95; filter: brightness(1.1); clip-path: inset(0 0 4% 0); }
          100% { opacity: 1; filter: brightness(1); clip-path: inset(0 0 0% 0); }
        }
      `}</style>
      <ScrollProgress />
      <SectionNav />
      <FadeSection><GrowthPathSection /></FadeSection>
      <FadeSection><SkillsSection /></FadeSection>
      <FadeSection><StorefrontSection /></FadeSection>
      <FadeSection><ProjectsSection /></FadeSection>
      <FadeSection><ContactSection /></FadeSection>
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: { position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#0a0c16", fontFamily: "'Inter', sans-serif" },
  hero: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 5, textAlign: "center", color: "#e7e4d9", pointerEvents: "none", background: "radial-gradient(ellipse at center, rgba(6,7,13,0.78) 0%, rgba(6,7,13,0.6) 55%, rgba(6,7,13,0) 100%)", padding: "52px 64px", borderRadius: "28px", maxWidth: "min(640px, 88vw)", backdropFilter: "blur(4px)" },
  heroName: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(36px, 8vw, 64px)", color: "#ffffff", marginBottom: "12px", lineHeight: 1.05, textShadow: "0 4px 24px rgba(0,0,0,0.85), 0 0 46px rgba(0,0,0,0.6)" },
  heroRole: { fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", letterSpacing: "1.5px", color: "#b9aeff", marginBottom: "26px", textShadow: "0 2px 14px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.6)" },
  heroTagline: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "22px", color: "#e7e4d9", marginBottom: "10px", textShadow: "0 2px 16px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.55)" },
  heroSub: { fontSize: "14px", color: "#d7d5cd", textShadow: "0 2px 10px rgba(0,0,0,0.8)" },
  scrollHint: { marginTop: "28px", fontSize: "12px", color: "#8b8fa3" },
  canvasMount: { position: "absolute", inset: 0, zIndex: 1, cursor: "grab" },
  minimap: { position: "absolute", top: "12%", right: "24px", height: "76%", zIndex: 20, display: "flex", alignItems: "stretch" },
  minimapTrack: { position: "relative", width: "2px", height: "100%", background: "rgba(139,143,163,0.25)", borderRadius: "2px" },
  minimapDot: { position: "absolute", left: "-4px", top: "0%", width: "10px", height: "10px", borderRadius: "50%", background: "#ffb454", boxShadow: "0 0 12px #ffb454", transition: "top 0.05s linear" },
  panel: { position: "absolute", top: "50%", width: "min(300px, 82vw)", zIndex: 20, background: "rgba(15,16,26,0.72)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,180,84,0.18)", borderRadius: "10px", padding: "20px 22px", color: "#e7e4d9", transition: "opacity 0.15s linear" },
  panelLeft: { left: "6%", marginTop: "-120px" },
  panelRight: { right: "8%", marginTop: "-120px" },
  panelEyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#ffb454", letterSpacing: "1.5px", marginBottom: "8px" },
  panelTitle: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "22px", display: "flex", alignItems: "center", gap: "8px" },
  liveDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#7c6cff", boxShadow: "0 0 8px #7c6cff", display: "inline-block" },
  panelSub: { fontSize: "13px", color: "#8b8fa3", marginTop: "2px" },
  panelBody: { marginTop: "12px" },
  panelLine: { fontSize: "13px", lineHeight: "1.5", color: "#c9c6ba", margin: "0 0 8px 0" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px", marginBottom: "14px" },
  tag: { fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", padding: "3px 8px", borderRadius: "20px", border: "1px solid rgba(139,143,163,0.35)", color: "#8b8fa3" },
  header: { position: "absolute", top: "36px", left: "40px", zIndex: 10, color: "#e7e4d9", pointerEvents: "none" },
  mono: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "2.5px", color: "#ffb454", marginBottom: "8px" },
  title: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "34px" },
  sub: { fontSize: "13px", color: "#8b8fa3", marginTop: "6px" },
  tooltip: { position: "absolute", zIndex: 15, transform: "translate(-50%, -140%)", background: "rgba(15,16,26,0.85)", border: "1px solid rgba(255,180,84,0.3)", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#e7e4d9", pointerEvents: "none", whiteSpace: "nowrap" },
  detailPanel: { position: "absolute", bottom: "40px", left: "40px", zIndex: 20, width: "min(360px, 86vw)", background: "rgba(15,16,26,0.85)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,180,84,0.2)", borderRadius: "10px", padding: "22px 24px", color: "#e7e4d9" },
  beamAnchor: { position: "absolute", left: "50%", top: "50%", zIndex: 22, transform: "translate(-50%, 0)" },
  beamPanel: { position: "relative", bottom: "auto", left: "auto", marginTop: "18px", transformOrigin: "top center", boxShadow: "0 0 40px rgba(124,108,255,0.25)" },
  closeBtn: { position: "absolute", top: "10px", right: "12px", background: "none", border: "none", color: "#8b8fa3", fontSize: "18px", cursor: "pointer" },
  detailEyebrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1.5px", marginBottom: "8px" },
  detailTitle: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "20px", display: "flex", alignItems: "center", gap: "8px" },
  detailSub: { fontSize: "13px", color: "#8b8fa3", margin: "4px 0 14px 0" },
  detailBlurb: { fontSize: "13px", lineHeight: "1.6", color: "#c9c6ba", margin: "12px 0" },
  legend: { position: "absolute", top: "36px", right: "40px", zIndex: 10, display: "flex", flexDirection: "column", gap: "14px", pointerEvents: "none" },
  legendItem: { display: "flex", alignItems: "center", gap: "10px", transition: "opacity 0.2s ease" },
  legendOrder: { fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500 },
  legendCompany: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", color: "#e7e4d9", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" },
  legendDates: { fontSize: "11px", color: "#8b8fa3", fontFamily: "'JetBrains Mono', monospace" },
  liveBadge: { fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#7c6cff", border: "1px solid rgba(124,108,255,0.5)", borderRadius: "10px", padding: "1px 6px", letterSpacing: "1px" },
  linkBtn: { display: "inline-block", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", padding: "8px 14px", borderRadius: "6px", border: "1px solid", textDecoration: "none" },
  floatLabel: { position: "absolute", zIndex: 15, transform: "translate(-50%, -100%)", background: "rgba(15,16,26,0.75)", border: "1px solid", borderRadius: "20px", padding: "3px 10px", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1px", pointerEvents: "none", whiteSpace: "nowrap", transition: "opacity 0.15s linear" },
  skillLabel: { position: "absolute", zIndex: 12, transform: "translate(-50%, -100%)", background: "rgba(10,12,22,0.55)", border: "1px solid", borderRadius: "10px", padding: "2px 7px", fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.5px", pointerEvents: "none", whiteSpace: "nowrap", opacity: 0, transition: "opacity 0.15s linear" },
  contactLinksInPanel: { display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" },
  contactLinkTag: { color: "#ffb454", borderColor: "rgba(255,180,84,0.4)", textDecoration: "none" },
  progressTrack: { position: "fixed", top: 0, left: 0, width: "100%", height: "2px", background: "rgba(139,143,163,0.15)", zIndex: 200 },
  progressBar: { width: "100%", height: "100%", background: "linear-gradient(90deg, #ffb454, #7c6cff)", transformOrigin: "left", transform: "scaleX(0)" },
  navWrap: { position: "fixed", right: "18px", top: "50%", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-end" },
  navItem: { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", padding: "4px" },
  navDot: { width: "8px", height: "8px", borderRadius: "50%", transition: "background 0.2s ease" },
  navLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", transition: "opacity 0.2s ease" },
};
