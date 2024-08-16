import React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { MainNavBar } from "../../components/MainNavBar"
import { BrandSlideshow } from "../../components/BrandSlideshow"
import { KindWords } from "../../components/KindWords"
import { AboutMe } from "../../components/AboutMe"
import { LightContainer } from "../../components/typography"
import { SectionContent } from "../../components/typography/custom"
import { Link } from "gatsby"
import { DefaultHead } from "../../components/defaultHead"
const CTA_URL =
  "https://calendly.com/edgardo-g-carreras/1-on-1-software-quality-assessment-session"

export const Head = DefaultHead
const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo
      title={
        "Edgardo Carreras | Strategic & Hands-on Support for Tech Organizations."
      }
    />
    <MainNavBar pathname={pathname} />
    <LightContainer>
      <SectionContent>
        <h1 className="align-center">
          Strategic & Hands-on Support for Tech Organizations
        </h1>
        <h2 className="align-center">
          Elevate Your Development Processes with Expert Guidance
        </h2>
        <hr />
        <h3>Is This Right For You?</h3>
        <ul>
          <li>
            Are you struggling with development bottlenecks that slow down your
            progress?
          </li>
          <li>
            Do you need to align your development activities with strategic
            business goals?
          </li>
          <li>
            Is your team facing resource constraints and lacking expertise in
            best practices?
          </li>
          <li>
            Are you looking to maintain a healthy work-life balance for your
            development team?
          </li>
        </ul>
        <h3>How It Works</h3>
        <p>
          Edgardo Carreras' Strategic & Hands-on Support service is designed to
          provide comprehensive support to streamline your software development
          lifecycle.
        </p>
        <hr />
        <h3>Step 1: Initial Assessment</h3>
        <p>
          Edgardo starts with a thorough assessment of your current development
          processes, identifying key areas for improvement and aligning them
          with your business objectives.
        </p>
        <ul>
          <li>
            Planning & Retrospectives: Participate in weekly sessions to
            critically analyze and refine development processes.
          </li>
          <li>
            Developer Unblock Assistance: Responsive communication framework to
            ensure timely and actionable solutions.
          </li>
        </ul>
        <hr />
        <h3>Step 2: Strategic & Hands-on Support Implementation</h3>
        <p>
          Edgardo provides dedicated support aimed at enhancing your technical
          team’s capabilities and strategic planning activities.
        </p>
        <ul>
          <li>
            Pair/Mob Programming Sessions: opportunities for collaborative
            coding and learning.
          </li>
          <li>
            Availability for Managerial Advice: Continuous strategic guidance to
            navigate tech challenges and maintain a competitive edge.
          </li>
          <li>
            Weekly Whiteboard Design Meetings: Visualize and roadmap
            goal-oriented system design.
          </li>
        </ul>
        <hr />
        <h3>Step 3: Continuous Monitoring and Feedback</h3>
        <p>
          Edgardo sets up systems for continuous monitoring and iterative
          feedback to improve deployments continuously.
        </p>
        <ul>
          <li>
            Proactive Communication: Ensure resilient strategic planning and
            decision-making with an expert always within reach.
          </li>
          <li>
            Enhanced Decision-Making: Align product development with business
            objectives through strategic advice and planning.
          </li>
        </ul>
        <hr />
        <h3>Benefits</h3>
        <ul>
          <li>
            Sustained Workflow Efficiency: Address bottlenecks and accelerate
            issue resolution to maintain development pace.
          </li>
          <li>
            Enhanced Knowledge Sharing: Promote team competence through
            collaborative learning and pair programming.
          </li>
          <li>
            Resilient Strategic Planning: Ensure continuous strategic guidance
            for tech advancements and cross-functional alignment.
          </li>
        </ul>
        <hr />
        <h3>Core Values</h3>
        <p>
          Edgardo emphasizes the following XP culture values to align your team:
        </p>
        <ul>
          <li>
            Feedback: Encourage continuous feedback to improve processes and
            outcomes.
          </li>
          <li>
            Respect: Foster a respectful environment where every team member’s
            contributions are valued.
          </li>
          <li>
            Communication: Enhance communication within the team to ensure
            clarity and collaboration.
          </li>
          <li>
            Simplicity: Focus on simple, effective solutions to complex
            problems.
          </li>
          <li>
            Courage: Empower the team to make bold decisions and take on
            challenges confidently.
          </li>
        </ul>
        <p>Teaching Practices via Pair Programming:</p>
        <ul>
          <li>
            Clean Architecture: Learn to structure your codebase for
            maintainability and scalability.
          </li>
          <li>
            Test-Driven Development (TDD): Adopt TDD to ensure high-quality,
            reliable code.
          </li>
          <li>
            Refactoring: Continuously improve code quality through systematic
            refactoring.
          </li>
        </ul>
        <hr />
        <h3>Client Results</h3>
        <p>
          Clients have seen remarkable improvements in their development
          processes:
        </p>
        <ul>
          <li>
            50% Increase in Team Productivity: Achieved through streamlined
            processes and strategic guidance.
          </li>
          <li>
            Improved Developer Autonomy: Fostered a culture of critical
            problem-solving and collaborative innovation.
          </li>
          <li>
            Enhanced Strategic Decision-Making: Enabled better alignment between
            development activities and business objectives.
          </li>
        </ul>
        <hr />
        <h3>Pricing</h3>
        <p>
          Edgardo’s Strategic & Hands-on Support service is priced at
          $7,000/month.
        </p>
        <ul>
          <li>
            Fixed Pricing: Know your investment upfront with no hourly billing.
          </li>
          <li>
            Discount Available: Avail a 10% discount by paying in advance for a
            block of three months.
          </li>
          <li>Start Date: Available to start on [Start Date].</li>
        </ul>
        <hr />
        <h3 className="align-center">Ready To Get Started?</h3>
        <p className="align-center">
          Transform your tech organization with Edgardo Carreras' Strategic &
          Hands-on Support service. Contact Edgardo today to learn more and
          schedule a consultation.
        </p>
        <p className="align-center">
          <Link href={CTA_URL} className="cta">
            Get Unstuck »
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
          for your software team. Book your 1-on-1 assessment session with
          Edgardo now:
        </p>
        <p>
          <Link href={CTA_URL} className="cta">
            BOOK YOUR SESSION »
          </Link>
        </p>
        <p>
          Still on the fence? No worries. Send Edgardo an email at{" "}
          <a href="mailto:me@edgardocarreras.com">me@edgardocarreras.com</a> and
          we can arrange a time to discuss your concerns.
        </p>
        <p>
          <strong>100% Money-Back Guarantee:</strong> If you follow the plan
          developed and aren't thrilled with the results, Edgardo will refund
          your money in full.
        </p>
        <hr />
        <h3 className="align-center">Don't Miss Out, Spots Are Limited</h3>
        <p>
          Edgardo can only accommodate a limited number of 1-on-1 assessment
          sessions each month. Availability is on a first-come, first-served
          basis. The sooner you book, the quicker you'll gain the insights
          needed to elevate your software team's performance.
        </p>
        <p></p>
      </SectionContent>
    </LightContainer>
    <BrandSlideshow />
  </Layout>
)

export default IndexPage
