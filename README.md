# Prawn Projects

A self-updating Neobrutalist portfolio that automatically syncs with your Vercel deployments.

## Description

Prawn Projects is a high-contrast portfolio application styled in a raw Neobrutalist aesthetic. It connects directly to the Vercel REST API to automatically fetch and display your live deployments, keeping your portfolio perfectly synchronized with your development work. The design features bold typography, stark black/white contrast, and responsive layouts that scale from mobile to desktop.

## Features

- Automatic project synchronization with Vercel API
- Neobrutalist design with bold typography (Space Grotesk) and high-contrast visuals
- Responsive grid layout that adapts from mobile to large desktop screens
- Real-time loading states with skeleton animations
- Framework detection and display for each project
- Direct links to live deployed projects

## Technologies Used

- React 19
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Vercel API integration

## Installation

```bash
# Clone the repository
git clone https://github.com/bryanseah234/prawnprojects.git

# Navigate to project directory
cd prawnprojects

# Install dependencies
npm install
```

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Configuration

To enable automatic project fetching, configure the following environment variables in your deployment settings:

| Variable Name | Description |
| :--- | :--- |
| `VITE_VERCEL_API_TOKEN` | Your Vercel Account API Token. Generate this in your Vercel Account Settings. |
| `VITE_TEAM_ID` | (Optional) The Team ID if your projects are hosted under a Vercel Team. |

The application also supports `REACT_APP_VERCEL_API_TOKEN` (Create React App), `NEXT_PUBLIC_VERCEL_API_TOKEN` (Next.js), or unprefixed `VERCEL_API_TOKEN` variables.

## Demo

Deploy to Vercel or any hosting provider that supports Vite applications. Ensure environment variables are configured in your deployment dashboard.

## Disclaimer

1. FOR EDUCATIONAL PURPOSES ONLY
2. USE AT YOUR OWN DISCRETION

## License

MIT License

---

**Author:** <a href="https://github.com/bryanseah234">bryanseah234</a>
