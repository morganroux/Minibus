
const initialState = {
    token: '',
    userName: '',
    runList: [],
}

/* runList = [
    {
        "id": 1,
        "timestamp": "2019-11-02T20:46:16.755Z",
        "userid": 12,
        "child": "andy",
        "type": "tests",
        "run": {
            locations:{
                locationFrom:{
                    latitude: 48.850126,
                    longitude: 2.2289729
                },
                locationTo:{
                    latitude: 48.850126,
                    longitude: 2.2289729
                }
            }
            route: {},
        }
    },
] 
*/

export default authReducer =  (state = initialState, action) => {
    let nextState
    switch (action.type) {
    
    case 'UPDATE_TOKEN':
        nextState = {
            ...state,
                token: action.token,
            }
        return nextState || state;

    case 'UPDATE_USERNAME':
        nextState = {
            ...state,
                userName: action.userName,
            }
        return nextState || state;

    case 'DELETE_TOKEN' :
        nextState = {
            ...state,
                token: '',
            }
        return nextState || state;

    case 'SET_RUNLIST' :
        nextState = {
            ...state,
            runList: action.runList
        }
        return nextState || state;

    default:
      return state
    }
};