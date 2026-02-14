import React from "react"
import styled from "styled-components"

const Button = props => (
  <ButtonWrapper props={props}>{props.children}</ButtonWrapper>
)

const ButtonWrapper = styled.button`
  display: block;
  border: none;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  padding: 16px 40px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;

  background: ${props => props.props.background || "#d3703c"};
  color: ${props => props.props.color || "#fff"};
  font-size: ${props => props.props.fontSize || "16px"};
  font-weight: ${props => props.props.fontWeight || "700"};
  font-family: "Roboto", "Montserrat", sans-serif;
  border-radius: ${props => props.props.radius || "50px"};
  margin-top: ${props => props.props.marginTop};
  margin-bottom: ${props => props.props.marginBottom};
  box-shadow: -10px 10px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.props.background ? props.props.background : "#b85a2a"};
  }
`

export default Button
