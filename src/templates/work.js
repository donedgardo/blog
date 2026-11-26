import React from "react"
import { Link } from "gatsby"
import { PortfolioHead, PortfolioLayout } from "../portfolio/layout"

const WorkPage = ({ pageContext: { item } }) => (
  <PortfolioLayout>
    <article>
      <header className="pf-case-head">
        <div className="pf-wrap">
          <p className="pf-crumb">
            <Link to="/#work">← All work</Link>
          </p>
          <p className="pf-eyebrow">{item.kind} · Case study</p>
          <h1>{item.name}</h1>
          <p className="pf-lede">{item.summary}</p>
          <p className="pf-case-meta">
            {item.role} · {item.org} · {item.period}
          </p>
          {item.links.length > 0 && (
            <div className="pf-actions">
              {item.links.map((l, i) => (
                <a
                  key={l.href}
                  className={i === 0 ? "pf-btn pf-btn-primary" : "pf-btn"}
                  href={l.href}
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="pf-wrap">
        <div className="pf-case-body">
          <ul className="pf-metrics" aria-label="Key results">
            {item.metrics.map(m => (
              <li key={m.label}>
                <span className="pf-metric-value">{m.value}</span>
                <span className="pf-metric-label">{m.label}</span>
              </li>
            ))}
          </ul>

          <section>
            <h2>The problem</h2>
            {item.problem.map(p => (
              <p key={p}>{p}</p>
            ))}
          </section>

          <section>
            <h2>What I built</h2>
            <ul className="pf-list">
              {item.built.map(b => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Decisions and tradeoffs</h2>
            <div className="pf-decisions">
              {item.decisions.map(d => (
                <div className="pf-panel" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Results</h2>
            <ul className="pf-list">
              {item.results.map(r => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Built with</h2>
            <ul className="pf-tags">
              {item.stack.map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <p>
            <Link to="/#work">← Back to all work</Link> ·{" "}
            <Link to="/contact/">Get in touch</Link>
          </p>
        </div>
      </div>
    </article>
  </PortfolioLayout>
)

export const Head = ({ location, pageContext: { item } }) => (
  <PortfolioHead
    title={`${item.name} | Edgardo Carreras`}
    description={item.summary}
    pathname={location.pathname}
  />
)

export default WorkPage
