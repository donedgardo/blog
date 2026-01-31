import React from "react"
import Seo from "../components/seo"
import { SignUpForm2 } from "../components/newsletters/SignUpForm2"
import { Header } from "../components/header"

function NewsletterHeroSection() {
  return (
    <section id="hero" className="no-border-radius">
      <div className="container">
        <div className="row flex-md-nowrap">
          <div className="col-1 col-12">
            <h5 className="roboto-bold text-uppercase primary-color">
              For Engineering Leaders in the AI Era
            </h5>
            <h1 className="roboto-bold mb-1 mb-md-4 text-capitalize">
              Ship Fast. Stay Safe. <br /> Even When AI Writes the Code.
            </h1>
            <h4 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              A daily newsletter on DevSecOps, CI/CD, and the principles that 
              let you harness AI speed without the chaos.
            </h4>
            <h5 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              AI generates code faster than ever. The hard part is making sure 
              it doesn't sink your codebase. Get daily insights on building 
              pipelines, quality gates, and feedback loops that keep you 
              moving fast — without the fire drills.
            </h5>
            <div className="cta my-4 my-md-5">
              <SignUpForm2
                ctaLabel="Send Me Daily Insights"
                url="https://app.convertkit.com/forms/3332277/subscriptions"
              />
              <small className="text-white">
                <em>
                  Join 100+ engineering leaders. No spam. Unsubscribe anytime.
                </em>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatYouGetSection() {
  return (
    <section className="py-5" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <h2 className="text-white text-center mb-5">What You'll Get</h2>
            
            <div className="row">
              <div className="col-12 col-md-6 mb-4">
                <div className="p-4" style={{ backgroundColor: "#252525", borderRadius: "8px", height: "100%" }}>
                  <h4 className="primary-color mb-3">🎯 Principles That Scale</h4>
                  <p className="text-white mb-0">
                    TDD, CI/CD, shift-left security — the fundamentals that matter 
                    more than ever when AI accelerates everything.
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6 mb-4">
                <div className="p-4" style={{ backgroundColor: "#252525", borderRadius: "8px", height: "100%" }}>
                  <h4 className="primary-color mb-3">🔧 Practical DevSecOps</h4>
                  <p className="text-white mb-0">
                    Pipeline patterns, security automation, and quality gates 
                    you can implement this week.
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6 mb-4">
                <div className="p-4" style={{ backgroundColor: "#252525", borderRadius: "8px", height: "100%" }}>
                  <h4 className="primary-color mb-3">🤖 AI-Era Strategies</h4>
                  <p className="text-white mb-0">
                    How to harness agentic coding without accumulating 
                    technical debt at machine speed.
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6 mb-4">
                <div className="p-4" style={{ backgroundColor: "#252525", borderRadius: "8px", height: "100%" }}>
                  <h4 className="primary-color mb-3">⚡ 2-Minute Reads</h4>
                  <p className="text-white mb-0">
                    One focused insight per day. No fluff, no filler — just 
                    actionable ideas you can use immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RecentPostsSection() {
  return (
    <section className="py-5" style={{ backgroundColor: "#121212" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <h2 className="text-white text-center mb-4">Recent Issues</h2>
            <p className="text-center text-white-50 mb-5">
              Here's a taste of what subscribers are reading:
            </p>
            
            <div className="mb-4 p-4" style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", borderLeft: "4px solid #ED9567" }}>
              <h5 className="text-white mb-2">Steering the Genie</h5>
              <p className="text-white-50 mb-0">
                AI agents write code at extreme speeds. But speed means nothing if 
                the destination is wrong. The principles that let you navigate.
              </p>
            </div>
            
            <div className="mb-4 p-4" style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", borderLeft: "4px solid #ED9567" }}>
              <h5 className="text-white mb-2">The True Essence of Agile</h5>
              <p className="text-white-50 mb-0">
                Agile is a culture, not a framework. It starts at the top. 
                Why most implementations miss the point entirely.
              </p>
            </div>
            
            <div className="mb-4 p-4" style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", borderLeft: "4px solid #ED9567" }}>
              <h5 className="text-white mb-2">From Chaos to Clarity: Continuous Delivery</h5>
              <p className="text-white-50 mb-0">
                A broken build system causes chaotic release management. 
                Why automated builds and tests change everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="py-5" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-3 text-center mb-4 mb-md-0">
            <img 
              src="/images/portrait_edgardo.png" 
              alt="Edgardo Carreras" 
              style={{ maxWidth: "200px", borderRadius: "50%" }}
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-md-6">
            <h3 className="text-white mb-3">About Edgardo</h3>
            <p className="text-white">
              I've spent the last decade as a developer, CTO, consultant, and team 
              lead. I've built CI/CD pipelines, rescued legacy codebases, and learned 
              (the hard way) that security and quality can't be afterthoughts.
            </p>
            <p className="text-white mb-0">
              My background is in software craftsmanship: TDD, Clean Architecture, 
              continuous delivery. These days, I apply those same principles to 
              DevSecOps and helping teams navigate the AI era.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BottomCTASection() {
  return (
    <section className="py-5" style={{ backgroundColor: "#121212" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h2 className="text-white mb-4">
              Ready to ship with confidence?
            </h2>
            <p className="text-white mb-4">
              Get daily insights on building pipelines that let you move fast 
              without breaking things — even when AI writes the code.
            </p>
            <div className="cta">
              <SignUpForm2
                ctaLabel="Subscribe Now"
                url="https://app.convertkit.com/forms/3332277/subscriptions"
              />
              <small className="text-white">
                <em>
                  No spam. No fluff. Just daily insights you can use.
                </em>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const IndexPage = () => (
  <>
    <div className="site-content">
      <Header />
      <main>
        <NewsletterHeroSection />
        <WhatYouGetSection />
        <RecentPostsSection />
        <AboutSection />
        <BottomCTASection />
      </main>
      <footer className="p-4 light-dark-bg">
        <div className="bottom">
          <p className="text-center text-white mb-1">
            © {new Date().getFullYear()} Copyright. Edgardo Carreras.
          </p>
        </div>
      </footer>
    </div>
  </>
)

export const Head = () => {
  return (
    <>
      <Seo title={"Edgardo Carreras | DevSecOps Newsletter"} />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:wght@500&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/bootstrap.min.css" />
      <link rel="stylesheet" href="/styles/bootstrap-grid.min.css" />
      <link rel="stylesheet" href="/styles/styles.css" />
      <style>
        {` 
          body {
            background-color: #121212;
          }
          .text-white-50 {
            color: rgba(255,255,255,0.6) !important;
          }
        `}
      </style>
    </>
  )
}

export default IndexPage
