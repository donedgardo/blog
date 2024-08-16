import React from "react"
import { Link } from "gatsby"

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link to={"/"}>
              <img
                src="/images/edgardo-carreras-logo.png"
                alt="Edgardo Carreras Logo"
                className="site-logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
