const initialState = {
    singleTask: null,
    editModal: false,
    backendError: false,
}

const singletaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SINGLETASK_DATA": {
            return {
                ...state,
                singleTask: action.data,
            };
        }

        case "SET_ERROR_MESSAGE_SINGLETASK": {
            return {
                ...state,
                backendError: action.error,
            };
        }

        case "SET_EDIT_MODAL": {
            return {
                ...state,
                editModal: !state.editModal,
            };
        }

        case "RESET_SINGLETASK": {
            return {
                ...state,
                singleTask: null,
            };
        }

        default: return state
    }
}

export default singletaskReducer