import React from "react"

// no validation here
export const name = value => false

export const email = value => {
  if (!(value || "").length > 0) {
    return <span className="error" id="email__error">The email field is required</span>
  }

  const regex = /[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9.]{2,}/
  return (
    !regex.test(value) && <span className="error" id="email__error">Email address is not valid</span>
  )
}

export const city = value =>
  !/.*[Aa].*[Aa].*/.test(value || "") && (
    <span className="error" id="city__error">A city name should contain at least two A's</span>
  )

export default {
  name,
  email,
  city,
}
