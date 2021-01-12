import { LOGIN_USER, LOGOUT_USER } from "../constant/cartConstants";
var data = JSON.parse(localStorage.getItem("LOGIN"));
var initialState = data ? data : [];
function reLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      state = action.user;
      localStorage.setItem("LOGIN", JSON.stringify(state));
      return state;
    case LOGOUT_USER:
      state = "";
      return [...state];
    default:
      return state;
  }
}
export default reLogin;
