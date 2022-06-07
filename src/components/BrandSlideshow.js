import { DarkContainer } from "./typography";
import { H1 } from "./typography/custom";
import { Slide, SlideContainer } from "./slide";
import React from "react";

export const BrandSlideshow = () =>
  <>
    <DarkContainer style={{ paddingBottom: '1rem' }}>
      <H1>TRUSTED BY GREAT BRANDS</H1>
    </DarkContainer>
    <SlideContainer>
      <Slide />
    </SlideContainer>
  </>;