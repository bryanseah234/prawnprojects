# The Prawn Projects

A high-contrast, self-updating portfolio styled in a raw Neobrutalist aesthetic. This application is engineered to connect directly to the Vercel REST API, automatically fetching and displaying live deployments to keep your portfolio perfectly synchronized with your development work.

## Design Philosophy

- **Neobrutalism**: Defined by bold typography ('Space Grotesk'), stark black/white contrast, and a signature 'neo-yellow' accent.
- **Visuals**: High-contrast borders (3px solid black), hard unblurred shadows, and geometric interactions.
- **Responsiveness**: A fluid, component-based grid system that scales from mobile devices to large desktop screens.

## Architecture

- **Frontend**: React (App Router architecture compatible)
- **Styling**: Tailwind CSS with extended configuration for Neobrutalist design tokens.
- **Data Layer**: Direct integration with Vercel API for real-time project metadata.

## Configuration

To enable the automatic project fetching, you must configure the following environment variables in your deployment settings.

| Variable Name | Description |
| :--- | :--- |
| `REACT_APP_VERCEL_API_TOKEN` | Your Vercel Account API Token. Generate this in your Vercel Account Settings. |
| `REACT_APP_TEAM_ID` | (Optional) The Team ID if your projects are hosted under a Vercel Team. |

### Favicon Note
This project uses a scalable SVG favicon (`favicon.svg`) which is supported by all modern browsers. If you require a legacy `.ico` file, you may convert the provided SVG using any standard image conversion tool.

## Setup Instructions

1.  **Clone**
    ```bash
    git clone https://github.com/your-username/prawn-projects.git
    ```

2.  **Install**
    ```bash
    npm install
    ```

3.  **Run**
    ```bash
    npm start
    ```

4.  **Deploy**
    Push to your preferred hosting provider. Ensure environment variables are set in the dashboard for the API connection to function.

## License

© 2025 紅衣 (RED SHIRT)
