
const initialState = {
    token: '',
    userName: '',
    runList: [],
}

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