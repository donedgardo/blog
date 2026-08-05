import React, { useEffect, useRef, useState, lazy, Suspense } from "react"
import Seo from "../components/seo"
import { graphql, Link, useStaticQuery } from "gatsby"
import Portrait from "../components/portrait"
import { Faq } from "../components/faqs"
import { Header } from "../components/header"
import { BrandLogos } from "../components/brandLogos"
import { LazyMotion, domAnimation, m, useAnimation, useInView } from "framer-motion"

// Use m instead of motion for lighter bundle with LazyMotion
const motion = m

// Hydration-safe check for client-side
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}

// Lazy-load section when it approaches viewport (saves initial render time)
function LazySection({ children, className, id, fallbackHeight = "400px" }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sections above this one start as short placeholders, so the page grows
    // under us as they render. That can displace a section past the viewport
    // without it ever intersecting, leaving it stuck on the placeholder — so
    // reveal on "has reached us" rather than on intersection alone.
    const hasReached = () =>
      el.getBoundingClientRect().top < window.innerHeight + 200 // 200px lead

    if (hasReached()) {
      setIsVisible(true)
      return
    }

    let observer
    const onScroll = () => {
      if (hasReached()) reveal()
    }
    const reveal = () => {
      setIsVisible(true)
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || hasReached()) {
        reveal()
      }
    }, { rootMargin: "200px" })
    observer.observe(el)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <section ref={ref} id={id} className={className}>
      {isVisible ? children : (
        <div style={{ minHeight: fallbackHeight }} aria-hidden="true" />
      )}
    </section>
  )
}

// Wrapper to prevent hydration mismatch - renders static on server, animated on client
const ClientOnlyMotion = ({ children, fallback = null, ...props }) => {
  const isClient = useIsClient()
  if (!isClient) {
    // Return a static div with same className on server
    const { className, style, id } = props
    return <div className={className} style={style} id={id}>{children}</div>
  }
  return <motion.div {...props}>{children}</motion.div>
}

const CONSULTATION_LINK =
  "https://calendly.com/edgardo-g-carreras/interview"

// Animation variants - start visible to prevent hydration mismatch
// Animations only run on client via whileInView
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(237, 149, 103, 0.3)",
      "0 0 40px rgba(237, 149, 103, 0.6)",
      "0 0 20px rgba(237, 149, 103, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Animated section wrapper with scroll trigger (hydration-safe)
