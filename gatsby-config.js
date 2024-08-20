module.exports = {
  siteMetadata: {
    title: `Edgardo Carreras | Software Productivity Consultant`,
    description: `Providing high impact through product design, software architecture, platform selection, integration planning, and process design.`,
    author: `Edgardo Carreras`,
    siteUrl: `https://edgardocarreras.com`,
    social: {
      twitter: `carrerasdev`,
    },
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-root-import`,
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "blog",
        engine: "flexsearch",
        engineOptions: {
          encode: "icase",
          tokenize: "forward",
          async: false,
        },
        query: `
          {
            allMdx {
              nodes {
                id
                slug 
                excerpt
                rawBody
                frontmatter {
                  title
                  description
                  date(formatString: "MMMM DD, YYYY")
                }
              }
            }
          }
        `,
        ref: "id",
        index: ["title", "rawBody"],
        store: ["id", "slug", "date", "title", "excerpt", "description"],
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            slug: node.slug,
            rawBody: node.rawBody,
            excerpt: node.excerpt,
            title: node.frontmatter.title,
            description: node.frontmatter.description,
            date: node.frontmatter.date,
          })),
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/daily`,
        name: `daily`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          {
            resolve: "gatsby-remark-soundcloud",
            options: {
              width: 800,
              height: 200,
            },
          },
          {
            resolve: `gatsby-remark-gifs`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              disableBgImage: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
        remarkPlugins: [require("gatsby-remark-vscode").remarkPlugin],
        plugins: [`gatsby-remark-images`, "gatsby-remark-gifs"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `EdgardoCarreras`,
        short_name: `CarrerasDev`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingIds: ["G-QWKXJQWDJF", "UA-158945218-1"],
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        clarity_project_id: "mp10bxqw30",
        enable_on_dev_env: false,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + "/daily/" + node.slug,
                  guid: site.siteMetadata.siteUrl + "/daily/" + node.slug,
                  custom_elements: [
                    {
                      "content:encoded": node.html.replace(
                        /(?<=\"|\s)\/static\//g,
                        `${site.siteMetadata.siteUrl}\/static\/`
                      ),
                    },
                  ],
                })
              })
            },
            query: `
              {
                allMdx(
                  filter: {frontmatter: {category: {eq: "daily"}}}
                  sort: {fields: frontmatter___date, order: DESC}
                ) {
                  nodes {
                    slug 
                    html
                    frontmatter {
                      title
                      description
                      date(formatString: "MMMM DD, YYYY")
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/daily/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ],
}
