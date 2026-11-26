import React from "react"
import { Link } from "gatsby"
import { LINKS, PortfolioHead, PortfolioLayout } from "../portfolio/layout"
import work from "../portfolio/work"

const headline = [
  { value: "0 → 5", label: "agentic workflows delivered in 3 months" },
  { value: "8", label: "MCP servers delivered" },
  { value: "1 week → 30 min", label: "lead time, code complete to users" },
  { value: "50% → 10%", label: "change failure rate at a client" },
]

const principles = [
  {
    title: "Tests come first",
    body:
      "I work test-first, in application code and in pipelines. An agent that writes code needs the same thing a new teammate needs: a fast, trustworthy signal that the change works.",
  },
  {
    title: "Build once, deploy anywhere",
    body:
      "One artifact moves through every environment. Rollback is a redeploy of a known build, which is how recovery drops from days to minutes.",
  },
  {
    title: "Measure delivery, not activity",
    body:
      "I judge my work by the four DORA metrics: deployment frequency, lead time for changes, change failure rate and mean time to recovery.",
  },
  {
    title: "Agents ship as configuration",
    body:
      "New agent tools should not need UI work. I put MCP servers behind a registry with authentication, so adding a capability is a configuration change that can be reviewed.",
  },
]

const testimonials = [
  {
    quote:
      "Edgardo provided invaluable mentorship, helping junior developers grow technically and enforcing high code standards through TDD and tool integration.",
    name: "William Cheung",
  },
  {
    quote:
      "Through Edgardo's hands-on approach, I learned invaluable tactics for team management, implementing CI/CD and monitoring. His focus on value over effort is exceptional.",
    name: "Fernando Yordan",
  },
  {
    quote:
      "Edgardo has a vast knowledge and understanding of development processes and technical abilities which he consistently demonstrates through the quality of his work.",
    name: "Karlo Martinez",
  },
]

