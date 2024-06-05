import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import { DarkContainer, H1, P, SectionContent } from "./typography/custom"
import Portrait from "./portrait"

const FlexPortrait = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledPortrait = styled(Portrait)`
  width: 104px;
  margin-bottom: 0;
  @media (min-width: 660px) {
    width: 140px;
  }
`

const POSITION_STATEMENT =
  "I help C-level executives in SaaS organizations decrease their software development teams lead-times, increase their profitability, and improve their customers satisfaction."

export const HeroContainer = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "edgardo-carreras-portrait@3x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <DarkContainer>
      <FlexPortrait>
        <StyledPortrait fluid={data.placeholderImage.childImageSharp.fluid} />
      </FlexPortrait>
      <H1>HI! I'M EDGARDO CARRERAS</H1>
      <SectionContent>
        <P style={{ textAlign: "center" }}>{POSITION_STATEMENT}</P>
      </SectionContent>
    </DarkContainer>
  )
}
