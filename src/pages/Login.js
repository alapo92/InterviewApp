import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useMutation, gql } from '@apollo/client'
import { useForm } from '../utility/formHooks'
import { useNavigate } from 'react-router-dom'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`

const Login = () => {
  const context = useContext(AuthContext)
  let navigate = useNavigate()
  const [errors, setErrors] = useState([])

  const loginCallback = () => {
    console.log('login callback')
    login()
  }

  const { onChange, onSubmit, values } = useForm(loginCallback, {
    email: '',
    password: '',
  })

  const [login, { loading }] = useMutation(LOGIN, {
    update(proxy, { data: { login: AuthenticatedUser } }) {
      console.log('authUser', AuthenticatedUser)
      context.login(AuthenticatedUser)
      navigate('/')
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors)
    },
    variables: { email: values.email, password: values.password },
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={values.email}
          onChange={onChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={values.password}
          onChange={onChange}
        />
        <button type='submit' disabled={loading}>Login</button>
      </form>
        {errors.map((error) => (
            <div key={error.message}>{error.message}</div>
        ))}
    </div>
  )
}


export default Login