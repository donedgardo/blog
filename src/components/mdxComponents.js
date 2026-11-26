import React from "react"

/*
 * gatsby-remark-vscode appends a <style> block to every post. Rendered as a
 * normal React child, its CSS is HTML-escaped on the server (`>` becomes
 * `&gt;`, quotes become `&#x27;`), which both breaks those rules and makes the
 * server text differ from the client text, failing hydration. Injecting it as
 * raw HTML keeps the CSS intact and identical on both sides.
 */
const Style = ({ children, ...props }) => (
  <style
    {...props}
    dangerouslySetInnerHTML={{ __html: [].concat(children).join("") }}
  />
)

/*
 * Video and SoundCloud embeds are written inline in Markdown, so the remark
 * plugins place their <div> wrapper inside the paragraph. A <div> inside a <p>
 * is invalid HTML: the browser moves it out while parsing, the DOM no longer
 * matches what React rendered, and hydration fails. Render such paragraphs as
 * a <div> instead.
 */
const isDiv = child =>
  React.isValidElement(child) &&
  [child.type, child.props.originalType, child.props.mdxType].includes("div")

const Paragraph = ({ children, ...props }) => {
  const Tag = React.Children.toArray(children).some(isDiv) ? "div" : "p"
  return <Tag {...props}>{children}</Tag>
}

export const mdxComponents = { style: Style, p: Paragraph }
