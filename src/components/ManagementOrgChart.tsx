/* Management org chart (Approach 002 · We build).
 *
 * Abstract, non-interactive SVG diagram. A single ownership node (Clara Vista)
 * sits atop an executive tier and a functional-lead tier — the leadership we
 * install across a club post-acquisition. People are drawn as glyphs inside
 * nodes; the lead node is filled, installed operators are outlined.
 *
 * All fills/strokes resolve from theme tokens via CSS classes (no hex). Layout
 * is hand-placed in a 940×480 viewBox and scales fluidly with the container.
 */

type OrgNode = {
  id: string;
  x: number;
  y: number;
  r: number;
  role: string;
  sub?: string;
  lead?: boolean;
  /** where the text label sits relative to the node */
  labelPos: "above" | "below" | "left" | "right";
};

const NODES: OrgNode[] = [
  { id: "cv", x: 470, y: 96, r: 36, role: "Clara Vista", sub: "Ownership & board", lead: true, labelPos: "above" },
  { id: "md", x: 120, y: 252, r: 34, role: "Managing Director", sub: "Operations & finance", labelPos: "right" },
  { id: "sd", x: 470, y: 252, r: 34, role: "Sporting Director", sub: "Football & recruitment", labelPos: "below" },
  { id: "cd", x: 820, y: 252, r: 34, role: "Commercial Director", sub: "Revenue & brand", labelPos: "left" },
  { id: "fin", x: 120, y: 410, r: 28, role: "Finance & Controls", labelPos: "below" },
  { id: "data", x: 380, y: 410, r: 28, role: "Data & Recruitment", labelPos: "below" },
  { id: "ops", x: 560, y: 410, r: 28, role: "Performance & Ops", labelPos: "below" },
  { id: "brand", x: 820, y: 410, r: 28, role: "Brand & Fan Growth", labelPos: "below" },
];

/* Orthogonal connectors, routed off shared horizontal buses between tiers so
   no line ever passes through a node's text label. */
const EDGES: string[] = [
  // ownership → executives (bus at y=178)
  "M470,132 V178 H120 V218",
  "M470,132 V178 V218",
  "M470,132 V178 H820 V218",
  // executives → functional leads (Sporting Director branches off a short bus
  // so its centred label sits in the cleared column below the node)
  "M120,286 V382",
  "M470,286 V292 H380 V382",
  "M470,286 V292 H560 V382",
  "M820,286 V382",
];

function personGlyph(node: OrgNode) {
  const { x, y, r } = node;
  const k = r / 18;
  const headR = 6.4 * k;
  const headCy = y - 6.5 * k;
  const torso =
    `M${x - 11 * k},${y + 12 * k} ` +
    `C${x - 11 * k},${y + 1.5 * k} ${x - 6 * k},${y - 1.5 * k} ${x},${y - 1.5 * k} ` +
    `C${x + 6 * k},${y - 1.5 * k} ${x + 11 * k},${y + 1.5 * k} ${x + 11 * k},${y + 12 * k} Z`;
  return (
    <g className="moc-glyph" aria-hidden="true">
      <circle cx={x} cy={headCy} r={headR} />
      <path d={torso} />
    </g>
  );
}

function nodeLabel(node: OrgNode) {
  const { x, y, r, role, sub, labelPos } = node;
  let tx = x;
  let anchor: "start" | "middle" | "end" = "middle";
  let roleY: number;
  let subY: number;

  if (labelPos === "above") {
    roleY = y - r - 32;
    subY = y - r - 16;
  } else if (labelPos === "below") {
    roleY = y + r + 24;
    subY = y + r + 40;
  } else {
    // side label, vertically centred on the node
    roleY = sub ? y - 3 : y + 4;
    subY = y + 14;
    if (labelPos === "right") {
      tx = x + r + 14;
      anchor = "start";
    } else {
      tx = x - r - 14;
      anchor = "end";
    }
  }

  return (
    <>
      <text x={tx} y={roleY} textAnchor={anchor} className={`moc-role${node.lead ? " is-lead" : ""}`}>
        {role}
      </text>
      {sub ? (
        <text x={tx} y={subY} textAnchor={anchor} className="moc-sub">
          {sub}
        </text>
      ) : null}
    </>
  );
}

export function ManagementOrgChart() {
  return (
    <div className="moc-panel">
      <svg
        className="moc-svg"
        viewBox="0 0 940 480"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Org chart of the leadership Clara Vista installs across an acquired club: an ownership and board node above a tier of executives (Managing, Sporting, and Commercial Directors), each above functional leads for finance, data and recruitment, performance and operations, and brand and fan growth."
      >
        {EDGES.map((d, i) => (
          <path key={i} d={d} className="moc-edge" />
        ))}

        {NODES.map((node) => (
          <g key={node.id} className={`moc-node${node.lead ? " is-lead" : ""}`}>
            <circle cx={node.x} cy={node.y} r={node.r} className="moc-circle" />
            {personGlyph(node)}
            {nodeLabel(node)}
          </g>
        ))}
      </svg>

      <div className="moc-legend" aria-hidden="true">
        <span className="moc-legend-item">
          <span className="moc-swatch is-lead" />
          Clara Vista ownership
        </span>
        <span className="moc-legend-item">
          <span className="moc-swatch" />
          Operators we install
        </span>
      </div>
    </div>
  );
}
