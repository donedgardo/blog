# edgardocarreras.com

[![CI](https://github.com/donedgardo/blog/actions/workflows/ci.yml/badge.svg)](https://github.com/donedgardo/blog/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b26ecd99-4d22-4ed3-9607-7d7c4e5218e9/deploy-status)](https://app.netlify.com/sites/edgardocarreras/deploys)

The source for [edgardocarreras.com](https://edgardocarreras.com): my portfolio,
my technical blog and **Ed's Edge**, a daily newsletter on software delivery
principles for development teams in the AI era.

**Live site:** https://edgardocarreras.com ·
**Newsletter:** https://edgardocarreras.com/newsletter/ ·
**Blog:** https://edgardocarreras.com/blog

## What is in here

| Part                        | Where                                | Notes                                                            |
| --------------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| Blog posts                  | `content/blog/`                      | 59 technical articles on TDD, CI/CD, Rust and clean architecture |
| Daily newsletter            | `content/daily/`                     | 72 issues of Ed's Edge, also published as an RSS feed            |
| Landing and marketing pages | `src/pages/`                         | Home, newsletter signup, coaching pages                          |
| Portfolio and resume        | `static/porfolio/`, `static/resume/` | Hand-written static HTML, served as is                           |
| End-to-end tests            | `cypress/e2e/`                       | Run against the production build in CI                           |

Stack: Gatsby 4 · React 18 · MDX · styled-components · FlexSearch · Cypress · Netlify

## Getting started

Requires Node.js 20 (see `.nvmrc`) and Yarn.

```bash
yarn install
yarn develop        # http://localhost:3000
```

## Commands

| Command               | What it does                                                      |
| --------------------- | ----------------------------------------------------------------- |
| `yarn develop`        | Development server with hot reload on port 3000                   |
| `yarn build`          | Production build into `public/`                                   |
| `yarn serve`          | Serve the production build locally                                |
| `yarn test:e2e`       | Start the development server and run the Cypress tests            |
| `yarn test:e2e:build` | Run the Cypress tests against the production build (what CI runs) |
| `yarn cy:open`        | Open the Cypress runner                                           |
| `yarn format`         | Format source files with Prettier                                 |

## Writing a post

Add an `.md` or `.mdx` file under `content/blog/` or `content/daily/` with this
frontmatter:

```yaml
---
title: "Post title"
date: "2026-01-01"
description: "One-sentence summary"
category: "daily" # daily issues only; this puts the post in the RSS feed
---
```

Set `rss: false` to keep a daily issue out of the feed.

## Design decisions

- **Static generation over a server-rendered site.** Every page is built ahead
  of time and served from Netlify's CDN, so there is no server to run, patch or
  scale. The tradeoff is a rebuild on every content change, which takes a few
  minutes at the current size.
- **Content lives in the repository as Markdown.** Posts are versioned and
  reviewed like code, and the site has no database. Decap CMS is wired in at
  `/admin` for editing in the browser; it commits to this repository, so git
  stays the single source of truth.
- **Search runs in the browser.** `gatsby-plugin-local-search` builds a
  FlexSearch index of post titles and bodies at build time. That avoids a
  hosted search service at the cost of shipping the index to the reader, which
  is acceptable for a site of about 130 posts.
- **Daily issues publish through an RSS feed.** `gatsby-plugin-feed` generates
  `/rss.xml` from the posts marked `category: "daily"`, so publishing an issue
  is a merge to `master` and anything that reads a feed can pick it up.
- **Tests run against the production build.** CI builds the site and runs
  Cypress against `gatsby serve`, the same output Netlify publishes, so a
  problem that only appears after static rendering is caught before deploy.
- **Portfolio and resume are plain HTML.** They sit in `static/` so they can be
  edited and printed without going through the React build.

## Deployment

Netlify builds and publishes every push to `master`. GitHub Actions runs the
build and the end-to-end tests on every push and pull request.

## License

[MIT](LICENSE)
