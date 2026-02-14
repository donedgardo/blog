import styled from "styled-components"
import { Link } from "gatsby"

export const ButtonLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.8em 2em;
  background: #d3703c;
  color: #fff;
  border-radius: 50px;
  max-width: 394px;
  font-family: Roboto, Montserrat, sans-serif;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  
  &:hover {
    background: #b85a2a;
    text-decoration: none;
  }
`

export const P = styled.p`
  font-family: Montserrat, serif;
  font-style: normal;
  color: black;
`
export const H1 = styled.h4`
  font-family: Montserrat, serif;
  font-style: normal;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.5rem;
  text-align: center;
  letter-spacing: 0.005em;
`

export const H2 = styled(H1)`
  font-size: 1rem;
`

export const H3 = styled(H1)`
  font-size: 0.85rem;
`

export const Ul = styled.ul``

export const Li = styled.li`
  & > a {
    text-decoration: underline;
  }
`

export const MyLink = styled(Link)`
  text-decoration: underline;
`
export const Button = styled.button`
  display: flex;
  text-align: center;
  border-radius: 50px;
  justify-content: center;
  text-decoration: none;
  font-size: 0.9em;
  margin-top: 12px;
  align-items: center;
  color: #fff;
  background: #d3703c;
  appearance: none;
  font-weight: 700;
  font-family: Roboto, Montserrat, sans-serif;
  border: none;
  padding: 0.8em 2em;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  flex: 1;
  
  &:hover {
    background: #b85a2a;
    text-decoration: none;
  }
`
export const Container = styled.div`
  padding: 0.01rem 2.45rem 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const DarkContainer = styled(Container)`
  background: #231f20;
  ${P}, ${H1}, ${Button} {
    color: #eee9ea;
  }
  
  ${P} > ${MyLink} {
    color: #eee9ea;
  }
  
  ${Ul} {
    list-style: none; /* Remove default bullets */
  }

  ${Ul} ${Li}::before {
    content: "\\2022"; /* Add content: \\2022 is the CSS Code/unicode for a bullet */
    color: #eee9ea; 
    position: absolute;
    display: inline-block; /* Needed to add space between the bullet and the text */
    margin-left: -1em; /* Also needed for space (tweak if needed) */
  }
  
  ${ButtonLink}, ${Button} {
    color: #231F20;
    background: #fefefe;
    border: 1px solid #231f20;
  }
  
  ${Button}:hover {
    color: #eee9ea;
    background: #231f20;
    border: 1px solid #eee9ea;
  }
 }`

export const LightContainer = styled(Container)`
  background: #fefefe;
  ${P}, ${H1} {
    color: black;
  }
  ${Button} {
    color: white;
    background: #d3703c;
    border: none;
  }
  ${Button}:hover {
    background: #b85a2a;
    border: none;
  }
`

export const SectionContent = styled.div`
  max-width: 35em;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
