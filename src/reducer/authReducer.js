const initialState={
    loginStat: false,
    user: null
}

export default function authentReducer(state=initialState, action){
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{
                loginStat: true,
                user: action.user
            }
        case 'LOGOUT':
            return{
                ...state,
                loginStat:false
            }
        default:
            return initialState
    }
}