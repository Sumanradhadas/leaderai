# Design Guidelines: Multi-Tenant Political Campaign Platform

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern political campaign websites (Obama 2020, Biden 2020), action platforms (Change.org, ActBlue), and civic engagement sites. The design must convey credibility, inspire action, and adapt seamlessly to different party branding while maintaining professional standards.

---

## Core Design Principles

1. **Bold & Inspiring**: Create emotional connection through impactful imagery and messaging
2. **Action-Oriented**: Every section drives users toward generating and sharing AI photos
3. **Trustworthy**: Professional design that reflects campaign credibility
4. **Flexible Theming**: Structure that adapts to any party's colors and branding
5. **Mobile-First**: Campaign supporters access content on-the-go

---

## Layout System

**Spacing Units**: Use Tailwind spacing units of 4, 6, 8, 12, 16, and 24 (e.g., p-4, m-8, gap-6, py-16, px-24)

**Container Strategy**:
- Full-width sections with inner `max-w-7xl mx-auto px-6`
- Content sections: `max-w-6xl`
- Text-heavy areas (manifesto): `max-w-4xl`

**Vertical Rhythm**:
- Section padding: `py-16 lg:py-24`
- Component spacing: `space-y-8` to `space-y-12`
- Element gaps: `gap-6` to `gap-8`

---

## Typography

**Font Families** (via Google Fonts):
- **Headlines**: Inter Bold (700-900) - modern, authoritative
- **Body**: Inter Regular/Medium (400-500) - highly readable
- **Accent/Slogans**: Instrument Sans Bold (700) - distinctive campaign feel

**Type Scale**:
- Hero Headline: `text-5xl lg:text-7xl font-black leading-tight`
- Section Titles: `text-3xl lg:text-5xl font-bold`
- Subsection Headers: `text-2xl lg:text-3xl font-bold`
- Body Large: `text-lg lg:text-xl`
- Body: `text-base lg:text-lg`
- Small Text: `text-sm`
- CTA Buttons: `text-lg font-semibold`

---

## Campaign Site Structure

### 1. Hero Section (100vh, Full Bleed)
**Layout**: Full-screen impact with leader's image as background
- Large hero image of the political leader (professional, inspiring pose)
- Blurred overlay for text readability
- Centered content with leader name, party affiliation, and campaign slogan
- Primary CTA: "Create Your [Leader Name] Photo" (large button with blurred background)
- Secondary element: Token counter badge (small, top-right corner)

### 2. About/Message Section
**Layout**: Two-column on desktop (60/40 split), stacked on mobile
- Left: Leader's portrait photo (rounded, professional)
- Right: Brief message/bio with campaign highlights
- Include party logo prominently
- Background: Subtle gradient or pattern using party colors

### 3. AI Photo Generator Section (Primary Feature)
**Layout**: Centered, max-w-4xl
- **Upload Area**: Large dropzone with icon and clear instructions
- **Template Grid**: 3-column grid on desktop, 2 on tablet, 1 on mobile
  - Each template card: thumbnail, template name, "Use This Template" button
  - Cards have hover states showing template preview
- **Generation Preview**: Modal overlay showing loading state and final result
- **Download/Share Panel**: Post-generation with download button and pre-written social captions with hashtags
- Token counter: Persistent display showing remaining balance

### 4. How It Works Section
**Layout**: Three-column grid (stacks on mobile)
- Step 1, 2, 3 cards with large numbers, icons, and brief descriptions
- Visual progression indicators between steps
- Simple, digestible instructions

### 5. Gallery/Examples Section
**Layout**: Masonry grid showcasing generated images
- 4-column on desktop, 3 on tablet, 2 on mobile
- Real user-generated examples (or placeholder examples)
- Subtle hover zoom effect
- Optional: Social media handles/testimonials overlay

### 6. Manifesto Section
**Layout**: Single column, max-w-4xl centered
- Bold section title: "[Leader Name]'s Vision for [Region/Country]"
- Rich text content with subheadings for different policy areas
- Use party colors for section dividers
- Key points highlighted with custom bullet styling
- Optional: Statistics cards or infographics for key campaign promises

