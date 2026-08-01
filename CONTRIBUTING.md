# Contributing

http-files.org is a neutral community reference for the `.http` file format. Every implementation is treated equally — entries describe what a tool does, without ranking or marketing. If you maintain a client, you are the authority on your own entry; corrections and updates are welcome.

Maintainers who want a role in the specification itself — voting on what enters the versioned core profile — should read [GOVERNANCE.md](GOVERNANCE.md) and the [standardization process](https://http-files.org/standardization/process/).

## The one rule: edit source, never output

The repository separates **source** (what you edit) from **generated** (what the build produces):

- **Source** — `site/src/data/*.yaml`, `site/src/content/docs/**/*.mdoc`, components, styles, config.
- **Generated** — `site/dist/` and `site/.astro/` (gitignored, never committed), and every comparison table, client card, and support badge on the site, which render from the YAML at build time.

Two consequences:

- Never commit build output. CI builds every PR and every merge; `dist/` should never appear in a diff.
- Never hand-write a comparison table in a `.mdoc` page. Tables come from `features.yaml` via the `{% support-table %}` tag — a hand-written copy will drift from the data. If a page needs a table, it needs a tag. (A few legacy pages still carry hand-written tables; they are being migrated — don't add more.)

## Recipes

### Update your client's entry

Your entry lives in [`site/src/data/clients.yaml`](site/src/data/clients.yaml):

```yaml
your-client-id:
  name: Full Display Name
  shortName: Short          # used in tables and badges
  author: You
  type: ide                 # ide | cli | neovim | parser
  platform: Where it runs
  language: Implementation language
  repo: https://github.com/you/your-client
  docs: https://your-docs-site      # optional, strongly encouraged
  description: >
    One to three short sentences. What it is, what it supports,
    any notable strengths or limits. Neutral voice.
```

Every card and badge that mentions your client re-renders from this on the next build.

### Correct feature-support data

Comparison tables render from [`site/src/data/features.yaml`](site/src/data/features.yaml), organized as categories → features → per-client support:

```yaml
- id: my-feature
  name: "Human-readable feature name"
  support: { vscode: true, jetbrains: true, httpyac: partial, vs2022: false, kulala: true }
  notes: "Optional clarification."
```

Support values are `true`, `false`, or `partial`. When clients support the same feature with different syntax, use `true` or `partial` plus a `notes:` line, and consider adding a syntax example (below).

Each category declares its table columns in a `clients:` list. **To add your client's column** to a category: add its id (from `clients.yaml`) to that category's `clients:` list, then add a value for every feature in the category — the validator enforces completeness, so no client ever shows an ambiguous blank. Columns are per-category: add your client where it has behavior to report.

### Add a new client

1. Add an entry to `site/src/data/clients.yaml` (fields above).
2. Add `{% client-card id="your-id" /%}` to:
   - `site/src/content/docs/clients/overview.mdoc` (the full registry), and
   - the matching category page — `clients/ide.mdoc`, `clients/cli.mdoc`, `clients/neovim.mdoc`, or `clients/parsers.mdoc` — with a sentence or two of context.
3. Update the tool counts on `clients/overview.mdoc`, `compare/overview.mdoc`, and the home page (`index.mdoc`) if your addition changes them.
4. If your client has unique syntax for a documented feature, add a variant to `syntax-examples.yaml`.
5. To appear in the comparison tables, add your client to the relevant categories in `features.yaml` (previous section).

### Add or edit a syntax example

[`site/src/data/syntax-examples.yaml`](site/src/data/syntax-examples.yaml) holds per-client syntax variants, rendered by `{% syntax-example feature="..." /%}`:

```yaml
my-feature:
  variants:
    "Display Name": "syntax here"
```

Variant keys are display labels, not registry ids — match the naming of neighboring examples (e.g. `"VS Code REST Client"`, `"JetBrains"`, `"httpyac"`).

### Edit a page

Pages are Markdoc (`.mdoc`) files under `site/src/content/docs/`. Besides standard Markdown, these tags are available (defined in `site/markdoc.config.mjs`):

| Tag | Renders |
|---|---|
| `{% support-table category="core" /%}` | comparison matrix from `features.yaml` |
| `{% supported clients="jetbrains,httpyac" /%}` | inline support badges |
| `{% syntax-example feature="response-handler" /%}` | per-client syntax variants |
| `{% client-card id="jetbrains" /%}` | client info card from `clients.yaml` |
| `{% client-grid %}…{% /client-grid %}` | grid layout — always wrap multiple cards |
| `{% interop level="universal" %}…{% /interop %}` | interoperability callout (`universal` / `widespread` / `limited` / `unique`) |
| `{% spec-ref page="variables" /%}` | titled link to a spec page |
| `{% http title="Example" %}…{% /http %}` | HTTP code block with a title |

**Known limitation:** Markdoc parses `{%` and `{{` even inside fenced code blocks. Code containing JetBrains/httpyac script syntax (`> {% %}`, `{{ }}`) must go in `syntax-examples.yaml` and render via `{% syntax-example %}`. Putting those characters in a fenced code block in a `.mdoc` file breaks the build or renders stray backslashes.

## What CI checks

Every pull request runs validation and a full build:

- **`npm run validate`** cross-checks the YAML files against each other and against every tag in the pages: unknown client ids (including in `{% supported %}` badges), unknown table categories, unknown syntax-example keys, and incomplete or invalid feature-support data all fail with a specific message.
- **`npm run build`** additionally fails on unknown ids in `{% client-card %}`, `{% support-table %}`, and `{% spec-ref %}`.

If both pass locally, CI will agree.

## Local preview

Optional — CI validates and builds every PR — but useful for anything beyond a data edit:

```sh
cd site
npm install
npm run dev        # dev server with hot reload
npm run validate   # data + tag cross-checks
npm run build      # exactly what CI runs
npm run preview    # serve the built output
```

## Pull requests

- One client or one topic per PR.
- Neutral voice: technical, factual, no marketing language, no rankings.
- If you're correcting data about a client you don't maintain, cite documentation or reproducible behavior in the PR description.

## Licensing

Contributions land under the license of what you touch (see [LICENSE.md](LICENSE.md)):

- Specification prose (`site/src/content/docs/`) — **CC BY 4.0**
- Compatibility data (`site/src/data/`) — **CC0** public domain dedication
- Everything else — **MIT**

By opening a PR you agree that your contribution is provided under the matching license and that you have the right to contribute the material.
