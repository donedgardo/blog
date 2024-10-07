import React from "react"
import Seo from "../components/seo"
import { Header } from "../components/header"

function WaitListConfirmedHero() {
  return (
    <section id="hero" className="no-border-radius">
      <div className="container">
        <div className="row flex-md-nowrap">
          <div className="col-1 col-12">
            <h5 className="roboto-bold text-uppercase primary-color">
              Learning Hour Waitlist Confirmed
            </h5>
            <h1 className="roboto-bold mb-1 mb-md-4 text-capitalize">
              Your Spot is Reserved!
            </h1>
            <h4
              className="roboto-light mb-1 mb-md-4"
              style={{ maxWidth: "46.25rem" }}
            >
              Thank you for joining the Learning Hours waitlist!
            </h4>
            <h4
              className="roboto-light mb-1 mb-md-4"
              style={{ maxWidth: "46.25rem" }}
            >
              I am thrilled to have you onboard and can't wait to equip your
              team with the skills needed to deliver higher-quality software at
              speed. Your commitment to growth is a significant step toward
              transforming your team's capabilities.
            </h4>
            <h4 className="roboto-bold mb-1 mb-md-4 text-capitalize">
              What's Next?
            </h4>
            <h4 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              You'll receive an email from me as soon as the sessions are open
              for enrollment. Keep an eye on your inbox for further details and
              start dates.
            </h4>
            <hr />
            <h5 className="roboto-light" style={{ maxWidth: "46.25rem" }}>
              If you have any questions or feedback, please don't hesitate to
              reach out at me@edgardocarreras.com
            </h5>
            <p>Yours,</p>
            <p>Ed</p>
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
        <WaitListConfirmedHero />
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
