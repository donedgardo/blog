import React from "react";
import { DarkContainer } from "./typography";
import { H1, P, SectionContent } from "./typography/custom";
import { SignUpForm } from "./SignUpForm";

const BootcampHero = () => {
  return (
    <DarkContainer>
      <H1>DevOps Essential Bootcamp</H1>
      <SectionContent>
        <P style={{ textAlign: "center" }}>
          A free six day email course to teach you how to create high
          performing development teams.
        </P>
        <SignUpForm />
      </SectionContent>
    </DarkContainer>
  );
};

export default BootcampHero;