import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AuthProvider } from './context/authContext'

const httpLink = createHttpLink({
  uri: 'https://fe-case-study.vercel.app/api/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: 'https://fe-case-study.vercel.app/api/graphql',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
)
