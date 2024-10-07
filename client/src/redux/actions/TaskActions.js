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

export const shareTask = (id, task) => async (dispatch) => {
  const userId = JSON.parse(localStorage.getItem("profile")).result._id;

  try {
    const { data } = await api.shareTask(userId, id, task);

    dispatch({ type: types.UPDATE_TASK, payload: data });
  }
  catch (error) { console.log(error.message) }

}
