import styled from "styled-components";
import { DarkContainer, H1, P } from "./typography/custom";
import Portrait from "./portrait";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const FlexPortrait = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const SectionContent = styled.div`
  margin-bottom: 29px;
  max-width: 790px
`;

const StyledPortrait = styled(Portrait)`
  width: 104px;
  margin-bottom: 0;
`;

const POSITION_STATEMENT = "I help C-level tech executives increase their organizations profitability, market share and customer satisfaction.";

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
  `);

  return (
    <DarkContainer>
      <FlexPortrait>
        <StyledPortrait data={data} />
      </FlexPortrait>
      <H1>HI! I'M EDGARDO CARRERAS</H1>
      <SectionContent>
        <P>{POSITION_STATEMENT}</P>
      </SectionContent>
    </DarkContainer>
  );
};
