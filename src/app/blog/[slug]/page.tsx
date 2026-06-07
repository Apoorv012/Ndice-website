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
    slug: "fpga-vs-microcontroller",
    type: "blog",
    title:
      "Why We Chose an FPGA Over a Microcontroller for Test Pattern Generation",
    date: "September 15, 2025",
    readTime: "8 min read",
    excerpt:
      "Microcontrollers can bit-bang protocols, but they can't generate deterministic, cycle-accurate test patterns at 50MHz.",
    content: [
      "When we started designing NDICE, the first architectural decision was the pattern generation engine. Do we use a fast microcontroller — say, an STM32H7 at 480MHz — or do we go full FPGA? The answer seemed obvious at first. Microcontrollers are cheaper, have better tooling, and our team had more experience with them.",
      "But then we ran the numbers. A 50MHz test pattern means each vector must be asserted every 20ns. That's roughly 10 clock cycles on the STM32H7. Factor in GPIO latency, DMA setup, and interrupt overhead, and you're looking at maybe 3-4 useful cycles per vector. Not enough to read back capture data, compare against expected values, and advance the pattern pointer.",
      "We evaluated two FPGA families: the Lattice ECP5 and the Xilinx (now AMD) Artix-7. Both have adequate I/O count and speed grades for our application. The ECP5 won for one reason: the open-source toolchain. Yosys for synthesis, nextpnr for place-and-route, and Project Trellis for bitstream generation. This means our users can modify the FPGA design without purchasing a $3,000 Vivado license.",
      "The pattern engine architecture is straightforward. Test vectors are stored in block RAM as 64-bit words — one bit per channel. A state machine sequences through the vectors at the configured clock rate, asserting outputs on the rising edge and capturing inputs on the falling edge. The captured data is compared against an expected pattern (also in BRAM), and any mismatches are logged to a FIFO that the host reads over USB.",
      "The tricky part was timing closure. At 50MHz, the fabric timing is comfortable, but the I/O timing constraints are tight. We use DDR output registers to align the drive edges with the clock, and input registers with configurable sampling delays to accommodate different DUT setup/hold requirements. Each channel has a 4-tap delay line — tunable in 500ps increments — for fine-grained timing adjustments.",
      "Performance results: the FPGA pattern engine generates cycle-accurate vectors at exactly 50MHz with zero jitter. We can load 16K vectors into BRAM (expandable to 64K with the larger ECP5-85F), and the entire load-execute-readback cycle completes in under 2ms for a typical 1024-vector test. Compare that to the microcontroller prototype, which topped out at 1.2MHz with 15% cycle-to-cycle jitter.",
      "The open-source toolchain has another benefit: CI/CD. We run the full FPGA synthesis in GitHub Actions. Every pull request to the hardware repo triggers a build, and we can diff the utilization reports automatically. If someone's change blows the timing budget, we catch it before merge. Try doing that with Vivado.",
    ],
  },
  {
    slug: "first-ic-test",
    type: "tutorial",
    title: "Getting Started: Your First IC Test with NDICE and Python",
    date: "October 2, 2025",
    readTime: "12 min read",
    excerpt:
      "A step-by-step walkthrough of testing a 74HC00 quad NAND gate — from wiring the DIP socket to writing your first test script.",
    content: [
      "This tutorial walks you through your first complete IC test using NDICE. We'll test a 74HC00 quad 2-input NAND gate — one of the simplest and most common logic ICs. By the end, you'll have a working test script that validates all four gates in under a second.",
      "What you'll need: one NDICE T100 tester, one 74HC00 in a DIP-14 package, a ZIF socket or solderless breadboard, and a USB-C cable. Software: Python 3.10+ and the ndice-sdk package.",
      "Step 1: Install the SDK. Run `pip install ndice-sdk` in your terminal. This pulls in the Python host library and the USB driver. On Linux, you may need to add a udev rule — the installer will prompt you. On macOS and Windows, it should work out of the box.",
      "Step 2: Wire the DUT. Insert the 74HC00 into the ZIF socket. The NDICE T100 has 64 test channels, but we only need 14 for a DIP-14 package. Connect pin 14 (VCC) to the T100's programmable supply channel, and pin 7 (GND) to the ground bus. The remaining 12 pins connect to channels 0-11.",
      "Step 3: Write the test script. Here's the minimal version:\n\n```python\nfrom ndice import Tester, PinMap, TestVector\n\nt = Tester()  # auto-detects USB device\nt.set_voltage(5.0)  # VCC for the DUT\n\n# Define pin mapping\npins = PinMap({\n    'A1': 0, 'B1': 1, 'Y1': 2,\n    'A2': 3, 'B2': 4, 'Y2': 5,\n    'A3': 8, 'B3': 9, 'Y3': 10,\n    'A4': 11, 'B4': 12, 'Y4': 13,\n})\n\n# NAND truth table: output is LOW only when both inputs are HIGH\nvectors = [\n    TestVector(inputs={'A1': 0, 'B1': 0}, expected={'Y1': 1}),\n    TestVector(inputs={'A1': 0, 'B1': 1}, expected={'Y1': 1}),\n    TestVector(inputs={'A1': 1, 'B1': 0}, expected={'Y1': 1}),\n    TestVector(inputs={'A1': 1, 'B1': 1}, expected={'Y1': 0}),\n]\n\nresult = t.run(pins, vectors)\nprint(f'Test {\"PASSED\" if result.passed else \"FAILED\"}')\nprint(f'Vectors: {result.total}, Failures: {result.failures}')\n```",
      "Step 4: Run the test. Connect the T100 via USB-C, power it on (the status LED should glow green), and run your script. The test executes all vectors in sequence, and the SDK reports pass/fail for each vector. A full NAND gate test — all 4 gates × 4 input combinations — takes about 320 microseconds.",
      "Step 5: Iterate. The real power of NDICE is scriptability. You can parameterize tests, sweep voltage ranges, measure propagation delay, and build regression suites. Check the ndice-sdk documentation for advanced features like timing measurements, analog capture, and multi-device testing.",
      "Common pitfalls: (1) Make sure the DUT is oriented correctly — pin 1 is marked with a dot or notch. (2) If you get intermittent failures, check your wiring. Breadboard contact resistance can cause marginal logic levels. (3) The T100 channels are 3.3V by default — set the voltage explicitly for 5V parts.",
    ],
  },
  {
    slug: "open-hardware-summit-2025",
    type: "event",
    title: "NDICE at Open Hardware Summit 2025",
    date: "November 8, 2025",
    readTime: "4 min read",
    excerpt:
      "We're demoing the 64-channel prototype at OHS in Portland. Come see live IC testing on the bench.",
    content: [
      "We're thrilled to announce that NDICE will be exhibiting at the Open Hardware Summit 2025 in Portland, Oregon on November 14-15. You'll find us at Booth #42 — look for the lime-green PCBs.",
      "What we're showing: the production-intent 64-channel T100 prototype. This is the same board that passed our full regression suite — 2,847 test vectors across 12 IC families with zero failures. We'll be running live demos all day, testing ICs pulled fresh from the parts bin.",
      "We'll also have a hands-on station where you can write a test script and run it against a real DUT. Bring your own IC if you want — we have ZIF sockets for DIP-8 through DIP-40. If you break something, we'll give you a commemorative 'I broke NDICE' sticker.",
      "Talk: Our CTO Sara Kim is presenting 'Open-Source ATE: Why IC Testing Needs the Arduino Moment' in the main hall at 2:30 PM on Saturday. The talk covers the technical architecture of NDICE, the economics of IC test, and why we think open hardware is the only viable path to democratizing silicon validation.",
      "Swag: We're giving away PCB coasters (FR4, ENIG finish, non-functional but gorgeous), NDICE hex stickers, and a limited run of solder-wick bookmarks. First 50 visitors to the booth get a prototype PCB panel — unassembled, but the Gerbers are open-source if you want to populate it yourself.",
      "Can't make it to Portland? We'll be livestreaming Sara's talk on our YouTube channel and posting a full booth recap on this blog. Follow us on Twitter @ndice_io for real-time updates during the event.",
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
