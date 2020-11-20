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

const qtyOptions = [] 
for(let i=1; i <= 10; i++){
  const numObj = {
    key: i,
    text: i,
    value: i
  }
  qtyOptions.push(numObj)
}

//////////////////////////////////////////////////

function Cart(props) {
  const [cart, setCart] = useState([]);
  const [faq, toggleFaq] = useState(false);

  let totalPrice = props.cartReducer.cart.reduce((acc, el) => {
    const sum = el.price * el.qty;
    return acc + sum;
  }, 0);

  useEffect(() => {
    setCart(props.cartReducer.cart);
    if (props.cartReducer.cart === []) {
      axios
        .get("/api/getCart")
        .then((res) => {
          if (res.data !== undefined) {
            props.updateCart(res.data.cart);
          }
        })
        .catch(() => {
          return [];
        });
    }
  }, []);

  useEffect(() => {
    props.updateTotalPrice(totalPrice);
  }, [totalPrice]);
  let numItems = props.cartReducer.cart.reduce((acc, el) => {
    return acc + el.qty;
  }, 0)

  return (
    <div className="cart">
      <section className="cart-header">
        <p
          className="cart-exit"
          onClick={() => {
            props.clearCart();
            props.history.push("/instructions");
          }}
        >
          Exit
        </p>
        <p className="cart-title">Scan and Go Cart</p>
        <div className="cart-faq-div">
          <button
            onClick={() => {
              toggleFaq(!faq);
            }}
            className="cart-faq"
          >
            ?
          </button>
          {faq ? (
            <>
              <img
                className="speechBubble"
                src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/insrtuctionsBoxCorrect.svg"
              />{" "}
              <p
                className="speech-bubble"
                onClick={() => {
                  toggleFaq(false);
                }}
              >
                x
              </p>
            </>
          ) : null}
        </div>
      </section>

      <section className="cart-items">
        {props.cartReducer.cart.map((el, i) => {
          return (
            <div className="cart-indiv-item" key={i}>
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
                    className="dropdown"
                    scrolling
                    value={el.qty}
                    options={qtyOptions}
                    onChange={(e, data) => {
                      setCart((el.qty = data.value));
                    }}
                  />
                </div>
              </div>
              <img
                onClick={() => {
                  const newCart = [...props.cartReducer.cart];
                  newCart.splice(i, 1);
                  props.updateCart(newCart);
                }}
                src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/xIcon.svg"
                alt="x icon"
                className="x-icon"
              />
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
            props.history.push("/checkout");
          }}
          className="checkout-button"
        >
          Checkout
        </button>

        <div className="checkout-cart">
          {numItems === 1?
          <p className="amount-of-items">
            {numItems} item</p>:
          <p className="amount-of-items">
            {numItems} items</p>}
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
