import React from "react"
import Layout from "../components/layout"
import { city } from "../validation/city"

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

  const handleValidation = name =>
    showErrors && !/t{2}/.test(getViewValue(name) || "")

  const getClasses = name => (handleValidation(name) ? "_has_error" : "")

  return (
    <Layout>
      <h1>😈 Bad form</h1>
      <h3>Show errors: {showErrors.toString()}</h3>
      <form>
        <b>City</b>
        <input
          type="text"
          value={getValue("city")}
          onChange={e => handleChange("city", e)}
          className={getClasses("city")}
        />
        {handleValidation("city") && <p className="error">Something's wrong</p>}
        <input
          className="no-outline"
          type="text"
          value={getValue("email")}
          placeholder="Email"
          onChange={e => handleChange("email", e)}
          className={getClasses("email")}
        />
        {handleValidation("email") && (
          <p className="error">Something's wrong</p>
        )}
        <b>Name</b>
        <input
          type="text"
          value={getValue("name")}
          onChange={e => handleChange("name", e)}
          className={getClasses("name")}
        />
        {handleValidation("name") && <p className="error">Something's wrong</p>}
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClear}>Clear</button>
      </form>
      {showResult && (
        <section>
          {Object.entries(viewState).map(([name, value]) => (
            <p>
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
