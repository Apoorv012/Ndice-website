import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { updates, updateBadgeLabels, getUpdate } from "@/data/updates";

/* ─── Metadata ────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getUpdate(slug);
  if (!post) return { title: "Post Not Found — NDICE" };
  return {
    title: `${post.title} — NDICE Blog`,
    description: post.summary,
  };
}

export function generateStaticParams() {
  return updates.map((p) => ({ slug: p.slug }));
}

/* ─── Page ────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getUpdate(slug);
  if (!post) notFound();

  const badgeClass = `update-badge ${post.type}`;
  const badgeLabel = updateBadgeLabels[post.type];

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
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "var(--font-heading), Syne, sans-serif",
                      fontSize: "22px",
                      lineHeight: 1.3,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      marginTop: "48px",
                      marginBottom: "20px",
                    }}
                  >
                    {paragraph.slice(3)}
                  </h2>
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
