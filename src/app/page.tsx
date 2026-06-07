"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ─────────────────────── Navigation ─────────────────────── */
type Section = "tech" | "rnd" | "updates" | "company";

function Navbar({
  active,
  onNav,
}: {
  active: Section;
  onNav: (s: Section) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: { key: Section; label: string }[] = [
    { key: "tech", label: "The Tech" },
    { key: "rnd", label: "R&D" },
    { key: "updates", label: "Updates" },
    { key: "company", label: "Company" },
  ];

  return (
    <nav className="nav-container" id="navbar">
      <div className="nav-inner">
        <button
          className="nav-logo"
          onClick={() => onNav("tech")}
          aria-label="Go to home"
        >
          <span className="nav-logo-dot" />
          NDICE
        </button>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
          {links.map((l) => (
            <button
              key={l.key}
              className={`nav-link ${active === l.key ? "active" : ""}`}
              onClick={() => {
                onNav(l.key);
                setMobileOpen(false);
              }}
              id={`nav-${l.key}`}
            >
              {l.label}
            </button>
          ))}
          <Link href="/waitlist" className="nav-cta" id="nav-cta-build">
            Build with us →
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────── PCB SVG ─────────────────────────── */
function PCBIllustration() {
  return (
    <svg
      viewBox="0 0 800 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      aria-label="NDICE prototype PCB illustration"
    >
      {/* Board outline */}
      <rect
        x="40"
        y="20"
        width="720"
        height="280"
        rx="4"
        stroke="#c8f03c"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />

      {/* Grid traces */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="40"
          y1={20 + i * 16.47}
          x2="760"
          y2={20 + i * 16.47}
          stroke="#c8f03c"
          strokeWidth="0.3"
          opacity="0.08"
        />
      ))}
      {Array.from({ length: 36 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={40 + i * 20.57}
          y1="20"
          x2={40 + i * 20.57}
          y2="300"
          stroke="#c8f03c"
          strokeWidth="0.3"
          opacity="0.08"
        />
      ))}

      {/* Main IC package */}
      <rect
        x="300"
        y="90"
        width="200"
        height="140"
        rx="2"
        stroke="#c8f03c"
        strokeWidth="1"
        fill="rgba(200,240,60,0.03)"
      />
      {/* Notch */}
      <path
        d="M 390 90 A 10 10 0 0 0 410 90"
        stroke="#c8f03c"
        strokeWidth="1"
        fill="none"
      />
      {/* IC label */}
      <text
        x="400"
        y="165"
        textAnchor="middle"
        fill="#c8f03c"
        fontSize="11"
        fontFamily="monospace"
        opacity="0.7"
      >
        NDICE-T100
      </text>
      <text
        x="400"
        y="180"
        textAnchor="middle"
        fill="#555"
        fontSize="8"
        fontFamily="monospace"
      >
        REV 2.4 • 2025
      </text>

      {/* Left pins */}
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={`lp-${i}`}>
          <rect
            x="280"
            y={100 + i * 18}
            width="20"
            height="8"
            fill="none"
            stroke="#c8f03c"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="200"
            y1={104 + i * 18}
            x2="280"
            y2={104 + i * 18}
            stroke="#c8f03c"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </g>
      ))}

      {/* Right pins */}
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={`rp-${i}`}>
          <rect
            x="500"
            y={100 + i * 18}
            width="20"
            height="8"
            fill="none"
            stroke="#c8f03c"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1="520"
            y1={104 + i * 18}
            x2="600"
            y2={104 + i * 18}
            stroke="#c8f03c"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </g>
      ))}

      {/* Corner mounting holes */}
      {[
        [70, 50],
        [730, 50],
        [70, 270],
        [730, 270],
      ].map(([cx, cy], i) => (
        <g key={`mh-${i}`}>
          <circle
            cx={cx}
            cy={cy}
            r="8"
            stroke="#c8f03c"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          <circle
            cx={cx}
            cy={cy}
            r="3"
            stroke="#c8f03c"
            strokeWidth="0.5"
            fill="none"
            opacity="0.2"
          />
        </g>
      ))}

      {/* Traces — decorative */}
      <path
        d="M 200 104 L 160 104 L 160 60 L 400 60"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M 600 140 L 660 140 L 660 260 L 500 260"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M 200 140 L 140 140 L 140 250 L 300 250 L 300 230"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />

      {/* Small capacitors / passives */}
      <rect
        x="150"
        y="190"
        width="16"
        height="8"
        rx="1"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="rgba(200,240,60,0.05)"
        opacity="0.4"
      />
      <rect
        x="620"
        y="90"
        width="16"
        height="8"
        rx="1"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="rgba(200,240,60,0.05)"
        opacity="0.4"
      />
      <rect
        x="620"
        y="110"
        width="16"
        height="8"
        rx="1"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="rgba(200,240,60,0.05)"
        opacity="0.4"
      />

      {/* Power header */}
      <rect
        x="100"
        y="80"
        width="40"
        height="60"
        rx="2"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      <text
        x="120"
        y="76"
        textAnchor="middle"
        fill="#555"
        fontSize="7"
        fontFamily="monospace"
      >
        PWR
      </text>

      {/* USB connector */}
      <rect
        x="655"
        y="190"
        width="50"
        height="30"
        rx="2"
        stroke="#c8f03c"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      <text
        x="680"
        y="186"
        textAnchor="middle"
        fill="#555"
        fontSize="7"
        fontFamily="monospace"
      >
        USB-C
      </text>

      {/* Status LEDs */}
      <circle cx="560" cy="260" r="3" fill="#c8f03c" opacity="0.15" />
      <circle cx="575" cy="260" r="3" fill="#c8f03c" opacity="0.1" />
      <text
        x="567"
        y="275"
        textAnchor="middle"
        fill="#555"
        fontSize="6"
        fontFamily="monospace"
      >
        LED
      </text>
    </svg>
  );
}

