import {
  CART_LIST_ADD,
  CART_LIST_DELETE,
  CART_LIST_UPDATE,
  CART_LIST_DELETE_ALL_CART,
} from "../constant/cartConstants";

const listCarts = (product, quantity) => async (dispatch) => {
  dispatch({ type: CART_LIST_ADD, product, quantity });
};
const deleteCarts = (keyProduct) => async (dispatch) => {
  dispatch({ type: CART_LIST_DELETE, keyProduct });
};
const deleteALlCarts = () => async (dispatch) => {
  dispatch({ type: CART_LIST_DELETE_ALL_CART });
};
const updateCarts = (key, quantity, size) => async (dispatch) => {
  dispatch({ type: CART_LIST_UPDATE, key, quantity, size });
};
// const addCarts = (product,quantity)
export { listCarts, deleteCarts, updateCarts, deleteALlCarts };
