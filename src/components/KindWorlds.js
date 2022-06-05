import styled from "styled-components";
import { H1, LightContainer, P } from "./typography/custom";
import React from "react";

const TestimonialAuthor = styled(P)`
  align-self: flex-end;
  text-align: right;
  color: #000000;
  max-width: 790px;
`;

const Testimonial = styled(P)`
  font-weight: 400;
  font-style: italic;
  text-align: left;
  color: #000000;
  max-width: 790px;
`;

export const KindWords = () =>
  <LightContainer>
    <H1>WHAT THEY SAY</H1>
    <div style={{ maxWidth: 952 }}>
      <Testimonial>
        “Edgardo has a reputation for getting customers with <b>complex problems</b> akin to science fiction and
        somehow <b>solve them with finesse</b>. For me, he’s not only a leader or a mentor but a wizard.”
      </Testimonial>
      <TestimonialAuthor> - Lenny Mendez | Lenny Dev LLC | Software Developer </TestimonialAuthor>
      <Testimonial>
        “Edgardo is one of the most <b>knowledgeable and fastest programmers</b> I know. He always makes sure to be up
        to date with the latest tools and has a <b>keen eye for improving products and developing innovative ideas</b>.”
      </Testimonial>
      <TestimonialAuthor> - Tania Gonzalez | Skyrocket Development | Creative Director</TestimonialAuthor>
      <Testimonial>
        “Edgardo has a <b>vast knowledge and understanding of development processes</b> and <b>technical
        abilities</b> which he <b>consistently demonstrates</b> through the <b>quality of his work</b>."
      </Testimonial>
      <TestimonialAuthor> - Karlo Martinez | MigoIQ | Software Engineer</TestimonialAuthor>
      <Testimonial>
        “Edgardo has a natural skill of <b>producing creative technical solutions</b>, working with different systems,
        and <b>quickly adopting new technologies</b>."
      </Testimonial>
      <TestimonialAuthor> - Gabriel Flores | Loveshare | CEO</TestimonialAuthor>
    </div>
  </LightContainer>;