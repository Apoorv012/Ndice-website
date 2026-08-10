import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — NDICE",
  description:
    "Technical deep-dives, tutorials, and event recaps from the NDICE engineering team.",
};

const posts = [
  {
    slug: "arm-cortex-migration",
    type: "blog" as const,
    title: "Migrating to a 32-Bit ARM Cortex Core for IC Diagnostics",
    date: "August 2025",
    excerpt:
      "Moving beyond basic microcontrollers to build a highly robust, software-defined power routing matrix. Here is a deep dive into how we use 74HC595 shift registers and discrete MOSFETs to dynamically safely assign VCC, GND, and signal paths to any pin on our ZIF socket.",
  },
  {
    slug: "standalone-ic-testing",
    type: "tutorial" as const,
    title: "Standalone IC Testing: Verifying Your First 74-Series Gate",
    date: "January 2026",
    excerpt:
      "A quick walkthrough on testing standard logic chips without a host PC. Learn how to drop a 7432 or 7474 into the ZIF socket, navigate the tactile UI's \"Gates\" menu, and execute a cycle-accurate hardware verification sequence using the integrated LCD.",
  },
  {
    slug: "national-drone-war-2026",
    type: "event" as const,
    title: "Live NDICE Prototype Demo at National Drone War 1.0",
    date: "May 2026",
    excerpt:
      "We took the NDICE Digital IC Tester to the lab bench for a live exhibition at the JIIT 128 campus. Students and hardware engineers interacted directly with our latest Proto_V0.5 hardware, giving us crucial real-world feedback on our tactile UI stack and component categories.",
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
