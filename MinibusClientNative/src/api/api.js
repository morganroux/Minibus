import axios from 'axios';
import parser from 'fast-xml-parser';

const minibusApi = axios.create(
{
 baseURL: 'http://localhost:3000'
});
minibusApi.defaults.timeout = 5000;

const michelinApi = axios.create (
{
    baseURL : "https://secure-apir.viamichelin.com"
});
michelinApi.defaults.timeout = 5000;

export const signUp = async (userName, email, password) => {
    try
    {
        const response =  await minibusApi.post('/signup', {userName, email, password});
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
        const response =  await minibusApi.post('/signin', {email, password});
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
        const response =  await minibusApi.post('/signinwithbarcode', {barcode});
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
            const { data:{userName, userId}} = await minibusApi.post('/checkToken', {token});
            return ({
                errorMessage: '',
                userName,
                userId
            });
        }
        catch(err) {
            return ({
                errorMessage: 'Invalide stored token',
                userName: '',
                userId: ''
            });
        }
    }
}

export const addRun = async (token, run, options) => {
    const { userId } = await checkToken(token);
    if (!userId){
        return ({
            errorMessage: 'Token error',
        });
    }
    else {
        try{
            await minibusApi.post('/addRun', {userId, run, options, timestamp: Date.now()});
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

export const getRunList = async(token) => {
    const { userId } = await checkToken(token);
    if (!userId){
        return ({
            errorMessage: 'Token error',
        });
    }
    else {
        try{
            const { data:{runList} } = await minibusApi.get(`/getRunList?userId=${userId}`);
            return ({
                errorMessage: "OK",
                runList
            });
        }
        catch(err) {
            return ({
                errorMessage: err,
                runList: ''
            });
        }
    }
}

export const getAddress =  async (long, lat) => {
    try {
        const response = await michelinApi.get(`/apir/1/rgeocode.xml?center=${long}:${lat}&authkey=RESTGP20191024223238071193335775`);
        //const response = await michelinApi.get('/apir/1/rgeocode.xml?center=6.13:45.9198&authkey=RESTGP20191024223238071193335775');
        const jsonObj = parser.parse(response.data);
        return jsonObj;
    }
    catch(err) {
        console.log(err);
    }
}
export const getMapUrl = async (long, lat, zoom) => {
    try {

        const response = await michelinApi.get(`apir/1/map.xml/${long}:${lat}:${zoom}/800:600/fra?authkey=RESTGP20191024223238071193335775`);
        const {response:{map:{url}}} = parser.parse(response.data);
        return url;
    } catch(err) {
        console.log('erreur : ' + err);
    }
}

export const getRoute =  async ({longitude :longFrom, latitude :latFrom}, {longitude: longTo, latitude :latTo}) => {
    try {
        
        let response = await michelinApi.get(`/apir/1/route.xml/fra?steps=1:e:${longFrom}:${latFrom};1:e:${longTo}:${latTo}&fuelCost=1.3&authkey=RESTGP20191024223238071193335775`);
        // let response = await michelinApi.get('/apir/1/route.xml/fra?steps=1:e:2.0:48.0;1:e:3.0:49.0&authkey=RESTGP20191024223238071193335775&fuelCost=1.3');
        const jsonObj = parser.parse(response.data);
        const {response:{iti:{itineraryTrace : iti_trace, header:{summaries:{summary}}}}} = jsonObj;
        const {totalDist, totalTime, consumption, tollCost:{car: tollCost}, fullMapDef:{id: mapId, size: {h, w}}} = summary;
        response = await michelinApi.get(`/apir/1/mapbyid.xml/${mapId}/${w}:${h}/fra?iti_trace=${iti_trace}&authkey=RESTGP20191024223238071193335775`);
        const {response:{map:{url}}} = parser.parse(response.data);
        return {
            summary,
            iti_trace,
            url
        }
    } catch(err) {
        console.log(err);
        return {
            err
        }
    }
}