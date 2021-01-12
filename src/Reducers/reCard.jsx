import {
  CART_LIST_ADD,
  CART_LIST_DELETE,
  CART_LIST_UPDATE,
  CART_LIST_DELETE_ALL_CART,
} from "../constant/cartConstants";
var data = JSON.parse(localStorage.getItem("CART"));
var initialState = data ? data : [];

function reCard(state = initialState, action) {
  var { product, key, quantity } = action;
  var index = -1;
  switch (action.type) {
    // Thêm sản phẩm vào giỏ hàng
    case CART_LIST_ADD:
      index = findProductInCart(state, product);
      if (index !== -1) {
        if (state[index].buyCart.size === product.buyCart.size) {
          state[index].buyCart.amount += Number(product.buyCart.amount);

          localStorage.setItem("CART", JSON.stringify(state));
        }
      } else {
        state.push(product);
        localStorage.setItem("CART", JSON.stringify(state));
      }
      return [...state];
    // Delete sản phẩm khỏi giỏ hàng
    case CART_LIST_DELETE:
      state.splice(action.keyProduct, 1);
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    // Update khi mua sản phẩm
    case CART_LIST_UPDATE:
      if (state[key].buyCart.amount < quantity) {
        state[key].buyCart.amount += 1;
      } else {
        state[key].buyCart.amount -= 1;
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    // Delete tất cả các sản phẩm trong giỏ hàng
    case CART_LIST_DELETE_ALL_CART:
      localStorage.removeItem("CART");
      return (state = []);

    default:
      return state;
  }
}
var findProductInCart = (cart, product) => {
  var index = -1;
  if (cart.length > 0) {
    for (var i = 0; i < cart.length; i++) {
      if (
        cart[i].key === product.key &&
        cart[i].buyCart.size === product.buyCart.size
      ) {
        index = i;
        break;
      }
    }
  }
  return index;
};
export default reCard;
