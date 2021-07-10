const initialState = {
    currentWorker: null,
    editCondition: false
}

export default function CurrentData(state=initialState, action){
    switch(action.type){
        case 'GET_CURRENT_DATA':
            return{
                ...state,
                currentWorker: action.currentWorker,
                editCondition: true
            }
        case 'DONE_EDITING':
            return {
                editCondition: false
            }
        default:
            return initialState
    }
}