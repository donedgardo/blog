import Layout from "./layout"
import Seo from "./seo"
import { MainNavBar } from "./MainNavBar"
import { LightContainer } from "./typography"
import { SectionContent } from "./typography/custom"
import { SignUpForm } from "./newsletters/SignUpForm"
import { KindWords } from "./KindWords"
import { AboutMe } from "./AboutMe"
import { BrandSlideshow } from "./BrandSlideshow"
import { FreeStuff } from "./FreeStuff"
import React from "react"
import { ExpensivePainPoints } from "./ExpensivePainPoints"

const SaasTeamBootcampPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Saas Team Bootcamp | Edgardo Carreras"} />
    <MainNavBar pathname={pathname} />
    <LightContainer>
      <SectionContent>
        <h1 className="align-center">SaaS Team Bootcamp</h1>
        <h3 className="align-center">
          Unlock Your SaaS Team's Full Potential with Our Free 6-Part Bootcamp
        </h3>
        <p>
          A six-part email series providing actionable insights and real-world
          strategies to overcome common SaaS development challenges, streamline
          processes, and enhance team performance and operational efficiency.
        </p>
        <p>
          <SignUpForm
            url="https://app.convertkit.com/forms/3332277/subscriptions"
            ctaLabel="SEND LESSON 1 NOW »"
          />
        </p>
        <hr />

        <h2 className="align-center">The problem...</h2>
        <ExpensivePainPoints />
        <p>
          These issues can severely impact your SaaS organization, leading to
          stalled growth, frustrated teams, and dissatisfied customers. If these
          challenges sound familiar, it's time to take action and make the
          necessary changes to get your software team back on track and aligned
          with business objectives.
        </p>
        <h3 className="align-center">There must be a better way</h3>
        <p>
          Imagine a world where your development team operates like a well-oiled
          machine:
        </p>
        <ul>
          <li>
            <b>Rapid Release Cycles:</b> Introducing new features quickly and
            consistently.
          </li>
          <li>
            <b>Smooth Deployments:</b> Confidently pushing updates without
            stress or burnout.
          </li>
          <li>
            <b>High-Quality Code:</b> Ensuring customer satisfaction with robust
            and reliable features.
          </li>
          <li>
            <b>Operational Efficiency:</b> Streamlined processes that reduce
            costs and improve productivity.
          </li>
        </ul>
        <h3 className="align-center">What You'll Learn:</h3>
        <p>
          <ol>
            <li>
              <b>Common Challenges in Development Teams:</b> Identify and
              address core issues hindering productivity.
            </li>
            <li>
              <b>Setting Clear Goals:</b> Align goals with strategic objectives
              for maximum impact.
            </li>
            <li>
              <b>Collaborative Design Sessions:</b> Harness the power of
              collective brainstorming and stakeholder alignment.
            </li>
            <li>
              <b>Pair Programming and Mob Programming:</b> Boost productivity
              and foster continuous learning.
            </li>
            <li>
              <b>Automated Testing:</b> Elevate code quality and deployment
              confidence through automation.
            </li>
            <li>
              <b>Optimizing Delivery Pipelines with CI/CD:</b> Drive efficiency
              and speed with best practices in continuous integration and
              deployment.
            </li>
          </ol>
        </p>
        <p>
          Each email provides a detailed exploration of these topics, ensuring
          you have the tools and knowledge to implement changes effectively.
        </p>
      </SectionContent>
    </LightContainer>
    <KindWords />
    <LightContainer>
      <SectionContent>
        <h3 className="align-center">This Is Your Moment</h3>
        <p>
          Don't let another opportunity slip away! You're at the end of this
          page, but you could be at the beginning of a transformative journey
          for your software team.
        </p>
        <p>
          <SignUpForm
            url="https://app.convertkit.com/forms/3332277/subscriptions"
            ctaLabel="SEND LESSON 1 NOW »"
          />
        </p>
        <p style={{ fontSize: "0.9em" }}>
          <b>Risk-Free Guarantee:</b> We respect your privacy. No spam, ever.
          Unsubscribe anytime.
        </p>
      </SectionContent>
    </LightContainer>
    <AboutMe />
    <BrandSlideshow />
    <FreeStuff />
  </Layout>
)
export default SaasTeamBootcampPage
