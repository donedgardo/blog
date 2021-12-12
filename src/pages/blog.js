import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import BlogLayout from "../components/blog_layout"
import SEO from "../components/seo"
import Button from "../components/button"
import SearchPosts from "../components/searchPosts"

class Blog extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const posts = data.allMdx.edges
    const localSearchBlog = data.localSearchBlog

    return (
      <BlogLayout location={this.props.location} title={"Edgardo Carreras | Software Productivity Consultant Blog"}>
        <SEO title="All posts" />
        <Bio />
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
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
