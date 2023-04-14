import styled from "styled-components"
import { LightContainer, H2, P } from "./typography/custom"
import React from "react"
import { SignUpForm } from "./newsletters/SignUpForm"

const Question = styled.li`
  max-width: 790px;
`
const QuestionContainer = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: Montserrat, serif;
  justify-content: center;
`
export const Questions = () => (
  <LightContainer>
    <H2>Ask yourself:</H2>
    <QuestionContainer>
      <Question>
        How can my business scale while my code is too rigid or fragile to
        change?
      </Question>
      <Question>
        Am I practicing efficient and effective software development lifecycles?
      </Question>
      <Question>
        Can we improve our software's quality while increasing development speed
        and team morale?
      </Question>
    </QuestionContainer>

    <div style={{ maxWidth: 760 }}>
      <P>I got news for you:</P>
      <P>
        Research has shown that quality and speed in software development don't
        have to be a trade-off. In this newsletter I will share how your team
        can achieve both with the proper strategies.
      </P>
      <P>
        I will share the industry-standard key metrics for measuring software
        delivery performance and how to improve it. In addition, you will learn
        about the technical practices that directly impact your software
        delivery performance and how to implement them within your organization.
      </P>
      <P>
        I will also show you how to improve your team culture by using DevOps
        practices that foster collaboration, experimentation, and continuous
        learning. Finally, I will show you how these practices directly relate
        to your organization's performance and profitability.
      </P>
      <P>
        No matter your organization's size, software delivery improvement is
        possible for every type of team.
      </P>
      <P style={{ textAlign: "center" }}>
        <b>
          Sign up for my newsletter and give your software development the
          confidence it needs to drive your organization towards success!
        </b>
      </P>
    </div>
    <h4>What topics will be covered?</h4>
    <ul>
      <li>Measuring Software Delivery Performance</li>
      <li>Fostering Performance Oriented Culture</li>
      <li>Practicing Continuous Delivery</li>
      <li>When should I Practice TDD?</li>
      <li>Clean Architecture for Expansion</li>
    </ul>
    <SignUpForm dark />
  </LightContainer>
)
