import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxios = url => {

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: false,
  })

  useEffect(() => {

    const fetchData = async () => {

      try {
        const res = await axios.get(url)

        if ( res.status === 200 ) {
          setState({
            data: res.data,
            loading: false,
            error: false,
          })
        } else {
          throw Error('could not fetch the data for that resource')
        }
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: true,
        })
        throw new Error ('Server Error')
      }
        
    }

    fetchData()
  }, [url])

  return state

}

export default useAxios
