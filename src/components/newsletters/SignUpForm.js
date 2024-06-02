import styled from "styled-components"
import { Button, P } from "../typography/custom"
import React, { useState } from "react"

const FormFeedback = styled(P)`
  text-align: center;
  font-weight: 300;
  font-size: 0.9rem;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  flex: 1;
  width: 100%;
`
const EmailInput = styled.input`
  display: flex;
  flex: 1;
  padding: 0.4em 0.5em;
  font-size: 0.9em;
  border-radius: 12px;
  ::placeholder {
    text-align: center;
  }
`
export const SignUpForm = ({ url, ctaLabel, dark }) => {
  const [email, setEmail] = useState("")
  const FORM_URL =
    url || "https://app.convertkit.com/forms/3332277/subscriptions"

  const handleInputChange = event => {
    const { value } = event.target
    setEmail(value)
  }

  return (
    <Form action={FORM_URL} method="post">
      <EmailInput
        type="email"
        aria-label="Your email"
        label="Your email"
        name="email_address"
        placeholder="What's your best email address?"
        onChange={handleInputChange}
        value={email}
        required
      />
      <Button type="submit" dark={dark}>
        {ctaLabel || "SUBSCRIBE NOW"}
      </Button>
    </Form>
  )
}
