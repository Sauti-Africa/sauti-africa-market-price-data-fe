import React, { useState, useEffect } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import { Auth0Context } from '../contexts'
import axios from 'axios'

// const DEFAULT_REDIRECT_CALLBACK = () =>
//   window.history.replaceState({}, document.title, window.location.pathname)

// Primarily from auth0 SPA quick start: https://auth0.com/docs/quickstart/spa
export const Auth0Provider = ({
  children,
  history,
  onRedirectCallback,
  setUrl,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)
  const [role, setRole] = useState()

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0(auth0FromHook)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      // * CHECK IF USER HAS ALREADY LOGGED IN, RETREIVE USER INFO IF TRUE.
      const validateAuthentication = async () => {
        await auth0FromHook.loginWithRedirect({
          appState: { targetUrl: window.location.pathname }
        })
        const user = await auth0FromHook.getUser()

        setUser(user)
      }
      // * VALIDATE IF USER IS AUTHENTICATED.
      setIsAuthenticated(isAuthenticated)

      if (!isAuthenticated) validateAuthentication()

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()

        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  // Unused currently, but included as an option for the future
  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }

  // * GET AND SET USER ROLE IF AUTHENTICATED
  const getRole = () => axios
    .post(`https://sauti-marketprice-data.herokuapp.com/api/users/`, user)
    .then(res => {
      console.log(`getRole: `, res)
      const user = res.data;

      if(role === undefined || role === null){
        return setRole({ ...user.app_metadata })
      }
      
      // return !!user === true && setRole({ ...user.app_metadata })
    })
    .catch(err => console.log(err))

  if (loading === false && !!user === true && isAuthenticated) getRole()

  // * REDIRECT BASED ON ROLE STATUS
  if (role && !!role.role === false && window.location.pathname !== '/plan') {
    window.location.assign('plan')
  } else if (role === true && window.location.pathname !== '/') {
    window.location.assign('/')
  }

  // Configure auth0 provider
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
