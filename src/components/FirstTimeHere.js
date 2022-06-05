import { LightContainer } from "./typography";
import { H1 } from "./typography/custom";
import { SectionContent } from "./HeroContainer";
import React from "react";

export const FirstTimeHere = () =>
  <LightContainer>
    <H1>FIRST TIME HERE?</H1>
    <SectionContent>
      If this is your first time here, the best way to get oriented is to
      subscribe to my DevOps Essentials Bootcamp.
    </SectionContent>
    <SectionContent>
      It’s a a free six day email course to teach you how to create high
      performing DevOps teams.
    </SectionContent>
    <a href="/#">DevOps Essentials Bootcamp</a>
  </LightContainer>;