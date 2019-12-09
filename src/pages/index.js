import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <Link to="/good-form/">Good form</Link>
    <Link to="/bad-form/">Bad form</Link>
  </Layout>
)

export default IndexPage
