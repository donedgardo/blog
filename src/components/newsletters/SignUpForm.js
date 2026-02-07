import styled from "styled-components"
import { Button } from "../typography/custom"
import React, { useState } from "react"

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

export const SignUpForm = ({ url, ctaLabel, dark }) => {
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
      <Button type="submit" dark={dark}>
        {ctaLabel || "SUBSCRIBE NOW"}
      </Button>
    </Form>
  )
}
