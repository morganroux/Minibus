
export const updateToken = (token) => {
    return ({
        type: 'UPDATE_TOKEN',
        token
    });
}

export const updateUserName = (userName) => {
    return ({
        type: 'UPDATE_USERNAME',
        userName
    });
}

export const deleteToken = () => {
    return ({
        type: 'DELETE_TOKEN'
    });
}

export const setRunList = (runList) => {
    return ({
        type: 'SET_RUNLIST',
        runList
    });
}