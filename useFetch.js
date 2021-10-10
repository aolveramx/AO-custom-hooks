import { useEffect, useRef, useState } from 'react'

const useFetch = (url) => {

  const isMounted = useRef(true)
  const [state, setState] = useState({
    data: null, 
    loading: true,
    error: null,
  })

  useEffect(() => {

    return () => {
      isMounted.current = false
    }

  }, [])

  useEffect(() => {

    setState({
      data: null, 
      loading: true,
      error: null,
    })

    fetch(url)
      .then(res => res.json())
      .then(data => {

        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data
          })
        } else {
          console.log('set state no se llamó')
        }

      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: 'could not fetch'
        })
      })
      
  }, [url])

  return state

}

export default useFetch
