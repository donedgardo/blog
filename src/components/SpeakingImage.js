import styled from "styled-components";
import Image from "./portrait";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

const FullWidthImage = styled(Image)`
  height: 320px;
`;
export const SpeakingImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "Edgardo-Speaking@3x.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return <FullWidthImage data={data} />;
};