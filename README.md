## Getting Started

First, run the development server:

```bash
npm install

npm run dev

# or

yarn

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack & What Stands Out

This project demonstrates modern React/Next.js architecture with two distinct rendering approaches:

### **Core Technologies**

- **Next.js 15.5.4** - Latest version with App Router
- **React 19.1.0** - Latest React with modern features
- **TypeScript 5.x** - Full type safety with strict configuration
- **Tailwind CSS v4** - Latest utility-first styling
- **SWR** - Efficient data fetching with caching

### **Key Architectural Highlights**

#### **1. Dual Rendering Strategy**

- **`/pokemon-csr`** - Client-Side Rendering with React hooks
- **`/pokemon-ssr`** - Server-Side Rendering with hybrid components
- **Identical functionality** across both approaches
- **Easy comparison** via built-in page switcher

#### **2. Advanced React Patterns**

- **Custom Hooks** - Separated concerns (`usePokemonData`, `usePokemonFilter`)
- **Component Composition** - Reusable UI across CSR/SSR
- **URL State Management** - Shareable, bookmarkable filter states
- **Error Boundaries** - Graceful error handling

#### **3. Performance Optimizations**

- **Server-side data fetching** with `fetch` API
- **Client-side caching** with SWR
- **Dynamic imports** for route-based code splitting
- **Optimized filtering** - Pokemon matching 2+ selected types

#### **4. Developer Experience**

- **Clean Architecture** - Separated data, UI, and navigation logic
- **Type Safety** - Full TypeScript coverage
- **Code Reuse** - Shared components between CSR/SSR
- **Maintainable** - Single source of truth for URL manipulation

#### **5. Modern Next.js Features**

- **App Router** - Latest routing paradigm
- **Server Components** - Optimal performance
- **Client Components** - Strategic interactivity
- **Dynamic rendering** - Force dynamic for search params

## Features

### **Core Functionality**

- **Pokemon Filtering** - Filter by multiple types simultaneously
- **Smart Pagination** - Navigate through filtered results
- **URL State** - Shareable and bookmarkable filter combinations
- **Responsive Design** - Works across desktop and mobile

## Project Structure

```
src/
├── app/
│   ├── pokemon-csr/          # Client-Side Rendering page
│   ├── pokemon-ssr/          # Server-Side Rendering page
│   └── page.tsx              # Homepage (redirects to CSR)
├── components/
│   ├── base/                 # Reusable UI components
│   ├── composite/            # Complex composed components
│   ├── csr/                  # CSR-specific components & hooks
│   ├── ssr/                  # SSR-specific components
│   └── common/               # Shared utilities (PageSwitcher)
└── lib/
    ├── common.ts             # Shared utility functions
    ├── fetcher.ts            # API fetching utilities
    ├── url.ts                # URL manipulation utilities
```

## Time Tracking

**Total Development Time: ~6 hours**

- **Setup & Planning** (30 min) - Project structure, requirements analysis
- **Core Components** (2 hours) - Pokemon list, filters, pagination, shared components
- **CSR Implementation** (1 hour) - Hooks, SWR integration, URL state management
- **SSR Implementation** (1.5 hours) - Server components, data fetching, hybrid approach
- **Polish & Testing** (1 hour) - Page switcher, error handling, responsive design
