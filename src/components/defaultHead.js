import Seo from "./seo"
import typography from "./typography"
import React from "react"

export const DefaultHead = ({ location, title = "Edgardo Carreras Blog" }) => (
  <>
    <Seo title={title} pathname={location.pathname} />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>{typography.toString()}</style>
  </>
)

// <Seo> renders <html>, <title> and <meta> tags, so it must only be used from
// a page's `Head` export. Use this to give a page its own title.
export const headWithTitle = title => props => (
  <DefaultHead {...props} title={title} />
)
