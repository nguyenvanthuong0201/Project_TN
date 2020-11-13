import {
  CART_LIST_ADD,
  CART_LIST_DELETE,
  CART_LIST_UPDATE,
} from "../constant/cartConstants";

const listCarts = (product, quantity) => async (dispatch) => {
  // console.log("action", product, quantity);
  dispatch({ type: CART_LIST_ADD, product, quantity });
};
const deleteCarts = (keyProduct) => async (dispatch) => {
  dispatch({ type: CART_LIST_DELETE, keyProduct });
};
const updateCarts = (key, quantity, size) => async (dispatch) => {
  // console.log(key, quantity);
  dispatch({ type: CART_LIST_UPDATE, key, quantity, size });
};
// const addCarts = (product,quantity)
export { listCarts, deleteCarts, updateCarts };
