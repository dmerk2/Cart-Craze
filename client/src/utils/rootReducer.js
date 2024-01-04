import { combineReducers } from "redux";
import productSlice from "./productSlice";

const rootReducer = combineReducers({
  product: productSlice,
});
export default rootReducer;
