import React from "react"
import styled from "styled-components"

import twitterLogo from "../images/twitter_icon.png"
import linkedinLogo from "../images/linkedin_icon.png"
import githubLogo from "../images/github_icon.png"
import mediumLogo from "../images/medium_icon.png"

const SocialsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding 10px;
    margin: 0px 0px;
`

const SocialIcon = styled.a`
  flex: none;
  flex-grow: 0;
  margin: 0px 10px;
  background-image: url(${props => props.image});
  height: 32px;
  width: 32px;
`

const Footer = () => (
  <SocialsContainer>
    <SocialIcon
      href={"https://twitter.com/CarrerasDev"}
      target={"_blank"}
      image={twitterLogo}
    />
    <SocialIcon
      href={"https://www.linkedin.com/in/edgardo-carreras"}
      target={"_blank"}
      image={linkedinLogo}
    />
    <SocialIcon
      href={"https://github.com/donedgardo"}
      target={"_blank"}
      image={githubLogo}
    />
    <SocialIcon href={"/blog"} image={mediumLogo} />
  </SocialsContainer>
)

export default Footer
