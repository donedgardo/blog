import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"

import Bio from "../components/bio"
import BlogLayout from "../components/blog_layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const { location } = this.props
    const post = this.props.data.mdx
    const { previous, next } = this.props.pageContext

    const imageURL = post?.frontmatter?.featuredImage?.childImageSharp?.fluid?.src;
    const featuredImgFluid = post?.frontmatter?.featuredImage?.childImageSharp?.fluid


    return (
      <BlogLayout location={this.props.location} title={"Edgardo Carreras | Software Productivity Consultant Blog"}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          pathname={location.pathname}
          image={imageURL}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            display: `block`,
          }}
        >
          {post.frontmatter.date}
        </p>

        <Img fluid={featuredImgFluid} />

        <MDXRenderer>{post.body}</MDXRenderer>
        <hr  />
        <Bio />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </BlogLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }  
      }
    }
  }
`
