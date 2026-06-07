import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — NDICE",
  description:
    "Join the NDICE team. We're hiring embedded engineers, FPGA developers, and developer-relations humans who care about open hardware.",
};

const roles = [
  {
    id: "embedded-firmware",
    title: "Embedded Firmware Engineer",
    type: "Full-time",
    location: "Remote (UTC±5)",
    team: "Hardware",
    description:
      "Own the firmware stack for the NDICE T100 — from USB protocol handling to the FPGA configuration interface. You'll write C and Rust that runs on the ARM Cortex-M4 co-processor, managing DUT power sequencing, calibration routines, and host communication.",
    requirements: [
      "3+ years embedded C/C++ on ARM Cortex-M",
      "Experience with USB device firmware (CDC, bulk transfers)",
      "Comfortable reading schematics and using oscilloscopes",
      "Bonus: Rust, RTOS (FreeRTOS/Zephyr), analog calibration",
    ],
  },
  {
    id: "fpga-engineer",
    title: "FPGA Design Engineer",
    type: "Full-time",
    location: "Remote (Global)",
    team: "Hardware",
    description:
      "Design and optimize the pattern generation engine in SystemVerilog targeting Lattice ECP5. You'll own the test vector sequencer, timing calibration system, and I/O driver modules. Our toolchain is fully open-source (Yosys + nextpnr).",
    requirements: [
      "Strong SystemVerilog or VHDL skills",
      "Experience with FPGA timing closure and I/O constraints",
      "Familiarity with open-source FPGA toolchains (Yosys, nextpnr)",
      "Bonus: Lattice ECP5 experience, mixed-signal design, PCB layout",
    ],
  },
  {
    id: "python-sdk",
    title: "Python SDK Developer",
    type: "Full-time",
    location: "Remote (Global)",
    team: "Software",
    description:
      "Build and maintain the ndice-sdk Python package — the primary interface between users and the T100 hardware. You'll design clean APIs, write comprehensive docs, and optimize USB transfer performance with C extensions.",
    requirements: [
      "Expert-level Python with published packages",
      "Experience writing C extensions or Cython",
      "USB/serial device communication experience",
      "Strong technical writing skills for API documentation",
    ],
  },
  {
    id: "devrel",
    title: "Developer Relations Engineer",
    type: "Contract / Part-time",
    location: "Remote (Global)",
    team: "Community",
    description:
      "Be the bridge between NDICE and the hardware community. Create tutorials, demo videos, and conference talks. Manage our open-source repos, triage issues, and build relationships with university labs and maker spaces.",
    requirements: [
      "Hands-on experience with electronics / embedded systems",
      "Track record of technical content creation (blogs, videos, talks)",
      "Active in open-source or maker communities",
      "Comfortable on camera and at conference booths",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Nav */}
      <nav className="nav-container">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Go to home">
            <span className="nav-logo-dot" />
            NDICE
          </Link>
          <Link
            href="/"
            className="nav-link"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ← Back to site
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <div
          className="section"
          style={{ paddingTop: "160px", paddingBottom: "40px" }}
        >
          <p className="section-label">Careers</p>
          <h1
            style={{
              fontFamily: "var(--font-heading), Syne, sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1,
              marginBottom: "16px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Build tools that
            <br />
            <span className="accent">matter.</span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-secondary)",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            We&apos;re a small, deeply technical team making IC test
            infrastructure accessible to everyone. Remote-first, async-heavy,
            open-source-native.
          </p>

          {/* Perks strip */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            {[
              "Remote-first",
              "Open source",
              "Async culture",
              "Hardware shipped to you",
              "Conference budget",
              "Equity for full-time",
            ].map((perk) => (
              <div className="partner-pill" key={perk}>
                {perk}
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div
          className="section"
          style={{ paddingTop: "60px", paddingBottom: "120px" }}
        >
          <p className="section-label">Open Positions</p>

          <div style={{ marginTop: "32px" }}>
            {roles.map((role) => (
              <div
                key={role.id}
                id={`role-${role.id}`}
                style={{
                  border: "1px solid var(--color-border)",
                  padding: "40px 36px",
                  marginBottom: "-1px",
                  transition: "border-color 0.3s",
                  position: "relative",
                }}
                className="career-role-card"
              >
                {/* Meta row */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--color-accent)",
                      padding: "4px 10px",
                      border: "1px solid var(--color-accent)",
                    }}
                  >
                    {role.team}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--color-text-muted)",
                      padding: "4px 10px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {role.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--color-text-muted)",
                      padding: "4px 10px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {role.location}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-heading), Syne, sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    marginBottom: "12px",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {role.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    maxWidth: "640px",
                  }}
                >
                  {role.description}
                </p>

                {/* Requirements */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 24px",
                  }}
                >
                  {role.requirements.map((req) => (
                    <li
                      key={req}
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "12px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.8,
                        paddingLeft: "16px",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--color-accent)",
                        }}
                      >
                        →
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>

                {/* Apply */}
                <a
                  href={`mailto:careers@ndice.io?subject=Application: ${role.title}`}
                  className="btn-primary"
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  Apply via Email →
                </a>
              </div>
            ))}
          </div>

          {/* Don't see your role */}
          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: "40px 36px",
              textAlign: "center",
              marginTop: "-1px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading), Syne, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              Don&apos;t see your role?
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                marginBottom: "24px",
                maxWidth: "480px",
                margin: "0 auto 24px",
              }}
            >
              We&apos;re always interested in meeting talented people who care
              about open hardware. Send us a note about what you&apos;d build.
            </p>
            <a
              href="mailto:careers@ndice.io?subject=General Interest"
              className="btn-secondary"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              careers@ndice.io
            </a>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-left">
            © 2025 NDICE Systems — Open-source IC test infrastructure
          </div>
        </div>
      </footer>
    </>
  );
}
