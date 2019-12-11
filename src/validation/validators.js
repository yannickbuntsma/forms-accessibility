import React from "react"

// no validation here
export const name = value => false

export const email = value => {
  if (!(value || "").length > 0) {
    return <p className="error" id="email__error">The email field is required</p>
  }

  const regex = /[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9.]{2,}/
  return (
    !regex.test(value) && <p className="error" id="email__error">Email address is not valid</p>
  )
}

export const city = value =>
  !/.*[Aa].*[Aa].*/.test(value || "") && (
    <p className="error" id="city__error">A city name should contain at least two A's</p>
  )

export default {
  name,
  email,
  city,
}
