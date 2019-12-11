import React from "react"
import classnames from "classnames"
import Layout from "../components/layout"
import validators from "../validation/validators"

const GoodForm = () => {
  const [state, setState] = React.useState({})
  const [viewState, setViewState] = React.useState({})
  const [showValidation, setShowValidation] = React.useState(false)

  const handleChange = (name, event) => {
    const { value } = event.currentTarget
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const getValue = name => state[name] || ""

  const handleSubmit = e => {
    e.preventDefault()
    setShowValidation(true)

    // check if some of the validations have failed
    const hasInvalidField = ["name", "city", "email"].some(name =>
      validators[name](getValue(name))
    )
    if (hasInvalidField) {
      return
    }
    setViewState(state)
  }
  const handleClear = e => {
    e.preventDefault()
    setState({})
    setViewState({})
    setShowValidation(false)
  }

  const showResult = Object.entries(viewState).length > 0

  const validate = name => validators[name](getValue(name))

  const getClasses = name => {
    if (validate(name)) {
      return showValidation && "_has_error"
    } else {
      return !validators[name](getValue(name)) && showValidation && "_is_valid"
    }
  }

  return (
    <Layout>
      <h1>
        <span role="img" aria-label="innocent-emoji">
          😇{" "}
        </span>
        Good form
      </h1>
      <form id="signup-form" onSubmit={handleSubmit}>
        {/* Label wrapping input */}
        <label className="label--good">
          <strong>Name</strong>
          {/* No validation, no error, no aria-describedby necessary */}
          <input
            type="text"
            value={getValue("name")}
            onChange={e => handleChange("name", e)}
            className={classnames("input--good", getClasses("name"))}
          />
        </label>
        {showValidation && validate("name")}

        {/* Label wrapping input */}
        <label className="label--good">
          <strong>City</strong>
          <input
            required
            id="city__id"
            aria-describedby="city__error"
            type="text"
            value={getValue("city")}
            onChange={e => handleChange("city", e)}
            className={classnames("input--good", getClasses("city"))}
          />
        </label>
        {showValidation && validate("city")}

        {/*
         * Label separately from input, but "linked" with
         * a "for" attribute on the label and "id" on the input
         */}
        <label htmlFor="email__id" className="label--good">
          <strong>Email</strong>
        </label>
        {/* Using the correct type will give you free goodies! */}
        <input
          required
          id="email__id"
          aria-describedby="email__error"
          type="email"
          value={getValue("email")}
          placeholder="john.doe@gmail.com"
          onChange={e => handleChange("email", e)}
          className={classnames("input--good", getClasses("email"))}
        />
        {showValidation && validate("email")}
      </form>

      {/*
       * Button outside of the form, but "linked" with
       * a "form" attribute on the label and "id" on the form.
       * The type="submit" will trigger the form submit.
       */}
      <div className="buttons">
        <button form="signup-form" type="submit">
          Submit
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {showResult && (
        <section role="alert" aria-live="assertive">
          <h2>Form submitted!</h2>
          {Object.entries(viewState).map(([name, value]) => (
            <p key={name}>
              <span>
                <strong>{name}: </strong>
                {value}
              </span>
            </p>
          ))}
        </section>
      )}
    </Layout>
  )
}

export default GoodForm
