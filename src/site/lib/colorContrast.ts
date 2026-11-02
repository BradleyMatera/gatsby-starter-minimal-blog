export const colorContrast = (foreground: string, background: string): number | null => {
  const luminance = (color: string) => {
    const value = color.replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(value)) return null;
    const channels = [0, 2, 4].map(offset => parseInt(value.slice(offset, offset + 2), 16) / 255).map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return a === null || b === null ? null : (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};
