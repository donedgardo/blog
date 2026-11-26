import React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import "./portfolio.css"

export const LINKS = {
  github: "https://github.com/donedgardo",
  linkedin: "https://www.linkedin.com/in/edgardo-carreras/",
  calendar: "https://calendly.com/edgardo-g-carreras/interview",
  resume: "/resume/",
}

const SITE = "https://edgardocarreras.com"

// Schema.org description of the person, so search engines and link previews
// can identify whose site this is.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edgardo Carreras",
  url: SITE,
  image: `${SITE}/images/edgardo-carreras-portrait-640.webp`,
  jobTitle: "AI / Agentic Engineer",
  description:
    "AI / Agentic Engineer building infrastructure, agentic workflows and MCP servers that let teams ship quickly and safely.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caguas",
    addressRegion: "PR",
    addressCountry: "US",
  },
  sameAs: [LINKS.github, LINKS.linkedin],
  knowsAbout: [
    "Agentic workflows",
    "Model Context Protocol",
    "DevSecOps",
    "CI/CD",
    "Kubernetes",
    "Terraform",
    "Test-driven development",
  ],
}

export const PortfolioHead = ({ title, description, pathname }) => (
  <>
    <Seo title={title} description={description} pathname={pathname} />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  </>
)

export const PortfolioLayout = ({ children }) => (
  <div className="pf">
    <nav className="pf-nav" aria-label="Main">
      <div className="pf-wrap">
        <Link to="/" className="pf-brand">
          Edgardo Carreras
        </Link>
        <ul>
          <li>
            <Link to="/#work">Work</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/newsletter">Newsletter</Link>
          </li>
          <li>
            <a href={LINKS.resume}>Resume</a>
          </li>
          <li>
            <Link to="/contact/">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
    <main>{children}</main>
    <footer className="pf-footer">
      <div className="pf-wrap">
        <span>Edgardo Carreras · Caguas, Puerto Rico</span>
        <ul>
          <li>
            <a href={LINKS.github}>GitHub</a>
          </li>
          <li>
            <a href={LINKS.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={LINKS.resume}>Resume</a>
          </li>
          <li>
            <Link to="/contact/">Contact</Link>
          </li>
          <li>
            <Link to="/coaching/">Coaching</Link>
          </li>
        </ul>
      </div>
    </footer>
  </div>
)
