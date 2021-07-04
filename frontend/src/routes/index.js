import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  Home,
  Signin,
  Signup,
  UserDashboard,
  Profile,
  AdminDashboard,
  AddCategory,
  AddProduct,
  Orders,
  ManageProducts,
  UpdateProduct,
  Shop,
  SingleProduct,
  Cart,
} from "../pages";

import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <Route path="/product/:productId" exact component={SingleProduct} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
