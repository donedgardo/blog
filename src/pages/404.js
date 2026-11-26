import React from "react"
import { graphql } from "gatsby"

import { MainNavBar } from "../components/MainNavBar"
import Layout from "../components/layout"
import {
  H1,
  LightContainer,
  SectionContent,
} from "../components/typography/custom"
import { headWithTitle } from "../components/defaultHead"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <MainNavBar pathname={this.props.pathname} />
        <LightContainer style={{ height: "90vh" }}>
          <H1>Not Found</H1>
          <SectionContent>
            You just hit a route that doesn&#39;t exist... the sadness.
          </SectionContent>
        </LightContainer>
      </Layout>
    )
  }
}

export default NotFoundPage

export const Head = headWithTitle("404: Not Found")

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
