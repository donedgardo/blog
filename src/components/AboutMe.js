import { LightContainer } from "./typography";
import { H1, P } from "./typography/custom";
import { SectionContent } from "./HeroContainer";
import React from "react";

export const AboutMe = () =>
  <LightContainer>
    <H1>ABOUT EDGARDO</H1>
    <SectionContent>
      <P>Hi, I am Edgardo Carreras, and I've been a software developer, CTO, consultant, and trainer for the better part
        of the past decade. I have mentored and trained hundreds of developers and have a track record in scaling and
        building successful software development teams and products.</P>
      <P>In my first year as a software engineer, I helped a small agency improve its development workflow, increasing
        its revenue by 300%. A desire to improve the industry's professionalism led me to found a software agency of my
        own in Puerto Rico. </P>
      <P>By leading different organizations as a CTO, consulting teams, and training developers, I've learned how to
        improve programmers' professionalism and trancend the quality of their craft to the next level.</P>
    </SectionContent>
  </LightContainer>;