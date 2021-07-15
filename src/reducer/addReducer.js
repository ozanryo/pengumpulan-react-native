const initialState={
    addCondition: false
}

export default function CreateUser(state=initialState, action){
    switch(action.type){
        case 'ADD_BEGIN':
            return{
                editCondition: true
            }
        case 'ADD_CANCEL':
            return{
                editCondition: false
            }
        default:
            return initialState
    }
}