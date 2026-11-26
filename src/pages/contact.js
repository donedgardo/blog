import React from "react"
import { LINKS, PortfolioHead, PortfolioLayout } from "../portfolio/layout"

const ContactPage = () => (
  <PortfolioLayout>
    <section className="pf-case-head">
      <div className="pf-wrap">
        <p className="pf-eyebrow">Contact</p>
        <h1>Get in touch</h1>
        <p className="pf-lede">
          I'm glad to talk about agentic engineering, delivery pipelines,
          DevSecOps or anything you read on this site.
        </p>
      </div>
    </section>
    <div className="pf-wrap">
      <div className="pf-cols" style={{ marginTop: 0, paddingBottom: 64 }}>
        <div className="pf-panel">
          <h3>Message me on LinkedIn</h3>
          <p>The fastest way to reach me.</p>
          <div className="pf-actions" style={{ marginTop: 18 }}>
            <a className="pf-btn pf-btn-primary" href={LINKS.linkedin}>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="pf-panel">
          <h3>Book a call</h3>
          <p>Pick a time on my calendar for a conversation.</p>
          <div className="pf-actions" style={{ marginTop: 18 }}>
            <a className="pf-btn" href={LINKS.calendar}>
              Open my calendar
            </a>
          </div>
        </div>
        <div className="pf-panel">
          <h3>See the code</h3>
          <p>Issues and pull requests on my projects are welcome.</p>
          <div className="pf-actions" style={{ marginTop: 18 }}>
            <a className="pf-btn" href={LINKS.github}>
              GitHub
            </a>
          </div>
        </div>
        <div className="pf-panel">
          <h3>Resume</h3>
          <p>My full work history, on one printable page.</p>
          <div className="pf-actions" style={{ marginTop: 18 }}>
            <a className="pf-btn" href={LINKS.resume}>
              View resume
            </a>
          </div>
        </div>
      </div>
    </div>
  </PortfolioLayout>
)

export const Head = ({ location }) => (
  <PortfolioHead
    title="Contact | Edgardo Carreras"
    description="How to reach Edgardo Carreras, AI / Agentic Engineer: LinkedIn, a call on his calendar, GitHub and resume."
    pathname={location.pathname}
  />
)

export default ContactPage
