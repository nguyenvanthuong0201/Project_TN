import { LOGIN_USER, LOGOUT_USER } from "../constant/cartConstants";
var initialState = [];
function reLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("action", action);
      state = action.user;
      console.log("state", state);
      return state;
    case LOGOUT_USER:
      state = "";
      return [...state];
    default:
      return state;
  }
}
export default reLogin;
