import React, { useEffect, useRef } from "react"
import Seo from "../components/seo"
import { graphql, Link, useStaticQuery } from "gatsby"
import Portrait from "../components/portrait"
import { Faq } from "../components/faqs"
import { Header } from "../components/header"
import { BrandLogos } from "../components/brandLogos"

const CONSULTATION_LINK =
  "https://calendly.com/edgardo-g-carreras/free-coaching-call-with-edgardo"

function HeroSection() {
  const data = useStaticQuery(graphql`
    query HomepageV3Query {
      heroImage: file(relativePath: { eq: "IMG_1388-removebg.png" }) {
        childImageSharp {
          fluid(maxWidth: 802) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const heroRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    const loadGsap = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      // Hero animations
      gsap.from(".hero-subtitle", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out"
      })
      gsap.from(".hero-title", {
        opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: "power3.out"
      })
      gsap.from(".hero-tagline", {
        opacity: 0, y: 30, duration: 0.8, delay: 0.4, ease: "power3.out"
      })
      gsap.from(".hero-cta", {
        opacity: 0, y: 30, duration: 0.8, delay: 0.6, ease: "power3.out"
      })
      gsap.from(".hero-image", {
        opacity: 0, x: 50, duration: 1, delay: 0.3, ease: "power3.out"
      })
    }
    loadGsap()
  }, [])

  return (
    <section id="hero" ref={heroRef}>
      <div className="container">
        <div className="row flex-md-nowrap">
          <div className="col-1 col-12 col-md-7 col-lg-8">
            <h5 className="roboto-bold text-uppercase primary-color hero-subtitle">
              For SaaS CEOs & CTOs
            </h5>
            <h1 className="roboto-bold mb-1 mb-md-4 text-capitalize hero-title">
              I help your team deliver better software, faster.
            </h1>
            <h4 className="roboto-light text-capitalize hero-tagline">
              Faster releases. Fewer fire drills. Code you can trust — even when AI writes it.
            </h4>
            <div className="cta my-4 my-md-5 hero-cta">
              <div className="site-btn pulse-btn">
                <Link to="/newsletter">Get the Newsletter</Link>
              </div>
              <small className="text-white">
                <em>Daily insights on shipping fast and safe in the AI era.</em>
              </small>
            </div>
          </div>

          <div className="col-2 col-12 col-md-6">
            <Portrait
              className="hero-image img-fluid"
              fluid={data.heroImage.childImageSharp.fluid}
              style={{ position: "none" }}
            />

            <div className="hero-testimonial d-flex flex-wrap flex-md-nowrap">
              <div className="image-container">
                <img src="/images/fernando_yordan.jpg" alt="" />
              </div>
              <div className="text-container">
                <span>
                  "Through Edgardo's hands-on approach, I learned invaluable
                  tactics for implementing CI/CD and monitoring. His focus on
                  value over effort is exceptional."
                </span>
                <span className="name">- Fernando Yordan</span>
              </div>
            </div>
          </div>
        </div>
        <BrandLogos />
      </div>
    </section>
  )
}

function ChallengesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    const loadGsap = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(".challenge-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      })
    }
    loadGsap()
  }, [])

  return (
    <section id="challenges" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h2 className="roboto-light text-center sec-title">
              Sound <strong className="roboto-bold color-primary">Familiar?</strong>
            </h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-7">
            <ul>
              {[
                "AI-generated code that ships fast and breaks faster",
                "Technical debt accumulating at machine speed",
                "Security vulnerabilities hiding in AI-suggested code",
                "\"The AI said it works\" replacing \"it works on my machine\"",
                "Deployments that break production (and weekends)",
                "More code generated than your team can review",
                "Releases that feel like rolling the dice",
                "Compliance requirements that can't keep up with AI velocity"
              ].map((item, i) => (
                <li key={i} className="challenge-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="4" fill="#EB2323" />
                    <circle cx="8" cy="8" r="7.5" stroke="#EB2323" strokeOpacity="0.3" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-9">
            <h4 className="roboto-light text-center color-secondary">
              AI writes code faster than ever. The hard part is making sure it{" "}
              <span className="roboto-medium color-accent">doesn't sink your codebase</span>.
            </h4>
            <img className="arrow-down" src="/images/gradient-arrow-down.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    const loadGsap = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(".service-card-left", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0, x: -50, duration: 0.8, ease: "power3.out"
      })
      gsap.from(".service-card-right", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 0, x: 50, duration: 0.8, delay: 0.2, ease: "power3.out"
      })
    }
    loadGsap()
  }, [])

  return (
    <section id="offers" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 px-2 px-md-4">
            <h2 className="text-white text-center mb-4 sec-title">How I Help</h2>
            <h3 className="roboto-light text-white text-center">
              I don't just advise — <strong>I build</strong>. Pipelines, automation, security gates. 
              The systems that let your team <strong>ship fast and safe</strong>.
            </h3>
          </div>
        </div>

        <hr />

        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <h4 className="text-white text-center roboto-light px-3 mb-4 mb-md-5">
              Two ways to work together:
            </h4>
          </div>
        </div>

        <div className="row services flex-md-nowrap justify-content-center">
          <div className="service col-12 col-md-5 service-card-left">
            <div className="inner">
              <img className="img-fluid" src="/images/portrait_edgardo.png" alt="" />
              <div className="text-container text-white">
                <h4 className="service-title">DevSecOps Pipeline Audit</h4>
                <p>
                  <strong>A focused 2-week engagement.</strong> I review your CI/CD pipeline, 
                  identify security gaps and bottlenecks, and deliver a prioritized action plan.
                </p>
                <div className="site-btn">
                  <a href={CONSULTATION_LINK}>Book Your Audit</a>
                </div>
              </div>
            </div>
          </div>
          <div className="service col-12 col-md-5 service-card-right">
            <div className="inner">
              <img className="img-fluid" src="/images/service-003.png" alt="" />
              <div className="text-container text-white">
                <h4 className="service-title">Fractional DevSecOps Engineer</h4>
                <p>
                  <strong>I embed with your team as a hands-on contributor.</strong> Not advising 
                  from the sidelines — actually building. CI/CD pipelines with security baked in.
                </p>
                <div className="site-btn">
                  <a href={CONSULTATION_LINK}>Let's Talk</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    const loadGsap = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const metrics = [
        { selector: ".metric-1", value: 80 },
        { selector: ".metric-2", value: 250 },
        { selector: ".metric-3", value: 300 },
        { selector: ".metric-4", value: 50 }
      ]

      metrics.forEach(({ selector, value }) => {
        const el = document.querySelector(selector)
        if (!el) return
        
        gsap.fromTo(el, 
          { innerText: 0 },
          {
            innerText: value,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        )
      })
    }
    loadGsap()
  }, [])

  return (
    <section id="transformation" ref={sectionRef}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <h5 className="color-primary text-center text-uppercase">Real Results</h5>
            <h2 className="text-center roboto-light">What <strong>Transformation</strong> Looks Like</h2>
          </div>
        </div>

        <div className="row trans-boxes">
          <div className="col-12 col-md-3 text-center">
            <div className="inner">
              <small>Decreased by</small>
              <h1 className="color-primary"><span className="metric-1">80</span><span>%</span></h1>
              <p>Lead Times</p>
            </div>
          </div>
          <div className="col-12 col-md-3 text-center">
            <div className="inner">
              <small>Increased by</small>
              <h1 className="color-primary"><span className="metric-2">250</span><span>%</span></h1>
              <p>Throughput</p>
            </div>
          </div>
          <div className="col-12 col-md-3 text-center">
            <div className="inner">
              <small>Increased by</small>
              <h1 className="color-primary"><span className="metric-3">300</span><span>%</span></h1>
              <p>Release Frequency</p>
            </div>
          </div>
          <div className="col-12 col-md-3 text-center">
            <div className="inner">
              <small>Decreased by</small>
              <h1 className="color-primary"><span className="metric-4">50</span><span>%</span></h1>
              <p>Faulty Deployments</p>
            </div>
          </div>
        </div>

        <div className="row cta-row">
          <div className="col-12">
            <div className="cta my-4 my-md-5 mx-auto">
              <div className="site-btn pulse-btn">
                <Link to="/newsletter">Get the Newsletter</Link>
              </div>
              <small><em>Join 100+ engineering leaders getting daily DevSecOps insights.</em></small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        <div className="row align-items-center justify-content-end">
          <img src="/images/about-Image.png" className="img-fluid feature-image" alt="" />
          <div className="col-2 col-12 col-md-6">
            <h2 className="roboto-light text-white mb-0">
              I'm <span className="roboto-medium">Edgardo</span> Carreras
            </h2>
            <h5 className="color-primary mb-4">DevSecOps Engineer & Software Craftsman</h5>
            <p className="text-white">
              I've spent the last decade in the trenches — as a developer, CTO, consultant, and team lead. 
              I've built CI/CD pipelines, rescued legacy codebases, and learned (the hard way) that security 
              and quality can't be afterthoughts.
            </p>
            <p className="text-white">
              My background is in software craftsmanship: TDD, Clean Architecture, continuous delivery. 
              These days, I apply those same principles to DevSecOps. Shift left. Automate everything. 
              Make the right thing the easy thing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BottomCTA() {
  return (
    <section id="bottom-cta">
      <div className="container">
        <h1 className="text-center text-white">Ready to ship with confidence?</h1>
        <h4 className="roboto-light text-center text-white">
          Get daily insights on DevSecOps, CI/CD, and building pipelines that let you move fast without breaking things.
        </h4>
        <div className="cta mt-4 mt-md-5 mx-auto">
          <div className="site-btn pulse-btn">
            <Link to="/newsletter">Subscribe to the Newsletter</Link>
          </div>
          <small><em>Join 100+ engineering leaders. No spam. Unsubscribe anytime.</em></small>
        </div>
      </div>
    </section>
  )
}

const IndexPage = () => (
  <div className="site-content">
    <Header />
    <main>
      <HeroSection />
      <ChallengesSection />
      <ServicesSection />
      <MetricsSection />
      <AboutSection />
      <Faq />
      <BottomCTA />
    </main>
    <footer className="ec-bg-dark p-4">
      <div className="bottom">
        <p className="text-center text-white mb-1">
          © {new Date().getFullYear()} Copyright. Edgardo Carreras.
        </p>
      </div>
    </footer>
  </div>
)

export const Head = () => (
  <>
    <Seo title={"Edgardo Carreras | DevSecOps Engineer"} />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:wght@500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/styles/bootstrap.min.css" />
    <link rel="stylesheet" href="/styles/bootstrap-grid.min.css" />
    <link rel="stylesheet" href="/styles/styles.css" />
  </>
)

export default IndexPage
