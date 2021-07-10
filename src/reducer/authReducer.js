const initialState={
    loginStat: false,
    user: []
}

export default function authentReducer(state=initialState, action){
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                loginStat: true
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