let initialState = {
  theme: "dark",
  current: "2",
};
let reDarkMode = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_DARK_MODE":
      console.log("Change Dark_mode", action);
      const mode = action.payload.theme;
      return {
        ...state,
        theme: mode,
      };
      return state;
    default:
      return state;
  }
};
export default reDarkMode;
