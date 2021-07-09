const initialState = {
    data: null,
}

export default function workerDataReducer(state=initialState, action){
    switch(action.type){
        case 'GET_LIST_WORKER':
            return{
                ...state,
                data: action.data
            }
        default:
            return initialState;
    }
}