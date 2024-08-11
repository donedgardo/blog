import React, { useCallback, useState } from "react"

const faqs = [
  {
    question: "What makes your coaching different?",
    answer:
      "I blend business skills with technical expertise. I focus on practical solutions that drive quick, lasting improvements. I provide hands-on coaching. It bridges the gap between business leaders and tech teams.",
  },
  {
    question: "How do you measure the success of your coaching engagements?",
    answer:
      "We measure success by key performance indicators. These are: shorter lead times, more throughput, faster releases, and fewer bugs. Client testimonials and case studies show a big rise in team morale and productivity.",
  },
  {
    question:
      "How does your coaching improve our software development process?",
    answer:
      "My coaching introduces iterative and incremental development techniques, refactoring, and automated testing strategies. It reduces technical debt and improves code quality. This leads to faster, more reliable deployments and higher team efficiency.",
  },
  {
    question: "Can you help with legacy code and technical debt?",
    answer:
      "Yes, I specialize in helping teams manage and improve legacy codebases. I coach on safe refactoring, improving test coverage, and automated testing. This helps reduce technical debt and improve code maintenance.",
  },
  {
    question: "How do you handle reluctant teams?",
    answer:
      "By demonstrating value through small, impactful changes. In our first meetings, we find and fix key pain points. We show teams the benefits of our methods. We also ensure that participation is voluntary and value-driven.",
  },
  {
    question: "What is ensemble programming and how can it benefit our team?",
    answer:
      "Ensemble programming, or mob programming, means the whole team works on the same task. This practice boosts collaboration and knowledge sharing. It improves code quality as many perspectives contribute to the solution at once.",
  },
  {
    question: "How do I get started with your coaching services?",
    answer:
      "You can start by scheduling a free consultation through our website. We'll discuss your team's challenges in this meeting. Then, we'll see if my coaching can help you reach your goals.",
  },
]

export function FAQ() {
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
