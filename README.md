# The Force Directory

## Description

A web application that displays Star Wars character data from the SWAPI (Star Wars API) in a responsive and interactive table format. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive data table with Star Wars characters information
- Multiple filtering options:
  - Text search by character name
  - Faceted filter for eye colors
  - Range filters for height and mass
- Sorting capabilities on multiple columns
- Load more functionality for pagination
- Dark/Light mode toggle
- Mobile-responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn or pnpm

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── app/                  # Next.js app directory
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── data-table/      # Table components
│   └── mode-toggle.tsx  # Theme toggle component
├── lib/                 # Utilities and configurations
└── styles/              # Global styles
```

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- TanStack Table
- SWAPI (Star Wars API)

## Features Implementation

- **Data Display**: Implemented using TanStack Table with Shadcn/ui components for a responsive and accessible table layout
- **Filtering**: Multiple filter types (text search, faceted, range) with real-time updates
- **Sorting**: Multi-column sorting with clickable column headers
- **Load More**: Incremental data loading with a load more button
- **Theme**: System-aware dark/light mode with manual override option

## License

This project is open source and available under the MIT License.
