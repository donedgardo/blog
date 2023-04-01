import styled from "styled-components"
import { LightContainer, H2, P } from "./typography/custom"
import React from "react"
import { SignUpForm } from "./SignUpForm"

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
        Are you tired of watching your software development projects drag on
        longer than expected?
      </Question>
      <Question>
        Do you wish your team could achieve twice the productivity they
        currently do?
      </Question>
      <Question>
        Am I using the most efficient and effective software development
        methodologies?
      </Question>
      <Question>
        How can we improve the quality of our software while also increasing
        development speed?
      </Question>
    </QuestionContainer>
    <div style={{ maxWidth: 780 }}>
      <P>I got news for you:</P>
      <P>There is no trade-off between quality and speed!</P>
      <P>
        Research has shown that quality and speed in software development don't
        have to be a trade-off. In this free bootcamp I will show you how with
        the right planning, design, and implementation, your team can achieve
        both.
      </P>
      <P>
        I will share with you the industry-standard key metrics for measuring
        software delivery performance and how to improve it. You will learn
        about the technical practices that have a direct impact on your software
        delivery performance, and how to implement them within your
        organization.
      </P>
      <P>
        Additionally, I will also show you how to improve your team culture by
        using DevOps practices that foster collaboration, experimentation, and
        continuous learning. I will show you how these practices directly relate
        to your organization's performance and profitability.
      </P>
      <P>
        No matter the size of your organization, improvement in software
        delivery is possible for every team.
      </P>
      <P style={{ textAlign: "center" }}>
        <b>
          Sign up for my bootcamp and give your software development the boost
          it needs to drive your organization towards success!
        </b>
      </P>
      <ul>
        <li>Day 1: Software Delivery Performance Assessment</li>
        <li>Day 2: Performance Oriented Culture</li>
        <li>Day 3: Continuous Delivery</li>
        <li>Day 4: Clean Architecture</li>
        <li>Day 5: Software Management Practices</li>
      </ul>
    </div>
    <SignUpForm dark />
  </LightContainer>
)
