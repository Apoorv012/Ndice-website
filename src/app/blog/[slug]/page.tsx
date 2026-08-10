import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ─── Post Data ───────────────────────────────────────────── */
interface Post {
  slug: string;
  type: "blog" | "tutorial" | "event";
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

const posts: Post[] = [
  {
    slug: "arm-cortex-migration",
    type: "blog",
    title: "Migrating to a 32-Bit ARM Cortex Core for IC Diagnostics",
    date: "August 2025",
    readTime: "6 min read",
    excerpt:
      "Moving beyond basic microcontrollers to build a highly robust, software-defined power routing matrix.",
    content: [
      "Moving beyond basic microcontrollers to build a highly robust, software-defined power routing matrix. Here is a deep dive into how we use 74HC595 shift registers and discrete MOSFETs to dynamically safely assign VCC, GND, and signal paths to any pin on our ZIF socket.",
      "As we pushed the limits of our early prototypes, we hit the ceiling of what 8-bit microcontrollers could do. We completely scrapped our original Arduino UNO-based architecture and migrated to a 32-bit STM32 ARM Cortex core, unlocking the speed and I/O necessary for industrial-grade logic testing.",
    ],
  },
  {
    slug: "standalone-ic-testing",
    type: "tutorial",
    title: "Standalone IC Testing: Verifying Your First 74-Series Gate",
    date: "January 2026",
    readTime: "5 min read",
    excerpt:
      "A quick walkthrough on testing standard logic chips without a host PC.",
    content: [
      "A quick walkthrough on testing standard logic chips without a host PC. Learn how to drop a 7432 or 7474 into the ZIF socket, navigate the tactile UI's \"Gates\" menu, and execute a cycle-accurate hardware verification sequence using the integrated LCD.",
    ],
  },
  {
    slug: "national-drone-war-2026",
    type: "event",
    title: "Live NDICE Prototype Demo at National Drone War 1.0",
    date: "May 2026",
    readTime: "3 min read",
    excerpt:
      "We took the NDICE Digital IC Tester to the lab bench for a live exhibition at the JIIT 128 campus.",
    content: [
      "We took the NDICE Digital IC Tester to the lab bench for a live exhibition at the JIIT 128 campus. Students and hardware engineers interacted directly with our latest Proto_V0.5 hardware, giving us crucial real-world feedback on our tactile UI stack and component categories.",
    ],
  },
];

/* ─── Metadata ────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found — NDICE" };
  return {
    title: `${post.title} — NDICE Blog`,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/* ─── Page ────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const badgeClass =
    post.type === "blog"
      ? "update-badge blog"
      : post.type === "tutorial"
        ? "update-badge tutorial"
        : "update-badge event";
  const badgeLabel =
    post.type === "blog"
      ? "Technical Blog"
      : post.type === "tutorial"
        ? "Tutorial"
        : "Event Spotlight";

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
            href="/blog"
            className="nav-link"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ← All Posts
          </Link>
        </div>
      </nav>

      <main>
        <article
          className="section"
          style={{ paddingTop: "140px", paddingBottom: "120px", maxWidth: "760px" }}
        >
          {/* Header */}
          <div style={{ marginBottom: "48px" }}>
            <span className={badgeClass} style={{ marginBottom: "16px" }}>
              {badgeLabel}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-heading), Syne, sans-serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.15,
                marginBottom: "16px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginTop: "16px",
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
                color: "var(--color-text-muted)",
                letterSpacing: "0.05em",
              }}
            >
              <span>{post.date}</span>
              <span style={{ color: "var(--color-border)" }}>|</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "var(--color-border)",
              marginBottom: "48px",
            }}
          />

          {/* Content */}
          <div>
            {post.content.map((paragraph, i) => {
              // Check if paragraph contains a code block
              if (paragraph.includes("```")) {
                const parts = paragraph.split("```");
                return (
                  <div key={i} style={{ marginBottom: "28px" }}>
                    {parts.map((part, j) => {
                      if (j % 2 === 0) {
                        // Regular text
                        return part ? (
                          <p
                            key={j}
                            style={{
                              fontSize: "15px",
                              color: "var(--color-text-secondary)",
                              lineHeight: 1.8,
                              marginBottom: "16px",
                            }}
                          >
                            {part}
                          </p>
                        ) : null;
                      }
                      // Code block
                      const lines = part.split("\n");
                      const lang = lines[0]; // e.g. "python"
                      const code = lines.slice(1).join("\n");
                      return (
                        <div
                          key={j}
                          style={{
                            border: "1px solid var(--color-border)",
                            background: "var(--color-bg-card)",
                            padding: "24px",
                            marginBottom: "16px",
                            overflowX: "auto",
                            position: "relative",
                          }}
                        >
                          {lang && (
                            <div
                              style={{
                                position: "absolute",
                                top: "8px",
                                right: "12px",
                                fontFamily: "var(--font-mono), monospace",
                                fontSize: "9px",
                                color: "var(--color-text-muted)",
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                              }}
                            >
                              {lang}
                            </div>
                          )}
                          <pre
                            style={{
                              fontFamily: "var(--font-mono), monospace",
                              fontSize: "13px",
                              color: "var(--color-accent)",
                              lineHeight: 1.6,
                              margin: 0,
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
                            {code}
                          </pre>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    fontSize: "15px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.8,
                    marginBottom: "28px",
                  }}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Bottom nav */}
          <div
            style={{
              marginTop: "64px",
              paddingTop: "32px",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Link href="/blog" className="btn-secondary">
              ← All Posts
            </Link>
            <Link href="/waitlist" className="btn-primary">
              Join the Waitlist →
            </Link>
          </div>
        </article>
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
