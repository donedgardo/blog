import React from "react"
import Footer from "./footer"
import typography from "./typography"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
        <div
          style={{
            background: `#231F20`,
          }}
        >
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
      </>
    )
  }
}

export default Layout

export const Head = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style> {typography.toString()}</style>
    </>
  )
}
