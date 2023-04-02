import styled from "styled-components"
import { Button, P } from "./typography/custom"
import React, { useState } from "react"

const FORM_URL = "https://app.convertkit.com/forms/3332277/subscriptions"
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
  text-align: center;
  padding: 0.4em 2em;
  font-size: 0.9em;
  border-radius: 12px;
`
export const SignUpForm = props => {
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState("")
  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      })
      setEmail("")
      const json = await response.json()
      console.log(json)
      if (json.status === "success") {
        setStatus("SUCCESS")
      } else {
        setStatus("ERROR")
      }
    } catch (err) {
      setStatus("ERROR")
      console.log(err)
    }
  }
  const handleInputChange = event => {
    const { value } = event.target
    setEmail(value)
  }

  return (
    <>
      {status === "SUCCESS" && (
        <FormFeedback>Please go confirm your subscription!</FormFeedback>
      )}
      {status === "ERROR" && (
        <FormFeedback>Oops, Something went wrong! try again.</FormFeedback>
      )}
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
        <Button type="submit" dark={props.dark}>
          {props.ctaLabel || "SUBSCRIBE NOW"}
        </Button>
      </Form>
    </>
  )
}
