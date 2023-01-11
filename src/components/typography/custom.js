import styled from "styled-components";
import { Link } from "gatsby";

export const Button = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: .6em 2em;
  background: #231F20;
  color: #fff;
  border-radius: 20px;
  max-width: 394px;
  font-family: Montserrat, serif;
  text-align: center;
`;

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
  font-size: 1.2rem;
  line-height: 1.5rem;
  text-align: center;
  letter-spacing: 0.005em;
`;

export const UL = styled.ul``;

export const Li = styled.li`
  & > a {
    text-decoration: underline;
  }
`;

export const MyLink = styled(Link)`
  text-decoration: underline;
`;

export const Container = styled.div`
  padding: 0.01rem 2.45rem 2.175rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const DarkContainer = styled(Container)`
  background: #231f20;
  ${P}, ${H1} {
    color: #eee9ea;
  }
  
  ${P} > ${MyLink} {
    color: #eee9ea;
  }
  
  ${UL} {
    list-style: none; /* Remove default bullets */
  }

  ${UL} ${Li}::before {
    content: "\\2022"; /* Add content: \\2022 is the CSS Code/unicode for a bullet */
    color: #eee9ea; 
    position: absolute;
    display: inline-block; /* Needed to add space between the bullet and the text */
    margin-left: -1em; /* Also needed for space (tweak if needed) */
  }
  
  ${Button} {
    color: #231F20;
    background: #fff;
  }
 }`;

export const LightContainer = styled(Container)`
  background: #fefefe;
  ${P}, ${H1} {
    color: black;
  }
`;

export const SectionContent = styled.div`
  max-width: 680px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

