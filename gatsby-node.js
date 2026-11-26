const path = require(`path`)
const fs = require(`fs`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const work = require(`./src/portfolio/work`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { frontmatter: { category: { eq: "daily" } } }
        ) {
          edges {
            node {
              slug
              frontmatter {
                title
                date
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    // Portfolio case studies, one page per entry in src/portfolio/work.js.
    work.forEach(item => {
      createPage({
        path: `work/${item.slug}/`,
        component: path.resolve(`./src/templates/work.js`),
        context: { item },
      })
    })

    const posts = result.data.allMdx.edges
    const blogPost = path.resolve(`./src/templates/daily.js`)

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `daily/${post.node.slug}`,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// Write /sitemap.xml listing every public page, so search engines can find
// the case studies and posts without crawling for them.
const SITEMAP_EXCLUDE = [
  /^\/404/,
  /^\/dev-404-page/,
  /^\/offline-plugin-app-shell-fallback/,
  /^\/subscription-confirmed/,
  /^\/archive\//,
]

exports.onPostBuild = async ({ graphql }) => {
  const result = await graphql(`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allSitePage {
        nodes {
          path
        }
      }
    }
  `)
  if (result.errors) {
    throw result.errors
  }
  const { siteUrl } = result.data.site.siteMetadata
  const urls = result.data.allSitePage.nodes
    .map(node => node.path)
    .filter(
      pagePath => !SITEMAP_EXCLUDE.some(pattern => pattern.test(pagePath))
    )
    .concat([`/resume/`])
    .sort()
    .map(pagePath => `  <url><loc>${siteUrl}${encodeURI(pagePath)}</loc></url>`)
  fs.writeFileSync(
    path.join(__dirname, `public`, `sitemap.xml`),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
      `\n`
    )}\n</urlset>\n`
  )
}
