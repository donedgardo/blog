import React from "react"
import styled from "styled-components"
import { rhythm } from "./typography"
import { MainNavBar } from "./MainNavBar"
import { BlogHeader } from "./blog_header"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const { pathname } = location
    return (
      <Wrapper>
        <MainNavBar pathname={pathname} />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <BlogHeader title={title} />
          <main>{children}</main>
        </div>
        <Footer>© {new Date().getFullYear()}, Edgardo Carreras</Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
