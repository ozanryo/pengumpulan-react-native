const initialState={
    imageData:[]
}

export default function ChangePrifleImage(state=initialState, action){
    switch(action.type){
        case 'GET_CAM_DATA':
            return{
                ...state,
                imageData: state.imageData.concat(action.imageData)
            }
        default:
            return initialState;
    }
}