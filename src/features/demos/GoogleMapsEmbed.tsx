import * as React from "react";

interface GoogleMapsEmbedProps {
  address: string;
  height?: number;
  title?: string;
}

/**
 * Free Google Maps embed — no API key required.
 * Uses the public maps embed URL format: https://maps.google.com/maps?q=ADDRESS&output=embed
 * In production, this would use the Google Maps Embed API with an API key for
 * better performance and usage tracking, but the free embed works for demos.
 */
const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({ address, height = 300, title = "Location map" }) => {
  const encodedAddress = encodeURIComponent(address);
  const src = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="demo-map-embed">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: 0, borderRadius: "10px", display: "block" }}
        loading="lazy"
        title={title}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="demo-map-embed__note">
        <strong>Live Google Maps embed</strong> — no API key required for this demo. Production sites
        use the Google Maps Embed API (free tier: 28,000 loads/month) for analytics and custom styling.
      </div>
    </div>
  );
};

export default GoogleMapsEmbed;
