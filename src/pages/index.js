import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MainNavBar } from "../components/MainNavBar"
import { HeroContainer } from "../components/HeroContainer"
import { FirstTimeHere } from "../components/FirstTimeHere"
import { BrandSlideshow } from "../components/BrandSlideshow"
import { KindWords } from "../components/KindWorlds"
import { FreeStuff } from "../components/FreeStuff"
import { AboutMe } from "../components/AboutMe"
import { SignUpBootcamp } from "../components/newsletters/sign-up-bootcamp"

const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Edgardo Carreras | Software Productivity Consultant"} />
    <MainNavBar pathname={pathname} />
    <HeroContainer />
    <FirstTimeHere />
    <FreeStuff />
    <AboutMe />
    <BrandSlideshow />
    <KindWords />
    <SignUpBootcamp />
  </Layout>
)

export default IndexPage
