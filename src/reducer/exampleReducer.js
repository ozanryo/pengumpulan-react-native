const initialState={
    number: 0
}

export default function exReducer(state=initialState, action){
    switch(action.type){
        case 'INCREASE':
            return{
                ...state,
                number: state.number+1
            }
        case 'DECREASE':
            return{
                ...state,
                number: state.number-1
            }
        default:
            return initialState
    }
}