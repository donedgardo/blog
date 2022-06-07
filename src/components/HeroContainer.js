import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

import { DarkContainer, H1, P, SectionContent } from "./typography/custom";
import Portrait from "./portrait";

const FlexPortrait = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const StyledPortrait = styled(Portrait)`
  width: 104px;
  margin-bottom: 0;
`;

const POSITION_STATEMENT = "I help C-level tech executives increase their organizations' profitability, market share, and customer satisfaction.";

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
        <P style={{ textAlign: "center" }}>{POSITION_STATEMENT}</P>
      </SectionContent>
    </DarkContainer>
  );
};
