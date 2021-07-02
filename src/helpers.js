// export const setPopperContent = (name) => {};
import store from "./store/index";
import { useSelector } from "react-redux";
console.log("store:", store);

export const getStoreState = store.subscribe(() => {
  const storeState = store.getState();
  console.log("storeState:", storeState.auth);
  return storeState.auth;
});

// export const setPopperContent = (target) => {
//   username: {
//     errors: {
//         validLength:
//     }
//   },
// };
