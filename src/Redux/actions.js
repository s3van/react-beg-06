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
            dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" })
            dispatch({ type: "SET_ERROR_MESSAGE_TODO", error })
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
            dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" })
            dispatch({ type: "SET_ERROR_MESSAGE_TODO", error })
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
            dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" })
            dispatch({ type: "SET_ERROR_MESSAGE_TODO", error })
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
            dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" })
            dispatch({ type: "SET_ERROR_MESSAGE_TODO", error })
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
            dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" })
            dispatch({ type: "SET_ERROR_MESSAGE_TODO", error })
        })
        .finally(() => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////TOGGLETASKSTATUS
export const toggleTaskStatusThunk = (dispatch, task) => {
    const status = task.status === "done" ? "active" : "done"
    fetch(`${API_HOST}/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
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
            dispatch({ type: "SET_ERROR_MESSAGE_TODO", error })
        })
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
            dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" })
            dispatch({ type: "SET_ERROR_MESSAGE_SINGLETASK", error })
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
            dispatch({ type: "SET_OR_REMOVE_EDIT_MODAL" })
            dispatch({ type: "SET_SINGLETASK_DATA", data })
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        })
        .catch((error) => {
            dispatch({ type: "SET_ERROR_MESSAGE_SINGLETASK", error })
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
            dispatch({ type: "SET_ERROR_MESSAGE_SINGLETASK", error })
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
        });
}

///////////////////////////////////////////////////////////////CONTACTDATA
///////////////////////////////////////////////////////////////SUBMITCONTACTDATA
export const handleSubmitContactDataThunk = (dispatch, formData) => {
    for (let key in formData) {
        if (Object.keys(formData[key]).includes("value")) {
            formData[key] = formData[key].value;
        } else {
            delete formData[key];
        }
    }
    if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
    )
        return;
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(`${API_HOST}/form`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
            dispatch({ type: "CLEAR_CONTACTDATA" });
            dispatch({ type: "SET_DATA", data });
        })
        .catch((error) => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
            dispatch({ type: "SET_ERROR_MESSAGE_CONTACTDATA", error });
        });
}

///////////////////////////////////////////////////////////////SEARCH
///////////////////////////////////////////////////////////////SUBMITSEARCH
export const handleSubmitQueryParametersThunk = (dispatch,queryParameters) => {
    let url = "http://localhost:3001/task"
    let query = "?"
    for (let key in queryParameters) {
        const value = queryParameters[key]
        if (value) {
            query += `${key}=${value}&`
        }
    }
    url += query.slice(0, query.length - 1)
    dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: true })
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error;
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
            dispatch({ type: "RESET_STATE" })
            dispatch({ type: "SET_TASKS", data })
        })
        .catch((error) => {
            dispatch({ type: "SET_OR_REMOVE_LOADING", isloading: false })
            dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL", error });
        });
}