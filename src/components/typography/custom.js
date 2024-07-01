import styled from "styled-components"
import { Link } from "gatsby"

export const ButtonLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.6em 2em;
  background: #231f20;
  color: #fff;
  border-radius: 20px;
  max-width: 394px;
  font-family: Montserrat, serif;
  text-align: center;
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
  border-radius: 20px;
  justify-content: center;
  text-decoration: none;
  font-size: 0.8em;
  margin-top: 12px;
  align-items: center;
  color: #1e1e1e;
  background: rgb(249, 249, 249);
  appearance: auto;
  font-weight: 600;
  font-family: Montserrat, serif;
  border: none;
  padding: 0.4em 2em;
  letter-spacing: 0.1em;
  flex: 1;
  :hover {
    text-decoration: underline;
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
    background: #231f20;
    border: 1px solid #fefefe;
  }
  ${Button}:hover {
    color: black;
    background: #fefefe;
    border: 1px solid #231f20;
  }
`

export const SectionContent = styled.div`
  max-width: 36em;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
