import locale from "antd/lib/date-picker/locale/en_US";
let initialState = { locale };
let reLocale = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LOCALE":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
export default reLocale;
