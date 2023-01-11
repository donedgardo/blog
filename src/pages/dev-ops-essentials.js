import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { MainNavBar } from "../components/MainNavBar";
import { BrandSlideshow } from "../components/BrandSlideshow";
import { KindWords } from "../components/KindWorlds";
import { AboutMe } from "../components/AboutMe";
import SignUpBootcamp from "../components/SignUpBootcamp";

const IndexPage = ({ location: { pathname } }) => (
  <Layout>
    <Seo title={"Edgardo Carreras | Software Productivity Consultant"} />
    <MainNavBar pathname={pathname} />
    <SignUpBootcamp />
    <KindWords />
    <BrandSlideshow />
    <AboutMe />
  </Layout>
);

export default IndexPage;
