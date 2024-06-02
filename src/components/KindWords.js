import styled from "styled-components"
import { LightContainer, P, SectionContent } from "./typography/custom"
import { graphql, useStaticQuery } from "gatsby"
import Portrait from "./portrait"
import React from "react"

const TestimonialContainer = styled.blockquote`
  max-width: 790px;
  background-color: #efefef;
  border: 2px solid #ddd;
  position: relative;
  border-radius: 0.2em;
  margin: 1em 0 1.5em 50px;
  padding: 0.1em 1.9em 0.1em 4em;
  @media (max-width: 790px) {
    margin: 80px 0 1em 0;
    padding: 50px 1em 1em 1em;
  }
`
const StyledPortrait = styled(Portrait)`
  display: block !important;
  position: absolute !important;
  margin: 0 0.7em;
  border-radius: 50%;
  width: 100px;
  top: 20px;
  left: -50px;
  @media (max-width: 790px) {
    top: -50px;
    left: 30px;
  }
`
const Testimonial = styled(P)`
  font-size: 0.8em;
  margin: 1em 0;
  font-style: italic;
  text-align: left;
  display: flex;
  color: #000000;
`
const TestimonialAuthor = styled(P)`
  margin: 1em 0;
  font-size: 0.8em;
  color: #000000;
`

const Hr = styled.hr`
  background: none;
  margin: 1.25em;
`

export const KindWords = () => {
  const data = useStaticQuery(graphql`
    query {
      karloImg: file(relativePath: { eq: "karlo_martinez.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      johannImg: file(relativePath: { eq: "johann_gracia.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      taniaImg: file(relativePath: { eq: "tania_gonzalez.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      fernandoImg: file(relativePath: { eq: "fernando_yordan.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      gabrielImg: file(relativePath: { eq: "gabriel_flores.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      lennyImg: file(relativePath: { eq: "lenny_mendez.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      williamImg: file(relativePath: { eq: "william_cheung.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      ronaldImg: file(relativePath: { eq: "ronald_delgado.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      samImg: file(relativePath: { eq: "sam_yung.jpeg" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <LightContainer>
      <SectionContent>
        <h3 className="align-center">Don't Take My Word For It...</h3>
        <Hr />
        <TestimonialContainer>
          <Testimonial>
            “Edgardo has a vast knowledge and understanding of development
            processes and technical abilities which he consistently demonstrates
            through the quality of his work."
          </Testimonial>
          <TestimonialAuthor>
            - Karlo Martinez
            <StyledPortrait fixed={data.karloImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            “Edgardo has a reputation for getting customers with complex
            problems akin to science fiction and somehow solve them with
            finesse. For me, he’s not only a leader or a mentor but a wizard.”
          </Testimonial>
          <TestimonialAuthor>
            - Lenny Mendez
            <StyledPortrait fixed={data.lennyImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            "Through Edgardo's hands-on approach, I learned invaluable tactics
            for team management and implementing CI/CD and monitoring. His focus
            on value over effort is exceptional."
          </Testimonial>
          <TestimonialAuthor>
            - Fernando Yordan
            <StyledPortrait fixed={data.fernandoImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            "Edgardo is an Expert, Responsible, and timely professional who
            helped us rethink our standards and find the right solutions.
            Edgardo is not scared to bring the hard truths in a respectable
            manner."
          </Testimonial>
          <TestimonialAuthor>
            - Johann Gracia
            <StyledPortrait fixed={data.johannImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            "Edgardo provided invaluable mentorship, helping junior developers
            grow technically and enforcing high code standards through TDD and
            tool integration."
          </Testimonial>
          <TestimonialAuthor>
            - William Cheung
            <StyledPortrait fixed={data.williamImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            “Edgardo is one of the most knowledgeable and fastest programmers I
            know. He always makes sure to be up to date with the latest tools
            and has a keen eye for improving products and developing innovative
            ideas.”
          </Testimonial>
          <TestimonialAuthor>
            - Tania Gonzalez
            <StyledPortrait fixed={data.taniaImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            "Edgardo has a natural skill of producing creative technical
            solutions, working with different systems, and quickly adopting new
            technologies."
          </Testimonial>
          <TestimonialAuthor>
            - Gabriel Flores
            <StyledPortrait fixed={data.gabrielImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            "Edgardo's knowledge and thoroughness in web design, GraphQL, and
            project management were exceptional, greatly benefiting our
            projects."
          </Testimonial>
          <TestimonialAuthor>
            - Ronald Delgado
            <StyledPortrait fixed={data.ronaldImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>

        <Hr />
        <TestimonialContainer>
          <Testimonial>
            "Edgardo's team-leading skills and vast experience were critical in
            our project's success."
          </Testimonial>
          <TestimonialAuthor>
            - Sam Yung
            <StyledPortrait fixed={data.samImg.childImageSharp.fixed} />
          </TestimonialAuthor>
        </TestimonialContainer>
        <Hr />
      </SectionContent>
    </LightContainer>
  )
}
