---
name: Data Processing System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cedbf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee9ff'
  surface-container-highest: '#d7e3fb'
  on-surface: '#101c2d'
  on-surface-variant: '#434654'
  inverse-surface: '#253143'
  inverse-on-surface: '#ebf1ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#00bdfd'
  on-secondary-container: '#004964'
  tertiary: '#7b2600'
  on-tertiary: '#ffffff'
  tertiary-container: '#a33500'
  on-tertiary-container: '#ffc6b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#c3e8ff'
  secondary-fixed-dim: '#7ad0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812800'
  background: '#f9f9ff'
  on-background: '#101c2d'
  surface-variant: '#d7e3fb'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  table-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '450'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
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
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is engineered for high-performance data processing environments where clarity, speed, and precision are paramount. The brand personality is professional, systematic, and reliable, aiming to reduce cognitive load for users managing complex datasets. 

The aesthetic follows a **Corporate / Modern** style. It prioritizes functional minimalism, using generous white space to separate dense data points and a structured hierarchy to guide the user's eye. The interface feels like a precision instrument—stable and unobtrusive—allowing the data to take center stage while providing a "calm" user experience through balanced proportions and a refined color palette.

## Colors

The color strategy for this design system utilizes a foundation of "Professional Blues" and "Technical Grays." 

- **Primary Blue:** A deep, authoritative blue used for primary actions and brand presence.
- **Loading Blue:** A vibrant, energetic secondary blue reserved specifically for progress indicators and active processing states, ensuring users can immediately identify "work in progress."
- **Success Green:** A balanced, highly visible green for positive confirmations and completed tasks.
- **Neutrals:** A sophisticated scale of cool grays. Backgrounds use very light tints to differentiate surface levels, while text uses high-contrast grays for maximum legibility.

## Typography

This design system employs a dual-font strategy to balance modern aesthetics with technical utility. 

**Manrope** is used for headlines to provide a refined, contemporary feel that distinguishes sections and provides a clear entry point for the eye. 

**Inter** is the workhorse for all body text, data tables, and UI labels. It is chosen for its exceptional readability at small sizes and its "tabular num" features, which ensure that columns of numbers in data tables align perfectly for easy scanning and comparison. Text weight is intentionally slightly heavier for data rows (450) to maintain crispness on various display types.

## Layout & Spacing

The layout is built on a **12-column fixed grid** that transitions to a fluid model for internal card content. This ensures consistency across different screen resolutions while maintaining a controlled maximum width for data density management.

A strict 4px baseline grid governs all spacing. Vertical rhythm is maintained by using 16px (sm) and 24px (md) increments for most component relationships. Data tables use a "compact" density setting with 8px vertical padding to maximize information density without sacrificing touch/click targets.

## Elevation & Depth

Visual hierarchy in this design system is achieved through **Tonal Layers** and **Subtle Ambient Shadows**. 

The main canvas is the lowest level (Level 0). Cards and sections sit on Level 1, utilizing a white background and a very fine, 1px light gray border to define boundaries. Elevation is reinforced with low-opacity, wide-spread shadows (0px 4px 12px rgba(0, 0, 0, 0.05)) to suggest a slight lift without creating visual clutter. 

For interactive elements like dropdowns and modals, a higher elevation (Level 2) is used with a more pronounced shadow to indicate they are temporary overlays sitting above the data plane.

## Shapes

The design system utilizes **Soft** roundedness (0.25rem / 4px). This subtle rounding strikes a balance between the "mathematical" precision of sharp corners and the "friendly" nature of fully rounded shapes. 

- **Standard Components:** Buttons, input fields, and checkboxes use a 4px radius.
- **Containers:** Large section cards use a slightly more pronounced 8px (rounded-lg) to soften the overall structure of the page.
- **Progress Bars:** These feature fully rounded ends (pill-shaped) to distinguish them as dynamic, status-driven elements rather than static structural boxes.

## Components

### Natural Language Query (NLQ) Text Area
The prominent text area is the focal point of the application. It features a larger-than-standard font size (body-lg) and a thicker 2px primary blue border when focused. It includes a subtle "glow" effect (soft primary blue outer shadow) to signal its importance as the primary entry point for data processing.

### Data Tables
Tables are designed for high-volume information. They utilize zebra-striping (alternating light gray rows) for horizontal tracking. Header cells are pinned (sticky) and use the `label-sm` typography with a distinct bottom border to separate control from content.

### Progress Bars
Progress bars use a two-tone blue approach: a pale blue track with a vibrant "Loading Blue" fill. For active processing, an animated diagonal stripe pattern overlays the fill to provide immediate visual feedback that the system is working.

### Cards
Cards are the primary structural unit. They must include a header section with a title in `headline-md` and an optional "actions" area for secondary buttons or dropdowns. 

### Buttons & Dropdowns
Buttons use solid fills for primary actions and ghost (outline) styles for secondary actions. Dropdowns include a subtle chevron-down icon and utilize the Level 2 elevation for the menu list, ensuring it clears the card boundaries.