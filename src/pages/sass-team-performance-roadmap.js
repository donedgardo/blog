import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MainNavBar } from "../components/MainNavBar"
import { BrandSlideshow } from "../components/BrandSlideshow"
import { KindWords } from "../components/KindWords"
import { AboutMe } from "../components/AboutMe"
import { LightContainer } from "../components/typography"
import { SectionContent } from "../components/typography/custom"
import { Link } from "gatsby"

const CTA_URL =
  "https://calendly.com/edgardo-g-carreras/1-on-1-sass-team-performance-assessment"
const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Edgardo Carreras | Sass Team Performance Roadmap"} />
    <MainNavBar pathname={pathname} />
    <LightContainer>
      <SectionContent>
        <h1 className="align-center">Sass Team Performance Roadmap</h1>
        <h2 className="align-center">
          Transform Your Software Development Team into an Industry Leader
        </h2>
        <hr />
        <h3>Are You Struggling to Improve Your Software Team's Performance?</h3>
        <p>
          Your software team is stuck. You're facing recurring issues with code
          quality, testing, and Agile practices. Your team keeps missing their
          sprint goals. You know you need to make a change but you're paralyzed
          by uncertainty.
        </p>
        <h3>Imagine Knowing Exactly What To Do Next</h3>
        <p>
          Imagine your team working smarter, not harder. Imagine those recurring
          issues disappearing. Imagine having the confidence to act decisively
          on improving your team's performance.
        </p>
        <hr />
        <h3 className="align-center">
          Get a Personalized Plan From an Industry Expert
        </h3>
        <p>
          <Link href={CTA_URL} className="cta">
            Get Unstuck »
          </Link>
        </p>
        <p className="align-center">
          Book a live 1-on-1 assessment session with me. Why?
        </p>
        <ul>
          <li>
            I have years of experience in software development and have helped
            numerous teams improve their performance.
          </li>
          <li>
            I have worked and learned from industry legends on best practices
            and know what it takes to create high performing software teams.
          </li>
          <li>
            I’ve taught hundreds of developers how to build software with clean
            code through training classes and webinars. I know my stuff, but
            more importantly, I know how to teach it.
          </li>
          <li>
            I'm an expert in a wide range of programming languages and
            technologies.
          </li>
          <li>
            I've trained teams globally on software engineering and its best
            practices.
          </li>
          <li>I'm bilingual, proficient in both English and Spanish.</li>
        </ul>
        <hr />
        <h3>Here's How It Works:</h3>
        <ol>
          <li>
            <strong>Initial Consultation:</strong> Understand your development
            challenges and objectives. (1-2 hours)
          </li>
          <li>
            <strong>Team Interviews:</strong> I will speak with team members to
            understand their development practices.
          </li>
          <li>
            <strong>Quality Assessment:</strong> I'll Evaluate your team's
            software quality based on code review and interviews.
          </li>
          <li>
            <strong>Recommendations Report:</strong> You will receive a compiled
            a detailed +10 page report outlining areas for improvement and
            actionable steps.
          </li>
        </ol>
        <hr />
        <h3 className="align-center">100% Money-Back Guarantee!</h3>
        <p>
          If at the end of our session you feel you have not gotten your money's
          worth, just let us know and we'll refund your payment in full.
        </p>
        <hr />
        <h3 className="align-center">Ready To Get Started?</h3>
        <p className="align-center">
          Are you ready to take your software team to the next level? Great!
        </p>
        <p>
          <Link href={CTA_URL} className="cta">
            Book your session »
          </Link>
        </p>
        <hr />
      </SectionContent>
    </LightContainer>
    <KindWords />
    <AboutMe />
    <LightContainer>
      <SectionContent>
        <hr />
        <h3 className="align-center">This Is Your Moment</h3>
        <p>
          Don't let another opportunity slip away! You're at the end of this
          page, but you could be at the beginning of a transformative journey
          for your software team. Book your 1-on-1 assessment session with me
          now:
        </p>
        <p>
          <Link href={CTA_URL} className="cta">
            BOOK YOUR SESSION »
          </Link>
        </p>
        <p>
          Still on the fence? No worries. Send me an email at{" "}
          <a href="mailto:me@edgardocarreras.com">me@edgardocarreras.com</a> and
          we can arrange a time to discuss your concerns.
        </p>
        <p>
          <strong>My 100% Money-Back Guarantee:</strong> If you follow the plan
          we develop and aren't thrilled with the results, I'll refund your
          money in full.
        </p>
        <hr />
        <h3 className="align-center">Don't Miss Out, Spots Are Limited</h3>
        <p>
          I can only accommodate a limited number of 1-on-1 assessment sessions
          each month. Availability is on a first-come, first-served basis. The
          sooner you book, the quicker you'll gain the insights needed to
          elevate your software team's performance.
        </p>
        <p></p>
      </SectionContent>
    </LightContainer>
    <BrandSlideshow />
  </Layout>
)

export default IndexPage
