import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from "./reducers/todoReducer"
import singletaskReducer from "./reducers/singletaskReducer"
import contactdataReducer from "./reducers/contactdataReducer"
import globalReducer from "./reducers/globalReducer"
import mainmodalReducer from "./reducers/mainmodalReducer"
import searchReducer from "./reducers/searchReducer"

const reducer = combineReducers({
    todoState: todoReducer,
    globalState: globalReducer,
    singletaskState: singletaskReducer,
    contactdataState: contactdataReducer,
    mainmodalState: mainmodalReducer,
    searchState: searchReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

window.store = store;
export default store;