import Seo from "./seo"
import typography from "./typography"
import React from "react"

export const DefaultHead = ({ location }) => (
  <>
    <Seo title="Edgardo Carreras Blog" pathname={location.pathname} />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <style>{typography.toString()}</style>;
  </>
)
