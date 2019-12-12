import React from "react"
import classnames from "classnames"
import Layout from "../components/layout"
import validators from "../validation/validators"

const FixThisForm = () => {
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
  // const getViewValue = name => viewState[name] || ""

  const handleSubmit = e => {
    e.preventDefault()
    setShowValidation(true)

    /**
     * TODO: Before submit, check if some of the validations have failed
     */

    // const hasInvalidField = ["name", "city", "email"].some(name =>
    //   validators[name](getValue(name))
    // )
    // if (hasInvalidField) {
    //   return
    // }

    setViewState(state)
  }
  const handleClear = e => {
    e.preventDefault()
    setState({})
    setViewState({})
    setShowValidation(false)
  }

  const showResult = Object.entries(viewState).length > 0

  const validate = name =>
    showValidation && validators[name](getValue(name) || "")

  const getClasses = name => (validate(name) ? "_has_error" : "")

  /**
   * TODO: Add _is_valid class to show validation on fields with correct values
   */

  // const getClasses = name => {
  //   if (validate(name)) {
  //     return showValidation && "_has_error"
  //   } else {
  //     return !validators[name](getValue(name)) && showValidation && "_is_valid"
  //   }
  // }

  /**
   * TODO:
   * 1a. Wrap all inputs in form element
   * 1b. Add submit handler (onSubmit) and <code>id="signup-form"</code>{" "}
   * attribute to form
   * 1c. Add button with <code>form="signup-form"</code> attribute
   *
   * 2. Add label element with <code>for="city"</code> attribute to each
   * input
   *
   * 3. Add <code>id</code> to error. Reference it in
   * <code>aria-describedby</code> attribute on the input
   *
   * 4 (Bonus). Add <code>role="alert" aria-live="assertive"</code> to
   * result section.
   */

  return (
    <Layout>
      <h1>
        <span role="img" aria-label="laboratory-man-emoji">
          👨‍🔬{" "}
        </span>
        Fix this form
      </h1>
      <div className="wrapper">
        <b className="label--bad">Name</b>
        <input
          type="text"
          value={getValue("name")}
          onChange={e => handleChange("name", e)}
          className={classnames(getClasses("name"), "no-outline")}
        />
        {validate("name") && <p className="error">Something's wrong</p>}
        <b className="label--bad">City</b>
        <input
          type="text"
          value={getValue("city")}
          onChange={e => handleChange("city", e)}
          className={classnames(getClasses("city"), "no-outline")}
        />
        {validate("city") && <p className="error">Something's wrong</p>}
        <b className="label--bad">Email</b>
        <input
          type="text"
          value={getValue("email")}
          placeholder="john.doe@gmail.com"
          onChange={e => handleChange("email", e)}
          className={classnames(getClasses("email"), "no-outline")}
        />
      </div>
      <div className="buttons">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {showResult && (
        <section>
          <h2>Form submitted!</h2>
          {Object.entries(viewState).map(([name, value]) => (
            <p key={name}>
              <span>
                <b>{name}: </b>
                {value}
              </span>
            </p>
          ))}
        </section>
      )}
    </Layout>
  )
}

export default FixThisForm
