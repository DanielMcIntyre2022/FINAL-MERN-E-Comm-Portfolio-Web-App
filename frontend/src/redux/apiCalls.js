import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const response = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(response.data))
    } catch (error) {
        console.log('test');
        dispatch(loginFailure())
    }
};

export const logoutUser = async (dispatch) => {
    try {
     dispatch(logout());
    } catch (error) {
        console.log(error);
    }
};


