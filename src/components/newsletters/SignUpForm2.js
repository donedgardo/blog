import styled from "styled-components"
import { Button } from "../typography/custom"
import React, { useState } from "react"

const FormButton = styled(Button)`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  background-color: var(--color-primary);
  color: var(--color-white);
  line-height: 1;
  padding: 25px 67px;
  display: block;
  text-align: center;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: -20px 20px 34px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  flex: 1;
  width: 100%;
`
const EmailInput = styled.input`
  display: flex;
  flex: 1;
  padding: 0.7em 0.5em;
  font-size: 1em;
  border-radius: 5px;
  ::placeholder {
    text-align: center;
  }
`
export const SignUpForm2 = ({ url, ctaLabel, dark }) => {
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
      <FormButton type="submit">{ctaLabel || "SUBSCRIBE NOW"}</FormButton>
    </Form>
  )
}
