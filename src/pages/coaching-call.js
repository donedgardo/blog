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
  "https://calendly.com/edgardo-g-carreras/coaching-call-with-edgardo"
const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Coaching Call | Edgardo Carreras"} />
    <MainNavBar pathname={pathname} />
    <LightContainer>
      <SectionContent>
        <h1 className="align-center">Private 1:1 Coaching Call</h1>
        <h3 className="align-center">
          Actionable insights you can implement right away, guaranteed.
        </h3>
        <h4 className="align-center">
          Get Answers • Gain Confidence • Take Action
        </h4>
        <h4>
          <Link href={CTA_URL} className="cta">
            Book your call now »
          </Link>
        </h4>
        <hr />
        <h3>Struggling to Enhance Your Software Development Team?</h3>
        <p>Your team feels stuck, like you’re on a never-ending loop.</p>
        <p>
          Recurring issues and obstacles keep appearing. You’re uncertain about
          the next steps, and it’s paralyzing.
        </p>
        <p>
          You’ve done your research—read articles, listened to podcasts,
          attended webinars, and absorbed numerous technical books—yet applying
          this knowledge to your team remains challenging.
        </p>
        <h3>Imagine Knowing Exactly What To Do Next</h3>
        <p>
          Picture this: stepping off the treadmill. Reducing lead times,
          increasing customer satisfaction, team collaboration. Rapid deployment
          cycles and streamlined Agile processes. Seeing persistent issues fade
          away. Gaining the confidence to take decisive actions that improve
          your team's performance.
        </p>
        <hr />
        <h3 className="align-center">
          Speak With an Experienced Software Development Coach
        </h3>
        <p>
          <Link href={CTA_URL} className="cta">
            Book your call now »
          </Link>
        </p>
        <p className="align-center">
          Sometimes, all it takes to break free is the right conversation at the
          right time. Move past analysis paralysis and find out exactly what to
          do next. Schedule a live 1:1 coaching call with me now. Why?
        </p>
        <ul>
          <li>
            I have worked and learned from industry legends on best practices
            and know what it takes to create high performing software teams.
          </li>
          <li>
            I have years of experience in software development and have helped
            numerous teams improve their performance.
          </li>
          <li>
            I’ve taught hundreds of tech teams how to build software with clean
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
          <li>Schedule a coaching call using my private scheduling link.</li>
          <li>
            The session is set for 45 minutes, but consider blocking extra time
            in case we run over.
          </li>
          <li>
            We'll meet via Zoom. Share your biggest software development
            challenge with me.
          </li>
          <li>
            I’ll provide specific, actionable steps to address your issues.
          </li>
        </ol>
        <h4>Common topics include:</h4>
        <ul>
          <li>Enhancing organizational alignment, culture and leadership</li>
          <li>
            Boosting team productivity, collaboration and efficiency strategies
          </li>
          <li>Streamlining Agile processes and achieving sprint goals</li>
          <li>Enhancing code quality and testing practices</li>
          <li>Implementing efficient CI/CD pipelines</li>
        </ul>
        <p>
          I offer practical advice that you can act on immediately. This isn't
          about vague principles—it's about clear, direct instructions based on
          my extensive experience.
        </p>
        <p>
          Feel free to record the call for future reference. Once you pay,
          you’ll get a link to schedule a 45-minute session in my calendar.
          NOTE: Consider blocking some extra time after the call.
        </p>
        <hr />
        <h3 className="align-center">100% Money-Back Guarantee!</h3>
        <p>
          I’m confident that I can provide at least one high-value piece of
          advice. If you don’t feel you got your money’s worth by the end of our
          call, let me know, and I’ll refund your payment in full.
        </p>
        <hr />
        <h3 className="align-center">Ready To Get Started?</h3>
        <p className="align-center">
          Are you ready to take your software team to the next level? Great!
        </p>
        <p>
          <Link href={CTA_URL} className="cta">
            Book your call now »
          </Link>
        </p>
        <hr />
      </SectionContent>
    </LightContainer>
    <KindWords />
    <LightContainer>
      <SectionContent>
        <h3>Still Have Questions?</h3>
        <h4>What happens after I pay?</h4>
        <p>
          Once you complete your payment, you’ll receive a link to schedule an
          appointment in my calendar. The session is set for 1 hour, but block
          extra time just in case.
        </p>
        <h4>Are there other costs besides the coaching call?</h4>
        <p>
          No major costs. I might recommend a book or a service, but that's it.
        </p>
        <h4>I’m nervous about sharing my business ideas...</h4>
        <p>
          Don't worry. I treat all shared information with strict
          confidentiality. I’ve been consulting for over a decade and would have
          gone out of business if I didn't maintain this trust.
        </p>
        <h4>Will you sign an NDA before we speak?</h4>
        <p>
          No, for small engagements like this, involving lawyers isn’t
          financially sensible.
        </p>
        <h4>I don’t think I need help...</h4>
        <p>
          {" "}
          Everyone needs help at times. Even I seek outside assistance for my
          own business. It’s hard to see the water when you’re swimming in it.
        </p>
        <h4>My situation is different!</h4>
        <p>
          Probably not. Many aspects of software development challenges are
          universal. The key is knowing which to apply and how.{" "}
        </p>
        <h4>Can my business partner join the call too?</h4>
        <p>
          No, this is a 1:1 session. You can record the conversation to share
          with your partner afterward.
        </p>
        <p>
          Still on the fence? No worries. Send me an email at{" "}
          <a href="mailto:me@edgardocarreras.com">me@edgardocarreras.com</a> and
          we can arrange a time to discuss your concerns.
        </p>
        <hr />
        <h3 className="align-center">This Is Your Moment</h3>
        <p>
          Don't let another opportunity slip away! You're at the end of this
          page, but you could be at the beginning of a transformative journey
          for your software team. Book your 1-on-1 coaching session with me now:
        </p>
        <p>
          <Link href={CTA_URL} className="cta">
            Book your call now »
          </Link>
        </p>
        <hr />
        <h3 className="align-center">Don't Miss Out, Spots Are Limited</h3>
        <p>
          I can only accommodate a limited number of 1-on-1 coaching sessions
          each month. Availability is on a first-come, first-served basis. The
          sooner you book, the quicker you'll gain the insights needed to
          elevate your software team's performance.
        </p>
        <p></p>
      </SectionContent>
    </LightContainer>
    <AboutMe />
    <BrandSlideshow />
  </Layout>
)

export default IndexPage
