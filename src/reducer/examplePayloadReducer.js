const initialState = {
    member: []
}

export default function memberReducer(state=initialState, action){
    switch(action.type){
        case 'ADD_SAMPLE_MEMBER':
            return{
                ...state,
                member: state.member.concat(action.member),
                // member: action.member
            }
        default:
            return initialState
    }
}