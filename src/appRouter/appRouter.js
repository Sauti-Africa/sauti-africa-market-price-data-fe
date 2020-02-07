import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import App from '../components/App'
import { Auth0Provider } from '../hooks/useAuth0';
import history from '../utils/history';



const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    )
}

const AppRouter = () => {


    //based on whether app_metadata.role exists, conditionally set redirect uri to baseUrl/plan or baseUrl/profile 
       
    return (
        <Router history={history} >
            <React.Fragment>
                <Auth0Provider
                    history={history}
                    domain={process.env.REACT_APP_DOMAIN}
                    // client_id={process.env.REACT_APP_CLIENT_ID}
                    client_id="bxosYDeCRsMMIEuRFyte2kxifC5uK9ua"
                    redirect_uri={window.location.origin}
                    onRedirectCallback={onRedirectCallback}
                    audience={process.env.REACT_APP_AUDIENCE}
                    response_type="token id_token"
                >
                    <App />
                </Auth0Provider>
            </React.Fragment>
        </Router>
    )
}

export default AppRouter
