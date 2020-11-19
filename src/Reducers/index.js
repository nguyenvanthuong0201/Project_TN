import { combineReducers } from "redux";
import reLocale from "./reLocale";
import reDarkMode from "./reDarkMode";
import reCard from "./reCard";
import reLogin from "./reLogin";
import reSpin from "./reSpin";

const appReducers = combineReducers({
  // reLocale,
  // reDarkMode,
  reCard,
  reLogin,
  reSpin,
});
export default appReducers;
