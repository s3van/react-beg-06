const API_HOST = "http://localhost:3001";
///////////////////////////////////////////////////////////////TODO
///////////////////////////////////////////////////////////////SETTASKS
export const setTasksThunk = (dispatch) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/task`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: "SET_TASKS", data })
        })
        .catch((error) => {
            console.log("Todo-componentDidMount Error", error);
        })
        .finally(() => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////DELETEONETASK
export const deleteOneTaskThunk = (dispatch, _id) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/task/${_id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;

            dispatch({ type: "DELETE_ONE_TASK", _id })
        })
        .catch((error) => {
            console.log("Todo-handleDeleteTask Error", error);
        })
        .finally(() => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////ADDTASK
export const addTaskThunk = (dispatch, formData) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/task`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: "ADD_TASK", data })
        })
        .catch((error) => {
            console.log("Todo-handleAddTask Error", error);
        })
        .finally(() => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////EDITTASK
export const editTaskThunk = (dispatch, editableTask) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/task/${editableTask._id}`, {
        method: "PUT",
        body: JSON.stringify(editableTask),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: "EDIT_TASK", data })
        })
        .catch((error) => {
            console.log("Todo-handleEditTask Error", error);
        })
        .finally(() => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////DELETETASKCHECKEDTASKS
export const deleteTaskCheckedTasksThunk = (dispatch, checkedTasks) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/task`, {
        method: "PATCH",
        body: JSON.stringify({ tasks: Array.from(checkedTasks) }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: "DELETE_CHECKED_TASKS" })
        })
        .catch((error) => {
            console.log("Todo-handleDeleteTaskCheckedTasks Error", error);
        })
        .finally(() => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////SINGLETASK
///////////////////////////////////////////////////////////////SETSINGLETASK
export const setSingleTaskDataThunk = (dispatch, id) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/task/${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: "SET_SINGLETASK_DATA", data })
        })
        .catch((error) => {
            dispatch({ type: "REMOVE_ERROR_MODAL" })
            dispatch({ type: "SET_ERROR_MODAL", error })
        })
        .finally(() => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////EDITSINGLETASK
export const editSingleTaskThunk = (dispatch, editableTask) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/task/${editableTask._id}`, {
        method: "PUT",
        body: JSON.stringify(editableTask),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: "SET_EDIT_MODAL" })
            dispatch({ type: "SET_SINGLETASK_DATA", data })
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        })
        .catch((error) => {
            console.log("SingleTask-handleEditSingleTask Error", error);
            dispatch({ type: "SET_ERROR_MODAL", error })
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////DELETESINGLETASK
export const deleteSingleTaskThunk = (dispatch, singleTask, history) => {
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    const { _id } = singleTask;
    fetch(`${API_HOST}/task/${_id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                throw data.error;
            }
            history.push("/");
        })
        .catch((error) => {
            console.log("SingleTask-handleDeleteSingleTask-Error", error);
            dispatch({ type: "SET_ERROR_MODAL", error })
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}