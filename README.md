# Prawn Projects

A high-contrast, self-updating portfolio styled in a raw Neobrutalist aesthetic. This application automatically connects to the Vercel API to fetch and display your latest deployed projects, ensuring your portfolio is always in sync with your work.

## Features

- **Automated Project Fetching**: Pulls live deployment data directly from Vercel using the REST API.
- **Neobrutalist Design**: Bold typography (Space Grotesk), high-contrast borders, hard shadows, and a stark black/white/yellow color palette.
- **Responsive Layout**: Fluid grid system that adapts from mobile to desktop.
- **Dynamic Updates**: Displays project names, frameworks, and direct links to live deployments.

## Tech Stack

- **React**: Component-based UI architecture.
- **Tailwind CSS**: Utility-first styling with custom configuration for the Neobrutalist theme.
- **Vercel API**: Data source for project metadata and deployment status.
- **Space Grotesk**: Primary typeface.

## Configuration

To connect the application to your Vercel account, you must configure the following environment variables in your deployment settings or local environment file (`.env` or similar).

### Required Environment Variables

| Variable Name | Description |
| to | to |
| `REACT_APP_VERCEL_API_TOKEN` | Your Vercel Account API Token. Create one at [Vercel Tokens](https://vercel.com/account/tokens). |
| `REACT_APP_TEAM_ID` | (Optional) The Team ID if your projects are located within a Vercel Team. |

*Note: The application also checks `VERCEL_API_TOKEN` and `NEXT_PUBLIC_TEAM_ID` depending on your specific build configuration.*

## Setup & Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/prawn-projects.git
    cd prawn-projects
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Locally**
    Ensure you have your API tokens set in your environment.
    ```bash
    npm start
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```
