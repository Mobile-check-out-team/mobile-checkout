import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import Instructions from "./Components/Instructions";
import Cart from "./Components/Cart";
import Camera from "./Components/Camera";
import Checkout from "./Components/Checkout";
import ExitPass from "./Components/ExitPass";
import ForgotPassword from "./Components/ForgotPassword";
import YourOrders from "./Components/YourOrders";
import Receipts from "./Components/Receipts";
import PurchaseDetails from './Components/PurchaseDetails'

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/instructions" component={Instructions} />
    <Route path="/cart" component={Cart} />
    <Route path="/camera" component={Camera} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/exitpass" component={ExitPass} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/orders" component={YourOrders} />
    <Route path="/receipt/:invoiceNumber" component={Receipts} />
    <Route path="/purchaseDetails/:invoiceNumber" component={PurchaseDetails} />
  </Switch>
);
