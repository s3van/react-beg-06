const initialState = {
    search: "",
    sort: null,
    status: null,
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DROPDOWN_VARIANT": {
            const { dropDown, value } = action
            return {
                ...state,
                [dropDown]: value
            }
        }

        case "CHANGE_SEARCH_VALUE": {
            const { target } = action
            return {
                ...state,
                [target.name]: target.value
            }
        }

        case "SET_DATE": {
            const { name, value } = action
            return {
                ...state,
                [name]: value
            }
        }

        case "RESET_DATE": {
            return {
                ...state,
                create_lte: null,
                create_gte: null,
                complete_lte: null,
                complete_gte: null,
            }
        }

        case "RESET_STATE": {
            return {
                ...initialState,
            }
        }
        default: return state
    }
}

export default searchReducer