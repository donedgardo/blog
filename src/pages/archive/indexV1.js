import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import { MainNavBar } from "../../components/MainNavBar"
import { HeroContainer } from "../../components/HeroContainer"
import { BrandSlideshow } from "../../components/BrandSlideshow"
import { KindWords } from "../../components/KindWords"
import { FreeStuff } from "../../components/FreeStuff"
import { AboutMe } from "../../components/AboutMe"
import { LightContainer } from "../../components/typography"
import { H1, H2, SectionContent } from "../../components/typography/custom"
import { headWithTitle } from "../../components/defaultHead"

export const Head = headWithTitle("Edgardo Carreras | Software Productivity Consultant")
const NewServiceSection = () => (
  <LightContainer>
    <SectionContent id="productized-service">
      <hr />
      <div className="container">
        <H1>Ways I can help</H1>
        <H2>1/ SaaS Team Bootcamp</H2>
        <p>
          Feeling the SaaS pressure? I've got your back! Introducing my{" "}
          <b>FREE Six-Part Email Series</b> designed to tackle your toughest
          development challenges, optimize your processes, and supercharge your
          team’s performance. Let's make SaaS development a breeze!
        </p>
        <p>
          <Link href="/saas-team-bootcamp" className="cta">
            Send Lesson 1 Now »
          </Link>
        </p>
        <H2>2/ Private Coaching Call</H2>
        <p>
          Got a nagging software development challenge that’s slowing you down?
          🚀 Let’s solve it together.
          <br />
          <b>Quick Fixes, Zero Fluff</b>: Get straight-to-the-point advice you
          can use immediately.
          <br />
          <b>Results Guaranteed</b>: I don’t just talk the talk—I’ll give you
          actionable steps that deliver real results, guaranteed.
        </p>
        <p>
          <Link href="/coaching-call" className="cta">
            Book Your Private Coaching Call »
          </Link>
        </p>
        <H2>3/ SaaS Team Performance Roadmap</H2>
        <p>
          Ready to make your software development team the best in the biz?
          Unlock your team’s true potential with our deep dive assessment,
          including codebase review, team interviews, and a{" "}
          <b>10+ page personalized strategy plan</b> from an industry expert for
          unbeatable performance.
        </p>
        <p>
          <Link href="/saas-team-performance-roadmap" className="cta">
            Get your Personalized Roadmap »
          </Link>
        </p>
      </div>
      <hr />
    </SectionContent>
  </LightContainer>
)
const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <MainNavBar pathname={pathname} />
    <HeroContainer />
    <NewServiceSection />
    <KindWords />
    <BrandSlideshow />
    <AboutMe />
    <FreeStuff />
  </Layout>
)

export default IndexPage
