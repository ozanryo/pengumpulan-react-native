const initialState = {
    currentWorker: null,
    currentWorkerKey: "",
    editCondition: false
}

export default function firebaseCurrentData(state=initialState, action){
    switch(action.type){
        case 'GET_FIREBASE_CURRENT_DATA':
            return{
                ...state,
                currentWorker: action.currentWorker,
                currentWorkerKey: action.currentWorkerKey,
                editCondition: true
            }
        case 'DONE_FIREBASE_EDITING':
            return {
                editCondition: false
            }
        default:
            return initialState
    }
}