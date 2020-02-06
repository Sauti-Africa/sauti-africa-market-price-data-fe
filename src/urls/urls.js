const deployEnv = process.env.REACT_APP_DEPLOY_ENV

export const baseURL = 
    deployEnv === "production"
        ? ''
        : ''

export const sautiDevURL = 
    deployEnv === "production"
        ? ''
        : ''

export const sautiClientURL = 
    deployEnv === "production"
        ? ''
        : ''