function AnimatedSection({ children, className, id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const isClient = useIsClient()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Render without animation on server, animate only on client
  if (!isClient) {
    return (
      <section ref={ref} id={id} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="visible"
      animate={controls}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  )
}

// Counter animation component (hydration-safe)
function AnimatedCounter({ end, suffix = "", prefix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const isClient = useIsClient()
  // Start with final value to match server render
  const [count, setCount] = React.useState(end)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  useEffect(() => {
    if (isInView && isClient && !hasAnimated) {
      setHasAnimated(true)
      setCount(0) // Reset to 0 then animate up
      let startTime
      const duration = 2000
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, isClient, end, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

function HeroSection() {
  const data = useStaticQuery(graphql`
    query HomepageQuery {
      heroImage: file(relativePath: { eq: "IMG_1388-removebg.png" }) {
        childImageSharp {
          fluid(maxWidth: 802) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <section id="hero">
      <div className="container">
        <div className="row flex-md-nowrap">
          <motion.div 
            className="col-1 col-12 col-md-7 col-lg-8"
            variants={staggerContainer}
          >
            <motion.h5
              className="roboto-bold text-uppercase primary-color"
              variants={fadeInUp}
            >
              For startup CTOs and engineering leads
            </motion.h5>
            <motion.h1
              className="roboto-bold mb-1 mb-md-4"
              variants={fadeInUp}
            >
              Ship at startup speed.{" "}
              <motion.span
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ color: "#ED9567", display: "inline-block" }}
              >
                Trust every line
              </motion.span>
              {" "}— even the AI-written ones.
            </motion.h1>
            <motion.h4
              className="roboto-light"
              variants={fadeInUp}
            >
              Live, embedded coaching for startup engineering teams. I work alongside your devs on your real codebase, building the habits that keep you fast <em>and</em> keep the code trustworthy.
            </motion.h4>
            <motion.div
              className="cta my-4 my-md-5"
              variants={fadeInUp}
            >
              <motion.div
                className="site-btn pulse-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={CONSULTATION_LINK}>Book a working session</a>
              </motion.div>
              <motion.small
                className="text-white d-block mt-3"
                transition={{ delay: 1.2 }}
              >
                Or <Link to="/newsletter" style={{ color: "#ED9567", textDecoration: "underline" }}>join the newsletter</Link> — notes on shipping fast and safe in the AI era.
              </motion.small>
            </motion.div>
          </motion.div>

          <motion.div 
            className="col-2 col-12 col-md-6"
            
            
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Portrait
                className="hero-image img-fluid"
                fluid={data.heroImage?.childImageSharp?.fluid}
                style={{ position: "relative", transform: "scaleX(-1)" }}
              />
            </motion.div>

            <motion.div 
              className="hero-testimonial d-flex flex-wrap flex-md-nowrap"
              
              
              transition={{ delay: 1, duration: 0.6 }}
            >
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
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          
          
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <BrandLogos />
        </motion.div>
      </div>
    </section>
  )
}

const RedDot = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="4" fill="#EB2323" />
    <circle cx="8" cy="8" r="7.5" stroke="#EB2323" strokeOpacity="0.3" />
  </svg>
)

const challenges = [
  "AI is writing more of your code than reviews can keep up with",
  "\"It works\" — but nobody on the team can tell you why",
  "The same bugs keep resurfacing after they were \"fixed\"",
  "AI-suggested code passes review, then surprises you in prod",
  "Refactors keep getting deferred because the next sprint is on fire",
  "Engineers can't tell which AI output to trust",
  "Releases still trigger fire drills (and weekends)",
  "Velocity is high, but confidence in what's shipping is dropping"
]

const IndexPage = () => (
  <LazyMotion features={domAnimation} strict>
    <div className="site-content">
      <Header />
      <main>
        <HeroSection />

        <LazySection id="challenges">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-6">
                <motion.h2 
                  className="roboto-light text-center sec-title"
                  variants={fadeInUp}
                >
                  Sound{" "}
                  <strong className="roboto-bold color-primary">
                    Familiar?
                  </strong>
                </motion.h2>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-md-7">
                <motion.ul variants={staggerContainer}>
                  {challenges.map((challenge, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInLeft}
                      whileHover={{ x: 10, transition: { duration: 0.2 } }}
                    >
                      <RedDot />
                      {challenge}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-12 col-md-9">
                <motion.h4
                  className="roboto-light text-center color-secondary"
                  variants={fadeInUp}
                >
                  At startup speed, you can't slow down to fix it. So the fragility{" "}
                  <span className="roboto-medium color-accent">
                    compounds until something breaks
                  </span>
                  .
                </motion.h4>

                <motion.img
                  className="arrow-down"
                  src="/images/gradient-arrow-down.png"
                  alt="gradient-arrow-down"
                  variants={scaleIn}
                  animate={{ 
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </div>
            </div>
          </div>
        </LazySection>

        <LazySection id="offers">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-11 px-2 px-md-4">
                <motion.h2
                  className="text-white text-center mb-4 sec-title"
                  variants={fadeInUp}
                >
                  How this works
                </motion.h2>
                <motion.h3
                  className="roboto-light text-white text-center"
                  variants={fadeInUp}
                >
                  Not workshops. Not slide decks. Not advice you have to translate.{" "}
                  <motion.strong
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Live coaching, inside your codebase, on your real problems.
                  </motion.strong>
                </motion.h3>
              </div>
            </div>

            <hr />

            <div className="row services flex-md-nowrap justify-content-center">
              <motion.div
                className="service col-12 col-md-4"
                variants={fadeInLeft}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="inner">
                  <div className="text-container text-white">
                    <h4 className="service-title">I work in your codebase, not in slides.</h4>
                    <p>
                      We tackle your real problems live, together. The work we do
                      in a session is work that ships. No artificial exercises,
                      no homework that piles up.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="service col-12 col-md-4"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="inner">
                  <div className="text-container text-white">
                    <h4 className="service-title">Your team keeps shipping while we coach.</h4>
                    <p>
                      Embedded, ensemble-style. No productivity freeze. No offsite.
                      You don't have to choose between learning and delivering —
                      they happen in the same hour.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="service col-12 col-md-4"
                variants={fadeInRight}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="inner">
                  <div className="text-container text-white">
                    <h4 className="service-title">The habits stay after I leave.</h4>
                    <p>
                      You own the practices. The team becomes the asset, not me.
                      I aim to make myself unnecessary — clients usually extend
                      anyway, but because they want to.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="row cta-row">
              <div className="col-12">
                <motion.div
                  className="cta my-4 my-md-5 mx-auto"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="site-btn pulse-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href={CONSULTATION_LINK}>Book a working session</a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </LazySection>

        <LazySection id="talk">
          <div className="container">
            <motion.h2 
              className="sec-title text-center text-white roboto-light text-capitalize"
              variants={fadeInUp}
            >
              I work best with...
            </motion.h2>

            <motion.div className="row" variants={staggerContainer}>
              {[
                {
                  icon: (
                    <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.0696 38.2914C22.0696 36.6756 23.3842 35.361 25.0001 35.361C26.6159 35.361 27.9305 36.6756 27.9305 38.2914H30.861C30.861 35.0597 28.2318 32.4305 25.0001 32.4305C21.7684 32.4305 19.1392 35.0597 19.1392 38.2914H22.0696Z" fill="#ED9567"/>
                      <path d="M33.7912 5.66589H31.7664L31.2793 4.69162L34.6151 2.42317L32.9673 0L27.5118 3.70973L28.4899 5.66589H21.5098L22.4879 3.70973L17.0326 0L15.3848 2.42327L18.7206 4.69172L18.2335 5.66599H8.88257V33.8958C8.88257 42.7829 16.1129 50.0132 25 50.0132C33.8871 50.0132 41.1173 42.7829 41.1173 33.8958C41.1173 31.2484 41.1173 15.0328 41.1173 12.9921C41.1173 8.95237 37.8308 5.66589 33.7912 5.66589ZM11.813 8.59632H16.7684L15.7849 10.5632L21.2568 14.2111L22.8823 11.7728L19.5628 9.55985L20.0446 8.59632H29.9552L30.437 9.55985L27.1176 11.7728L28.7431 14.2111L34.215 10.5632L33.2315 8.59632H33.7912C36.215 8.59632 38.1869 10.5682 38.1869 12.992V17.3876H11.813V8.59632ZM38.1869 33.8957C38.1869 41.167 32.2712 47.0827 24.9999 47.0827C17.7287 47.0827 11.813 41.167 11.813 33.8957V20.318H38.1869V33.8957Z" fill="#ED9567"/>
                      <path d="M14.7435 23.6392H20.6044V26.5696H14.7435V23.6392Z" fill="#ED9567"/>
                      <path d="M29.3958 23.6392H35.2567V26.5696H29.3958V23.6392Z" fill="#ED9567"/>
                      <path d="M7.10327 3.70973L1.64788 0L0 2.42327L3.3359 4.69162L0.400199 10.5632L5.8721 14.2111L7.49751 11.7728L4.17811 9.55985L7.10327 3.70973Z" fill="#ED9567"/>
                      <path d="M50 2.42327L48.3521 0L42.8967 3.70973L45.8218 9.55985L42.5024 11.7728L44.1279 14.2111L49.5997 10.5632L46.664 4.69162L50 2.42327Z" fill="#ED9567"/>
                    </svg>
                  ),
                  text: <><strong>Startup CTOs and VPs of Eng</strong> under pressure to ship faster — without losing the plot</>
                },
                {
                  icon: (
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M44.8021 37.7331V31.9863H25.9355V29.0398C33.29 28.3165 39.0553 22.0967 39.0553 14.5553C39.0553 6.52954 32.5258 0 24.5 0C16.4742 0 9.9447 6.52954 9.9447 14.5553C9.9447 22.0967 15.71 28.3165 23.0645 29.0398V31.9863H4.19792V37.7331H0V49H11.267V37.7331H7.06902V34.8574H23.0645V37.7331H18.8665V49H30.1336V37.7331H25.9355V34.8574H41.931V37.7331H37.7331V49H49V37.7331H44.8021ZM22.1044 12.9291C22.1044 11.6081 23.179 10.5335 24.5 10.5335C25.821 10.5335 26.8956 11.6081 26.8956 12.9291C26.8956 14.2501 25.821 15.3248 24.5 15.3248C23.179 15.3248 22.1044 14.2501 22.1044 12.9291ZM24.5 18.1958C26.8773 18.1958 28.8112 20.1298 28.8112 22.5071V25.415C27.4767 25.9467 26.0219 26.2395 24.5 26.2395C22.9781 26.2395 21.5233 25.9466 20.1888 25.415V22.5071C20.1888 20.1298 22.1227 18.1958 24.5 18.1958ZM12.8158 14.5553C12.8158 8.11266 18.0574 2.87109 24.5 2.87109C30.9426 2.87109 36.1842 8.11266 36.1842 14.5553C36.1842 18.2921 34.4207 21.6246 31.6823 23.7649V22.5071C31.6823 19.98 30.3694 17.7553 28.391 16.4748C29.2452 15.5383 29.7668 14.2935 29.7668 12.9292C29.7668 10.0251 27.4041 7.66247 24.5001 7.66247C21.5961 7.66247 19.2334 10.0252 19.2334 12.9292C19.2334 14.2936 19.755 15.5384 20.6092 16.4748C18.6308 17.7553 17.3179 19.9801 17.3179 22.5071V23.7649C14.5794 21.6246 12.8158 18.2921 12.8158 14.5553ZM8.39594 46.1289H2.87109V40.6042H8.39594V46.1289ZM27.2624 46.1289H21.7375V40.6042H27.2624V46.1289ZM46.1289 46.1289H40.6041V40.6042H46.1289V46.1289Z" fill="#ED9567"/>
                    </svg>
                  ),
                  text: <><strong>Engineering teams of 5–30</strong> where AI velocity is outpacing review capacity</>
                },
                {
                  icon: (
                    <svg width="44" height="50" viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.9389 0C18.4106 0 15.54 2.87054 15.54 6.3989C15.54 9.92726 18.4106 12.7977 21.9389 12.7977C25.4673 12.7977 28.3378 9.92726 28.3378 6.3989C28.3379 2.87054 25.4673 0 21.9389 0ZM21.9389 9.86838C20.0258 9.86838 18.4694 8.31204 18.4694 6.3989C18.4694 4.48576 20.0258 2.92932 21.9389 2.92932C23.8521 2.92932 25.4085 4.48576 25.4085 6.3989C25.4086 8.31204 23.8522 9.86838 21.9389 9.86838Z" fill="#ED9567"/>
                      <path d="M9.11519 5.41335C6.14076 5.41335 3.72075 7.83326 3.72075 10.8077C3.72075 13.7821 6.14066 16.202 9.11519 16.202C12.0896 16.202 14.5095 13.7821 14.5095 10.8077C14.5095 7.83326 12.0895 5.41335 9.11519 5.41335ZM9.11519 13.2726C7.75598 13.2726 6.65007 12.1668 6.65007 10.8076C6.65007 9.44839 7.75588 8.34257 9.11519 8.34257C10.4744 8.34257 11.5802 9.44839 11.5802 10.8076C11.5802 12.1668 10.4743 13.2726 9.11519 13.2726Z" fill="#ED9567"/>
                      <path d="M39.5674 17.3729H32.2336C31.3406 15.9588 29.7647 15.0169 27.9721 15.0169H15.9058C14.1132 15.0169 12.5373 15.9588 11.6442 17.3729H4.31039C1.93364 17.3729 0 19.3066 0 21.6834V26.5901V28.0547V32.3172L6.21562 32.9754C6.50865 33.9129 6.88526 34.8213 7.34214 35.6924L3.41187 40.5537L9.43992 46.5818L14.3013 42.6513C15.1724 43.1082 16.0811 43.4848 17.0184 43.7778L17.6765 49.9935H26.2016L26.8596 43.7778C27.7971 43.4848 28.7056 43.1083 29.5766 42.6514L34.4379 46.5819L40.4661 40.5538L36.5356 35.6925C36.9925 34.8214 37.3691 33.9129 37.662 32.9755L43.8777 32.3173V28.0548V26.5902V21.6835C43.8777 19.3066 41.9441 17.3729 39.5674 17.3729ZM13.7973 20.0547C13.7973 18.8921 14.7432 17.9462 15.9058 17.9462H27.9721C29.1347 17.9462 30.0806 18.8921 30.0806 20.0547V26.59H13.7973V20.0547ZM27.1714 29.5194C26.5302 31.8066 24.4281 33.4893 21.9389 33.4893C19.4498 33.4893 17.3476 31.8066 16.7065 29.5194H27.1714ZM2.92932 21.6833C2.92932 20.9218 3.54887 20.3022 4.31039 20.3022H10.8679V26.59H2.92932V21.6833ZM35.3397 30.2755L35.0956 31.2765C34.7685 32.6169 34.2384 33.896 33.5194 35.0784L32.9842 35.9589L36.5312 40.3461L34.2304 42.6469L29.8431 39.0999L28.9627 39.6351C27.7803 40.3538 26.5012 40.8841 25.1607 41.2112L24.1597 41.4554L23.5658 47.0642H20.3119L19.7179 41.4554L18.717 41.2111C17.3768 40.8843 16.0978 40.3541 14.9152 39.6351L14.0348 39.0999L9.64751 42.6469L7.34663 40.3461L10.8937 35.9589L10.3585 35.0784C9.6396 33.8961 9.1093 32.6168 8.78229 31.2765L8.53818 30.2755L2.92932 29.6816V29.5194H13.706C14.4008 33.4349 17.8269 36.4186 21.9388 36.4186C26.0508 36.4186 29.4768 33.4349 30.1717 29.5194H40.9483V29.6816H40.9484L35.3397 30.2755ZM40.9485 26.59H33.0099V20.3022H39.5674C40.3289 20.3022 40.9485 20.9218 40.9485 21.6833V26.59Z" fill="#ED9567"/>
                      <path d="M34.7627 5.41335C31.7883 5.41335 29.3684 7.83326 29.3684 10.8077C29.3684 13.7821 31.7883 16.202 34.7627 16.202C37.7371 16.202 40.157 13.7821 40.157 10.8077C40.157 7.83326 37.737 5.41335 34.7627 5.41335ZM34.7627 13.2727C33.4035 13.2727 32.2977 12.1669 32.2977 10.8077C32.2977 9.44849 33.4035 8.34257 34.7627 8.34257C36.1219 8.34257 37.2277 9.44839 37.2277 10.8076C37.2277 12.1668 36.1218 13.2727 34.7627 13.2727Z" fill="#ED9567"/>
                    </svg>
                  ),
                  text: <><strong>Founders who chose speed</strong> and now need to make that speed safe to keep</>
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="col col-12 col-md-4"
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="inner"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 10px 40px rgba(237, 149, 103, 0.2)" 
                    }}
                  >
                    {item.icon}
                    <p>{item.text}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.h2 
              className="sec-title text-center mb-3 color-dark text-capitalize"
              variants={fadeInUp}
            >
              Sound like you? Let's talk.
            </motion.h2>
          </div>
        </LazySection>

        <LazySection id="shortCut">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-11 px-md-3">
                <motion.h3 
                  className="text-center roboto-light mb-0"
                  variants={fadeInUp}
                >
                  What changes when we work together
                </motion.h3>
                <motion.h1 
                  className="text-center color-primary mb-4 text-capitalize"
                  variants={scaleIn}
                >
                  Before & After
                </motion.h1>
              </div>
            </div>

            <div className="row">
              <motion.div 
                className="col-1 col-12 col-md-6"
                variants={fadeInLeft}
              >
                <h4 className="text-center roboto-medium">Before</h4>
                <ul className="items">
                  {[
                    { bold: "AI output shipped on trust", rest: "and reviewed in a hurry" },
                    { bold: "Releases that need a human to babysit them", rest: "and a Slack channel on standby" },
                    { bold: "Fire drills that eat the sprint", rest: "and the weekend" },
                    { bold: "Bugs that come back", rest: "because the fix never reached the pattern" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="content">
                        <strong>{item.bold}</strong> {item.rest}
                      </div>
                      <svg width="49" height="21" viewBox="0 0 49 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M30.3485 0L48.4615 10.5L30.3485 21V13.5793L0 13.5793L0 7.4207L30.3485 7.4207V0Z" fill="url(#paint0_linear_arrow)"/>
                        <defs>
                          <linearGradient id="paint0_linear_arrow" x1="-0.17004" y1="10.5" x2="31.8225" y2="10.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#ED9567" stopOpacity="0"/>
                            <stop offset="1" stopColor="#ED9567"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                className="col-2 col-12 col-md-6"
                variants={fadeInRight}
              >
                <h3 className="text-center color-primary roboto-bold">After</h3>
                <ul className="items-2">
                  {[
                    { bold: "AI used as a force multiplier,", rest: "with review patterns that catch its tells" },
                    { bold: "Deploys that ship without drama,", rest: "any day, any hour" },
                    { bold: "Fire drills shrink,", rest: "and stop eating roadmap time" },
                    { bold: "Bugs that get fixed once,", rest: "because the team learned what made them ship" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="0.914795" width="16.625" height="16.625" rx="2" fill="white"/>
                        <motion.path 
                          d="M4 8.57692L8.28819 12.6875L19.4375 2" 
                          stroke="#ED9567" 
                          strokeWidth="3"
                          
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        />
                      </svg>
                      <div className="content">
                        <strong>{item.bold}</strong> {item.rest}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </LazySection>

        <LazySection id="transformation">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10">
                <motion.h5
                  className="color-primary text-center text-uppercase"
                  variants={fadeInUp}
                >
                  Case Study — Flexio
                </motion.h5>
                <motion.h2
                  className="text-center roboto-light"
                  variants={fadeInUp}
                >
                  How a startup team went from <strong>fortnightly, fragile releases</strong> to <strong>multiple trustworthy deploys a day</strong>.
                </motion.h2>
                <motion.p
                  className="text-center roboto-light color-secondary"
                  variants={fadeInUp}
                  style={{ marginTop: "1rem" }}
                >
                  3-month engagement. The CTO extended it to 9.
                </motion.p>
              </div>
            </div>

            <motion.div
              className="row trans-boxes"
              variants={staggerContainer}
            >
              {[
                { before: "~2 wks", after: "minutes", description: "Lead time, commit to users" },
                { before: "1 / 2 wks", after: "many / day", description: "Release frequency" },
                { before: "~50%", after: "~10%", description: "Releases that shipped bugs" },
                { before: "4.25", after: "5.98", description: "Team sentiment (1–7 scale, +41%)" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="col-12 col-md-3 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inner">
                    <p>{stat.description}</p>
                    <div style={{ marginTop: "16px" }}>
                      <small>Before</small>
                      <h3 className="roboto-light" style={{ opacity: 0.6, margin: 0 }}>{stat.before}</h3>
                    </div>
                    <div style={{ marginTop: "12px" }}>
                      <small>After</small>
                      <h1 className="color-primary" style={{ margin: 0 }}>{stat.after}</h1>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="row justify-content-center mt-4 mt-md-5">
              <div className="col-12 col-md-10">
                <motion.div
                  variants={fadeInUp}
                  style={{
                    background: "#fff",
                    borderLeft: "4px solid #ED9567",
                    padding: "1.5rem 2rem",
                    borderRadius: "4px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
                  }}
                >
                  <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#231F20" }}>
                    <em>"Through Edgardo's hands-on approach, I learned invaluable tactics for implementing CI/CD and monitoring. His focus on value over effort is exceptional."</em>
                  </p>
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/fernando_yordan.jpg"
                      alt=""
                      style={{ width: "48px", height: "48px", borderRadius: "50%", marginRight: "12px" }}
                    />
                    <div>
                      <strong style={{ color: "#231F20" }}>Fernando Yordan</strong>
                      <div style={{ fontSize: "0.9rem", color: "#4D4D4D" }}>CTO, Flexio</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="row cta-row">
              <div className="col-12">
                <motion.div
                  className="cta my-4 my-md-5 mx-auto"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="site-btn pulse-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a href={CONSULTATION_LINK}>Book a working session</a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </LazySection>

        <LazySection id="about">
          <div className="container">
            <div className="row align-items-center justify-content-end">
              <motion.img
                src="/images/about-Image.png"
                className="img-fluid feature-image"
                alt=""
                variants={fadeInLeft}
              />
              <motion.div 
                className="col-2 col-12 col-md-6"
                variants={fadeInRight}
              >
                <h2 className="roboto-light text-white mb-0">
                  I'm <span className="roboto-medium">Edgardo</span> Carreras
                </h2>
                <h5 className="color-primary mb-4">
                  Engineering Coach
                </h5>

                <p className="text-white">
                  Decade in the trenches — developer, CTO, team lead, coach.
                  I've shipped startup codebases, rescued legacy ones, and
                  spent years inside teams figuring out what actually moves
                  the needle versus what just sounds good on a slide.
                </p>
                <p className="text-white">
                  My roots are in software craftsmanship: TDD, clean architecture,
                  continuous delivery. These days I apply that lens to coaching
                  startup teams through the AI shift — keeping velocity high
                  while making sure the code (especially the AI-generated parts)
                  is something the team can actually trust.
                </p>
                <motion.p
                  className="text-white"
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <strong>I don't tell teams what to do. I sit with them and we build it together.</strong>
                </motion.p>
              </motion.div>
            </div>
          </div>
        </LazySection>

        <Faq />

        <LazySection id="bottom-cta">
          <div className="container">
            <motion.h1
              className="text-center text-white"
              variants={fadeInUp}
            >
              Ready to ship at startup speed — and trust it?
            </motion.h1>
            <motion.h4
              className="roboto-light text-center text-white"
              variants={fadeInUp}
            >
              We'll spend the call on a real problem in your codebase. You'll
              see exactly how I work before committing to anything.
            </motion.h4>

            <motion.div
              className="cta mt-4 mt-md-5 mx-auto"
              variants={scaleIn}
            >
              <motion.div
                className="site-btn pulse-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variants={pulseGlow}
                animate="animate"
              >
                <a href={CONSULTATION_LINK}>Book a working session</a>
              </motion.div>
              <small className="d-block mt-3 text-white">
                Or <Link to="/newsletter" style={{ color: "#ED9567", textDecoration: "underline" }}>join the newsletter</Link> for daily notes on shipping fast and safe in the AI era.
              </small>
            </motion.div>
          </div>
        </LazySection>
      </main>

      <footer className="ec-bg-dark p-4">
        <div className="bottom">
          <p className="text-center text-white mb-1">
            © 2026 Copyright. Edgardo Carreras.
          </p>
        </div>
      </footer>
    </div>
  </LazyMotion>
)

export const Head = () => {
  return (
    <>
      <Seo
        title={"Edgardo Carreras | Engineering Coach for Startup Teams"}
        description={"Live, embedded coaching for startup engineering teams. Ship at startup speed and trust every line — even the AI-written ones."}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:wght@500&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles/bootstrap.min.css" />
      <link rel="stylesheet" href="/styles/bootstrap-grid.min.css" />
      <link rel="stylesheet" href="/styles/styles.css" />
    </>
  )
}

export default IndexPage
