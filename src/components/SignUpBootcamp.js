import React, { useState } from "react";
import styled from "styled-components";
import { DarkContainer } from "./typography";
import { H1, P, SectionContent } from "./typography/custom";

const Button = styled.button`
  display: flex;
  text-align: center;
  border-radius: 20px;
  justify-content: center;
  text-decoration: none;
  font-size: 0.8em;
  margin-top: 12px;
  align-items: center;
  background: rgb(249, 249, 249);
  appearance: auto;
  font-weight: 600;
  font-family: Montserrat, serif;
  padding: .4em 2em;
  letter-spacing: 0.1em;
  flex: 1;
`;

const FORM_URL = "https://app.convertkit.com/forms/3332277/subscriptions";

const FormFeedback = styled(P)`
  text-align: center;
  font-weight: 300;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  flex: 1;
  width: 100%;
`;

const EmailInput = styled.input`
  display: flex;
  flex: 1;
  text-align: center;
  font-size: 0.9em;
  border-radius: 12px;
`;

const Question = styled(P)`
  margin-bottom: 29px;
  max-width:790px
`

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 19px 1.0875rem 1.45rem;
`

const Questions = () => (
  <QuestionContainer>
    <Question>
      Do you have a risky software project that needs to be done right?
    </Question>
    <Question>Do you wish your software team would be twice as productive?</Question>
    <Question>Want to release features daily instead of monthly?</Question>
  </QuestionContainer>
)

const SubscriptionForm = () => {
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const response = await fetch(
        FORM_URL,
        {
          method: "post",
          body: data,
          headers: {
            accept: "application/json"
          }
        }
      );
      setEmail("");
      const json = await response.json();
      if (json.status === "success") {
        setStatus("SUCCESS");
      }
    } catch (err) {
      setStatus("ERROR");
      console.log(err);
    }
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <DarkContainer>
      <H1>DevOps Essential Bootcamp</H1>
      <SectionContent>
        <P style={{ textAlign: "center" }}>
          A free six day email course to teach you how to create high
          performing development teams.
        </P>
        {status === "SUCCESS" && <FormFeedback>Please go confirm your subscription!</FormFeedback>}
        {status === "ERROR" && <FormFeedback>Oops, Something went wrong! try again.</FormFeedback>}
        <Form
          action={FORM_URL}
          method="post"
          onSubmit={handleSubmit}
        >
          <EmailInput
            type="email"
            aria-label="Your email"
            name="email_address"
            placeholder="Your email address"
            onChange={handleInputChange}
            value={email}
            required
          />
          <Button type="submit">
            SEND LESSON 1 NOW
          </Button>
        </Form>
      </SectionContent>

    </DarkContainer>
  );
};

export default SubscriptionForm;