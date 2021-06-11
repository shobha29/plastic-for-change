import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  Home,
  Signin,
  Signup,
  UserDashboard,
  AdminDashboard,
  AddCategory,
  AddProduct,
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
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={SingleProduct} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
