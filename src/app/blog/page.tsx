import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — NDICE",
  description:
    "Technical deep-dives, tutorials, and event recaps from the NDICE engineering team.",
};

const posts = [
  {
    slug: "fpga-vs-microcontroller",
    type: "blog" as const,
    title:
      "Why We Chose an FPGA Over a Microcontroller for Test Pattern Generation",
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

function BadgeClass(type: string) {
  if (type === "blog") return "update-badge blog";
  if (type === "tutorial") return "update-badge tutorial";
  return "update-badge event";
}

function BadgeLabel(type: string) {
  if (type === "blog") return "Technical Blog";
  if (type === "tutorial") return "Tutorial";
  return "Event Spotlight";
}

export default function BlogPage() {
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
        <div
          className="section"
          style={{ paddingTop: "160px", paddingBottom: "40px" }}
        >
          <p className="section-label">Blog</p>
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
            Dispatches from
            <br />
            <span className="accent">the lab bench.</span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-secondary)",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            Technical deep-dives, build tutorials, and event recaps. No
            fluff — just engineering.
          </p>
        </div>

        <div className="section" style={{ paddingBottom: "120px" }}>
          <div className="updates-grid">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="update-card"
                style={{ textDecoration: "none", color: "inherit" }}
                id={`blog-card-${post.slug}`}
              >
                <span className={BadgeClass(post.type)}>
                  {BadgeLabel(post.type)}
                </span>
                <h3>{post.title}</h3>
                <div className="update-date">{post.date}</div>
                <div className="update-excerpt">{post.excerpt}</div>
                <span className="update-link">Read more →</span>
              </Link>
            ))}
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
