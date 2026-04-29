type ManifestoSlabProps = {
  /** Numeric prefix on the eyebrow (e.g. "001 · Manifesto" on /thesis, "004 · Manifesto" on home). */
  eyebrowNumber: string;
  /** Show the long Clara Vista platform paragraph beneath the manifesto sentences. */
  showPlatformLine?: boolean;
};

export function ManifestoSlab({ eyebrowNumber, showPlatformLine = false }: ManifestoSlabProps) {
  return (
    <section className="manifesto" aria-label="Clara Vista manifesto">
      <div className="manifesto-inner">
        <div className="manifesto-eyebrow">
          <span className="manifesto-eyebrow-num">{eyebrowNumber}</span>
          <span className="manifesto-eyebrow-rule" aria-hidden />
          <span>Manifesto</span>
        </div>
        <h2 className="manifesto-headline">
          We <em>invest.</em> We <em>build.</em> We <em>win.</em>
        </h2>
        {showPlatformLine ? (
          <p className="manifesto-body">
            Clara Vista is a data-driven sports investment platform built to generate asymmetric outcomes. We invest behind strong
            tailwinds and partner with winning organizations to achieve excellence across every dimension of performance.
          </p>
        ) : null}
      </div>
    </section>
  );
}
