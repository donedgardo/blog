import React from "react"
import Seo from "../components/seo"
import { SignUpForm2 } from "../components/newsletters/SignUpForm2"
import { Header } from "../components/header"

function SubscriptionConfirmedHero() {
  return (
    <section id="hero" className="no-border-radius">
      <div className="container">
        <div className="row flex-md-nowrap">
          <div className="col-1 col-12">
            <h5 className="roboto-bold text-uppercase primary-color">
              Welcome aboard!
            </h5>
            <h1 className="roboto-bold mb-1 mb-md-4 text-capitalize">
              Subscription Confirmed
            </h1>
            <h4 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              Thank you for confirming your email address! I'm excited to have
              you on board and can't wait to share valuable insights with you.
            </h4>
            <h5 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              If you have any questions or feedback, please don't hesitate to
              reach out at me@edgardocarreras.com.
            </h5>
            <p>
              Thanks again for joining our community, looking forward to staying
              in touch!
            </p>
            <p>Kind regards,</p>
            <p>Edgardo Carreras</p>
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
        <SubscriptionConfirmedHero />
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
