import React from "react"
import logos from "../images/brand-logos-2-rows.png"
import logosMobile from "../images/brand-logos.png"

import Portrait from "../components/portrait"
import Layout from "../components/layout"
import SEO from "../components/seo"
import P from "../components/typography/P"

import Logo from "../images/ecarreras.inline.svg"
import Divider from "../images/divider.inline.svg"
import styled, { keyframes } from "styled-components"
import { MainNavBar } from "../components/main_nav_bar"

const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 64px;
  padding-bottom: 29px;
`

const DividerContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 31px;
`

const Question = styled(P)`
  margin-bottom: 29px;
  max-width:790px
`

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1.0875rem 1.45rem;
  padding-top: 19px;
`

const CTAButton = styled.a`
  margin-top: 36px;
  margin-bottom: 72px;
  width: 228px;
  text-decoration: none;
  height: 49px;
  background: #f9f9f9;
  border-radius: 20px;
  padding: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-style: normal;
  font-size: 18px;
  letter-spacing: 0.1em;
  color: #231f20;
  &:hover {
    box-shadow: -1px 10px 29px 0px rgba(0,0,0,0.8);
  }
`

const StyledPortrait = styled(Portrait)`
  width: 200px;
  margin-bottom: 24px;
`

const AboutP = styled(P)`
  font-weight: 500;
  font-size: 18px;
  line-height: 158.9%;
  letter-spacing: 0.1em;
  margin-bottom: 29px;
  text-align: left;
  color: #000000;
  max-width: 790px;
`
const TestimonialAuthor = styled(P)`
  font-weight: 500;
  font-size: 18px;
  line-height: 158.9%;
  align-self: flex-end;
  letter-spacing: 0.1em;
  margin-bottom: 29px;
  text-align: right;
  color: #000000;
  max-width: 790px;
`
const Testimonial = styled(P)`
  font-family: "Montserrat"; san-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 18px;
  line-height: 158.9%;
  letter-spacing: 0.1em;
  margin-bottom: 29px;
  text-align: left;
  color: #000000;
  max-width: 790px;
`

const AboutMeContainer = styled.div`
  background: #fefefe;
  padding: 2.45rem 2.45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media(max-width:790px) {
    padding: 1.55rem 2.45rem;
  }
`

const Headline = styled(P)`
  margin-top: 30px;
  margin-bottom: 35px;
  font-weight: bold;
  font-size: 24px;
  line-height: 151.9%;
  letter-spacing: 0.225em;
  color: #fff;
`

const BrandContainer = styled.div`
  background: #231f20;
  padding: 1.45rem 2.45rem;
`

const SlideContainer = styled.div`
  height: 286px;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  transform: translate3d(0, 0, 0);
  background: #231f20;
  @media(max-width:790px){
    height: 286px;
  }
`

const slide = keyframes`
  100% {
    transform: translateX(-66.6666%);
  }
`

const Slide = styled.div`
  height: 247px;
  width: 5900px;
  background-image url(${logos});
  background-repeat: repeat-x;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin-left: 10px;
  transform: translate3d(0,0,0);
  animation: ${slide} 160s linear infinite;
  @media(max-width:790px) {
    background-image url(${logosMobile});
  }
`

const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <SEO title={"Edgardo Carreras | Software Productivity Consultant"} />
    <MainNavBar pathname={pathname} />
    <LogoContainer>
      <Logo />
    </LogoContainer>
    <DividerContainer>
      <Divider />
    </DividerContainer>
    <QuestionContainer>
      <Question>
        Do you have a risky software project that needs to be done right?
      </Question>
      <Question>Do you wish your software team would be twice as productive?</Question>
      <Question>Want to release features daily instead of monthly?</Question>
      <Question>Yes?! Then lets talk about it!</Question>
      <CTAButton href={"https://calendly.com/edgardo-g-carreras/software-productivity"} target={"_blank"}>
        BOOK A CALL
      </CTAButton>
    </QuestionContainer>
    <AboutMeContainer>
      <StyledPortrait />
      <AboutP>
        Hi <span role="img" aria-label="wave">👋</span>, I am a software productivity consultant who helps Fin-tech
        Product owners maximize their return on investment and increase their development teams' productivity. I provide
        high impact through product design, software architecture, platform selection, integration planning, and process design.
      </AboutP>
      <AboutP>
        Unlike my competitors, I have mentored and taught hundreds of
        software engineers, have over a decade of experience and a track record in scaling and building successful
        software development teams and products.
      </AboutP>
    </AboutMeContainer>
    <BrandContainer>
      <Headline>TRUSTED BY GREAT BRANDS</Headline>
    </BrandContainer>
    <SlideContainer>
      <Slide />
    </SlideContainer>
    <AboutMeContainer>
      <h2>WHAT THEY SAY</h2>
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
    </AboutMeContainer>
  </Layout>
)

export default IndexPage
