import React from "react"
import Footer from "./footer"
import "./layout.css"

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
