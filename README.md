# The Prawn Projects

A self-updating, Neobrutalist-styled portfolio that automatically displays your Vercel deployments in real-time.

## Description

The Prawn Projects is an automated portfolio application that connects directly to the Vercel REST API to fetch and display your live deployments. Built with a bold Neobrutalist design aesthetic featuring high-contrast visuals and distinctive typography, it keeps your portfolio perfectly synchronized with your development work without manual updates.

## Features

- Automatic project fetching from Vercel API with real-time synchronization
- Neobrutalist UI design with bold Space Grotesk typography and high-contrast borders
- Responsive grid layout that scales from mobile to desktop screens
- Reusable Neobrutalist components (NeoCard, NeoButton, NeoLink)
- Support for team-based Vercel accounts with optional Team ID configuration

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS (CDN with custom Neobrutalist configuration)
- Vercel REST API integration

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
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

To enable automatic project fetching, configure the following environment variables:

| Variable Name | Description |
| :--- | :--- |
| `REACT_APP_VERCEL_API_TOKEN` | Your Vercel Account API Token. Generate this in your Vercel Account Settings. |
| `REACT_APP_TEAM_ID` | (Optional) The Team ID if your projects are hosted under a Vercel Team. |

## Demo

Deploy to Vercel or your preferred hosting provider to see your live portfolio.

## Disclaimer

1. FOR EDUCATIONAL PURPOSES ONLY
2. USE AT YOUR OWN DISCRETION

## License

MIT License

---

**Author:** <a href="https://github.com/bryanseah234">bryanseah234</a>
