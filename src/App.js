import React from "react"
import { Router } from "@reach/router"
import FormBuilder from './pages/formBuilder'

function App() {
  return (
    <Router>
    <FormBuilder path="/" />
    <FormBuilder path="/formBuilder" />
  </Router>
  )
}

export default App
