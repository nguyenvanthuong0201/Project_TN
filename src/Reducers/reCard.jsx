import {
  CART_LIST_ADD,
  CART_LIST_DELETE,
  CART_LIST_UPDATE,
} from "../constant/cartConstants";
var data = JSON.parse(localStorage.getItem("CART"));
var initialState = data ? data : [];

function reCard(state = initialState, action) {
  var { product, key, quantity } = action;
  var index = -1;
  switch (action.type) {
    case CART_LIST_ADD:
      index = findProductInCart(state, product);
      if (index !== -1) {
        if (state[index].buy.size === product.buy.size) {
          state[index].buy.amount += Number(product.buy.amount);
          console.log("CART_LIST_ADD IF");

          localStorage.setItem("CART", JSON.stringify(state));
        }
      } else {
        console.log("CART_LIST_ADD ELSE");
        state.push(product);
        localStorage.setItem("CART", JSON.stringify(state));
      }
      return [...state];
    case CART_LIST_DELETE:
      state.splice(action.keyProduct, 1);
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
    case CART_LIST_UPDATE:
      console.log(key, quantity);
      if (state[key].buy.amount < quantity) {
        state[key].buy.amount += 1;
      } else {
        state[key].buy.amount -= 1;
      }
      localStorage.setItem("CART", JSON.stringify(state));
      return [...state];
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
        cart[i].buy.size === product.buy.size
      ) {
        index = i;
        break;
      }
    }
  }
  return index;
};
export default reCard;
