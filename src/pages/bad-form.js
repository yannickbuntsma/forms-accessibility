import React from "react"
import classnames from "classnames"
import Layout from "../components/layout"
import validators from "../validation/validators"

const BadForm = () => {
  const [state, setState] = React.useState({})
  const [viewState, setViewState] = React.useState({})
  const [showErrors, setShowErrors] = React.useState(false)

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
    setShowErrors(true)
  }
  const handleClear = e => {
    e.preventDefault()
    setState({})
    setViewState({})
    setShowErrors(false)
  }

  const showResult = Object.entries(viewState).length > 0

  const validate = name =>
    showErrors && validators[name](getViewValue(name) || "")

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
          className={getClasses("name")}
        />
        {validate("name") && <p className="error">Something's wrong</p>}
        <b className="label--bad">City</b>
        <input
          type="text"
          value={getValue("city")}
          onChange={e => handleChange("city", e)}
          className={getClasses("city")}
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
        {validate("email") && <p className="error">Something's wrong</p>}
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
