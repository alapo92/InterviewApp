import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useMutation, gql } from '@apollo/client'
import { useForm } from '../utility/formHooks'
import { useNavigate } from 'react-router-dom'

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
        user {
            id
            email
        }
        token
    }
  }
`

const Signup = () => {
  const context = useContext(AuthContext)
  let navigate = useNavigate()
  const [errors, setErrors] = useState([])

  const signupCallback = () => {
    signup()
  }

    const { onChange, onSubmit, values } = useForm(signupCallback,{
        email: '',
        password: '',
    })



  const [signup, { loading }] = useMutation(SIGNUP, {
    update(proxy, { data: { signup: AuthenticatedUser } }) {
      context.login(AuthenticatedUser)
      navigate('/')
    },
    onError({graphQLErrors}) {
      setErrors(graphQLErrors)
    },
    variables: { email: values.email, password: values.password },
  })



  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
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
        <button type='submit' disabled={loading}>
          Signup
        </button>
      </form>
      {errors.map((error) => (
            <div key={error.message}>{error.message}</div>
        ))}
    </div>
  )
}


export default Signup