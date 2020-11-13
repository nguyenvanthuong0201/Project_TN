import { LOGIN_USER, LOGOUT_USER } from "../constant/cartConstants";

const loginUser = (user) => async (dispatch) => {
  // console.log("action", product, quantity);
  dispatch({ type: LOGIN_USER, user });
};
const logoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};
// const addCarts = (product,quantity)
export { loginUser, logoutUser };
