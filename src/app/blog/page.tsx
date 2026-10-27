import Link from "next/link";
import type { Metadata } from "next";
import { updates, updateBadgeLabels } from "@/data/updates";

export const metadata: Metadata = {
  title: "Blog — NDICE",
  description:
    "Technical deep-dives, tutorials, and event recaps from the NDICE engineering team.",
};

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
            {updates.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="update-card"
                style={{ textDecoration: "none", color: "inherit" }}
                id={`blog-card-${post.slug}`}
              >
                <span className={`update-badge ${post.type}`}>
                  {updateBadgeLabels[post.type]}
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
