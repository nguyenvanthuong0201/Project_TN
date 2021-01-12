import { LOGIN_USER, LOGOUT_USER } from "../constant/cartConstants";

const loginUser = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_USER, user });
};
const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};
export { loginUser, logoutUser };
