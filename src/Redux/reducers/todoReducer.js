const initialState = {
    tasks: [],
    checkedTasks: new Set(),
    isOpenAddTaskModal: false,
    isOpenDeleteTaskModal: false,
    backendError: false,
    editableTask: null,
    oneCheckedTask: null,
}

const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_TASKS": {
            return {
                ...state,
                tasks: action.data
            }
        }

        case "SET_ERROR_MESSAGE_TODO": {
            return {
                ...state,
                errorModal: action.error,
                backendError: action.error,
            };
        }

        case "ADD_TASK": {
            let tasks = [...state.tasks]
            tasks.push(action.data);
            return {
                ...state,
                tasks: tasks,
                isOpenAddTaskModal: false
            }
        }

        case "DELETE_ONE_TASK": {
            let tasks = [...state.tasks]
            tasks = tasks.filter(task => task._id !== action._id)
            return {
                ...state,
                tasks: tasks
            }
        }

        case "EDIT_TASK": {
            const { _id } = action.data
            let tasks = [...state.tasks]
            let idx = tasks.findIndex(task => task._id === _id);
            tasks[idx] = action.data;
            return {
                ...state,
                tasks: tasks,
                editableTask: null
            }
        }

        case "DELETE_CHECKED_TASKS": {
            let tasks = [...state.tasks]
            tasks = tasks.filter(task => !state.checkedTasks.has(task._id))
            return {
                ...state,
                tasks: tasks,
                checkedTasks: new Set(),
                isOpenDeleteTaskModal: false,
            }
        }

        case "CHECK_TASKS": {
            let checkedTasks = new Set(state.checkedTasks);
            if (!checkedTasks.has(action._id)) {
                checkedTasks.add(action._id);
            } else {
                checkedTasks.delete(action._id);
            }
            return {
                ...state,
                checkedTasks: checkedTasks,
            }
        }

        case "TOGGLE_OPEN_ADD_TASK_MODAL": {
            return {
                ...state,
                isOpenAddTaskModal: !state.isOpenAddTaskModal
            }
        }

        case "TOGGLE_OPEN_DELETE_TASK_MODAL": {
            const { tasks, checkedTasks } = state
            let oneCheckedTask = null
            if (checkedTasks.size === 1) {
                oneCheckedTask = tasks.find(task => task._id === Array.from(checkedTasks)[0]);
            }
            return {
                ...state,
                oneCheckedTask: oneCheckedTask,
                isOpenDeleteTaskModal: !state.isOpenDeleteTaskModal,
            }
        }

        case "SET_EDIT_TASK": {
            return {
                ...state,
                editableTask: action.editableTask
            }
        }

        case "CHECK_ALL_TASKS": {
            let checkedTasks = new Set(state.checkedTasks)
            if (state.tasks.length === state.checkedTasks.size) {
                checkedTasks.clear();
            } else {
                state.tasks.forEach(task => checkedTasks.add(task._id));
            }
            return {
                ...state,
                checkedTasks: checkedTasks,
            }
        }

        case "RESET_TASK": {
            return {
                ...state,
                tasks: [],
            };
        }

        default: return state
    }
}


export default todoReducer