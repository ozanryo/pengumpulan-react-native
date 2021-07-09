import { combineReducers } from "redux";

import exReducer from "./exampleReducer";
import memberReducer from "./examplePayloadReducer";
import workerDataReducer from "./workerDataReducer";

const allReducers = combineReducers({
    exampleReducer: exReducer,
    member: memberReducer,
    worker: workerDataReducer,
})

export default allReducers;