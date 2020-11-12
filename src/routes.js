import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import Instructions from "./Components/Instructions";
import Cart from "./Components/Cart";
import Camera from "./Components/Camera";
import Checkout from "./Components/Checkout";
import ExitPass from "./Components/ExitPass";
import Success from "./Components/stripeComponents/success/success.pages";
import Cancel from "./Components/stripeComponents/cancel/cancelled.pages";
import ForgotPassword from "./Components/ForgotPassword";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/instructions" component={Instructions} />
    <Route path="/cart" component={Cart} />
    <Route path="/camera" component={Camera} />
    <Route exact path="/checkout" component={Checkout} />
    <Route path="/exitpass" component={ExitPass} />
    <Route path="/forgotPassword" component={ForgotPassword} />
    <Route path="/checkout/success" component={Success} />
    <Route path="/checkout/cancel" component={Cancel} />
  </Switch>
);
