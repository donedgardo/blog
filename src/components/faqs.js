import React, { useCallback, useState } from "react"

const faqs = [
  {
    question: "What makes your coaching different?",
    answer:
      "I work in your codebase, not in slides. We solve your real problems live, together — ensemble style — on the work your team would be doing anyway. No workshops, no offsites, no homework that piles up. The habits stick because they were built in the actual work.",
  },
  {
    question: "We're a startup. We can't slow down. Will coaching kill our velocity?",
    answer:
      "No — that's the whole point. The work we do together is real work that ships. There's no productivity freeze. Teams I coach typically end the engagement shipping more often, not less, because the fire drills shrink and reviews stop being a bottleneck.",
  },
  {
    question: "How do you help teams trust AI-generated code?",
    answer:
      "We build review habits, fast feedback loops, and test patterns that catch the specific ways AI output goes wrong — plausible-looking code that's subtly broken, hidden assumptions, repeated mistakes. The team learns to use AI faster while shipping fewer surprises to prod.",
  },
  {
    question: "How do you measure success?",
    answer:
      "Concrete operational metrics: lead time (commit → users), release frequency, percentage of releases that ship bugs, and team sentiment. At Flexio: lead time went from ~2 weeks to minutes, releases from one every two weeks to multiple per day, buggy releases from ~50% to ~10%, sentiment from 4.25 to 5.98 on a 1–7 scale.",
  },
  {
    question: "What happens when you leave?",
    answer:
      "You own the practices, not me. The point is the team becomes the asset. I aim to make myself unnecessary — clients usually extend anyway, but because they want to, not because they're stuck.",
  },
  {
    question: "What's ensemble programming, and why is it your default?",
    answer:
      "Ensemble (or mob) programming means the whole team works on the same problem together, on one machine. It's how the coaching transfers — patterns, judgment calls, and review instincts get passed across the team in real time instead of stuck in one engineer's head. It's especially useful in the AI era, where knowing which AI output to trust is itself a skill that has to be taught.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a working session — we'll spend the call on a real problem in your codebase so you can see how I work before committing to anything.",
  },
]

export function Faq() {
  const [openFaq, setOpenFaq] = useState(new Set())
  const isOpen = useCallback(
    index => {
      return openFaq.has(index)
    },
    [openFaq]
  )

  const handleFaqClick = useCallback(
    index => {
      if (isOpen(index)) {
        setOpenFaq(prevState => {
          prevState.delete(index)
          return new Set([...prevState])
        })
      } else {
        setOpenFaq(prevState => new Set([...prevState, index]))
      }
    },
    [setOpenFaq, isOpen]
  )

  return (
    <section id="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9">
            <h2 className="text-center roboto-light">
              Frequently Asked <span className="roboto-medium">Questions</span>
            </h2>

            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {faqs.map((faq, index) => (
                <div key={`faq-${index}`} className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                      className={`accordion-button ${
                        isOpen(index) ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleFaqClick(index)}
                      aria-expanded={isOpen(index) ? "true" : "false"}
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-controls="flush-collapseTwo"
                    >
                      {faq.question}
                      <div className="icons">
                        <svg
                          className="plus"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.92 19V11.6956H0V7.26222H6.92V0H11.12V7.26222H18V11.6956H11.12V19H6.92Z"
                            fill="#ED9567"
                          />
                        </svg>

                        <svg
                          className="minus"
                          width="18"
                          height="5"
                          viewBox="0 0 18 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="18" height="5" fill="#ED9567" />
                        </svg>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className={`accordion-collapse collapse ${
                      isOpen(index) ? "show" : ""
                    }`}
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
