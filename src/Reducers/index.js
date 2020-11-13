import { combineReducers } from "redux";
import reLocale from "./reLocale";
import reDarkMode from "./reDarkMode";
import reCard from "./reCard";
import reLogin from "./reLogin";

const appReducers = combineReducers({
  // reLocale,
  // reDarkMode,
  reCard,
  reLogin,
});
export default appReducers;
