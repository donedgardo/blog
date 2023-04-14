import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MainNavBar } from "../components/MainNavBar"
import { BrandSlideshow } from "../components/BrandSlideshow"
import { KindWords } from "../components/KindWorlds"
import { AboutMe } from "../components/AboutMe"
import { Questions } from "../components/Question"
import { PopularStuff } from "../components/PopularStuff"
import { SignUpBootcamp } from "../components/newsletters/sign-up-bootcamp"

const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Edgardo Carreras | DevOps Newsletter Sign up."} />
    <MainNavBar pathname={pathname} />
    <SignUpBootcamp />
    <Questions />
    <KindWords />
    <BrandSlideshow />
    <AboutMe />
    <PopularStuff />
  </Layout>
)

export default IndexPage
