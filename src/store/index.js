import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import fileReducer from "./fileReducer";
import uploadReducer from "./uploadReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    file: fileReducer,
    upload: uploadReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));