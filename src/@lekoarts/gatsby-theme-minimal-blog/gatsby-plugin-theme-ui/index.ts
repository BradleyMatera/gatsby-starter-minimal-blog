import { merge, type ThemeUIStyleObject } from "theme-ui";
import tailwind from "@theme-ui/preset-tailwind";

type ExtendedTheme = import("theme-ui").Theme & {
  cards?: Record<string, ThemeUIStyleObject>;
  layout?: ThemeUIStyleObject & {
    container?: ThemeUIStyleObject;
    content?: ThemeUIStyleObject;
  };
  gradients?: Record<string, string>;
  badges?: Record<string, ThemeUIStyleObject>;
  copyButton?: ThemeUIStyleObject;
  dividers?: Record<string, ThemeUIStyleObject>;
};

const glassShadow = `0 18px 48px rgba(41, 34, 28, 0.12)`;
const neonGlow = `0 0 8px rgba(229, 229, 229, 0.28), 0 0 16px rgba(163, 163, 163, 0.2)`;
const neonGlowMagenta = `0 0 8px rgba(212, 212, 212, 0.24), 0 0 16px rgba(140, 140, 140, 0.18)`;

const brandTheme = merge(tailwind, {
  config: {
    initialColorModeName: `default`,
    useColorSchemeMediaQuery: false,
  },
  colors: {
    text: `#1f1b17`,
    heading: `#171310`,
    background: `#f3efe8`,
    surface: `#fbf9f4`,
    surfaceAlt: `#efe9e0`,
    primary: `#6f675f`,
    primaryMuted: `rgba(111, 103, 95, 0.12)`,
    secondary: `#837970`,
    accent: `#6f675f`,
    muted: `#ddd5c9`,
    subtle: `#5b554e`,
    border: `#d8d0c4`,
    highlightLineBg: `rgba(111, 103, 95, 0.1)`,
    badgeBg: `rgba(111, 103, 95, 0.12)`,
    badgeText: `#2b2621`,
    cardShadow: `rgba(41, 34, 28, 0.08)`,
    tocBg: `#f0ebe3`,
    codeBg: `#ece5db`,
    codeText: `#2a241e`,
    link: `#4f4841`,
    navBg: `rgba(251, 249, 244, 0.94)`,
    focus: `#7e746a`,
    modes: {
      dark: {
        text: `#f5f5f5`,
        heading: `#ffffff`,
        background: `#000000`,
        surface: `#0b0b0b`,
        surfaceAlt: `#121212`,
        primary: `#8a8a8a`,
        primaryMuted: `rgba(229, 229, 229, 0.12)`,
        secondary: `#737373`,
        accent: `#8a8a8a`,
        muted: `#1a1a1a`,
        subtle: `#c7c7c7`,
        border: `#2d2d2d`,
        highlightLineBg: `rgba(245, 245, 245, 0.12)`,
        badgeBg: `rgba(212, 212, 212, 0.16)`,
        badgeText: `#f5f5f5`,
        cardShadow: `rgba(0, 0, 0, 0.6)`,
        tocBg: `#0f0f0f`,
        codeBg: `#101010`,
        codeText: `#f3f3f3`,
        link: `#d4d4d4`,
        navBg: `rgba(0, 0, 0, 0.94)`,
        focus: `#e5e5e5`,
      },
    },
  },
  fonts: {
    body: `"Inter Variable", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif`,
    heading: `"Space Grotesk Variable", "Space Grotesk", "Inter", "Segoe UI", Arial, sans-serif`,
    monospace: `"JetBrains Mono", "Fira Code", Menlo, Monaco, "Courier New", monospace`,
  },
  fontWeights: {
    body: 400,
    medium: 500,
    heading: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.3,
  },
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72],
  radii: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    pill: 999,
  },
  shadows: {
    card: glassShadow,
    subtle: `0 4px 18px rgba(41, 34, 28, 0.1)`,
    outline: `0 0 0 4px rgba(126, 116, 106, 0.18)`,
    neon: neonGlow,
    neonMagenta: neonGlowMagenta,
  },

  styles: {
    root: {
      color: `text`,
      backgroundColor: `background`,
      margin: 0,
      padding: 0,
      fontFamily: `body`,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
      "::selection": {
        backgroundColor: `rgba(111, 103, 95, 0.16)`,
        color: `text`,
      },
      img: {
        maxWidth: `100%`,
        height: `auto`,
        borderRadius: `lg`,
      },
      a: {
        color: `link`,
        textDecoration: `none`,
        transition: `all 0.3s ease`,
        "&:hover": {
          color: `primary`,
          textShadow: `0 0 6px rgba(126, 116, 106, 0.16)`,
        },
      },
    },
    p: {
      fontSize: [1, 2, 2],
      color: `subtle`,
      lineHeight: `body`,
      letterSpacing: `-0.008em`,
      mt: 0,
      mb: 4,
    },
    h1: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [4, 5, 5, 6],
      fontWeight: 700,
      letterSpacing: `-0.02em`,
      mt: 5,
      mb: 4,
    },
    h2: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [3, 4, 4, 5],
      fontWeight: 600,
      letterSpacing: `-0.01em`,
      mt: 5,
      mb: 3,
    },
    h3: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [2, 3, 3, 4],
      fontWeight: 600,
      letterSpacing: `-0.01em`,
      mt: 5,
      mb: 3,
    },
    h4: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [2, 2, 2, 3],
      fontWeight: 600,
      mt: 4,
      mb: 3,
    },
    blockquote: {
      borderLeftColor: `primary`,
      borderLeftWidth: `4px`,
      borderLeftStyle: `solid`,
      pl: 4,
      ml: 0,
      color: `subtle`,
      fontStyle: `italic`,
    },
    pre: {
      fontFamily: `monospace`,
      bg: `codeBg`,
      color: `codeText`,
      borderRadius: `md`,
      padding: [4, 5],
      overflowX: `auto`,
      boxShadow: `subtle`,
      fontSize: [1, 2],
    },
    code: {
      fontFamily: `monospace`,
      backgroundColor: `surfaceAlt`,
      color: `heading`,
      px: 2,
      py: 1,
      borderRadius: `xs`,
      fontSize: `85%`,
    },
    hr: {
      border: 0,
      height: `1px`,
      backgroundColor: `muted`,
      my: 5,
    },
    ul: {
      pl: 4,
      color: `subtle`,
      li: {
        mb: 3,
        fontSize: [1, 2, 2],
        lineHeight: `body`,
      },
    },
    ol: {
      pl: 4,
      color: `subtle`,
      li: {
        mb: 3,
        fontSize: [1, 2, 2],
        lineHeight: `body`,
      },
    },
    table: {
      width: `100%`,
      maxWidth: `100%`,
      display: `block`,
      overflowX: `auto`,
      borderCollapse: `collapse`,
      borderSpacing: `0`,
      border: `1px solid`,
      borderColor: `border`,
      boxShadow: `none`,
      borderRadius: 0,
      bg: `transparent`,
      my: 5,
      th: {
        textAlign: `left`,
        fontWeight: 600,
        color: `heading`,
        p: 3,
        backgroundColor: `transparent`,
        border: `1px solid`,
        borderColor: `border`,
      },
      td: {
        p: 3,
        border: `1px solid`,
        borderColor: `border`,
      },
    },
  },
  layout: {
    container: {
      maxWidth: `1180px`,
      px: [3, 4, 5],
      width: `100%`,
    },
    content: {
      "> :first-of-type": {
        mt: 0,
      },
    },
  },
  links: {
    subtle: {
      color: `subtle`,
      fontWeight: 500,
      textDecoration: `none`,
      "&:hover": {
        color: `primary`,
        textDecoration: `underline`,
      },
    },
    primary: {
      backgroundColor: `primary`,
      color: `surface`,
      px: 4,
      py: 3,
      borderRadius: `pill`,
      fontWeight: 600,
      textDecoration: `none`,
      display: `inline-flex`,
      alignItems: `center`,
      justifyContent: `center`,
      gap: 2,
      boxShadow: `subtle`,
      "&:hover": {
        backgroundColor: `secondary`,
      },
      "&:focus-visible": {
        outline: `none`,
        boxShadow: `outline`,
      },
    },
    secondary: {
      backgroundColor: `surface`,
      color: `primary`,
      px: 4,
      py: 3,
      borderRadius: `pill`,
      fontWeight: 600,
      textDecoration: `none`,
      display: `inline-flex`,
      alignItems: `center`,
      justifyContent: `center`,
      border: `1px solid`,
      borderColor: `border`,
      "&:hover": {
        backgroundColor: `primaryMuted`,
      },
      "&:focus-visible": {
        outline: `none`,
        boxShadow: `outline`,
      },
    },
  },
  buttons: {
    primary: {
      variant: `links.primary`,
    },
    secondary: {
      variant: `links.secondary`,
    },
    muted: {
      backgroundColor: `surfaceAlt`,
      color: `heading`,
      px: 3,
      py: 2,
      borderRadius: `pill`,
      fontWeight: 600,
      border: `1px solid`,
      borderColor: `border`,
      "&:hover": {
        backgroundColor: `muted`,
      },
    },
  },
  cards: {
    raised: {
      backgroundColor: `surface`,
      borderRadius: `lg`,
      boxShadow: `card`,
      p: [4, 5],
      border: `1px solid`,
      borderColor: `border`,
    },
    muted: {
      backgroundColor: `surfaceAlt`,
      borderRadius: `lg`,
      p: [4, 5],
    },
    outline: {
      backgroundColor: `surface`,
      borderRadius: `lg`,
      p: [4, 5],
      border: `2px solid`,
      borderColor: `primaryMuted`,
    },
  },
  badges: {
    tag: {
      px: 3,
      py: 1,
      borderRadius: `pill`,
      fontSize: 1,
      fontWeight: 600,
      backgroundColor: `badgeBg`,
      color: `badgeText`,
      textTransform: `capitalize`,
      letterSpacing: `0.02em`,
    },
  },
  forms: {
    input: {
      borderRadius: `pill`,
      border: `1px solid`,
      borderColor: `border`,
      px: 4,
      py: 3,
      fontSize: 2,
      backgroundColor: `surface`,
      transition: `all 0.2s ease`,
      "&:focus": {
        outline: `none`,
        borderColor: `primary`,
        boxShadow: `outline`,
      },
    },
  },
  dividers: {
    bottom: {
      borderBottom: `1px solid`,
      borderColor: `border`,
      pb: 3,
    },
  },
  copyButton: {
    backgroundColor: `surface`,
    color: `heading`,
    border: `1px solid`,
    borderColor: `border`,
    borderRadius: `pill`,
    px: 3,
    py: 2,
    fontSize: 1,
    cursor: `pointer`,
    transition: `transform 0.15s ease, background-color 0.15s ease`,
    "&:hover": {
      backgroundColor: `primaryMuted`,
    },
    "&:focus-visible": {
      outline: `none`,
      boxShadow: `outline`,
    },
  },
} as ExtendedTheme) as ExtendedTheme;

export default brandTheme;