/* ─────────────────────── DIP-14 Pin Diagram ──────────────── */
function DIP14Diagram() {
  const leftPins = [
    { num: 1, label: "CLK_IN" },
    { num: 2, label: "DATA_0" },
    { num: 3, label: "DATA_1" },
    { num: 4, label: "DATA_2" },
    { num: 5, label: "DATA_3" },
    { num: 6, label: "CTRL" },
    { num: 7, label: "GND" },
  ];
  const rightPins = [
    { num: 14, label: "VCC" },
    { num: 13, label: "OUT_0" },
    { num: 12, label: "OUT_1" },
    { num: 11, label: "OUT_2" },
    { num: 10, label: "OUT_3" },
    { num: 9, label: "EN" },
    { num: 8, label: "RST" },
  ];

  return (
    <svg
      viewBox="0 0 600 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "560px", height: "auto" }}
      aria-label="DIP-14 pin diagram"
    >
      {/* IC Body */}
      <rect
        x="200"
        y="20"
        width="200"
        height="300"
        rx="3"
        stroke="#c8f03c"
        strokeWidth="1"
        fill="rgba(200,240,60,0.02)"
      />
      {/* Notch */}
      <path
        d="M 285 20 A 15 15 0 0 0 315 20"
        stroke="#c8f03c"
        strokeWidth="1"
        fill="none"
      />
      {/* IC Label */}
      <text
        x="300"
        y="170"
        textAnchor="middle"
        fill="#c8f03c"
        fontSize="12"
        fontFamily="monospace"
        opacity="0.5"
      >
        NDICE
      </text>
      <text
        x="300"
        y="185"
        textAnchor="middle"
        fill="#555"
        fontSize="9"
        fontFamily="monospace"
      >
        T100
      </text>

      {/* Left pins */}
      {leftPins.map((pin, i) => {
        const y = 50 + i * 40;
        return (
          <g key={`l-${pin.num}`}>
            {/* Pin rectangle */}
            <rect
              x="180"
              y={y - 6}
              width="20"
              height="12"
              fill="none"
              stroke="#c8f03c"
              strokeWidth="0.7"
            />
            {/* Pin line */}
            <line
              x1="100"
              y1={y}
              x2="180"
              y2={y}
              stroke="#c8f03c"
              strokeWidth="0.5"
              opacity="0.4"
            />
            {/* Pin number */}
            <text
              x="210"
              y={y + 4}
              textAnchor="start"
              fill="#888"
              fontSize="9"
              fontFamily="monospace"
            >
              {pin.num}
            </text>
            {/* Pin label */}
            <text
              x="95"
              y={y + 4}
              textAnchor="end"
              fill="#c8f03c"
              fontSize="10"
              fontFamily="monospace"
              opacity="0.8"
            >
              {pin.label}
            </text>
            {/* Pin dot */}
            <circle
              cx="100"
              cy={y}
              r="2"
              fill={pin.label === "GND" ? "#555" : "#c8f03c"}
              opacity={pin.label === "GND" ? "0.5" : "0.3"}
            />
          </g>
        );
      })}

      {/* Right pins */}
      {rightPins.map((pin, i) => {
        const y = 50 + i * 40;
        return (
          <g key={`r-${pin.num}`}>
            {/* Pin rectangle */}
            <rect
              x="400"
              y={y - 6}
              width="20"
              height="12"
              fill="none"
              stroke="#c8f03c"
              strokeWidth="0.7"
            />
            {/* Pin line */}
            <line
              x1="420"
              y1={y}
              x2="500"
              y2={y}
              stroke="#c8f03c"
              strokeWidth="0.5"
              opacity="0.4"
            />
            {/* Pin number */}
            <text
              x="390"
              y={y + 4}
              textAnchor="end"
              fill="#888"
              fontSize="9"
              fontFamily="monospace"
            >
              {pin.num}
            </text>
            {/* Pin label */}
            <text
              x="505"
              y={y + 4}
              textAnchor="start"
              fill="#c8f03c"
              fontSize="10"
              fontFamily="monospace"
              opacity="0.8"
            >
              {pin.label}
            </text>
            {/* Pin dot */}
            <circle
              cx="500"
              cy={y}
              r="2"
              fill={pin.label === "VCC" ? "#c8f03c" : "#c8f03c"}
              opacity={pin.label === "VCC" ? "0.5" : "0.3"}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────── The Tech Section ────────────────── */
function TechSection() {
  return (
    <div className="fade-in" id="section-tech">
      {/* Hero */}
      <section className="hero grid-bg">
        <div className="section hero-content">
          <p className="section-label">ndice systems</p>
          <h1>
            Hardware is Hard.
            <br />
            <span className="accent">We make it easier.</span>
          </h1>
          <p className="hero-sub">
            Open-source IC test infrastructure for the next generation of chip
            designers. Validate your silicon without the six-figure price tag.
          </p>
          <div className="hero-cta-row">
            <Link href="/waitlist" className="btn-primary" id="cta-waitlist">
              Join the Waitlist →
            </Link>
          </div>
        </div>

        <div className="section">
          <div className="pcb-illustration">
            <PCBIllustration />
          </div>
        </div>
      </section>

      {/* Callout Blocks */}
      <div className="section">
        <div className="callouts">
          <div className="callout" id="callout-why">
            <div className="callout-index">01 — Why</div>
            <h3>Why We&apos;re Building This</h3>
            <p>
              IC testing equipment has been locked behind enterprise paywalls for
              decades. A single ATE system can cost $500K+, shutting out
              university labs, indie chip designers, and hardware startups in
              emerging markets. We believe access to test infrastructure
              shouldn&apos;t be a barrier to silicon innovation.
            </p>
          </div>
          <div className="callout" id="callout-problem">
            <div className="callout-index">02 — Problem</div>
            <h3>The Problem</h3>
            <p>
              Existing IC testers are monolithic, proprietary, and
              absurdly expensive. They require dedicated facilities, specialized
              training, and long procurement cycles. Small teams either skip
              proper testing entirely — shipping blind — or burn months waiting
              for shared lab time at a foundry.
            </p>
          </div>
          <div className="callout" id="callout-solution">
            <div className="callout-index">03 — Solution</div>
            <h3>Our Solution</h3>
            <p>
              NDICE is a modular, open-source IC tester that fits on your
              bench. USB-C powered, scriptable via Python, and designed to test
              everything from simple logic ICs to mixed-signal devices. We&apos;re
              making functional test accessible at 1/100th the cost of
              legacy systems.
            </p>
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="section specs-section">
        <p className="section-label">Technical Specifications</p>
        <h2
          style={{
            fontFamily: "var(--font-heading), Syne, sans-serif",
            fontSize: "32px",
            marginBottom: "40px",
            color: "#e0e0e0",
          }}
        >
          Built for real-world testing
        </h2>
        <div className="specs-grid">
          <div className="spec-cell" id="spec-logic">
            <div className="spec-label">Logic Families</div>
            <div className="spec-value">TTL / CMOS</div>
            <div className="spec-desc">
              Full support for 5V TTL and 3.3V / 1.8V CMOS logic families.
              Configurable I/O thresholds per pin.
            </div>
          </div>
          <div className="spec-cell" id="spec-interfaces">
            <div className="spec-label">Interfaces</div>
            <div className="spec-value">SPI / I²C / JTAG</div>
            <div className="spec-desc">
              Native protocol engines for SPI, I²C, UART, and JTAG. No
              bit-banging — hardware-accelerated at full speed.
            </div>
          </div>
          <div className="spec-cell" id="spec-speed">
            <div className="spec-label">Test Speed</div>
            <div className="spec-value">50 MHz</div>
            <div className="spec-desc">
              Pattern generation and capture up to 50 MHz clock rate.
              Sufficient for most digital and mixed-signal validation.
            </div>
          </div>
          <div className="spec-cell" id="spec-pins">
            <div className="spec-label">Pin Support</div>
            <div className="spec-value">64 Channels</div>
            <div className="spec-desc">
              64 bidirectional test channels, expandable to 256 via daisy-chain
              modules. Per-pin programmable driver/receiver.
            </div>
          </div>
          <div className="spec-cell" id="spec-power">
            <div className="spec-label">Power</div>
            <div className="spec-value">USB-C / 5V</div>
            <div className="spec-desc">
              Bus-powered via USB-C for portable operation. External 5V supply
              option for high-current DUT testing up to 2A.
            </div>
          </div>
          <div className="spec-cell" id="spec-open">
            <div className="spec-label">Open Source</div>
            <div className="spec-value">Full Stack</div>
            <div className="spec-desc">
              Hardware (KiCad), firmware (C/Rust), and host software (Python)
              — all open-source under Apache 2.0. Fork it, extend it, own it.
            </div>
          </div>
        </div>
      </div>

      {/* DIP-14 Pin Diagram */}
      <div className="section pin-diagram-section">
        <p className="section-label">Pin Configuration</p>
        <h2
          style={{
            fontFamily: "var(--font-heading), Syne, sans-serif",
            fontSize: "32px",
            marginBottom: "40px",
            color: "#e0e0e0",
          }}
        >
          DIP-14 Reference Interface
        </h2>
        <div className="pin-diagram-container">
          <DIP14Diagram />
        </div>
        <p
          className="code-comment"
          style={{ marginTop: "12px", textAlign: "center" }}
        >
          {
            "// Standard DIP-14 test socket pinout — active-low RST, active-high EN"
          }
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────── R&D Section ─────────────────────── */
function RnDSection() {
  const entries = [
    {
      date: "March 2025",
      title: "First Board Spin — Nothing Worked (Almost)",
      body: [
        "We got the first NDICE prototype PCBs back from JLCPCB and populated them by hand. Three days of soldering 0402s with a heat gun and tweezers. The FPGA booted, the USB enumerated, and then… nothing. The level shifters were oscillating at 200MHz because we'd routed the decoupling caps on the wrong side of the via.",
        "Lesson: don't trust autorouter on mixed-voltage domains. We ripped up the power plane, hand-routed every bypass cap, and reflowed. Board v1.1 came alive at 2am on a Tuesday. The first test pattern — a simple walking-ones on a 74HC595 — passed clean. We may have screamed.",
      ],
      tags: ["hardware", "pcb-rev-1.1", "power-integrity"],
    },
    {
      date: "May 2025",
      title: "Python SDK & the Impedance Mismatch Problem",
      body: [
        "Building the Python host library seemed straightforward until we hit the real-time constraint wall. USB bulk transfers have unpredictable latency, and our test patterns need cycle-accurate timing. We tried three different approaches: raw libusb, pyusb with async, and finally a custom C extension that pre-buffers patterns into the FPGA's block RAM.",
        "The C extension won by 40x. We're now getting consistent 50MHz pattern rates with zero dropped vectors. The API is clean — three lines of Python to define, load, and execute a test. We're writing the docs now and it feels like the kind of tool we wish we'd had two years ago.",
      ],
      tags: ["firmware", "python-sdk", "usb-latency"],
    },
    {
      date: "August 2025",
      title: "64 Channels and the Ground Bounce from Hell",
      body: [
        "Scaling from 16 to 64 channels revealed every PCB sin we'd committed. Ground bounce on simultaneous switching outputs was corrupting adjacent capture channels. We spent two weeks with an oscilloscope and a lot of coffee isolating the coupling paths.",
        "The fix was unglamorous but effective: split ground planes per 16-channel bank, added series termination resistors on every driver output, and staggered the switching edges by 2ns per bank. Crosstalk dropped from 400mV to under 20mV. The 64-channel board now passes our full regression suite — 2,847 test vectors across 12 different IC families — with zero failures.",
      ],
      tags: ["signal-integrity", "64-channel", "ground-bounce"],
    },
  ];

  return (
    <div className="fade-in" id="section-rnd">
      <section className="section rnd-hero">
        <p className="section-label">Research & Development</p>
        <h1>
          Building in the open.
          <br />
          <span className="accent">Warts and all.</span>
        </h1>
        <p>
          Real engineering logs from the NDICE build process. No polish, no
          marketing — just what broke, what we learned, and what we shipped.
        </p>
      </section>

      <div className="section">
        <div className="timeline">
          {entries.map((entry, i) => (
            <div className="timeline-entry" key={i} id={`rnd-entry-${i}`}>
              <div className="timeline-date">{entry.date}</div>
              <div className="timeline-title">{entry.title}</div>
              <div className="timeline-body">
                {entry.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                <div>
                  {entry.tags.map((tag) => (
                    <span className="timeline-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Updates Section ──────────────────── */
function UpdatesSection() {
  const updates = [
    {
      slug: "fpga-vs-microcontroller",
      type: "blog" as const,
      title: "Why We Chose an FPGA Over a Microcontroller for Test Pattern Generation",
      date: "September 15, 2025",
      excerpt:
        "Microcontrollers can bit-bang protocols, but they can't generate deterministic, cycle-accurate test patterns at 50MHz. Here's how we evaluated Lattice ECP5 vs. Xilinx Artix-7 and why the open-source toolchain tipped the scales.",
    },
    {
      slug: "first-ic-test",
      type: "tutorial" as const,
      title: "Getting Started: Your First IC Test with NDICE and Python",
      date: "October 2, 2025",
      excerpt:
        "A step-by-step walkthrough of testing a 74HC00 quad NAND gate — from wiring the DIP socket to writing your first test script. Covers installation, pin mapping, and reading test results.",
    },
    {
      slug: "open-hardware-summit-2025",
      type: "event" as const,
      title: "NDICE at Open Hardware Summit 2025",
      date: "November 8, 2025",
      excerpt:
        "We're demoing the 64-channel prototype at OHS in Portland. Come see live IC testing on the bench, grab a PCB coaster, and talk shop about open-source test infrastructure. Booth #42.",
    },
  ];

  return (
    <div className="fade-in" id="section-updates">
      <section className="section updates-hero">
        <p className="section-label">Updates</p>
        <h1>
          Dispatches from
          <br />
          <span className="accent">the lab bench.</span>
        </h1>
      </section>

      <div className="section">
        <div className="updates-grid">
          {updates.map((u, i) => (
            <Link
              href={`/blog/${u.slug}`}
              className="update-card"
              key={i}
              id={`update-card-${i}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className={`update-badge ${u.type}`}>
                {u.type === "blog"
                  ? "Technical Blog"
                  : u.type === "tutorial"
                    ? "Tutorial"
                    : "Event Spotlight"}
              </span>
              <h3>{u.title}</h3>
              <div className="update-date">{u.date}</div>
              <div className="update-excerpt">{u.excerpt}</div>
              <span className="update-link">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Company Section ──────────────────── */
function CompanySection() {
  const founders = [
    { initials: "AP", name: "Apoorv Patel", role: "CEO / Hardware Lead" },
    { initials: "SK", name: "Sara Kim", role: "CTO / Firmware Lead" },
    { initials: "RD", name: "Ravi Deshmukh", role: "COO / Operations" },
  ];

  const partners = [
    "IIT Bombay EE Lab",
    "FOSSEE Project",
    "JLCPCB",
    "Lattice Semi",
    "Open Source Hardware Association",
    "Tindie",
  ];

  return (
    <div className="fade-in" id="section-company">
      <section className="section company-hero">
        <p className="section-label">Company</p>
        <h1>
          Democratizing
          <br />
          <span className="accent">silicon testing.</span>
        </h1>
        <p>
          NDICE was founded with a simple belief: the tools to validate
          integrated circuits should be as accessible as the tools to design
          them. We&apos;re a small, technical team building open infrastructure
          for the hardware community.
        </p>
      </section>

      {/* Founders */}
      <div className="section founders-section">
        <p className="section-label">Founding Team</p>
        <div className="founders-grid">
          {founders.map((f) => (
            <div className="founder-card" key={f.initials} id={`founder-${f.initials}`}>
              <div className="founder-avatar">{f.initials}</div>
              <div className="founder-name">{f.name}</div>
              <div className="founder-role">{f.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="section partners-section">
        <p className="section-label">Partners & Collaborators</p>
        <div className="partners-row">
          {partners.map((p) => (
            <div className="partner-pill" key={p}>
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Blocks */}
      <div className="section">
        <div className="company-cta">
          <div className="company-cta-block" id="cta-careers">
            <h3>
              Careers — <span style={{ color: "#c8f03c" }}>We&apos;re Hiring</span>
            </h3>
            <p>
              We&apos;re looking for embedded engineers, FPGA developers, and
              developer-relations humans who care about open hardware. Remote-first,
              async-heavy, deeply technical.
            </p>
            <Link href="/careers" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>View Open Roles →</Link>
          </div>
          <div className="company-cta-block" id="cta-contact">
            <h3>Get in Touch</h3>
            <p>
              Questions, partnerships, or just want to nerd out about test
              infrastructure? We read every email.
            </p>
            <a href="mailto:hello@ndice.io" className="contact-email">
              hello@ndice.io
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Footer ──────────────────────────── */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          © 2025 NDICE Systems — Open-source IC test infrastructure
        </div>
        <div className="footer-right">
          <a
            className="footer-link"
            href="https://github.com/ndice-io"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="footer-link">Twitter</span>
          <span className="footer-link">Discord</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── Page Root ────────────────────────── */
const VALID_SECTIONS: Section[] = ["tech", "rnd", "updates", "company"];

function getHashSection(): Section {
  if (typeof window === "undefined") return "tech";
  const hash = window.location.hash.replace("#", "");
  return VALID_SECTIONS.includes(hash as Section) ? (hash as Section) : "tech";
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("tech");

  // On mount, read hash from URL
  useEffect(() => {
    setActiveSection(getHashSection());
  }, []);

  // When the user clicks a nav link, push hash to history
  const handleNav = useCallback((section: Section) => {
    setActiveSection(section);
    window.history.pushState(null, "", `#${section}`);
  }, []);

  // Listen for back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      setActiveSection(getHashSection());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "tech":
        return <TechSection />;
      case "rnd":
        return <RnDSection />;
      case "updates":
        return <UpdatesSection />;
      case "company":
        return <CompanySection />;
    }
  };

  return (
    <>
      <Navbar active={activeSection} onNav={handleNav} />
      <main>{renderSection()}</main>
      <Footer />
    </>
  );
}
