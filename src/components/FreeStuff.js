import React from "react"

import { DarkContainer } from "./typography"
import { H1, Li, MyLink, P, SectionContent, Ul } from "./typography/custom"

const popularLinks = [
  {
    label:
      "The Importance of Professionalism in the Software Industry: Lessons Learned from a Decade in the Field. (blog post)",
    path: "/blog/top-10-attitudes-and-actions-unprofesional-developers-make",
  },
  {
    label:
      "Test-Driven Development in Rust Game Development with Bevy. (blog post)",
    path: "/blog/tdd-in-rust-game-engine-bevy",
  },
  {
    label: "The Software Stack for the Web 3.0 Developer. (blog post)",
    path: "/blog/software-stack-for-web-3-developer",
  },
  {
    label: "Clean Software Architecture (blog post)",
    path: "/blog/clean-architecture",
  },
  {
    label: "The Software Postmortem (my podcast)",
    path: "https://anchor.fm/software-postmortem",
  },
]

export const FreeStuff = () => (
  <DarkContainer>
    <H1>FREE STUFF</H1>
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
