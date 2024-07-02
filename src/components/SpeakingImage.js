import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import Image from "./portrait"
import { Container } from "./typography/custom"

const FullWidthImage = styled(Image)`
  height: 320px;
  width: 100%;
  background: #fff;
  @media (min-width: 646px) {
    height: 520px;
    max-width: 661px;
    margin: 0 2.45rem 0;
  }
`

const SpeakingImageContainer = styled(Container)`
  background: #fff;
  padding-bottom: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

export const SpeakingImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Edgardo-snow.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <SpeakingImageContainer>
      <FullWidthImage fluid={data.placeholderImage.childImageSharp.fluid} />
    </SpeakingImageContainer>
  )
}
