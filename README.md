# http-files.org

Source for [http-files.org](https://http-files.org) — a community reference for the `.http` file format: the specification, a registry of implementations, and cross-client compatibility tables.

The format has no RFC. It is defined by what its implementations do. This site documents that behavior so `.http` files stay portable across tools, and it treats every implementation equally.

## Maintain a client? Your entry is data, not pages

Everything on the site that describes a client — cards, comparison tables, support badges, syntax examples — renders from three YAML files. Edit the data; the site rebuilds itself.

| To change | Edit |
|---|---|
| Your client's name, links, platform, description | [`site/src/data/clients.yaml`](site/src/data/clients.yaml) |
| Feature support shown in comparison tables | [`site/src/data/features.yaml`](site/src/data/features.yaml) |
| Per-client syntax examples | [`site/src/data/syntax-examples.yaml`](site/src/data/syntax-examples.yaml) |

Step-by-step recipes — updating an entry, adding a new client, correcting feature data, editing pages — are in [CONTRIBUTING.md](CONTRIBUTING.md).

Maintainers who want a say in the specification itself — what enters the versioned core profile, which extensions standardize — should read [GOVERNANCE.md](GOVERNANCE.md) and the [standardization process](https://http-files.org/standardization/process/).

## Repository map

Source files — everything contributors edit — live under `site/`:

```
site/
├── src/
│   ├── data/               source of truth for all client + feature data (YAML)
│   ├── content/docs/       prose pages (Markdoc, .mdoc)
│   ├── components/         Astro components behind the Markdoc tags
│   ├── styles/             theme CSS
│   └── assets/             design sources (logos, favicon-source.svg, og-image.svg)
├── public/                 static files served as-is; the favicon PNG/ICO files and
│                           og-image.png are exports of the SVG sources in src/assets/
├── astro.config.mjs        site config + sidebar navigation
└── markdoc.config.mjs      the Markdoc tag vocabulary
```

Generated files are never committed:

- `site/dist/` — the built site (output of `npm run build`, gitignored)
- `site/.astro/` — generated types (gitignored)
- comparison tables, client cards, and support badges as they appear on the site —
  rendered from `src/data/*.yaml` at build time. To change a table, change the data.

## The site builds itself

- **Pull requests** run a build check ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).
- **Merges to `main`** build and deploy to GitHub Pages at https://http-files.org ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

There is no output to commit and no release step. A merged PR is live within minutes.

Local preview is optional:

```sh
cd site
npm install
npm run dev        # dev server with hot reload
npm run build      # exactly what CI runs
```

## License

Three-way split, detailed in [LICENSE.md](LICENSE.md): specification prose is **CC BY 4.0**, compatibility data is **CC0** (public domain — consume the YAML freely), and site code is **MIT**.
