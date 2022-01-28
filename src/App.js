import React, { useState } from 'react'
import Home from './Pages/Home'
// import Template from './Pages/Template'
import CreatedTemplates from './Pages/CreatedTemplates'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const [tab, setTab] = useState('formBuilder')
  return (
    <>
      <Router>
        <Navbar setTab={setTab} />
        <Routes>
          <Route
            path="/FormBuilder"
            exact
            element={<Home tab={tab} setTab={setTab} />}
          />
          <Route path="/" exact element={<CreatedTemplates />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
