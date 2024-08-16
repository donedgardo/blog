import React from "react"
import { Link, graphql } from "gatsby"

import BlogLayout from "../components/blog_layout"
import Seo from "../components/seo"
import Button from "../components/button"
import SearchPosts from "../components/searchPosts"
import typography from "../components/typography"

export const Head = ({ location }) => (
  <>
    <Seo title="Edgardo Carreras Blog" pathname={location.pathname} />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>{typography.toString()}</style>;
  </>
)

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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
