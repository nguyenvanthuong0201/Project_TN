import { combineReducers } from "redux";
import reLocale from "./reLocale";
import reDarkMode from "./reDarkMode";
import reCard from "./reCard";
const appReducers = combineReducers({
  reLocale,
  reDarkMode,
  reCard,
});
export default appReducers;
