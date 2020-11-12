import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getCart,
  updateCart,
  clearCart,
  updateTotalPrice,
} from "../Redux/cartReducer";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../Style/Cart.scss";
import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HdVx7GwZEaH5JVh0j5mSh6bwTYCmFN50iYTpTTtqZLjRYLyi0i9M5ZRmOcMXNU2TGN6XhZAS5YMBsUBZs6ZmIkO00KEZ8tkIo"
);

const qtyOptions = [
  {
    key: 1,
    text: 1,
    value: 1,
  },
  {
    key: 2,
    text: 2,
    value: 2,
  },
  {
    key: 3,
    text: 3,
    value: 3,
  },
  {
    key: 4,
    text: 4,
    value: 4,
  },
  {
    key: 5,
    text: 5,
    value: 5,
  },
  {
    key: 6,
    text: 6,
    value: 6,
  },
  {
    key: 7,
    text: 7,
    value: 7,
  },
  {
    key: 8,
    text: 8,
    value: 8,
  },
  {
    key: 9,
    text: 9,
    value: 9,
  },
  {
    key: 10,
    text: 10,
    value: 10,
  },
];

const checkout = async (props) => {
  const stripe = await stripePromise;
  axios
    .post("/createSession", { price: props.cartReducer.totalPrice })
    .then((res) => {
      const id = res.data.id;
      return stripe.redirectToCheckout({ sessionId: id });
    })
    .then((res) => {
      if (res.error) {
        alert(res.error.message);
      }
    })
    .catch((err) => {
      console.error("error", err);
    });
};
//////////////////////////////////////////////////

function Cart(props) {
  const [cart, setCart] = useState([]);

  let totalPrice = props.cartReducer.cart.reduce((acc, el) => {
    const sum = el.price * el.qty;
    return acc + sum;
  }, 0);

  const cartLoader = axios
    .get("/api/getCart")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  useEffect(() => {
    setCart(props.cartReducer.cart);
    axios.post("/api/saveCart", { cart: props.cartReducer.cart });
  }, []);

  useEffect(() => {
    props.updateTotalPrice(totalPrice);
  }, [totalPrice]);

  return (
    <div className="cart">
      <section className="cart-header">
        <p className="cart-exit">Exit</p>
        <p className="cart-title">Scan and Go Cart</p>
        <button className="cart-faq">?</button>
      </section>

      <section className="cart-items">
        {props.cartReducer.cart !== []
          ? props.cartReducer.cart.map((el, i) => {
              return (
                <div className="cart-indiv-item">
                  <div className="item-img-box">
                    <img className="cart-item-img" src={el.img_url} />
                  </div>
                  <div className="item-descrip-box">
                    <p className="item-description-title">{el.description}</p>
                    <div className="item-price">
                      <p className="dollartext">$</p>
                      <p className="price-item">{el.price * el.qty}</p>
                    </div>
                    <div className="qty-box">
                      <p className="qty-text">Qty</p>
                      <Dropdown
                        compact
                        selection
                        value={el.qty}
                        options={qtyOptions}
                        onChange={(e, data) => {
                          // const index = cart.indexOf(el)
                          // const newArr = [...cart, cart[index].qty = data.value]
                          setCart((el.qty = data.value));
                        }}
                      />
                    </div>
                  </div>
                  <p
                    onClick={() => {
                      const newCart = [...props.cartReducer.cart];
                      newCart.splice(i, 1);
                      props.updateCart(newCart);
                    }}
                    className="x-text"
                  >
                    x
                  </p>
                </div>
              );
            })
          : cartLoader.map((el, i) => {
              return (
                <div className="cart-indiv-item">
                  <div className="item-img-box">
                    <img className="cart-item-img" src={el.img_url} />
                  </div>
                  <div className="item-descrip-box">
                    <p className="item-description-title">{el.description}</p>
                    <div className="item-price">
                      <p className="dollartext">$</p>
                      <p className="price-item">{el.price * el.qty}</p>
                    </div>
                    <div className="qty-box">
                      <p className="qty-text">Qty</p>
                      <Dropdown
                        compact
                        selection
                        value={el.qty}
                        options={qtyOptions}
                        onChange={(e, data) => {
                          // const index = cart.indexOf(el)
                          // const newArr = [...cart, cart[index].qty = data.value]
                          setCart((el.qty = data.value));
                        }}
                      />
                    </div>
                  </div>
                  <p
                    onClick={() => {
                      const newCart = [...props.cartReducer.cart];
                      newCart.splice(i, 1);
                      props.updateCart(newCart);
                    }}
                    className="x-text"
                  >
                    x
                  </p>
                </div>
              );
            })}
      </section>

      <section className="second-last-cart">
        <p onClick={props.clearCart} className="remove-all-text">
          Remove All
        </p>
        <img
          onClick={() => {
            props.history.push("/camera");
          }}
          className="camera-logo"
          src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/camera+icon+WHITE.svg"
        />
      </section>

      <section className="bottom-of-cart">
        <button
          onClick={() => {
            checkout(props);
          }}
          className="checkout-button"
        >
          Checkout
        </button>
        <div className="checkout-cart">
          <p className="amount-of-items">
            {props.cartReducer.cart.reduce((acc, el) => {
              return acc + 1;
            }, 0)}
            items
          </p>
          <div className="Subtotal-cart">
            <p>Subtotal</p>
            <p>
              $
              {props.cartReducer.cart.reduce((acc, el) => {
                const sum = el.price * el.qty;
                return acc + sum;
              }, 0)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, {
  getCart,
  clearCart,
  updateCart,
  updateTotalPrice,
})(withRouter(Cart));
