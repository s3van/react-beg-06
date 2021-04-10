import { createStore } from "redux";

const initialState = {
    counter: 0,
    todoState: {
        tasks: [],
        checkedTasks: new Set(),
        isOpenAddTaskModal: false,
        isOpenDeleteTaskModal: false,
        editableTask: null,
    },
    singleTaskState: {
        singleTask: null,
        isEditModal: false,
        isErrorModal: false,
        error: false,
    },
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "plus": {
            return {
                ...state,
                counter: state.counter + 1
            }
        }
        case "minus": {
            return {
                ...state,
                counter: state.counter - 1
            }
        }

        case "SET_OR_REMOVE_LOADING": {
            return {
                ...state,
                loading: action.isloading
            }
        }
        ////////////////////////////////////////////////////////////////////////////////TODO


        case "SET_TASKS": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: action.data
                }
            }
        }

        case "DELETE_ONE_TASK": {
            let tasks = [...state.todoState.tasks]
            tasks = tasks.filter(task => task._id !== action._id)
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: tasks
                }
            }
        }

        case "CHECK_TASKS": {
            let checkedTasks = new Set(state.todoState.checkedTasks);
            if (!checkedTasks.has(action._id)) {
                checkedTasks.add(action._id);
            } else {
                checkedTasks.delete(action._id);
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks: checkedTasks
                }
            }
        }

        case "TOGGLE_OPEN_ADD_TASK_MODAL": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenAddTaskModal: !state.todoState.isOpenAddTaskModal
                }
            }
        }

        case "ADD_TASK": {
            let tasks = [...state.todoState.tasks]
            tasks.push(action.data);
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: tasks,
                    isOpenAddTaskModal: false
                }
            }
        }

        case "TOGGLE_OPEN_DELETE_TASK_MODAL": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenDeleteTaskModal: !state.todoState.isOpenDeleteTaskModal
                }
            }
        }

        case "EDIT_TASK": {
            const { _id } = action.data
            let tasks = [...state.todoState.tasks]
            let idx = tasks.findIndex(task => task._id === _id);
            tasks[idx] = action.data;
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: tasks,
                    editableTask: null
                }
            }
        }

        case "SET_EDIT_TASK": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    editableTask: action.editableTask
                }
            }
        }

        case "DELETE_CHECKED_TASKS": {
            let tasks = [...state.todoState.tasks]
            tasks = tasks.filter(task => !state.todoState.checkedTasks.has(task._id))
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: tasks,
                    checkedTasks: new Set(),
                    isOpenDeleteTaskModal: false,
                }
            }
        }

        case "CHECK_ALL_TASKS": {
            let checkedTasks = new Set(state.todoState.checkedTasks)
            if (state.todoState.tasks.length === state.todoState.checkedTasks.size) {
                checkedTasks.clear();
            } else {
                state.todoState.tasks.forEach(task => checkedTasks.add(task._id));
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks: checkedTasks,
                }
            }
        }
////////////////////////////////////////////////////////////////////////////////SINGLETASK

        case "SET_SINGLETASK_DATA": {
            return {
                ...state,
                singleTaskState: {
                    ...state.singleTaskState,
                    singleTask: action.data,
                }
            };
        }

        case "REMOVE_ERROR_MODAL": {
            return {
                ...state,
                singleTaskState: {
                    ...state.singleTaskState,
                    isErrorModal: !state.singleTaskState.isErrorModal,
                }

            };
        }

        case "SET_ERROR_MODAL": {
            return {
                ...state,
                singleTaskState: {
                    ...state.singleTaskState,
                    isErrorModal: action.error,
                    error: action.error,
                }
            };
        }

        case "SET_EDIT_MODAL": {
            return {
                ...state,
                singleTaskState: {
                    ...state.singleTaskState,
                    isEditModal: !state.singleTaskState.isEditModal,
                }
            };
        }

        default: return state
    }
}


const store = createStore(reducer)

window.store = store;
export default store;