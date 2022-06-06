import React from "react";

import { DarkContainer } from "./typography";
import { H1, Li, MyLink, P, UL } from "./typography/custom";
import { SectionContent } from "./HeroContainer";

const popularLinks = [
  { label: "Top 10 Attitudes and Actions Unprofessional Developers Make. (blog post)" },
  { label: "The Software Stack for the Web 3.0 Developer. (blog post)" },
  { label: "The Software Postmortem (my podcast)" },
  { label: "Clean Software Architecture (blog post)" },
  { label: "Top 10 Things I Hate About Your Code (blog post)" }
];

export const PopularStuff = () =>
  <DarkContainer>
    <H1>POPULAR STUFF</H1>
    <SectionContent>
      <UL>
        {popularLinks.map(link =>
          <Li>
            <P>
              <MyLink to={"#"}>
                {link.label}
              </MyLink>
            </P>
          </Li>)}
      </UL>
    </SectionContent>
  </DarkContainer>;