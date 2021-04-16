const initialState = {
    loading: false,
    errorModal: false,
}

const globalReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_OR_REMOVE_LOADING": {
            return {
                ...state,
                loading: action.isloading
            }
        }

        case "SET_OR_REMOVE_ERROR_MODAL": {
            return {
                ...state, 
                    errorModal: !state.errorModal,
            };
        }
        
        default: return state 
    }
} 

export default globalReducer