import React from "react"
import Seo from "../../components/seo"
import { SignUpForm2 } from "../../components/newsletters/SignUpForm2"
import { Header } from "../../components/header"

function NewsletterHeroSection() {
  return (
    <section id="hero" className="no-border-radius">
      <div className="container">
        <div className="row flex-md-nowrap">
          <div className="col-1 col-12">
            <h5 className="roboto-bold text-uppercase primary-color">
              Attention SaaS CEOs & CTOs
            </h5>
            <h1 className="roboto-bold mb-1 mb-md-4 text-capitalize">
              Agile Shift: <br /> Mastering Software Excellence
            </h1>
            <h4 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              A daily newsletter that helps tech executives in SaaS
              organizations accelerate their software teams' productivity,
              quality, and alignment.
            </h4>
            <h5 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              Give me two minutes a day, and I’ll provide you with proven
              strategies to boost your software team's productivity, quality,
              and alignment, leading to faster and more profitable delivery
              without sacrificing quality or burnout.
            </h5>
            <div className="cta my-4 my-md-5">
              <SignUpForm2
                ctaLabel="Send My First Tip Now"
                url="https://app.convertkit.com/forms/3332277/subscriptions"
              />
              <small className="text-white">
                <em>
                  (Don’t worry—I hate spam, too, and I’ll NEVER share your email
                  address with anyone!)
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
      <Seo title={"Edgardo Carreras | SaaS Agile Technical Coach"} />
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
        `}
      </style>
    </>
  )
}

export default IndexPage
