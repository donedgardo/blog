import styled from "styled-components"
import Monogram from "../images/monogram_edgardo_carreras_software_consultant.inline.svg"
import { Link } from "gatsby"
import React from "react"
import { rhythm } from "./typography"

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  height: 69px;
  left: 0px;
  right: 0px
  top: 0px;
  background: #231f20;
`
const NavItems = styled.ol`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  position: static;
  width: 143px;
  height: 27px;
  left: 617px;
  top: 21px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px;
`
const NavItem = styled.li`
  display: inline-block;
  margin-left: ${rhythm(1 / 2)};
  margin-bottom: 0px;
  a {
    text-decoration: ${props => props.active ? "underline" : "none"};
    font-size: ${rhythm(5 / 8)};
    color: white;
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
  }
  
`
export const MainNavBar = ({ pathname }) => {
  const rootPath = `/`
  const blogPath = `/blog/`
  return (<NavBar>
    <Link to={"/"} style={{display: `flex`, justifyContent: `center`}}>
      <Monogram />
    </Link>
    <NavItems>
      <NavItem active={blogPath === pathname}><Link to={`/blog/`}>Blog</Link></NavItem>
      <NavItem active={rootPath === pathname}><Link to={`/`}>Consulting</Link></NavItem>
    </NavItems>
  </NavBar>)
}