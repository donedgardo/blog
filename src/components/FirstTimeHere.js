import { LightContainer } from "./typography";
import { ButtonLink, H1, P, SectionContent } from "./typography/custom";
import React from "react";

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
        performing development teams.
      </P>
      <ButtonLink
        style={{ margin: "auto" }}
        to="/dev-ops-essentials">
        DevOps Essentials Bootcamp
      </ButtonLink>
    </SectionContent>
  </LightContainer>;