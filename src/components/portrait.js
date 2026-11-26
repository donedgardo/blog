import React from "react"
import Img from "gatsby-image"

/*
 * Thin wrapper around the legacy `gatsby-image` component.
 *
 * `loading="eager"` is the default on purpose. With lazy loading, gatsby-image
 * renders only the placeholder on the server but adds the <picture> element on
 * the first client render (any browser with native lazy loading). React 18
 * treats that as a hydration mismatch, throws error #418 and re-renders the
 * whole page on the client. Eager images render the same markup on both sides.
 */

const Image = ({ className, fluid, fixed, loading = "eager", ...props }) => {
  return (
    <Img
      className={className}
      fluid={fluid}
      fixed={fixed}
      loading={loading}
      {...props}
    />
  )
}

export default Image
