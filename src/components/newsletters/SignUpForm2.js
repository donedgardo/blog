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
// Honeypot field - hidden from humans, visible to bots
const HoneypotField = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
  z-index: -1;
`

export const SignUpForm2 = ({ url, ctaLabel, dark }) => {
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const FORM_URL =
    url || "https://app.convertkit.com/forms/3332277/subscriptions"

  const handleInputChange = event => {
    const { value } = event.target
    setEmail(value)
  }

  const handleSubmit = event => {
    // If honeypot is filled, it's a bot - silently reject
    if (honeypot) {
      event.preventDefault()
      return false
    }
    // Otherwise, allow normal form submission
  }

  return (
    <Form action={FORM_URL} method="post" onSubmit={handleSubmit}>
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
      {/* Honeypot field - bots will fill this, humans won't see it */}
      <HoneypotField
        type="text"
        name="website_url"
        tabIndex="-1"
        autoComplete="off"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        aria-hidden="true"
      />
      <FormButton type="submit">{ctaLabel || "SUBSCRIBE NOW"}</FormButton>
    </Form>
  )
}
