import {
    fieldValidator,
    maxLengthValidator,
    minLengthValidator,
    emailValidator,
} from "../../Utlis/Validators/fieldValidator"

const maxlength30 = maxLengthValidator(200);
const minlength30 = minLengthValidator(2);

const initialState = {
    name: {
        valid: false,
        error: null,
        value: "",
    },
    email: {
        valid: false,
        error: null,
        value: "",
    },
    message: {
        valid: false,
        error: null,
        value: "",
    },
    contactModal: false,
    backendError: false,
    database: false,
}

const contactdataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_CONTACTDATA": {
            const { name, value } = action.target;
            let valid = true;
            let error =
                fieldValidator(value) ||
                maxlength30(value) ||
                minlength30(value) ||
                (name === "email" && emailValidator(value));
            if (error) {
                valid = false;
            }
            return {
                ...state,
                [name]: {
                    valid: valid,
                    error: error,
                    value: value,
                },
            };
        }

        case "CLEAR_CONTACTDATA": {
            return {
                ...state,
                name: {
                    value: "",
                },
                email: {
                    value: "",
                },
                message: {
                    value: "",
                },
            };
        }

        case "SET_DATA": {
            return {
                ...state,
                contactModal: action.data,
                database: action.data,
            }
        }

        case "SET_ERROR_MESSAGE_CONTACTDATA": {
            return {
                ...state,
                contactModal: action.error,
                backendError: action.error,
            };
        }

        case "SET_OR_REMOVE_CONTACTDATA_MODAL": {
            return {
                ...state,
                contactModal: !state.contactModal,
            };
        }

        case "CHANGE_MAINMODAL": {
            const { name, value } = action.target;
            return {
                ...state,
                [name]: {
                    value: value,
                },
            };
        }

        case "SET_DATE": {
            return {
                ...state,
                date: action.date
            };
        }
        default: return state
    }
}

export default contactdataReducer
