import { rhythm } from "./typography"
import { Link } from "gatsby"
import React from "react"

export const BlogHeader = ({ title }) =>
  <header>
    <h3
      style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
        marginBottom: `${rhythm(2)}`,
      }}>
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/blog/`}>
        {title}
      </Link>
    </h3>
  </header>