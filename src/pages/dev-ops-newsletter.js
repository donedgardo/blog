import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MainNavBar } from "../components/MainNavBar"
import { BrandSlideshow } from "../components/BrandSlideshow"
import { KindWords } from "../components/KindWords"
import { AboutMe } from "../components/AboutMe"
import { Questions } from "../components/BootcampQuestions"
import { FreeStuff } from "../components/FreeStuff"
import { SignUpBootcamp } from "../components/newsletters/sign-up-bootcamp"

const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Edgardo Carreras | DevOps Newsletter Sign up."} />
    <MainNavBar pathname={pathname} />
    <SignUpBootcamp />
    <Questions />
    <AboutMe />
    <BrandSlideshow />
    <KindWords />
    <SignUpBootcamp />
    <FreeStuff />
  </Layout>
)

export default IndexPage
