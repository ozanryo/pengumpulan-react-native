const initialState={
    loginStat: false,
    user: []
}

export default function authentReducer(state=initialState, action){
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{
                loginStat: true
            }
        case 'LOGIN_FAIL':
            return{
                ...state,
                loginStat:false
            }
    }
}