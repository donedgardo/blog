import React from "react"

import BlogLayout from "../components/blog_layout"

const SubscriptionConfirmed = () => {
  return (
    <BlogLayout
      location={"/subscription-confirmed"}
      title={"Subscription Confirmed!"}
    >
      <p>
        Thank you for confirming your email address! I'm excited to have you on
        board and can't wait to share valuable insights with you.
      </p>

      <p>
        If you have any questions or feedback, please don't hesitate to reach
        out at me@edgardocarreras.com.
      </p>
      <p>
        Thanks again for joining our community, and we look forward to staying
        in touch!
      </p>

      <p>Best regards,</p>

      <p>Edgardo Carreras</p>
    </BlogLayout>
  )
}

export default SubscriptionConfirmed
