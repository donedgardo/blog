import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"

const lightBlue = `#0071B0`
const blackBrand = "#231f20"
const darkBlue = `#009ED1`

fairyGatesTheme.overrideThemeStyles = ref => {
  return {
    body: {
      fontFamily: "Montserrat, serif",
      fontStyle: "normal",
      color: "black",
      lineHeight: "1.5em",
      margin: 0,
    },
    "h1,h2,h3,h4,h5": {
      marginBottom: "1.725rem",
    },
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    hr: {
      width: "100%",
    },
    a: {
      color: "#163961",
      fontWeight: 500,
      textShadow: "none",
      backgroundImage: "none",
    },
    "a:hover": {
      textDecoration: `underline`,
    },
    blockquote: {
      borderLeft: ref.rhythm(6 / 16) + " solid " + lightBlue,
    },
    ".align-center": {
      textAlign: "center",
    },
    ".cta": {
      [`@media screen and (min-width: 600px)`]: {
        margin: "1em 4em 0em 4em",
      },
      maxWidth: "34em",
      margin: "1em 0em 0em 0em",
      backgroundColor: lightBlue,
      borderBottom: `3px solid ${lightBlue}`,
      borderRadius: "2em",
      display: "block",
      fontWeight: "bold",
      padding: "0.5em 0 0.4em 0",
      textAlign: "center",
      color: "#fff",
      textDecoration: "none",
      textTransform: "uppercase",
    },
    ".mx-auto": {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }
}

delete fairyGatesTheme.googleFonts

const index = new Typography({
  ...fairyGatesTheme,
  headerFontFamily: ["Montserrat", "serif"],
})

export const rhythm = index.rhythm
export const scale = index.scale

export default index

export { DarkContainer } from "./custom"
export { LightContainer } from "./custom"
