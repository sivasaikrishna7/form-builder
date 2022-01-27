import React from 'react'
import { Nav, NavLink, Bars, NavMenu } from './NavbarElements'

const Navbar = (props) => {
  const { tab, setTab } = props
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink
            to="/"
            onClick={() => {
              setTab('formBuilder')
            }}
            activeStyle
          >
            Form Builder
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              setTab('createdForm')
            }}
            activeStyle
          >
            Created Form
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
