const userId = {
  sub: 'google-oauth2|111661795839592168840'
}

const role = { app_metadata: {
  role: "freeUser"
}}

describe('Request', () => {
  it('Gets user data from the backend', () => {
    cy.request('POST', 'http://localhost:8888/api/users', userId).should(
      response => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      }
    )
  })
})

// this test requires the auth0 sub id (returned after login) to work. The hardcoded id is currently valid, but maybe become invalid in the future.
describe('Request', () => {
  it('Gets user data from the backend', () => {
    cy.request('PUT', `http://localhost:8888/api/users/google-oauth2|111661795839592168840`, role).should(
      response => {
        expect(response.status).to.eq(200)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      }
    )
  })
})
