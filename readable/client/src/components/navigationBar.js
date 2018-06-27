import React from 'react'
import {Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><strong>MAIN PAGE</strong></Link>
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  )
}
