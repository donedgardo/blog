import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MainNavBar } from "../components/MainNavBar"
import { HeroContainer } from "../components/HeroContainer"
import { BrandSlideshow } from "../components/BrandSlideshow"
import { KindWords } from "../components/KindWords"
import { FreeStuff } from "../components/FreeStuff"
import { AboutMe } from "../components/AboutMe"
import { LightContainer } from "../components/typography"
import { H1, H2, SectionContent } from "../components/typography/custom"
import { Link } from "gatsby"

const NewServiceSection = () => (
  <LightContainer>
    <SectionContent id="productized-service">
      <hr />
      <div className="container">
        <H1>Ways I can help</H1>
        <H2>1/ SaaS Team Bootcamp</H2>
        <p>
          A free six-part email series providing actionable insights and
          real-world strategies to overcome common SaaS development challenges,
          streamline processes, and enhance team performance and operational
          efficiency.
        </p>
        <p>
          <Link href="/saas-team-bootcamp" className="cta">
            Send Lesson 1 Now »
          </Link>
        </p>
        <H2>2/ Private Coaching Call</H2>
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
        <H2>3/ SaaS Team Performance Roadmap</H2>
        <p>
          Want to transform your software development team into an industry
          leader? This assessment involves a comprehensive software team quality
          assessment aimed at improving your development team's performance. It
          includes an initial consultation, codebase review, team interviews,
          and a quality assessment with a +10 page personalized plan from an
          industry expert.
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
    <Seo title={"Edgardo Carreras | Software Productivity Consultant"} />
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
