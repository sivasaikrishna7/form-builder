import React from 'react'
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements'
import './Navitems.css'

const Navbar = (props) => {
  const { setTab } = props
  return (
    <>
      <Nav>
        <h1 className="title">Form Builder.</h1>
        <Bars />

        <NavMenu>
          <NavLink to="/" activeStyle>
            Templates
          </NavLink>
          <NavLink
            to="/FormBuilder"
            onClick={() => {
              setTab('formBuilder')
            }}
            activeStyle
          >
            Form Builder
          </NavLink>
          <NavLink
            to="/FormBuilder"
            onClick={() => {
              setTab('createdForm')
            }}
            activeStyle
          >
            Form Review
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
