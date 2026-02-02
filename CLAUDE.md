# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog and portfolio website for Edgardo Carreras, built with Gatsby 4. The site includes:
- Personal portfolio/landing page
- Technical blog posts (content/blog/)
- Daily agile newsletter posts (content/daily/)
- RSS feed generation for daily posts
- Local search functionality using FlexSearch
- MDX support for content authoring

## Development Commands

```bash
# Install dependencies
yarn install

# Start development server (runs on port 3000)
yarn develop
# or
yarn start

# Build production site
yarn build

# Serve production build locally
yarn serve

# Format code with Prettier
yarn format

# E2E testing
yarn cy:open          # Open Cypress UI
yarn cy:run           # Run Cypress tests headless
yarn test:e2e         # Start dev server and run E2E tests
```

## Architecture

### Content Structure

The site has two distinct content types, both using MDX:

1. **Blog posts** (`content/blog/`): Technical articles displayed on `/blog` routes
2. **Daily newsletter** (`content/daily/`): Daily agile tips and insights displayed on `/daily/` routes

Both content types use frontmatter with:
- `title`: Post title
- `date`: Publication date
- `description`: Post description/excerpt
- `category`: "daily" for newsletter posts (used to filter RSS feed)
- `rss`: Set to `false` to exclude from RSS feed
- `featuredImage`: Optional featured image

### Page Generation

The site uses two different rendering approaches:

1. **Static pages** (`src/pages/`): Gatsby automatically creates routes
   - `index.js`: Main landing page
   - `blog.js`: Blog listing page
   - `404.js`: Not found page
   - Other marketing pages (newsletter, coaching-call, etc.)

2. **Programmatically generated pages** (`gatsby-node.js`):
   - Daily newsletter posts are generated at build time from `content/daily/` directory
   - Uses the `src/templates/daily.js` template
   - Creates routes like `/daily/[slug]`
   - Only filters posts with `category: "daily"` frontmatter

### Component Organization

- `src/components/`: Reusable React components
  - `layout.js`: Main layout wrapper (dark background #231F20)
  - `blog_layout.js`: Layout specifically for blog/daily posts
  - `seo.js`: SEO component for meta tags
  - `bio.js`: Author bio component
  - `searchPosts.js`: FlexSearch-powered search interface
  - `newsletters/`: Newsletter signup forms and components
  - `legacy/`: Deprecated components

- `src/templates/`: Page templates for programmatic page generation
  - `daily.js`: Template for daily newsletter posts

### Styling

- Uses `styled-components` for component-level styling
- Typography configuration via `typography` and `typography-theme-fairy-gates`
- Google Fonts (Montserrat) loaded in Head components
- Custom color scheme with dark background (#231F20)
- Responsive design with flexbox layouts

### Plugins & Features

**Search**: `gatsby-plugin-local-search` with FlexSearch indexes the `title` and `rawBody` of all MDX posts

**RSS Feed**: `gatsby-plugin-feed` generates `/rss.xml` from posts with:
- `category: "daily"` frontmatter
- `rss: ne: false` (not excluded)
- Automatically converts relative `/static/` paths to absolute URLs

**Analytics**:
- Google Analytics via `gatsby-plugin-google-gtag` (tracking IDs: G-QWKXJQWDJF, UA-158945218-1)
- Microsoft Clarity (project ID: mp10bxqw30)

**Content Processing**:
- MDX support with `gatsby-plugin-mdx`
- Remark plugins for embedded videos, SoundCloud, GIFs, responsive images, smart typography
- Code syntax highlighting via `gatsby-remark-vscode`

**Deployment**: Netlify (status badge shows deployment status)

## Important Patterns

### GraphQL Queries

The site heavily uses GraphQL to query MDX content. Common patterns:

```javascript
// Query all MDX posts with specific category
allMdx(
  filter: { frontmatter: { category: { eq: "daily" } } }
  sort: { fields: [frontmatter___date], order: DESC }
)
```

### MDX Frontmatter

Standard frontmatter structure for daily posts:
```yaml
---
title: "Post Title"
date: "2025-01-01"
description: "Post description"
category: "daily"
featuredImage: ./image.png
---
```

### Component Heads

Gatsby 4 uses the `Head` export for SEO and meta tags rather than React Helmet:

```javascript
export const Head = ({ location, data }) => {
  return (
    <>
      <Seo title={title} description={description} pathname={location.pathname} />
      <link href="..." rel="stylesheet" />
      <style>{typography.toString()}</style>
    </>
  )
}
```

## Node Version

Requires Node >= 14.17.1 (see `engines` in package.json)
