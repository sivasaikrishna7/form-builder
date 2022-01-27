import React, { useState } from 'react'
import Home from './Pages/Home'
// import Template from './Pages/Template'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const [tab, setTab] = useState('formBuilder')
  return (
    <>
      <Router>
        <Navbar tab={tab} setTab={setTab} />
        <Routes>
          <Route path="/" exact element={<Home tab={tab} setTab={setTab} />} />
          {/* <Route path="/form" exact element={<Template />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
