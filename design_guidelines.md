# Design Guidelines: Analytics Dashboard + Chat Interface

## Design Approach
**System:** Material Design + Modern Analytics (Linear/Vercel/Stripe-inspired)
**Rationale:** Data-dense, utility-focused application requiring clarity, scanability, and professional trust. Drawing from established patterns in modern analytics tools.

**Core Principles:**
- Data-first hierarchy with minimal decoration
- Clear visual separation between metrics, charts, and tables
- Consistent spacing rhythm for scanability
- Professional, trustworthy aesthetic

---

## Typography
**Font Family:** Inter (via Google Fonts CDN)

**Hierarchy:**
- Page Titles: `text-2xl font-semibold` (Dashboard, Chat with Data)
- Section Headers: `text-lg font-medium` (Charts section, Table header)
- Card Titles: `text-sm font-medium uppercase tracking-wide` (metric labels)
- Card Values: `text-3xl font-bold` (large numbers)
- Body/Table Text: `text-sm font-normal`
- Metadata/Labels: `text-xs font-medium` (table headers, chart labels)

---

## Layout System
**Spacing Units:** Tailwind units of `4, 6, 8, 12, 16` (e.g., `p-4`, `gap-6`, `space-y-8`)

**Container Structure:**
```
- App Shell: Full viewport with fixed sidebar (w-64)
- Main Content: `p-8` padding, `max-w-screen-2xl mx-auto`
- Card Padding: `p-6`
- Section Gaps: `space-y-8` between major sections
```

**Grid Layouts:**
- Overview Cards: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6`
- Charts: `grid grid-cols-1 lg:grid-cols-2 gap-8`
- Large Chart (Trend): Full width above grid

---

## Component Library

### Sidebar Navigation
- Fixed left sidebar: `w-64 h-screen`
- Logo/Brand at top: `p-6`
- Navigation items: `px-4 py-3` with `rounded-lg` hover states
- Active state: slightly emphasized background
- Two main items: "Dashboard", "Chat with Data"

### Overview Metric Cards
- Structure: White background, `rounded-lg border shadow-sm`
- Layout: Vertical stack with `space-y-2`
- Label: Top, small uppercase text
- Value: Large bold number, prominently displayed
- Trend indicator: Small percentage with icon (↑/↓) in muted text

### Chart Containers
- White background: `rounded-lg border shadow-sm p-6`
- Header: `flex justify-between items-center mb-6`
- Title on left, time period selector on right (if applicable)
- Chart area: Minimum height `h-80` for visibility

### Data Table
- Container: `rounded-lg border shadow-sm overflow-hidden`
- Search bar: `p-4 border-b` with icon and input field
- Table header: `bg-muted` with `text-xs font-medium uppercase`
- Rows: `hover:bg-muted/50 transition-colors`
- Cell padding: `px-6 py-4`
- Alternating row backgrounds for scanability
- Status badges: `rounded-full px-3 py-1 text-xs font-medium`

### Chat Interface
- Layout: Full height `flex flex-col`
- Messages area: `flex-1 overflow-y-auto p-6 space-y-4`
- Message bubbles: User (right-aligned), Assistant (left-aligned)
- SQL Display: Monospace `font-mono text-sm bg-muted p-4 rounded-lg`
- Results table: Similar to invoice table but more compact
- Input area: Fixed bottom, `border-t p-4` with textarea and send button

### Buttons
- Primary: `px-4 py-2 rounded-lg font-medium`
- Icon buttons: `p-2 rounded-lg`
- Hover states built-in

### Form Inputs
- Search: `rounded-lg border px-4 py-2` with search icon
- Text input: Same treatment, `focus:ring-2 focus:ring-offset-2`
- Select dropdowns: Consistent with input styling

---

## Chart Specifications (Recharts)

**Line Chart (Invoice Trend):**
- Two lines: Invoice count, Total value
- Grid: Subtle horizontal lines
- Tooltip: Clean, rounded, shows both metrics
- Axis labels: Small, clear

**Bar Chart (Top 10 Vendors):**
- Horizontal orientation for long vendor names
- Bars: Rounded corners `rounded-r-md`
- Value labels at end of bars

**Pie Chart (Category Spend):**
- Donut variant with center total
- Legend: Right side, compact
- Segment labels: Percentage + category

**Bar Chart (Cash Outflow):**
- Vertical bars by time period
- Grouped/stacked if multiple categories
- Gridlines for value reference

---

## Animations
**Minimal approach:**
- Chart entry: Simple fade-in on data load
- Card hover: Subtle shadow lift `hover:shadow-md transition-shadow`
- No decorative animations

---

## Images
**Not applicable** - This is a data-driven dashboard without hero imagery. Focus is entirely on data visualization and functional UI elements. All visual interest comes from data presentation, charts, and clean component design.

---

## Responsive Behavior
- **Mobile (< 768px):** Sidebar collapses to icon-only or drawer, cards stack vertically
- **Tablet (768px - 1024px):** 2-column card grid, stacked charts
- **Desktop (> 1024px):** Full 4-column card grid, 2-column chart layout