import * as api from "../../api";
import * as types from "../types/UserActionTypes";

export const updateUser = (updatedUserData) => async (dispatch) => {
    // always pass userId
    const userId = JSON.parse(localStorage.getItem("profile")).result._id;

    try {
        const { data } = await api.updateUser(userId, updatedUserData);

        dispatch({ type: types.UPDATE_USER, payload: data })
    }
    catch (error) {
        console.log(error.message);

    }
}