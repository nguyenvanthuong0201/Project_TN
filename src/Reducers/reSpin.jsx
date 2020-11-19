const initialState = {
  countLoadingContainer: false,
};
function reSpin(state = initialState, action) {
  switch (action.type) {
    case "OPEN_SPIN":
      console.log("OPEN_SPIN :>> ");
      return {
        ...state,
        countLoadingContainer: true,
      };
    case "CLOSE_SPIN":
      console.log("CLOSE_SPIN :>> ");
      return {
        ...state,
        countLoadingContainer: false,
      };
    default:
      return state;
  }
}
export default reSpin;