### 7. Footer
**Layout**: Three-column on desktop, stacked on mobile
- Column 1: Campaign logo, brief tagline
- Column 2: Quick links (About, Contact, Privacy Policy, Terms)
- Column 3: Social media icons and campaign contact info
- Bottom bar: Copyright, "Powered by [Your Platform Name]"

---

## Admin Panel Design (Separate Interface)

**Approach**: Dashboard-style, utility-focused design
- **Layout**: Sidebar navigation (collapsible on mobile)
  - Dashboard overview
  - Campaign selector dropdown (manage multiple leaders)
  - Token management
  - Content editor
  - Template manager
  - Generation logs
  - Settings

**Dashboard Cards**:
- Token balance overview with usage chart
- Recent generations timeline
- Quick stats (total generations, popular templates, remaining tokens)
- Quick actions (add tokens, upload template, edit content)

**Content Editor**:
- Live preview panel alongside form inputs
- Sections: Leader info, Hero content, Manifesto, Footer
- Color picker for party color customization
- Image upload areas with current image previews

**Template Manager**:
- Grid view of all templates with edit/delete actions
- Add new template form: name, main image, thumbnail, generation prompt
- Template preview functionality

**Generation Logs**:
- Table view with filters (date range, template used)
- Columns: Timestamp, Template, Tokens Used, Status
- Export functionality

---

## Component Library

### Buttons
**Primary CTA**: Large rounded buttons with subtle shadow, bold text
**Secondary**: Outlined buttons with border using party color
**Sizes**: Small (px-4 py-2), Medium (px-6 py-3), Large (px-8 py-4)

### Cards
**Template Cards**: Rounded corners, subtle shadow, hover lift effect
**Info Cards**: Minimal borders, generous padding
**Dashboard Cards**: Clean with header section and content area

### Forms
**Input Fields**: Rounded, medium height, clear labels above
**Upload Zone**: Dashed border, large target area, icon-based feedback
**Color Picker**: Native with real-time preview

### Navigation
**Campaign Site**: Sticky header with logo, optional menu links (About, Manifesto, Generate), CTA button
**Admin Panel**: Fixed sidebar with icon+text navigation items

### Modals/Overlays
**Generation Modal**: Centered, max-w-2xl, with close button
**Loading States**: Spinner with descriptive text and token deduction notice

### Badges
**Token Counter**: Pill-shaped badge with icon and count
**Status Indicators**: Success/error states for generation feedback

---

## Images

### Hero Image
- **Location**: Full-bleed background for hero section
- **Description**: High-resolution, professional photograph of the political leader in inspiring setting (podium, rally, patriotic background). Should convey leadership, confidence, and connection with people
- **Treatment**: Slightly darkened overlay (40% opacity) for text readability

### Leader Portrait
- **Location**: About/Message section
- **Description**: Professional headshot or mid-body portrait, approachable expression
- **Treatment**: Rounded corners, subtle shadow

### Template Thumbnails
- **Location**: Template selection grid
- **Description**: Preview images showing what the generated result will look like (leader with supporters, campaign materials, social media frames)
- **Treatment**: Consistent aspect ratio, subtle border

### Example Gallery
- **Location**: Gallery/Examples section
- **Description**: User-generated images or mockups showing various template results
- **Treatment**: Varied sizes in masonry layout, hover zoom

### Party Logo
- **Location**: About section, footer, admin panel
- **Description**: Official party logo or campaign emblem
- **Treatment**: Transparent background, appropriate sizing

---

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (2-column where appropriate)
- Desktop: > 1024px (full multi-column layouts)

**Key Adaptations**:
- Hero text scales down significantly on mobile
- Template grid reduces columns
- Admin sidebar collapses to hamburger menu
- Form inputs become full-width on mobile

---

## Accessibility

- Semantic HTML throughout
- ARIA labels for interactive elements
- Keyboard navigation support for all actions
- Focus states clearly visible
- Alt text for all images
- High contrast maintained in all party color schemes

---

## Theming System

Design must accommodate dynamic party colors:
- Primary color: Main party color (buttons, accents, links)
- Secondary color: Complementary shade (hover states, backgrounds)
- Neutral base: Always use same gray scale for text and borders
- Ensure contrast ratios meet WCAG AA standards regardless of party colors chosen