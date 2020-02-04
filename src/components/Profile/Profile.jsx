import React, { useState } from 'react'
import axios from 'axios'
import { Button, Container, Row, Col } from 'reactstrap'

import { Header, Card, Image, Message, Icon } from 'semantic-ui-react'

import Loading from '../Loading/Loading'
import { useAuth0 } from '../../contexts'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Highlight from 'react-highlight'
import 'highlight.js/styles/monokai-sublime.css'

const Profile = ({ apiKey, setApiKey }) => {
  const { loading, user, getTokenSilently } = useAuth0()
  const [keyLoading, setKeyLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const AlertMessage = () => (
    <Message icon>
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>Just one second</Message.Header>
        We are fetching that API for you.
      </Message.Content>
    </Message>
  )
    
  const getApiKey = async () => {
    try {
      setKeyLoading(true)
      const token = await getTokenSilently()

      const { sub } = user
      
      const response = await axios.post(
        '/api/apikeyRoute/private',
        {
          id: sub
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          baseURL: 'https://sauti-marketprice-data.herokuapp.com/'
        }
      )
      setApiKey(response.data.key)
      setKeyLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading || !user) {
    return <Loading />
  }

  return (
    <Container className="mb-5" style={{ paddingTop: '20px' }}>
      <Header as="h2" icon textAlign="center">
        <Icon name="users" circular />
        <Header.Content>{`Welcome,  ${
          user.given_name ? user.given_name : 'user'
        }!`}</Header.Content>
      </Header>
      <Row className="align-items-center profile-header mb-5 text-center text-md-center">
        <Card>
          <Image src={user.picture} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <span></span>
            <Card.Meta>
              <span className="date">
                <Icon name="mail" />
                {user.email}
              </span>
            </Card.Meta>
          </Card.Content>
        </Card>
        <Col md>
          <h1>API Key</h1>
          {!apiKey ? (
            <Message negative size="massive">
              <Message.Header>
                Your API key will only be visible for your current session.
              </Message.Header>
              If you are a new user or need a replacement, please request one
              and then save it somewhere safe.
            </Message>
          ) : null}
          {apiKey ? (
            <Message negative size="massive">
              <Message.Header>Here is your API key.</Message.Header>
              It will only be visible for your current session. Please save it
              somewhere safe.
            </Message>
          ) : null}
          {keyLoading ? AlertMessage() : null}
          {apiKey ? (
            <>
              <Highlight className="HTML">{apiKey}</Highlight>
              {!copied ? (
                <CopyToClipboard text={apiKey} onCopy={() => setCopied(true)}>
                  <Button>Copy to Clipboard</Button>
                </CopyToClipboard>
              ) : (
                <Message success>Copied!</Message>
              )}
            </>
          ) : null}
          {!apiKey && !keyLoading ? (
            <Button
              className="btn btn-danger float-middle"
              size="lg"
              color="tomato"
              onClick={getApiKey}
            >
              Get API Key
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row>
        {/* <Highlight className='JSON'>{JSON.stringify(user, null, 2)}</Highlight> */}
      </Row>
    </Container>
  )
}

export default Profile
