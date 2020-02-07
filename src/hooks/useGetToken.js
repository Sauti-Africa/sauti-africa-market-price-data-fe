import { useState, useEffect } from 'react'
import { useAuth0 } from '../contexts'

// Fetches the access token from auth0 without having to call all this code in each file.
function useGetToken() {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const { getTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const result = await getTokenSilently()
        console.log(`useGetToken `,result)
        setToken(result)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchToken()
    // eslint-disable-next-line
  }, [])

  return [token, loading]
}

export default useGetToken
