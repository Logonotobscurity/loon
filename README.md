# Business Intelligence GPT Landing Page

A modern, responsive landing page for a Business Intelligence GPT application featuring conversational AI, marketplace integration, and advanced analytics capabilities.

## Quick Setup Guide

### Prerequisites
- Node.js 18+ (see .nvmrc for exact version)
- npm or pnpm

### Installation & Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

3. **Get your Google AI API key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Generate a new API key
   - Add it to your `.env` file: `VITE_GOOGLE_GENERATIVE_AI_API_KEY=your_actual_key`

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run cy:open` - Open Cypress E2E tests
- `npm run storybook` - Start Storybook

## Environment Configuration

Required environment variables:
- `VITE_GOOGLE_GENERATIVE_AI_API_KEY` - Required for AI functionality
- `VITE_API_TIMEOUT` - Optional (default: 30000ms)
- `VITE_MAX_RETRIES` - Optional (default: 3)

## Troubleshooting

### Common Issues

1. **"Cannot read properties of null" errors**: Ensure your API key is set in `.env`
2. **Build failures**: Check Node.js version matches .nvmrc
3. **TypeScript errors**: Run `npm run build` to check for type issues
4. **Missing dependencies**: Delete `node_modules` and `package-lock.json`, then run `npm install`

### Resetting Local Development
```bash
rm -rf node_modules package-lock.json
npm install
cp .env.example .env
# Update .env with your keys
npm run dev
```

## Codebase Structure

This section provides a detailed overview of the project's codebase structure.

The project is organized into several key directories, each with a specific purpose:

- **`src/`**: This directory contains the main source code for the application.
    - **`components/`**: Houses reusable UI components. These are organized into subdirectories based on their functionality or the page they belong to (e.g., `Header`, `Footer`, `Global`).
    - **`features/`**: Contains code related to specific features of the application. For example, `marketplace/` includes components, data, and hooks specifically for the marketplace functionality.
    - **`pages/`**: Holds the top-level components that represent different pages of the application (e.g., `index.tsx`, `Marketplace.tsx`).
    - **`lib/`**: Contains utility functions, helper modules, and design system related files.
    - **`config/`**: Stores configuration files, such as navigation settings.
    - **`utils/`**: Includes general utility functions used across the project.
- **`public/`**: Contains static assets that are served directly by the web server (e.g., images, manifest files).
- **`dist/`**: This directory is where the built production-ready code is placed after the build process. It contains optimized and bundled files.
- **`cypress/`**: Contains end-to-end tests written using Cypress.
- **`.idx/`**: This directory seems to contain configuration related to the development environment, possibly for indexing or specific development tools.

**Key Components and Organization:**

- **React Components:** The majority of the UI is built using React components, organized within the `src/components/` and `src/features/` directories. Components are often structured to be reusable and maintainable.
- **Feature-Based Organization:** The `src/features/` directory indicates a feature-based organization pattern, where code related to a specific feature (like the marketplace) is grouped together. This helps in managing complexity and makes it easier to work on individual features.
- **Design System:** The presence of `src/lib/DesignSystem.tsx` and `src/lib/designTokens.ts` suggests the use of a design system to maintain consistency in UI elements and styling.
- **State Management:** (Further analysis would be needed to confirm the specific state management library used, but based on the file structure, it's likely managed within components or potentially a dedicated state management layer not immediately obvious from the file names.)
- **Styling:** The project appears to use CSS (based on `src/index.css`) and potentially a CSS framework or preprocessor (the presence of `tailwind.config.js` and `postcss.config.js` strongly suggests Tailwind CSS is being used).
- **Build Process:** The project uses Vite as the build tool (indicated by `vite.config.ts`).

**Architectural Decisions:**

- **Component-Based Architecture:** The project follows a component-based architecture using React, which promotes reusability and modularity.
- **Feature Slicing:** The organization by features within `src/features/` suggests an approach to keep related code together, which can improve maintainability for larger applications.
- **Design System Implementation:** The dedicated files for a design system point to an effort to standardize UI elements and styling, contributing to a consistent user experience.

This detailed structure helps in understanding the project's organization and how different parts of the application are connected.