import React from "react"

// no validation here
export const name = value => false

export const email = value =>
  !(value || "").length > 0 && <p className="error">The email field is required</p>

export const city = value =>
  !/.*[Aa].*[Aa].*/.test(value || "") && (
    <p className="error">A city name should contain at least two A's</p>
  )

export default {
  name,
  email,
  city,
}
