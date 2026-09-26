# Visual & Technical Media Strategy

**Target Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Objective:** Enhance image search visibility, social preview fidelity, and technical conceptual clarity.

---

## 1. Visual Asset Inventory & Specifications

| Asset Name | Dimensions | Format | Purpose & Implementation |
| :--- | :--- | :--- | :--- |
| `og-image.png` | 1200 x 630 px | PNG (Compressed) | High-contrast OpenGraph card displayed on Twitter, Discord, Reddit, and LinkedIn embeds. |
| `apple-icon.png` | 180 x 180 px | PNG | iOS Home Screen bookmark icon. |
| `icon.png` | 32 x 32 px | PNG | High-DPI browser tab favicon. |

---

## 2. Technical Diagrams & Infographics Roadmap

### Diagram 1: Token Anatomy Infographic
* **Concept:** Annotated visual breakdown showing:
  * `<t:` (Opening bracket and temporal token indicator)
  * `1727280000` (10-digit POSIX Unix seconds integer)
  * `:R` (Optional style flag preceded by colon)
  * `>` (Closing bracket delimiter)
* **Optimization:** Clean SVG vector format, dark mode theme matching Discord dark interface, descriptive `<title>` and `aria-label`.

### Diagram 2: Client-Side Timezone Resolution Flowchart
* **Concept:** Diagram showing how a single message posted to a Discord server branches into three separate device clocks (New York at 8:00 PM, London at 1:00 AM, Tokyo at 10:00 AM) via `Intl.DateTimeFormat`.
* **Alt Text:** "Flowchart illustrating how Discord server messages convert a single Unix epoch timestamp into local viewer device times across different continents."

---

## 3. Image Optimization & SEO Rules

1. **Descriptive Filenames:** Never use generic names like `image1.png` or `screenshot-12.png`. Use keyword-rich, hyphenated names like `discord-timestamp-syntax-breakdown.svg` or `discord-relative-time-preview.png`.
2. **Accessible Alt Attributes:** Every `<img>` tag must include context-specific alt text explaining the technical concept. Never leave alt empty or repeat the title tag verbatim.
3. **Zero Layout Shift (CLS Protection):** Explicit `width` and `height` attributes must be declared on all image tags or Next.js `<Image />` components.
