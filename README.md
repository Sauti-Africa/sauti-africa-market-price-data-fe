//Test, push failed
# Sauti Africa Market Price Data & API

You can find the deployed production site at [Sauti Africa Market Data](http://www.sautimarketpricedata.live/).

[Staging deployment](https://jolly-panini-1f3c1c.netlify.com/)

## Contributors

### Labs 17
<strong>Team Lead</strong> - Angela La Salle [Github](https://github.com/alasalle)<br>
Adnan Chowdhury - [Github](https://github.com/AdnanCodes)<br>
Alexis Carr - [Github](https://github.com/alexisjcarr)<br>
Kathryn Roads - [Github](https://github.com/rhokath)<br>
Mariam Farrukh - [Github](https://github.com/mariam-farrukh)<br>
Michael Hart - [Github](https://github.com/worksofhart)<br>
Miguel Peralta - [Github](https://github.com/Miguelperalta723)<br>
Shawn McManus - [Github](https://github.com/ShawnM76)<br>

### Labs 19
<strong>Team Lead</strong> - Kayla Crow [Github](https://github.com/blackmacaroon)<br>
Himmat Gill - [Github](https://github.com/mxxt1)<br>
Bao Pham - [Github](https://github.com/BaoPham92)<br>


## Project Overview

[Labs 17 Trello Board](https://trello.com/b/ytEKzcoL/sauti-africa-market-price-data)<br>
[Labs 19 Trello Board](https://trello.com/b/AxjamWWq/labs-19-sauti-africa-market-prices)

[Product Vision Document](https://www.notion.so/Sauti-Africa-Market-Prices-7bd55c3d12824385bffb467b12487705)<br>
[Product Canvases](https://www.notion.so/e27b7bbc8c3c4df387950ffadb4f9b38?v=9561b9c6a4f74c08bf69e78805ed8040)

Sauti Africa Market Prices & API provides an easy to use interface to view and acquire data from Sauti Africa internal databases, and an API which provides JSON responses for developers to use for any purpose.

### Key Features

- Grid Table - ability for non-developer to acquire data from database and download it as CSV
- Documentation - Extensive resource covering features of API and details on the Grid Table
- API - Provides JSON responses via API Key Authentication with usage limits.

## Tech Stack

- React
- ag-Grid
- Auth0
- SASS
- Semantic UI
- Reactstrap
- Express
- SQL
- Knex

### Front end built using:

#### React

- Responsive & High Performance Single Page Application
- State Management done via React Hooks
- Easy to integrate many other third party such ag-Grid, Auth0, etc

#### ag-Grid

- Easy to integrate with React
- Contains easy to implement CSV feature for downloading data
- Draggable columns
- Framework agnostic

#### Cypress

- Comprehensive testing suite for React apps
- Allows E2E testing with Auth0 [read here](https://auth0.com/blog/end-to-end-testing-with-cypress-and-auth0/)
- Allows to test features through third-party libraries as well

#### Front end deployed to `Netlify`

#### [Back end](https://github.com/Lambda-School-Labs/sauti-africa-market-price-data-be) built using the following Framework & Libraries:

- Node
- Express
- Redis
- Knex
- SQL
- SQLite3
- Postgres
- UUID API key generator
- JWT

# APIs

## Authentication

We use Auth0 for authentication. Auth0 documentation can be found [here](https://auth0.com/docs)

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

- REACT_APP_GOOGLE_TRACKING_ID
- REACT_APP_HOST="localhost:3000"
- REACT_APP_AUDIENCE
- REACT_APP_DOMAIN
- REACT_APP_CLIENT_ID

# Content Licenses

| Image Filename | Source / Creator   | License     |
| -------------- | ------------------ | ----------- |
| All GIFs       | Internal Recording | Free to use |

# Testing

Front-End Testing is done via Cypress.io and Backend Testing is done via supertest

Testing on the front-end requires a `cypress.json` and `cypress.env.json` file with the following information:

`cypress.json`

```json
{
  "baseUrl": "http://localhost:3000",
  "chromeWebSecurity": false,
  "defaultCommandTimeout": 20000
}
```

`cypress.env.json`
(substitute the corresponding values from your auth0 application)

```json

   "auth_audience": "https://my_tenant.auth0.com/api/v2/",
   "auth_url": "https://my_tenant.auth0.com/oauth/token",
   "auth_client_id": "my_client_id",
   "auth_client_secret": "my_client_secret",
   "auth_username": "my_username",
   "auth_password": "my_password"
}
```

Your auth0 application should be configured with _Classic Login_, and _Disable Clickjacking_ should be turned off in _Tenant Settings -> Advanced_. Social login is not supported for testing, only an account registered with email / password.

# Installation Instructions

- Clone this repo
- **yarn** to install all required dependencies
- **yarn start** to start the local app deployment

## Other Scripts

    * format - runs prettier code formatter

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/sauti-africa-market-price-data-be) for details on the backend of our project.

```

```
