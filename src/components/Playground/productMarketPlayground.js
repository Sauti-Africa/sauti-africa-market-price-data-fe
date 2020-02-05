import React, { useState } from 'react'
import axios from 'axios'
import Highlight from 'react-highlight'
import { Button, Input, Label } from 'semantic-ui-react'
import 'highlight.js/styles/monokai-sublime.css'

export default function PmPlayground() {
  const [userAnswer, setUserAnswer] = useState({
    url: 'product=yellow%20beans&market=lira'
  })
  const [data, setData] = useState([])
  const [bad, setBad] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const handleChange = e => {
    e.preventDefault()
    setUserAnswer({ ...userAnswer, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e, value) => {
    e.preventDefault()
    makeCall(value)
    setDisabledBtn(true)
    setTimeout(() => setDisabledBtn(false), 10000)
  }
  const clearUrl = e => {
    e.preventDefault()
    setUserAnswer({ url: '' })
  }
  function makeCall(value) {
    axios
      .get(`/sauti/client/playground/latest?${value}`, {
        baseURL:
          process.env.NODE_ENV !== 'development'
            ? 'https://sauti-marketprice-data.herokuapp.com/'
            : 'https://sauti-marketprice-data.herokuapp.com/'
      })
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        setBad(true)
        if (error.message === 'Network Error') {
          setErrorMessage(error.message)
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message)
        }
      })
  }

  return (
    <div className="playground">
      <form className="playForm">
        <Label as="a" basic color="violet">
          sauti/developer/product/pricebymarket/?
        </Label>
        <Input
          className="playURL"
          name="url"
          type="text"
          value={userAnswer.url}
          onChange={handleChange}
        />
        <Button onClick={e => clearUrl(e)}>Clear URL</Button>
      </form>
      <div>
        <Button
          className="playBtn"
          disabled={disabledBtn}
          onClick={e => handleSubmit(e, userAnswer.url)}
        >
          make your call!
        </Button>
      </div>
      {data[0] && !bad ? (
        data.map(entry => {
          return (
            <>
              <Highlight className="JSON">
                {JSON.stringify(entry, null, 2)}
              </Highlight>
            </>
          )
        })
      ) : (
        <Highlight>{errorMessage}</Highlight>
      )}
    </div>
  )
}
