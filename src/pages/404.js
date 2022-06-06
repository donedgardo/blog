import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { H1, LightContainer } from "../components/typography/custom";
import { SectionContent } from "../components/HeroContainer";

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Seo title="404: Not Found" />
        <LightContainer>
          <H1>Not Found</H1>
          <SectionContent>You just hit a route that doesn&#39;t exist... the sadness.</SectionContent>
        </LightContainer>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
