import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"


fairyGatesTheme.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
  }
}

delete fairyGatesTheme.googleFonts

const index = new Typography(fairyGatesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  index.injectStyles()
}

export default index
export const rhythm = index.rhythm
export const scale = index.scale
