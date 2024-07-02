import React from "react"
import { LightContainer } from "../typography"
import { H1, P, SectionContent } from "../typography/custom"
import { SignUpForm } from "./SignUpForm"

const BootcampHero = props => {
  return (
    <LightContainer>
      <H1>{props.title}</H1>
      <SectionContent>
        <P style={{ textAlign: "center" }}>{props.description}</P>
        <SignUpForm url={props.url} />
      </SectionContent>
    </LightContainer>
  )
}

export default BootcampHero
