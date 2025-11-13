# Analytics Dashboard with Chat Interface

## Overview

This is a full-stack analytics dashboard application featuring interactive data visualizations and a natural language chat interface for querying invoice and vendor data. The application consists of two main modules:

1. **Interactive Analytics Dashboard** - Displays key metrics, trends, and visualizations for invoice and vendor data
2. **Chat with Data Interface** - Enables natural language queries against the dataset using AI

The application uses a modern tech stack with React/Vite on the frontend, Express on the backend, and PostgreSQL (via Neon serverless) for data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **Vite + React** with TypeScript for fast development and optimized production builds
- **wouter** for lightweight client-side routing (Dashboard and Chat pages)
- **@tanstack/react-query** for server state management and data fetching

**UI Design System**
- **shadcn/ui** component library built on Radix UI primitives
- **TailwindCSS** for styling with custom design tokens
- **Material Design + Modern Analytics** aesthetic (Linear/Vercel/Stripe-inspired)
- Design guidelines documented in `design_guidelines.md` emphasizing data-first hierarchy, professional typography (Inter font), and consistent spacing

**Component Structure**
- Reusable chart components (InvoiceTrendChart, VendorSpendChart, CategorySpendChart, CashOutflowChart)
- Data display components (OverviewCards, InvoicesTable)
- ChatInterface component for natural language queries
- Shared UI components from shadcn/ui in `client/src/components/ui/`

**State Management**
- React Query for server state with custom query client configuration
- Local component state for UI interactions
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running on Node.js
- Custom middleware for request logging and JSON parsing
- Route handlers in `server/routes.ts` exposing REST APIs

**API Endpoints**
- `/api/stats` - Overview statistics (total spend, invoice count, etc.)
- `/api/invoice-trends` - Time-series data for invoice volume and value
- `/api/vendors/top10` - Top vendors by spend
- `/api/category-spend` - Spending breakdown by category
- `/api/cash-outflow` - Cash outflow forecast data
- `/api/invoices` - Paginated invoice listing with search
- `/api/chat-with-data` - Natural language query endpoint (planned for AI integration)

**Data Layer**
- `server/storage.ts` provides abstraction layer (IStorage interface) for all database operations
- Type-safe CRUD operations for vendors, customers, invoices, line items, and payments
- Business logic for analytics aggregations and calculations

### Data Storage

**Database Technology**
- **PostgreSQL** via Neon Serverless (@neondatabase/serverless)
- Connection pooling for performance
- WebSocket-based connectivity for serverless environments

**ORM & Schema Management**
- **Drizzle ORM** for type-safe database queries
- Schema defined in `shared/schema.ts` with Zod validation
- Database migrations managed via `drizzle-kit` (configured in `drizzle.config.ts`)

**Data Model**
- `vendors` - Vendor master data (name, contact info, tax ID)
- `customers` - Customer information
- `invoices` - Invoice headers (number, dates, amounts, status, category)
- `line_items` - Invoice line item details
- `payments` - Payment transaction records

All tables use serial primary keys with appropriate foreign key relationships. The schema supports the JSON data structure from `Analytics_Test_Data.json` normalized into relational tables.

**Seeding & Test Data**
- `server/seed.ts` provides utilities to generate sample data
- Supports ingestion from provided JSON dataset structure

### Authentication & Authorization

Currently not implemented. The application is designed for internal use without user authentication. Future implementations may add session-based or token-based auth.

## External Dependencies

**Database Service**
- Neon Serverless PostgreSQL (required via DATABASE_URL environment variable)
- Uses WebSocket connections for serverless compatibility

**UI Component Libraries**
- Radix UI primitives (@radix-ui/*) - Accessible component foundations
- Recharts - Chart rendering library
- Lucide React - Icon system

**Development Tools**
- Vite plugins for Replit integration (@replit/vite-plugin-*)
- TypeScript for type safety across frontend and backend
- ESBuild for backend bundling in production

**Planned AI Integration**
- Chat interface designed for integration with Vanna AI or similar LLM service
- Groq API potentially for natural language to SQL conversion
- Current implementation includes placeholder chat functionality to be replaced with actual AI backend

**Styling & Design**
- Google Fonts CDN for Inter font family
- TailwindCSS with PostCSS for style processing
- Custom CSS variables for theming (light/dark mode support built-in)

**Build & Deployment**
- Production build generates static frontend assets in `dist/public`
- Backend bundled to `dist/index.js` for deployment
- Environment variables required: DATABASE_URL