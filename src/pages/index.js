import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { MainNavBar } from "../components/MainNavBar";
import { HeroContainer } from "../components/HeroContainer";
import { FirstTimeHere } from "../components/FirstTimeHere";
import { BrandSlideshow } from "../components/BrandSlideshow";
import { KindWords } from "../components/KindWorlds";

const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Edgardo Carreras | Software Productivity Consultant"} />
    <MainNavBar pathname={pathname} />
    <HeroContainer />
    <FirstTimeHere />
    <BrandSlideshow />
    <KindWords />
  </Layout>
)

export default IndexPage
