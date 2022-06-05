import styled from "styled-components";


export const LIGHT_MODE = "Light";

export const P = styled.p`
  font-family: Montserrat,serif;
  font-style: normal;
  color: black;
  letter-spacing: 0.065em;
`
export const H1 = styled.h4`
  font-family: Montserrat,serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.5rem;
  text-align: center;
  letter-spacing: 0.005em;
`;

const Container = styled.div`
  padding: 0.01rem 2.45rem 1rem;
`
export const DarkContainer = styled(Container)`
  background: #231f20;
  & > p, h4 {
    color: #eee9ea;
  }
`;

export const LightContainer = styled(Container)`
  background: #fefefe;
  & > p {
    color: black;
  }
`;