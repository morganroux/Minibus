import axios from 'axios';

export const trackerApi = axios.create(
{
 baseURL: 'http://127.0.0.1:3000'
});

export const signUp = async (userName, email, password) => {
    try
    {
        const response =  await trackerApi.post('/signup', {userName, email, password});
        return ({
            token: response.data.token,
            errorMessage: ''
        });
    } catch(err)
    {
        console.log(err)
        return ({
            token: '',
            errorMessage: 'Error while signing up'
        });
    }
}

export const signIn = async (email, password) => {
    try
    {
        const response =  await trackerApi.post('/signin', {email, password});
        return ({
            token: response.data.token,
            userName: response.data.username,
            errorMessage: ''
        });
    } catch(err)
    {
        console.log(err)
        return ({
            token: '',
            errorMessage: 'Error while signing in'
        });
    }
}

export const signInWithBarCode = async (barcode) => {
    try
    {
        const response =  await trackerApi.post('/signinwithbarcode', {barcode});
        return ({
            token: response.data.token,
            userName: response.data.userName,
            errorMessage: ''
        });
    } catch(err)
    {
        return ({
            token: '',
            errorMessage: 'Error while signing up'
        });
    }
}

export const checkToken = async (token) => {
    if (!token) {
        return ({
            errorMessage: 'No Token',
            userName: ''
        });
    }
    else {
        try{
            const { userName, userId } = await trackerApi.post('/checkToken', {token});
            return ({
                errorMessage: '',
                userName,
                userId
            });
        }
        catch(err) {
            return ({
                errorMessage: 'Invalide stored token',
                userName: ''
            });
        }
    }
}

export const addRun = async (token, run, options) => {
    const { userId } = checkToken(token);
    if (!userId){
        return ({
            errorMessage: 'Token error',
        });
    }
    else {
        try{
            await trackerApi.post('/addRun', {userId, run, options});
            return ({
                errorMessage: 'OK'
            });
        }
        catch(err) {
            return ({
                errorMessage: err,
                userName: ''
            });
        }
    }
}