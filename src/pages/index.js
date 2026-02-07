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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" } // Start loading 200px before it's visible
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
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
  "https://calendly.com/edgardo-g-carreras/free-coaching-call-with-edgardo"

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
              For SaaS CEOs & CTOs
            </motion.h5>
            <motion.h1 
              className="roboto-bold mb-1 mb-md-4 text-capitalize"
              variants={fadeInUp}
            >
              I help your team deliver{" "}
              <motion.span
                style={{ opacity: 1, scale: 1 }}
                
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ color: "#ED9567", display: "inline-block", whiteSpace: "nowrap" }}
              >
                better software,
              </motion.span>
              {" "}faster.
            </motion.h1>
            <motion.h4 
              className="roboto-light text-capitalize"
              variants={fadeInUp}
            >
              Faster releases. Fewer fire drills. Code you can trust — even when AI writes it.
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
                <Link to="/newsletter">Join My Newsletter</Link>
              </motion.div>
              <motion.small 
                className="text-white"
                
                
                transition={{ delay: 1.2 }}
              >
                <em>Daily insights on shipping fast and safe in the AI era.</em>
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
  "AI-generated code that ships fast and breaks faster",
  "Technical debt accumulating at machine speed",
  "Security vulnerabilities hiding in AI-suggested code",
  '"The AI said it works" replacing "it works on my machine"',
  "Deployments that break production (and weekends)",
  "More code generated than your team can review",
  "Releases that feel like rolling the dice",
  "Compliance requirements that can't keep up with AI velocity"
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
                  AI writes code faster than ever. The hard part is making sure it{" "}
                  <span className="roboto-medium color-accent">
                    doesn't sink your codebase
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
                  How I Help
                </motion.h2>
                <motion.h3 
                  className="roboto-light text-white text-center"
                  variants={fadeInUp}
                >
                  I don't just advise — <strong>I build</strong>. Pipelines, 
                  automation, security gates. The systems that let your team{" "}
                  <motion.strong
                    
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    ship fast and safe
                  </motion.strong>.
                </motion.h3>
              </div>
            </div>

            <hr />

            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <motion.h4 
                  className="text-white text-center roboto-light px-3 mb-4 mb-md-5"
                  variants={fadeInUp}
                >
                  Two ways to work together:
                </motion.h4>
              </div>
            </div>

            <div className="row services flex-md-nowrap justify-content-center">
              <motion.div 
                className="service col-12 col-md-5"
                variants={fadeInLeft}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="inner">
                  <img className="img-fluid" src="/images/portrait_edgardo.png" alt="" />
                  <div className="text-container text-white">
                    <h4 className="service-title">DevSecOps Pipeline Audit</h4>
                    <p>
                      <strong>A focused 2-week engagement.</strong> I review your 
                      CI/CD pipeline, identify security gaps and bottlenecks, 
                      and deliver a prioritized action plan. You'll know exactly 
                      where you're exposed and what to fix first.
                    </p>
                    <motion.div 
                      className="site-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a href={CONSULTATION_LINK}>Book Your Audit</a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="service col-12 col-md-5"
                variants={fadeInRight}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="inner">
                  <img className="img-fluid" src="/images/service-003.png" alt="" />
                  <div className="text-container text-white">
                    <h4 className="service-title">Fractional DevSecOps Engineer</h4>
                    <p>
                      <strong>I embed with your team as a hands-on contributor.</strong>{" "}
                      Not advising from the sidelines — actually building. CI/CD pipelines 
                      with security baked in, automated testing, infrastructure as code.
                    </p>
                    <motion.div 
                      className="site-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a href={CONSULTATION_LINK}>Let's Talk</a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.h3 
              className="testimonial-title text-white text-center roboto-light text-capitalize"
              variants={fadeInUp}
            >
              <em>What my clients say...</em>
            </motion.h3>

            <motion.div 
              className="row testimonial-row align-items-start flex-md-nowrap"
              variants={staggerContainer}
            >
              {[
                {
                  quote: "Edgardo has a vast knowledge and understanding of development processes and technical abilities which he consistently demonstrates through the quality of his work.",
                  author: "Karlo Martinez",
                  image: "/images/karlo_martinez.jpg"
                },
                {
                  quote: "Edgardo is one of the most knowledgeable and fastest programmers I know. He always makes sure to be up to date with the latest tools and has a keen eye for improving products.",
                  author: "Tania Gonzalez",
                  image: "/images/tania_gonzalez.jpg"
                },
                {
                  quote: "Edgardo provided invaluable mentorship, helping developers grow technically and enforcing high code standards through TDD and tool integration.",
                  author: "William Cheung",
                  image: "/images/william_cheung.jpg"
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="col col-12 col-md-4"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <svg width="31" height="23" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.3597 14.3648C19.3597 10.2177 20.3535 6.97094 22.3412 4.62456C24.3562 2.27817 27.1744 0.736655 30.7958 0V4.25623C28.0457 5.10202 26.1941 6.62989 25.2411 8.83986C24.6965 10.013 24.4787 11.1453 24.5876 12.2367H31V23H19.3597V14.3648ZM0 14.3648C0 10.2722 0.966623 7.03915 2.89987 4.66548C4.86034 2.29182 7.70575 0.736655 11.4361 0V4.25623C8.65876 5.1293 6.79359 6.62989 5.84058 8.75801C5.35046 9.87663 5.14625 11.0362 5.22793 12.2367H11.6403V23H0V14.3648Z" fill="#ED9567"/>
                  </svg>
                  <p className="testimonial-message text-white">
                    <small><em>"{testimonial.quote}"</em></small>
                  </p>
                  <div className="author d-flex align-items-center">
                    <div className="img">
                      <img src={testimonial.image} alt="" />
                    </div>
                    <div className="info">
                      <strong className="name text-white">- {testimonial.author}</strong>
                      <img src="/images/custom-star-rating.png" alt="" className="ratings" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
                  text: <><strong>CTOs and Engineering Leaders</strong> tired of firefighting deployments</>
                },
                {
                  icon: (
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M44.8021 37.7331V31.9863H25.9355V29.0398C33.29 28.3165 39.0553 22.0967 39.0553 14.5553C39.0553 6.52954 32.5258 0 24.5 0C16.4742 0 9.9447 6.52954 9.9447 14.5553C9.9447 22.0967 15.71 28.3165 23.0645 29.0398V31.9863H4.19792V37.7331H0V49H11.267V37.7331H7.06902V34.8574H23.0645V37.7331H18.8665V49H30.1336V37.7331H25.9355V34.8574H41.931V37.7331H37.7331V49H49V37.7331H44.8021ZM22.1044 12.9291C22.1044 11.6081 23.179 10.5335 24.5 10.5335C25.821 10.5335 26.8956 11.6081 26.8956 12.9291C26.8956 14.2501 25.821 15.3248 24.5 15.3248C23.179 15.3248 22.1044 14.2501 22.1044 12.9291ZM24.5 18.1958C26.8773 18.1958 28.8112 20.1298 28.8112 22.5071V25.415C27.4767 25.9467 26.0219 26.2395 24.5 26.2395C22.9781 26.2395 21.5233 25.9466 20.1888 25.415V22.5071C20.1888 20.1298 22.1227 18.1958 24.5 18.1958ZM12.8158 14.5553C12.8158 8.11266 18.0574 2.87109 24.5 2.87109C30.9426 2.87109 36.1842 8.11266 36.1842 14.5553C36.1842 18.2921 34.4207 21.6246 31.6823 23.7649V22.5071C31.6823 19.98 30.3694 17.7553 28.391 16.4748C29.2452 15.5383 29.7668 14.2935 29.7668 12.9292C29.7668 10.0251 27.4041 7.66247 24.5001 7.66247C21.5961 7.66247 19.2334 10.0252 19.2334 12.9292C19.2334 14.2936 19.755 15.5384 20.6092 16.4748C18.6308 17.7553 17.3179 19.9801 17.3179 22.5071V23.7649C14.5794 21.6246 12.8158 18.2921 12.8158 14.5553ZM8.39594 46.1289H2.87109V40.6042H8.39594V46.1289ZM27.2624 46.1289H21.7375V40.6042H27.2624V46.1289ZM46.1289 46.1289H40.6041V40.6042H46.1289V46.1289Z" fill="#ED9567"/>
                    </svg>
                  ),
                  text: <><strong>SaaS teams</strong> scaling past their current release process</>
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
                  text: <><strong>Organizations</strong> who need senior DevSecOps expertise without a full-time hire</>
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
                    { bold: "Manual deployments", rest: "everyone's afraid to touch" },
                    { bold: "Security as an afterthought", rest: "caught too late" },
                    { bold: "Releases that break things", rest: "and burn out the team" },
                    { bold: "Slow feedback loops", rest: "that hide problems" }
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
                    { bold: "One-click deployments", rest: "you can run anytime with confidence" },
                    { bold: "Security checks that run automatically", rest: "on every commit" },
                    { bold: "Rapid, reliable releases", rest: "that ship without drama" },
                    { bold: "Tight feedback loops", rest: "that catch issues before production" }
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
              <div className="col-12 col-md-8">
                <motion.h5 
                  className="color-primary text-center text-uppercase"
                  variants={fadeInUp}
                >
                  Real Results
                </motion.h5>
                <motion.h2 
                  className="text-center roboto-light"
                  variants={fadeInUp}
                >
                  What <strong>Transformation</strong> Looks Like
                </motion.h2>
              </div>
            </div>

            <motion.div 
              className="row trans-boxes"
              variants={staggerContainer}
            >
              {[
                { label: "Decreased by", value: 80, suffix: "%", description: "Lead Times" },
                { label: "Increased by", value: 250, suffix: "%", description: "Throughput" },
                { label: "Increased by", value: 300, suffix: "%", description: "Release Frequency" },
                { label: "Decreased by", value: 50, suffix: "%", description: "Faulty Deployments" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="col-12 col-md-3 text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inner">
                    <small>{stat.label}</small>
                    <h1 className="color-primary">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </h1>
                    <p>{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

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
                    <Link to="/newsletter">Get the Newsletter</Link>
                  </motion.div>
                  <small>
                    <em>Join 100+ engineering leaders getting daily DevSecOps insights.</em>
                  </small>
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
                  DevSecOps Engineer & Software Craftsman
                </h5>

                <p className="text-white">
                  I've spent the last decade in the trenches — as a developer, CTO, 
                  consultant, and team lead. I've built CI/CD pipelines, rescued 
                  legacy codebases, and learned (the hard way) that security and 
                  quality can't be afterthoughts.
                </p>
                <p className="text-white">
                  My background is in software craftsmanship: TDD, Clean Architecture, 
                  continuous delivery. These days, I apply those same principles to 
                  DevSecOps. Shift left. Automate everything. Make the right thing 
                  the easy thing.
                </p>
                <motion.p 
                  className="text-white"
                  
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <strong>I don't just tell teams what to do. I build it with them.</strong>
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
              Ready to ship with confidence?
            </motion.h1>
            <motion.h4 
              className="roboto-light text-center text-white"
              variants={fadeInUp}
            >
              Get daily insights on DevSecOps, CI/CD, and building pipelines 
              that let you move fast without breaking things.
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
                <Link to="/newsletter">Subscribe to the Newsletter</Link>
              </motion.div>
              <small>
                <em>Join 100+ engineering leaders. No spam. Unsubscribe anytime.</em>
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
}

export default IndexPage
