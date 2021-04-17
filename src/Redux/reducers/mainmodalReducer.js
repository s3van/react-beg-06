const initialState = {
    title: "",
    description: "",
    date: new Date(),
}

const mainmodalReducer = (state = initialState, action) => {
    switch (action.type) {

        case "CHANGE": {
            const { value, name } = action.target
            return {
                ...state,
                [name]: value
            }
        }
        case "START_DATE": {
            return {
                ...state,
                date: action.date
            }
        }

        case "START_EDIT": {
            const { editableTask } = action
            if (editableTask) {
                editableTask.date = new Date(editableTask.date)
                return {
                    ...editableTask
                }
            }

        }

        case "RESET_MAINMODAL": {
            return {
                ...state,
                title: "",
                description: "",
                date: new Date()
            };
        }

        default: return state
    }
}

export default mainmodalReducer