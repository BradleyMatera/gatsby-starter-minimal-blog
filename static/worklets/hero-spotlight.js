class HeroSpotlightPainter {
  static get inputProperties() {
    return ["--spotlight-progress", "--spotlight-base", "--spotlight-accent"];
  }

  paint(ctx, geom, props) {
    const progress = parseFloat(props.get("--spotlight-progress").toString()) || 0;
    const base = props.get("--spotlight-base").toString().trim() || "rgba(87, 69, 176, 0.18)";
    const accent = props.get("--spotlight-accent").toString().trim() || "rgba(161, 72, 108, 0.24)";

    const x = geom.width * (0.2 + 0.6 * progress);
    const y = geom.height * 0.35;
    const radius = Math.max(geom.width, geom.height) * 0.7;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, accent);
    gradient.addColorStop(0.45, base);
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, geom.width, geom.height);
  }
}

registerPaint("hero-spotlight", HeroSpotlightPainter);
