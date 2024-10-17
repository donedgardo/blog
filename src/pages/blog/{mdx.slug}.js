import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"

import Bio from "../../components/bio"
import BlogLayout from "../../components/blog_layout"
import Seo from "../../components/seo"
import { SignUpBootcamp } from "../../components/newsletters/sign-up-bootcamp"
import { GameDevNewsletter } from "../../components/newsletters/game-dev-newsletter"
import typography from "../../components/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const { previous, next } = this.props.pageContext

    const date = post?.frontmatter?.date
    const featuredImgFluid =
      post?.frontmatter?.featuredImage?.childImageSharp?.fluid

    const articleDate = new Date(date.replace(/-/g, "/"))
    const gameDevDate = new Date("2023/03/02".replace(/-/g, "/"))
    const isAfterGameDev = articleDate.getTime() >= gameDevDate.getTime()

    return (
      <BlogLayout
        location={this.props.location}
        title={"Edgardo Carreras | Blog"}
      >
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            display: `block`,
          }}
        >
          {post.frontmatter.date}
        </p>
        {featuredImgFluid ? (
          <Img fluid={featuredImgFluid} alt={post.frontmatter.title} />
        ) : null}
        <hr />
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h4>Want to hear more from me?</h4>
          <p>Signup to my newsletter!</p>
        </div>
        <p>{isAfterGameDev ? <GameDevNewsletter /> : <SignUpBootcamp />}</p>
        <hr />
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

export const Head = ({ location, data }) => {
  const post = data.mdx
  const featuredImgFluid =
    post?.frontmatter?.featuredImage?.childImageSharp?.fluid
  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        pathname={location.pathname}
        image={featuredImgFluid?.src}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {/*<link*/}
      {/*  rel="stylesheet"*/}
      {/*  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"*/}
      {/*/>*/}
      {/*<link*/}
      {/*  rel="stylesheet"*/}
      {/*  type="text/css"*/}
      {/*  href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css"*/}
      {/*/>*/}
      <style>{typography.toString()}</style>;
    </>
  )
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
    mdx(slug: { eq: $slug }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, yyyy")
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
