import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MainNavBar } from "../components/MainNavBar"
import { HeroContainer } from "../components/HeroContainer"
import { BrandSlideshow } from "../components/BrandSlideshow"
import { KindWords } from "../components/KindWords"
import { FreeStuff } from "../components/FreeStuff"
import { AboutMe } from "../components/AboutMe"
import { SignUpBootcamp } from "../components/newsletters/sign-up-bootcamp"
import { LightContainer } from "../components/typography"
import { H1, H2, SectionContent } from "../components/typography/custom"
import { Link } from "gatsby"
import { ExpensivePainPoints } from "../components/ExpensivePainPoints"

const NewServiceSection = () => (
  <LightContainer>
    <SectionContent id="productized-service">
      <hr />
      <div className="container">
        <H1>Here's the problem...</H1>
        <ExpensivePainPoints />
        <H1>There must be a better way</H1>
        <ul>
          <li>Imagine knowing exactly what to do next.</li>
          <li>Imagine those recurring issues disappearing.</li>
          <li>Imagine your team consistently hitting sprint goals.</li>
          <li>Imagine your team delivering faster and with more confidence.</li>
          <li>
            Imagine decreasing your lead times while also increasing overall
            quality.
          </li>
          <li>
            Imagine having the confidence to act decisively on improving your
            team's performance.
          </li>
        </ul>
        <H1>Ways I can help</H1>
        <H2>Private Coaching Call</H2>
        <p>
          Are you struggling with specific software development challenge and
          need expert advice quickly? Book a private 1:1 coaching call now. I’ll
          give you no-nonsense advice that you can put into action immediately,
          guaranteed.
        </p>
        <p>
          <Link href="/coaching-call" className="cta">
            Book Your Call Now »
          </Link>
        </p>
        <H2>Sass Team Performance Roadmap</H2>
        <p>
          Want to transform your software development team into an industry
          leader? This assessment involves a comprehensive software team quality
          assessment aimed at improving your development team's performance. It
          includes an initial consultation, codebase review, team interviews,
          and a quality assessment with a +10 page personalized plan from an
          industry expert.
        </p>
        <p>
          <Link href="/sass-team-performance-roadmap" className="cta">
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
    <Seo title={"Edgardo Carreras | Software Productivity Consultant"} />
    <MainNavBar pathname={pathname} />
    <HeroContainer />
    <NewServiceSection />
    <KindWords />
    <BrandSlideshow />
    <AboutMe />
    <FreeStuff />
    <SignUpBootcamp />
  </Layout>
)

export default IndexPage
