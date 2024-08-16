import React from "react"
import { graphql, Link } from "gatsby"

import BlogLayout from "../components/blog_layout"
import Button from "../components/button"
import SearchPosts from "../components/searchPosts"
import { DefaultHead } from "../components/defaultHead"

export const Head = DefaultHead

class Blog extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const posts = data.allMdx.edges
    const localSearchBlog = data.localSearchBlog
    return (
      <BlogLayout location={location} title={"Edgardo Carreras Blog"}>
        <SearchPosts
          posts={posts}
          localSearchBlog={localSearchBlog}
          navigate={navigate}
          location={location}
        />
        <Link to="/">
          <Button marginTop="85px">Go Home</Button>
        </Link>
      </BlogLayout>
    )
  }
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchBlog {
      index
      store
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: "daily" } } }
    ) {
      edges {
        node {
          excerpt
          slug
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
