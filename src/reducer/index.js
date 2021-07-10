import { combineReducers } from "redux";

import exReducer from "./exampleReducer";
import memberReducer from "./examplePayloadReducer";
import workerDataReducer from "./workerDataReducer";
import CurrentData from "./editUserReducer";
import authentReducer from "./authReducer";

const allReducers = combineReducers({
    exampleReducer: exReducer,
    member: memberReducer,
    worker: workerDataReducer,
    current: CurrentData,
    auth: authentReducer
})

export default allReducers;