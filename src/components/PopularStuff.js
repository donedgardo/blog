import React from "react"

import { DarkContainer } from "./typography"
import { H1, Li, MyLink, P, SectionContent, Ul } from "./typography/custom"

const popularLinks = [
  {
    label:
      "Top 10 Attitudes and Actions Unprofessional Developers Make. (blog post)",
    path: "/blog/top-10-attitudes-and-actions-unprofesional-developers-make/",
  },
  {
    label: "The Software Stack for the Web 3.0 Developer. (blog post)",
    path: "/blog/software-stack-for-web-3-developer",
  },
  {
    label: "The Software Postmortem (my podcast)",
    path: "https://anchor.fm/software-postmortem",
  },
  {
    label: "Clean Software Architecture (blog post)",
    path: "/blog/clean-architecture/",
  },
  {
    label: "Top 10 Things I Hate About Your Code (blog post)",
    path: "/blog/top-10-things-I-hate-about-your-code",
  },
]

export const PopularStuff = () => (
  <DarkContainer>
    <H1>POPULAR STUFF</H1>
    <SectionContent>
      <Ul>
        {popularLinks.map(link => (
          <Li key={link.path}>
            <P>
              <MyLink to={link.path}>{link.label}</MyLink>
            </P>
          </Li>
        ))}
      </Ul>
    </SectionContent>
  </DarkContainer>
)
