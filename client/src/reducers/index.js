import { authRegisterReducer, authLoginReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";
import { categoryListReducer, categoryCreateReducer, categoryDeleteReducer } from "./categoryReducer";
import { 
  productCreateReducer, productDeleteReducer,
  productListReducer, productDetailsReducer, 
  filterListReducer
} from "./productReducer";
import { 
  orderCreateReducer, orderDetailsReducer, 
  myOrderListReducer, orderListReducer, 
  orderPayReducer, orderDeleteReducer 
} from "./orderReducer";

export {
  authRegisterReducer,
  authLoginReducer,
  cartReducer,
  categoryListReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
  productCreateReducer,
  productDeleteReducer,
  productListReducer,
  filterListReducer,
  productDetailsReducer,
  orderCreateReducer, 
  orderDetailsReducer, 
  myOrderListReducer, 
  orderListReducer, 
  orderPayReducer, 
  orderDeleteReducer
};

 