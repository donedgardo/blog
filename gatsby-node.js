const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

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

    // Filter out future posts (date > today)
    const today = new Date()
    today.setHours(23, 59, 59, 999) // End of today
    
    const allPosts = result.data.allMdx.edges
    const posts = allPosts.filter(({ node }) => {
      const postDate = new Date(node.frontmatter.date)
      return postDate <= today
    })
    
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
