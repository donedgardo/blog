import Typography from "typography";
import fairyGatesTheme from "typography-theme-fairy-gates";


const brandBlue = `#032EB9`

fairyGatesTheme.overrideThemeStyles = (ref) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a" : {
      color: brandBlue,
      textShadow: 'none',
      backgroundImage: 'none',
    },
    "a:hover": {
      textDecoration: `underline`,
    },
    blockquote: {
      borderLeft: ref.rhythm(6 / 16) + " solid " + brandBlue,
    },
  }
}

delete fairyGatesTheme.googleFonts

const index = new Typography(fairyGatesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  index.injectStyles()
}

export const rhythm = index.rhythm
export const scale = index.scale

export default index

export { DarkContainer } from "./custom";
export { LightContainer } from "./custom";