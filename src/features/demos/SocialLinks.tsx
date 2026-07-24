import * as React from "react";
import { FacebookIcon, InstagramIcon, YelpIcon, YouTubeIcon, GoogleIcon } from "../../site/icons";

export interface SocialLink {
  platform: "facebook" | "instagram" | "yelp" | "youtube" | "google";
  url: string;
  label?: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const iconMap = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  yelp: YelpIcon,
  youtube: YouTubeIcon,
  google: GoogleIcon,
};

const labelMap = {
  facebook: "Facebook",
  instagram: "Instagram",
  yelp: "Yelp",
  youtube: "YouTube",
  google: "Google Business",
};

/**
 * Social media link bar with SVG icons.
 * In production, these link to real business profiles.
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => (
  <div className="demo-social">
    {links.map((link) => {
      const Icon = iconMap[link.platform];
      return (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="demo-social__link"
          aria-label={link.label || labelMap[link.platform]}
          title={link.label || labelMap[link.platform]}
        >
          <Icon size={22} />
        </a>
      );
    })}
  </div>
);

export default SocialLinks;
