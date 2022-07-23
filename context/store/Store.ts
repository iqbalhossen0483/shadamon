// import {
//   CartReturnType,
//   FirebaseReturn,
//   StatesReturnType,
// } from "../contex-type";
// import Cart from "../services/Cart";
// import Firebase from "../services/Firebase";
import { AuthReturnType, StatesReturnType } from "../contex-type";
import Auth from "../services/Auth";
import States from "../services/States";

export interface StoreReturnType {
  State: StatesReturnType;
  // Carts: CartReturnType;
  auth: AuthReturnType;
}

function Store(): StoreReturnType {
  const State = States();
  // const Carts = Cart();
  const auth = Auth();
  return {
    State,
    // Carts,
    auth,
  };
}

export default Store;
