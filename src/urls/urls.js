const deployEnv = process.env.REACT_APP_ENV

export const baseURL = 
    deployEnv === "production"
        ? 'https://sauti-marketprice-data.herokuapp.com'
        : 'https://sauti-marketprice-data.herokuapp.com'

export const sautiDevURL = 
    deployEnv === "production"
        ? 'https://sauti-marketprice-data.herokuapp.com/sauti/developer'
        : 'https://sauti-marketprice-data.herokuapp.com/sauti/developer'

export const sautiClientURL = 
    deployEnv === "production"
        ? 'https://sauti-marketprice-data.herokuapp.com/sauti/client'
        : 'https://sauti-marketprice-data.herokuapp.com/sauti/client'

export const apiUserURL =
    deployEnv === "production"
        ? 'https://sauti-marketprice-data.herokuapp.com/api/users'
        : 'https://sauti-marketprice-data.herokuapp.com/api/users'