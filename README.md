# The Prawn Projects

A public directory of the Prawn websites, with Space Grotesk, black and white cards, 3px borders and offset shadows.

## How it works

The reviewed public catalog in `data/projects.json` ships with the application. Visitors load static assets; there is no account API request, server function or periodic polling for the catalog. Tailwind is compiled during the build, preserving the original visual theme.

The catalog includes every deployed project with a verified public homepage from the current hosting inventory. Undeployed projects are excluded. Entries contain only a public slug, name, framework and homepage URL. A date on the page shows when the catalog was updated.

## Development

Use Node.js 24 and run:

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The build validates the catalog, runs TypeScript, compiles the application and checks the output for account API/credential markers and runtime CSS compilers. The public catalog workflow also builds with synthetic credential markers to detect accidental exposure.

## Updating the catalog

Update the catalog when a project or public domain is added, renamed or removed. Ordinary deployments at the same URL need no catalog update. Existing entries remain available until the next catalog release; the website deliberately does not poll the hosting account.

Either edit `data/projects.json` and run `npm run catalog:check`, or use a complete export from the authenticated Vercel connector:

```json
{
  "checkedAt": "2026-09-10T00:00:00Z",
  "projects": [
    {
      "name": "example",
      "framework": "vite",
      "ready": "READY",
      "domains": ["example.hong-yi.me", "example.vercel.app"]
    }
  ]
}
```

```bash
npm run catalog:update -- path/to/project-export.json
npm test
npm run build
```

Use the complete project inventory, including subsequent pages if exporting through a paginated API. The generator projects only public fields, skips undeployed projects and avoids team/branch aliases. Review the generated diff and check each public link before committing. Do not commit a raw account response or credentials. Push the reviewed catalog with the site; Vercel's Git integration builds and publishes it.

## Deployment

Use the Vite framework preset, `npm run build`, and output directory `dist`. No API keys or account tokens are needed in development, CI or production. Do not configure tokens with browser-visible prefixes such as `VITE_` or `NEXT_PUBLIC_`.

The previous browser account-API integration has been removed. Any credential previously embedded in its public builds must be revoked through Vercel account settings; publishing this replacement cannot invalidate old bundles or their credentials. Check other consumers before revoking a reused token.

## Disclaimer

1. FOR EDUCATIONAL PURPOSES ONLY
2. USE AT YOUR OWN DISCRETION

---

MIT License

---

**Author:** <a href="https://github.com/hongyime">hongyime</a>

## License

Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
