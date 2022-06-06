import { LightContainer } from "./typography";
import { H1, P } from "./typography/custom";
import { SectionContent } from "./HeroContainer";
import React from "react";
import styled from "styled-components";

const Button = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: .6em 2em;
  background: #231F20;
  border-radius: 20px;
  color: #fff;
  font-family: Montserrat,serif;
  text-align: center;
`

export const FirstTimeHere = () =>
  <LightContainer>
    <H1>FIRST TIME HERE?</H1>
    <SectionContent>
      <P>
        If this is your first time here, the best way to get oriented is to
        subscribe to my DevOps Essentials Bootcamp.
      </P>
      <P>
        It’s a a free six day email course to teach you how to create high
        performing DevOps teams.
      </P>
    </SectionContent>
    <Button href="/#">DevOps Essentials Bootcamp</Button>
  </LightContainer>;