const IndexPage = () => (
  <PortfolioLayout>
    <section className="pf-hero">
      <div className="pf-wrap">
        <div>
          <p className="pf-eyebrow">AI / Agentic Engineer · DevSecOps</p>
          <h1>
            I build the infrastructure and agentic tooling that lets software
            teams ship quickly and safely.
          </h1>
          <p className="pf-lede">
            I'm <strong>Edgardo Carreras</strong>, a software engineer with 10+
            years building products, delivery pipelines and engineering teams.
            Today I build agentic workflows, MCP servers and the CI/CD platform
            for the team behind Origin, GRVTY's geospatial intelligence
            analytics platform.
          </p>
          <div className="pf-actions">
            <a className="pf-btn pf-btn-primary" href="#work">
              See my work
            </a>
            <a className="pf-btn" href={LINKS.github}>
              GitHub
            </a>
            <a className="pf-btn" href={LINKS.linkedin}>
              LinkedIn
            </a>
            <a className="pf-btn" href={LINKS.resume}>
              Resume
            </a>
          </div>
        </div>
        <img
          className="pf-portrait"
          src="/images/edgardo-carreras-portrait-640.webp"
          alt="Portrait of Edgardo Carreras"
          width="260"
          height="260"
        />
      </div>
    </section>

    <section className="pf-section" aria-labelledby="results">
      <div className="pf-wrap">
        <h2 id="results">Results</h2>
        <p className="pf-section-intro">
          Numbers from my current role and from client work. Each one is
          explained in a case study below.
        </p>
        <ul className="pf-metrics" style={{ marginTop: 28 }}>
          {headline.map(m => (
            <li key={m.label}>
              <span className="pf-metric-value">{m.value}</span>
              <span className="pf-metric-label">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="pf-section" id="work" aria-labelledby="work-title">
      <div className="pf-wrap">
        <h2 id="work-title">Work</h2>
        <p className="pf-section-intro">
          Five case studies: the problem, what I built, the decisions and
          tradeoffs, and the results. The open-source projects have live demos
          and tests you can run.
        </p>
        <ul className="pf-cards">
          {work.map(w => (
            <li className="pf-card" key={w.slug}>
              <span className="pf-kind">{w.kind}</span>
              <h3>
                <Link to={`/work/${w.slug}/`}>{w.name}</Link>
              </h3>
              <p>{w.summary}</p>
              <ul className="pf-tags" aria-label="Technologies">
                {w.stack.slice(0, 6).map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="pf-card-links">
                <Link to={`/work/${w.slug}/`}>Read the case study</Link>
                {w.links.slice(0, 2).map(l => (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="pf-section" aria-labelledby="how">
      <div className="pf-wrap">
        <h2 id="how">How I work</h2>
        <div className="pf-cols">
          {principles.map(p => (
            <div className="pf-panel" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="pf-section" aria-labelledby="writing">
      <div className="pf-wrap">
        <h2 id="writing">Writing</h2>
        <p className="pf-section-intro">
          I write Ed's Edge, a daily newsletter on software delivery principles
          for development teams in the AI era, and a technical blog on
          test-driven development, CI/CD, Rust and clean architecture.
        </p>
        <div className="pf-actions">
          <a className="pf-btn" href="https://edgardocarreras.com/newsletter/">
            Ed's Edge newsletter · 70+ issues
          </a>
          <Link className="pf-btn" to="/blog">
            Blog · 59 posts
          </Link>
        </div>
      </div>
    </section>

    <section className="pf-section" aria-labelledby="background">
      <div className="pf-wrap">
        <h2 id="background">Background</h2>
        <div className="pf-cols">
          <div className="pf-panel">
            <h3>Experience</h3>
            <ul className="pf-list">
              <li>
                DevSecOps Specialist at INVID, on the GRVTY Origin team (2025 –
                present)
              </li>
              <li>
                President of CarrerasDev: advised 5 client organizations on
                software delivery (2021 – 2025)
              </li>
              <li>
                Software Delivery Manager at Galaxy, across 3 teams in
                Asia, the UK and the US
              </li>
              <li>
                Apprenticeship at Clean Coders, in the disciplines taught by
                Robert C. Martin
              </li>
              <li>CTO and co-founder of a software agency that was acquired</li>
            </ul>
          </div>
          <div className="pf-panel">
            <h3>Tools I use most</h3>
            <ul className="pf-tags">
              {[
                "Model Context Protocol",
                "Agentic workflows",
                "TypeScript",
                "Python",
                "Rust",
                "Kubernetes",
                "Terraform",
                "Argo CD",
                "Helm",
                "Jenkins",
                "GitHub Actions",
                "Docker",
                "Google Cloud",
                "AWS",
                "React",
                "Node.js",
                "GraphQL",
              ].map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p style={{ marginTop: 18 }}>
              The full history is on my <a href={LINKS.resume}>resume</a>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="pf-section" aria-labelledby="testimonials">
      <div className="pf-wrap">
        <h2 id="testimonials">Testimonials</h2>
        <p className="pf-section-intro">
          From people I have worked with and coached.
        </p>
        <div className="pf-quotes">
          {testimonials.map(t => (
            <blockquote key={t.name}>
              <p>“{t.quote}”</p>
              <footer>{t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    <section className="pf-section" aria-labelledby="contact">
      <div className="pf-wrap">
        <h2 id="contact">Get in touch</h2>
        <p className="pf-section-intro">
          The fastest way to reach me is a message on LinkedIn or a call on my
          calendar.
        </p>
        <div className="pf-actions">
          <Link className="pf-btn pf-btn-primary" to="/contact/">
            Contact me
          </Link>
          <a className="pf-btn" href={LINKS.calendar}>
            Book a call
          </a>
        </div>
      </div>
    </section>
  </PortfolioLayout>
)

export const Head = ({ location }) => (
  <PortfolioHead
    title="Edgardo Carreras | AI / Agentic Engineer"
    description="AI / Agentic Engineer in Puerto Rico. I build infrastructure, agentic workflows and MCP servers that let software teams ship quickly and safely. Case studies, live demos and results."
    pathname={location.pathname}
  />
)

export default IndexPage
