"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

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

      <main className="grid-bg" style={{ minHeight: "100vh" }}>
        <div className="section" style={{ paddingTop: "160px", paddingBottom: "120px" }}>
          {!submitted ? (
            <div className="fade-in">
              <p className="section-label">Early Access</p>
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
                Get on the
                <br />
                <span className="accent">build list.</span>
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--color-text-secondary)",
                  maxWidth: "520px",
                  lineHeight: 1.7,
                  marginBottom: "48px",
                }}
              >
                We&apos;re shipping the first batch of NDICE testers to early
                supporters. Join the waitlist to get priority access, dev kit
                pricing, and a direct line to the engineering team.
              </p>

              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: "480px" }}
                id="waitlist-form"
              >
                {/* Email */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="waitlist-email"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--color-accent)",
                      marginBottom: "8px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    placeholder="you@lab.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--color-border)")
                    }
                  />
                </div>

                {/* Role */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="waitlist-role"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--color-accent)",
                      marginBottom: "8px",
                    }}
                  >
                    I am a...
                  </label>
                  <select
                    id="waitlist-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      color: role
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "14px",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="student">Student / Researcher</option>
                    <option value="engineer">Hardware Engineer</option>
                    <option value="startup">Startup Founder</option>
                    <option value="educator">Educator / Professor</option>
                    <option value="hobbyist">Hobbyist / Maker</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Use case */}
                <div style={{ marginBottom: "32px" }}>
                  <label
                    htmlFor="waitlist-usecase"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--color-accent)",
                      marginBottom: "8px",
                    }}
                  >
                    What will you test? (optional)
                  </label>
                  <textarea
                    id="waitlist-usecase"
                    placeholder="e.g. 74xx logic ICs for a university lab course..."
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--color-border)")
                    }
                  />
                </div>

                <button type="submit" className="btn-primary" id="waitlist-submit">
                  Join the Waitlist →
                </button>

                <p
                  style={{
                    marginTop: "20px",
                    fontSize: "11px",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  // No spam. We&apos;ll email you when units ship and when we push
                  major SDK updates.
                </p>
              </form>

              {/* Stats strip */}
              <div
                style={{
                  marginTop: "80px",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0",
                  maxWidth: "480px",
                }}
              >
                {[
                  { label: "On waitlist", value: "2,400+" },
                  { label: "Countries", value: "38" },
                  { label: "Est. Ship", value: "Q1 2026" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      border: "1px solid var(--color-border)",
                      padding: "20px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-heading), Syne, sans-serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                        marginBottom: "4px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ─── Success State ─── */
            <div className="fade-in" style={{ textAlign: "center", maxWidth: "480px", margin: "0 auto" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  border: "1px solid var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 32px",
                  fontSize: "28px",
                }}
              >
                ✓
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading), Syne, sans-serif",
                  fontSize: "36px",
                  marginBottom: "16px",
                  fontWeight: 700,
                }}
              >
                You&apos;re on the list.
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                }}
              >
                We&apos;ll reach out to{" "}
                <span style={{ color: "var(--color-accent)" }}>{email}</span>{" "}
                when the first batch ships. In the meantime, check out the
                engineering blog.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/blog" className="btn-primary">
                  Read the Blog →
                </Link>
                <Link href="/" className="btn-secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
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
