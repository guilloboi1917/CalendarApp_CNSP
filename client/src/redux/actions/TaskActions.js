import * as api from "../../api";
import * as types from "../types/TaskActionTypes";

export const getTasks = (user) => async (dispatch) => {
  const id = user.result._id;

  try {
    const { data } = await api.fetchTasks();
    const filterData = data.filter(d => d.creator === id);
    dispatch({ type: types.FETCH_TASK, payload: filterData });

  } catch (error) {
    console.log(error);
  }
}

export const createTask = (task) => async (dispatch) => {
  try {
    const { data } = await api.createTask(task);
    dispatch({ type: types.CREATE_TASK, payload: data })

  } catch (error) {
    console.log(error);
  }
}

export const shareTask = (task) => async (dispatch) => {
  try {
    const { data } = await api.shareTask(task);
    dispatch({ type: types.SHARE_TASK, payload: data })
  }
  catch (error) {
    console.log(error);
  }
}

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(id, task);

    dispatch({ type: types.UPDATE_TASK, payload: data });

  } catch (error) {
    console.log(error.message);
  }
}

export const deleteTask = (id) => async (dispatch) => {
  try {
    await await api.deleteTask(id);
    dispatch({ type: types.DELETE_TASK, payload: id });

  } catch (error) {
    console.log(error.message);
  }
}