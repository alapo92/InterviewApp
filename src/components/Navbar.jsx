import { useContext } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #3d3d3d;
  height: 1.5rem;
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`

const NavLink = styled.li`
  margin-right: 1rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Navbar = () => {
  let navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const onLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <NavbarContainer>
      <StyledLink to='/'>
        <h1>Squad Builder</h1>
      </StyledLink>
      <NavLinks>
        {user ? <>
        <button onClick={onLogout}>Logout</button>
        </> : <>
        <NavLink>
          <StyledLink to='/login'>Login</StyledLink>
        </NavLink>
        <NavLink>
          <StyledLink to='/register'>Register</StyledLink>
        </NavLink></>}
      </NavLinks>
    </NavbarContainer>
  )
}

export default Navbar
