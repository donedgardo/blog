import React from "react"
import styled from "styled-components"
import { rhythm } from "./typography"
import { Header } from "./header"
import { BlogHeader } from "./blog_header"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const { pathname } = location
    return (
      <Wrapper>
        <BlogHeaderWrapper>
          <Header />
        </BlogHeaderWrapper>
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

const BlogHeaderWrapper = styled.div`
  background-color: #0A1823;
  padding: 12px 0;
  
  header {
    position: relative;
    top: 0;
  }
  
  .container {
    display: flex;
    align-items: center;
    padding-left: 24px;
  }
  
  .site-logo {
    max-height: 36px;
    vertical-align: middle;
  }
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
  background-color: #0A1823;
  color: white;
  padding: 24px;
  margin: 0;
`

export default Layout
