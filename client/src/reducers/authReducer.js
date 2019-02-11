export default authReducer = (state = {
    login : false
}, action) => {
    switch(action.type) {
        case 'LOGIN':
            state = {
                ...state,
                login : action.playload
            }
            break;
    }
    return state
}