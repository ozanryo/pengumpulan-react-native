import { combineReducers } from "redux";

import exReducer from "./exampleReducer";
import memberReducer from "./examplePayloadReducer";
import workerDataReducer from "./workerDataReducer";
import CurrentData from "./editUserReducer";
import authentReducer from "./authReducer";
import CreateUser from "./addReducer";
import ChangePrifleImage from "./changeProfileImageReducer";
import firebaseCurrentData from "./editFirebase";

const allReducers = combineReducers({
    exampleReducer: exReducer,
    member: memberReducer,
    worker: workerDataReducer,
    current: CurrentData,
    auth: authentReducer,
    add: CreateUser,
    changeProfileImage: ChangePrifleImage,
    firebaseEditData: firebaseCurrentData
})

export default allReducers;