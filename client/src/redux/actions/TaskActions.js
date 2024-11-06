import * as api from "../../api";
import * as types from "../types/TaskActionTypes";

export const getTasks = () => async (dispatch) => {
  // always pass userId
  const userId = JSON.parse(localStorage.getItem("profile")).result._id;

  try {
    const { data } = await api.fetchTasks(userId);
    // const filterData = data.filter(d => d.creator === id);
    dispatch({ type: types.FETCH_TASK, payload: data });

  } catch (error) {
    console.log(error);
  }
}

export const createTask = (task) => async (dispatch) => {
  // always pass userId
  const userId = JSON.parse(localStorage.getItem("profile")).result._id;

  try {
    const { data } = await api.createTask(userId, task);
    dispatch({ type: types.CREATE_TASK, payload: data })

  } catch (error) {
    console.log(error);
  }
}

export const updateTask = (id, task) => async (dispatch) => {
  // always pass userId
  const userId = JSON.parse(localStorage.getItem("profile")).result._id;

  try {
    const { data } = await api.updateTask(userId, id, task);

    dispatch({ type: types.UPDATE_TASK, payload: data });

  } catch (error) {
    console.log(error.message);
  }
}

export const deleteTask = (id) => async (dispatch) => {
  // always pass userId
  const userId = JSON.parse(localStorage.getItem("profile")).result._id;

  try {
    await api.deleteTask(userId, id);
    dispatch({ type: types.DELETE_TASK, payload: id });

  } catch (error) {
    console.log(error.message);
  }
}

//New shareTask to throw error back to handleShare
export const shareTask = (id, email) => async (dispatch) => {

  const userId = JSON.parse(localStorage.getItem("profile")).result._id;

  try {
    const { data } = await api.shareTask(userId, id, email);

    console.log(data)

    dispatch({ type: types.UPDATE_TASK, payload: data });
  }
  catch (error) {
    console.error("Error in shareTask:", error);
    // Manually throw the error to be caught by handleShare
    // Attach the response status if available, otherwise throw a generic error
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data.message || "Unknown error occurred"
      };
    } else {
      throw new Error ("Failed to share task due to an unexpected error");
    }
  }
};

export const unshareTask = (id, email) => async (dispatch) => {

  const userId = JSON.parse(localStorage.getItem("profile")).result._id;

  try {
    const { data } = await api.unshareTask(userId, id, email);

    console.log(data)

    dispatch({ type: types.UPDATE_TASK, payload: data });
  }
  catch (error) { console.log(error.message) }

}
