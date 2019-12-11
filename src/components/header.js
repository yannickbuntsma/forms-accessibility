import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#fe5000`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <br />
      <p>
        <Link style={{ color: "white" }} to="/good-form/">
          <span role="img" aria-label="innocent-emoji">
            😇{" "}
          </span>
          Good form
        </Link>
      </p>
      <p>
        <Link style={{ color: "white" }} to="/bad-form/">
          <span role="img" aria-label="devil-emoji">
            😈{" "}
          </span>
          Bad form
        </Link>
      </p>
      <p>
        <Link style={{ color: "white" }} to="/fix-this-form/">
          <span role="img" aria-label="laboratory-man-emoji">
            👨‍🔬{" "}
          </span>
          Fix this form
        </Link>
      </p>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
