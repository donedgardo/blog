import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MainNavBar } from "../components/MainNavBar"
import { HeroContainer } from "../components/HeroContainer"
import { BrandSlideshow } from "../components/BrandSlideshow"
import { KindWords } from "../components/KindWorlds"
import { FreeStuff } from "../components/FreeStuff"
import { AboutMe } from "../components/AboutMe"
import { SignUpBootcamp } from "../components/newsletters/sign-up-bootcamp"
import { LightContainer } from "../components/typography"
import { H1, SectionContent } from "../components/typography/custom"
import { Link } from "gatsby"

const NewServiceSection = () => (
  <LightContainer>
    <SectionContent id="productized-service">
      <hr />
      <div className="container">
        <H1>Introducing My New Service: Software Quality Assessment</H1>
        <p>
          Are you struggling with software development challenges? We have the
          solution for you!
        </p>
        <div className="row mx-auto">
          <div>
            <h4>What You Get</h4>
            <ul>
              <li>Comprehensive code quality review</li>
              <li>Best practices assessment</li>
              <li>Actionable recommendations</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h4>Why Choose This Service</h4>
            <ul>
              <li>Expert guidance from Edgardo Carreras</li>
              <li>Customized solutions for your team</li>
              <li>100% Money-Back Guarantee</li>
            </ul>
          </div>
        </div>
        <p>
          <Link href="/software-quality-assessment" className="cta">
            Learn More »
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
    <AboutMe />
    <BrandSlideshow />
    <KindWords />
    <FreeStuff />
    <SignUpBootcamp />
  </Layout>
)

export default IndexPage
