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

    // Before submit, check if some of the validations have failed
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

  // Add _is_valid class to show validation on fields with correct values
  // const getClasses = name => {
  //   if (validate(name)) {
  //     return showValidation && "_has_error"
  //   } else {
  //     return !validators[name](getValue(name)) && showValidation && "_is_valid"
  //   }
  // }

  return (
    <Layout>
      <h1>
        <span role="img" aria-label="laboratory-man-emoji">
          👨‍🔬{" "}
        </span>
        Fix this form
      </h1>
      {/* 1a. Wrap all inputs in form element */}
      {/* 1b. Add submit handler to form */}
      {/*<form id="signup-form" onSubmit={handleSubmit}>*/}
        <div className="wrapper">
        {/* 2. Wrap each input in a label element (or use htmlFor) */}
        {/*<label className="label--good">*/}
        {/*  <strong>Name</strong>*/}
        <b className="label--bad">Name</b>
        <input
          type="text"
          value={getValue("name")}
          onChange={e => handleChange("name", e)}
          className={classnames("input--good", getClasses("name"))}
        />
        {/*</label>*/}
        {/* 2. Wrap each input in a label element */}
        {/*<label className="label--good">*/}
        {/*  <strong>City</strong>*/}
        <b className="label--bad">City</b>
        <input
          // required
          // id="city__id"
          // aria-describedby="city__error"
          type="text"
          value={getValue("city")}
          onChange={e => handleChange("city", e)}
          // Make sure all fields have outline
          // Make sure all fields have a validation icon
          className={classnames("input--good", getClasses("city"))}
        />
        {/*</label>*/}
        {/* 3. Add id to error. Reference it in aria-describedby on the input */}
        {/*{validate("city") && (*/}
        {/*  <p className="error" id="city__error">*/}
        {/*    A city name should contain at least two A's*/}
        {/*  </p>*/}
        {/*)}*/}
        {validate("city") && <p className="error">Something's wrong</p>}
        {/* 2. Wrap each input in a label element */}
        {/*<label className="label--good">*/}
        {/*  <strong>Email</strong>*/}
        <b className="label--bad">Email</b>
        <input
          // required
          // id="email__id"
          // aria-describedby="email__error"
          type="text"
          // type="email"
          value={getValue("email")}
          placeholder="john.doe@gmail.com"
          onChange={e => handleChange("email", e)}
          className={classnames("input--good", getClasses("email"))}
        />
        {/*</label>*/}
        {validate("email") && (
          <p className="error" id="email__error">
            Email address is not valid
          </p>
        )}
        {/* Inside the form you just need a button */}
        {/*<button>Default submit</button>*/}
      {/*</form>*/}
      </div>
      {/* Outside the form you need type="submit" */}
      <div className="buttons">
        <button onClick={handleSubmit}>
          Submit
        </button>
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
