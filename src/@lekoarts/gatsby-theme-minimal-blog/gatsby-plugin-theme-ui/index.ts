import { merge, Theme, ThemeUIStyleObject } from "theme-ui";
import tailwind from "@theme-ui/preset-tailwind";

declare module "theme-ui" {
  // allow custom theme keys without TS complaints
  interface Theme {
    cards?: Record<string, ThemeUIStyleObject>;
    layout?: ThemeUIStyleObject & {
      container?: ThemeUIStyleObject;
      content?: ThemeUIStyleObject;
    };
    gradients?: Record<string, string>;
    badges?: Record<string, ThemeUIStyleObject>;
    copyButton?: ThemeUIStyleObject;
    dividers?: Record<string, ThemeUIStyleObject>;
  }
}

const glassShadow = `0 18px 48px rgba(0, 0, 0, 0.4)`;
const neonGlow = `0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)`;
const neonGlowMagenta = `0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)`;

const brandTheme = merge(tailwind, {
  config: {
    initialColorModeName: `dark`,
    useColorSchemeMediaQuery: false,
  },
  colors: {
    // Cyberpunk Dark Theme
    text: `#e0e0ff`,
    heading: `#ffffff`,
    background: `#0a0a0f`,
    surface: `#0f0f1a`,
    surfaceAlt: `#151520`,
    primary: `#00ffff`,
    primaryMuted: `rgba(0, 255, 255, 0.1)`,
    secondary: `#ff00ff`,
    accent: `#00ffff`,
    muted: `#1a1a2e`,
    subtle: `#a0a0c0`,
    border: `#252540`,
    highlightLineBg: `rgba(0, 255, 255, 0.12)`,
    badgeBg: `rgba(0, 255, 255, 0.15)`,
    badgeText: `#e0e0ff`,
    cardShadow: `rgba(0, 0, 0, 0.5)`,
    tocBg: `#0f0f1a`,
    codeBg: `#151520`,
    codeText: `#00ff9d`,
    link: `#00ffff`,
    navBg: `rgba(10, 10, 15, 0.95)`,
    focus: `#ff00ff`,
    modes: {
      dark: {
        text: `#e0e0ff`,
        heading: `#ffffff`,
        background: `#0a0a0f`,
        surface: `#0f0f1a`,
        surfaceAlt: `#151520`,
        primary: `#00ffff`,
        primaryMuted: `rgba(0, 255, 255, 0.1)`,
        secondary: `#ff00ff`,
        accent: `#00ffff`,
        muted: `#1a1a2e`,
        subtle: `#a0a0c0`,
        border: `#252540`,
        highlightLineBg: `rgba(0, 255, 255, 0.12)`,
        badgeBg: `rgba(0, 255, 255, 0.15)`,
        badgeText: `#e0e0ff`,
        cardShadow: `rgba(0, 0, 0, 0.5)`,
        tocBg: `#0f0f1a`,
        codeBg: `#151520`,
        codeText: `#00ff9d`,
        link: `#00ffff`,
        navBg: `rgba(10, 10, 15, 0.95)`,
        focus: `#ff00ff`,
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
    body: 1.7,
    heading: 1.25,
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
    subtle: `0 4px 18px rgba(0, 0, 0, 0.4)`,
    outline: `0 0 0 4px rgba(0, 255, 255, 0.2)`,
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
        backgroundColor: `rgba(0, 255, 255, 0.3)`,
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
          textShadow: `0 0 8px rgba(0, 255, 255, 0.5)`,
        },
      },
    },
    p: {
      fontSize: [2, 2, 3],
      color: `subtle`,
      lineHeight: `body`,
      letterSpacing: `-0.01em`,
      mt: 0,
      mb: 4,
    },
    h1: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [5, 6, 6, 7],
      fontWeight: 700,
      letterSpacing: `-0.02em`,
      mt: 5,
      mb: 4,
    },
    h2: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [4, 5, 5, 6],
      fontWeight: 600,
      letterSpacing: `-0.01em`,
      mt: 5,
      mb: 3,
    },
    h3: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [3, 4, 4, 5],
      fontWeight: 600,
      letterSpacing: `-0.01em`,
      mt: 5,
      mb: 3,
    },
    h4: {
      fontFamily: `heading`,
      color: `heading`,
      fontSize: [2, 3, 3, 4],
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
        fontSize: [2, 2, 3],
        lineHeight: `body`,
      },
    },
    ol: {
      pl: 4,
      color: `subtle`,
      li: {
        mb: 3,
        fontSize: [2, 2, 3],
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
}) as Theme;

export default brandTheme;
