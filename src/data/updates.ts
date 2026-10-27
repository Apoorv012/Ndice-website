export type UpdateType = "blog" | "tutorial" | "event";

export interface Update {
  slug: string;
  type: UpdateType;
  title: string;
  date: string;
  readTime: string;
  /** Card text on the home and blog listings. */
  excerpt: string;
  /** Short description used for the post page metadata. */
  summary: string;
  /** Paragraphs; "## " prefix renders a heading, ``` fences render a code block. */
  content: string[];
}

export const updateBadgeLabels: Record<UpdateType, string> = {
  blog: "Technical Blog",
  tutorial: "Tutorial",
  event: "Event Spotlight",
};

/** Newest first. */
export const updates: Update[] = [
  {
    slug: "ridehack-2026-v07-demo",
    type: "event",
    title: "Showcasing the V0.7 IC Tester at RIDEHack '26",
    date: "October 2026",
    readTime: "2 min read",
    excerpt:
      "We are taking our latest hardware to the Jaypee Agentic AI International Summit (JAI 2026) & RIDEHack’26. From October 30th to November 1st, the NDICE team will be hosting a dedicated exhibition booth at the JIIT Sector-128 campus.",
    summary:
      "The NDICE team is exhibiting the Proto_V0.7 Digital IC Tester at JAI 2026 & RIDEHack’26.",
    content: [
      "We are taking our latest hardware to the Jaypee Agentic AI International Summit (JAI 2026) & RIDEHack’26. From October 30th to November 1st, the NDICE team will be hosting a dedicated exhibition booth at the JIIT Sector-128 campus.",
      "Following the retirement of our earlier prototypes, we will be running live, on-the-fly product demonstrations of the hardened, STM32-powered Proto_V0.7 Digital IC Tester. We invite angel investors, industry leaders, and fellow hardware developers to stop by our canopy to see our dynamic power routing matrix in action, review our latest progress metrics, and discuss the future of affordable logic diagnostics.",
    ],
  },
  {
    slug: "74-series-logic-evolution",
    type: "blog",
    title:
      "The Evolution of 74-Series Logic: From Standard TTL to High-Speed CMOS",
    date: "October 2026",
    readTime: "5 min read",
    excerpt:
      "The 7400 series is the undisputed bedrock of digital computing. Understanding the generational leap from power-hungry bipolar junction transistors to modern CMOS architecture is a critical requirement for anyone troubleshooting legacy hardware or designing modern test equipment.",
    summary:
      "From power-hungry bipolar TTL to modern CMOS: why the 74-series silicon lineage still matters for hardware verification.",
    content: [
      "If you open up an industrial controller from the 1980s, an early arcade cabinet, or a modern university digital electronics kit, you will find the exact same thing: rows of black, dual in-line package (DIP) ICs stamped with the number \"74\".",
      "The 7400 series is the undisputed bedrock of digital computing. Long before the era of multi-core ARM processors or custom RISC-V silicon, these discrete logic chips were how engineers built arithmetic logic units, memory controllers, and state machines. But while the physical footprint of a 14-pin DIP chip hasn't changed in half a century, the silicon inside has undergone a massive, quiet evolution.",
      "Understanding the generational leap from power-hungry bipolar junction transistors to modern CMOS architecture isn't just a history lesson it is a critical requirement for anyone troubleshooting legacy hardware or designing modern test equipment.",
      "## The Power-Hungry Pioneer: Standard TTL (74xx)",
      "Introduced in the 1960s, the original 7400 series utilized Transistor-Transistor Logic (TTL). Built entirely with bipolar junction transistors (BJTs), standard TTL was rugged, reliable, and fast for its era. However, it had a massive structural flaw: it was incredibly power-hungry.",
      "Because BJTs are current-driven devices, standard TTL chips constantly draw significant baseline current, even when sitting idle. Furthermore, when a standard TTL gate switches states, both internal transistors momentarily conduct at the same time, creating a brief but intense spike in current draw. If you populated an entire PCB with standard 74xx chips, your power supply had to be massive, and your cooling requirements were severe.",
      "## The Speed Upgrade: Low-Power Schottky (74LS)",
      "Engineers needed to solve the power and speed bottlenecks of standard TTL. The answer was the 74LS (Low-Power Schottky) family, which quickly became the definitive industry workhorse.",
      "By integrating Schottky diodes across the base and collector of the transistors, designers prevented the BJTs from entering deep saturation. This meant the transistors took significantly less time to turn off. The result was a chip that switched much faster than standard TTL while consuming a fraction of the power. If you check the storeroom of any university digital electronics lab today, the vast majority of the \"basic gates\" bin will be populated by 74LS chips.",
      "## The Silicon Pivot: High-Speed CMOS (74HC)",
      "The true paradigm shift occurred when the industry moved away from current-driven bipolar transistors entirely and embraced voltage-driven Field Effect Transistors (FETs). Complementary Metal-Oxide-Semiconductor (CMOS) technology gave birth to the 74HC (High-Speed CMOS) logic family.",
      "Unlike TTL, CMOS gates draw virtually zero current when sitting in a static state; power is only consumed during the brief moment of switching. This allowed for incredibly dense, low-power circuit designs.",
      "However, this transition introduced a severe compatibility headache. The input voltage thresholds that a 74HC chip recognized as a \"HIGH\" or \"LOW\" were fundamentally different from 74LS chips. You could not simply drop a 74HC chip into a 74LS socket and expect it to work reliably. To bridge this gap, manufacturers released the 74HCT family CMOS chips internally calibrated to accept legacy TTL voltage levels, allowing engineers to slowly phase out older power-hungry logic.",
      "## Why This Evolution Still Matters",
      "For hardware startups, maintenance engineers, and digital design students, understanding these internal architectures is mandatory for hardware verification.",
      "When a pin is accidentally left floating (disconnected) on a legacy 74LS chip, the internal TTL architecture will reliably interpret it as a logic HIGH. But if you leave an input floating on a 74HC chip, the CMOS gate acts like an antenna, picking up ambient electrical noise and causing unpredictable, high-frequency state toggling that can physically destroy the chip.",
      "At Novatri, we deal with these invisible electrical characteristics every day. When we build verification protocols for digital logic, we aren't just looking at the truth table. We have to account for the exact power dynamics, input impedances, and failure modes of each specific logic family to ensure a 1970s TTL chip and a 1990s CMOS chip can be diagnosed with the exact same reliability.",
      "Hardware is hard, but understanding the silicon lineage makes it manageable.",
    ],
  },
  {
    slug: "standalone-ic-testing",
    type: "tutorial",
    title: "Standalone IC Testing: Verifying Your First 74-Series Gate",
    date: "January 2026",
    readTime: "5 min read",
    excerpt:
      "A quick walkthrough on testing standard logic chips without a host PC. Learn how to drop a 7432 or 7474 into the ZIF socket, navigate the tactile UI's \"Gates\" menu, and execute a cycle-accurate hardware verification sequence using the integrated LCD.",
    summary:
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
      "We took the NDICE Digital IC Tester to the lab bench for a live exhibition at the JIIT 128 campus. Students and hardware engineers interacted directly with our latest Proto_V0.5 hardware, giving us crucial real-world feedback on our tactile UI stack and component categories.",
    summary:
      "We took the NDICE Digital IC Tester to the lab bench for a live exhibition at the JIIT 128 campus.",
    content: [
      "We took the NDICE Digital IC Tester to the lab bench for a live exhibition at the JIIT 128 campus. Students and hardware engineers interacted directly with our latest Proto_V0.5 hardware, giving us crucial real-world feedback on our tactile UI stack and component categories.",
    ],
  },
];

export function getUpdate(slug: string) {
  return updates.find((u) => u.slug === slug);
}
