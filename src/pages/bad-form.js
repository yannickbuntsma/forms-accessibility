import React from "react"
import classnames from "classnames"
import Layout from "../components/layout"
import validators from "../validation/validators"

const BadForm = () => {
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
  const getViewValue = name => viewState[name] || ""

  const handleSubmit = e => {
    e.preventDefault()
    setViewState(state)
    setShowValidation(true)
  }
  const handleClear = e => {
    e.preventDefault()
    setState({})
    setViewState({})
    setShowValidation(false)
  }

  const showResult = Object.entries(viewState).length > 0

  const validate = name =>
    showValidation && validators[name](getViewValue(name) || "")

  const getClasses = name => (validate(name) ? "_has_error" : "")

  return (
    <Layout>
      <h1>
        <span role="img" aria-label="devil-emoji">
          😈{" "}
        </span>
        Bad form
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

export default BadForm
