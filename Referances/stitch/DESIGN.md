---
name: Ethereal Logic
colors:
  surface: '#131026'
  surface-dim: '#131026'
  surface-bright: '#3a364e'
  surface-container-lowest: '#0e0b21'
  surface-container-low: '#1c192f'
  surface-container: '#201d33'
  surface-container-high: '#2a273e'
  surface-container-highest: '#35324a'
  on-surface: '#e5defe'
  on-surface-variant: '#ccc3d2'
  inverse-surface: '#e5defe'
  inverse-on-surface: '#312d45'
  outline: '#968e9c'
  outline-variant: '#4a4450'
  surface-tint: '#d8b9ff'
  primary: '#d8b9ff'
  on-primary: '#401972'
  primary-container: '#a57edb'
  on-primary-container: '#390f6b'
  inverse-primary: '#714ba4'
  secondary: '#d6baff'
  on-secondary: '#430089'
  secondary-container: '#5a27a1'
  on-secondary-container: '#c8a4ff'
  tertiary: '#d7baff'
  on-tertiary: '#3c2261'
  tertiary-container: '#a084c9'
  on-tertiary-container: '#351b5a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eddcff'
  primary-fixed-dim: '#d8b9ff'
  on-primary-fixed: '#290055'
  on-primary-fixed-variant: '#58338a'
  secondary-fixed: '#ecdcff'
  secondary-fixed-dim: '#d6baff'
  on-secondary-fixed: '#280057'
  on-secondary-fixed-variant: '#5a27a1'
  tertiary-fixed: '#eddcff'
  tertiary-fixed-dim: '#d7baff'
  on-tertiary-fixed: '#27094b'
  on-tertiary-fixed-variant: '#543a79'
  background: '#131026'
  on-background: '#e5defe'
  surface-variant: '#35324a'
  void-base: '#131026'
  void-surface: '#1F1A40'
  ethereal-glow: '#8B65BF'
  deep-core: '#5F2DA6'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1280px
---

## Brand & Style

This design system embodies the "Agentic AI Engineer" aesthetic—a fusion of high-level technical precision and mystical atmospheric depth. The brand personality is intellectual, autonomous, and visionary. It targets a sophisticated audience of developers, AI researchers, and tech-forward stakeholders who value both rigorous engineering and avant-garde digital experiences.

The visual style is **Glassmorphism mixed with Minimalism**. It utilizes deep, dark backgrounds to create an "infinite space" feel, where UI elements appear as high-precision instruments floating on translucent glass planes. The use of vibrant violet accents against midnight foundations evokes a sense of "the ghost in the machine"—representing the unseen but powerful logic of agentic AI.

## Colors

The palette is rooted in a "Dark Atmospheric" theme. The primary color, **Ethereal Glow (#8B65BF)**, is used for interactive elements and high-priority information, providing a luminous contrast against the dark background. 

The background utilizes a layered "Void" approach: **Void Base (#131026)** for the deepest background layer and **Void Surface (#1F1A40)** for container elements. This creates a natural hierarchy through color depth rather than traditional shadows. Secondary and tertiary violets are reserved for subtle gradients, hover states, and decorative "circuit-line" accents that reinforce the engineering aesthetic.

## Typography

The typography system strikes a balance between human-centric design and technical utility. 

- **Manrope** is used for headlines to provide a modern, balanced, and professional tone.
- **Hanken Grotesk** serves as the primary body face, offering exceptional legibility with a sharp, contemporary edge.
- **JetBrains Mono** is utilized for metadata, labels, and "agentic status" indicators to reinforce the engineering and developer-centric narrative.

Large display titles should use tighter letter spacing to feel "locked-in" and engineered, while body text maintains generous leading for readability against dark backgrounds.

## Layout & Spacing

This design system uses a **Fixed Grid** approach for content clarity, centered within a fluid viewport. The layout relies on a 12-column system for desktop with 24px gutters, ensuring a rigorous, structured alignment that mirrors architectural blueprints.

In line with the header reference, the layout should utilize a horizontal, "dashboard-style" distribution. Elements are spaced generously to avoid clutter, emphasizing the "Minimalist" brand pillar. On mobile, the 12 columns collapse to a 4-column grid, and horizontal margins are reduced to 20px. Vertical rhythm is strictly governed by a 4px baseline unit.

## Elevation & Depth

Depth is conveyed through **Glassmorphism and Tonal Layering**. Instead of traditional black shadows, this system uses:

1.  **Backdrop Blurs:** Surfaces (cards, navigation bars) utilize a 20px-32px blur with a semi-transparent fill of the `void-surface` color.
2.  **Inner Glows:** Subtle 1px inner borders (stroke) in a lighter violet or white at 10% opacity simulate light hitting the edge of a glass pane.
3.  **Vibrant Blurs:** Soft, out-of-focus violet "orbs" are placed deep in the background layers to create a sense of atmospheric mystery and light source.
4.  **Low-Contrast Outlines:** Interactive elements use `ethereal-glow` at low opacity (20%) for borders rather than heavy dropshadows.

## Shapes

The shape language is "Soft-Tech." While the overall aesthetic is professional and structured, slightly rounded corners (0.25rem - 0.75rem) are used to prevent the UI from feeling too aggressive or "Brutalist." 

Buttons and input fields use the standard `soft` radius (4px), while larger containers and cards use `rounded-lg` (8px) to provide a clear container hierarchy. Icons should follow a consistent stroke weight (1.5px) and use square terminations rather than round ones to maintain the engineering precision.

## Components

### Buttons
Primary buttons use a solid `ethereal-glow` fill with dark text. Secondary buttons use a ghost style: a 1px border of `ethereal-glow` with a 5% background tint on hover.

### Cards
Cards are the primary container. They must feature a backdrop filter (blur) and a subtle 1px top-border gradient to simulate a glass edge. Background color should be a semi-transparent version of `void-surface`.

### Input Fields
Inputs are dark with a `void-base` fill. The focus state is defined by a 1px `ethereal-glow` border and a soft outer glow (4px spread) of the same color.

### Chips & Status Indicators
Chips use `JetBrains Mono` for the label. "Active" agents or processes are indicated by a pulsing glow animation using the `ethereal-glow` color, reinforcing the "live" nature of the AI.

### Navigation
The header should be fixed with a high backdrop blur. Following the reference image, navigation items are spaced widely with clear, high-contrast typography and icon triggers (like the star and menu icons) in a minimalist monochrome or primary violet.