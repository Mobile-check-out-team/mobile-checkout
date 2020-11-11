import React from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { getCart, updateCart, clearCart } from "../Redux/cartReducer";
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

// checkoutButton.addEventListener("click", function () {
//   fetch("/create-session", {
//     method: "POST",
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (session) {
//       return stripe.redirectToCheckout({ sessionId: session.id });
//     })
//     .then(function (result) {
//       // If redirectToCheckout fails due to a browser or network
//       // error, you should display the localized error message to your
//       // customer using error.message.
//       if (result.error) {
//         alert(result.error.message);
//       }
//     })
//     .catch(function (error) {
//       console.error("Error:", error);
//     });

const checkout = async () => {
  const stripe = await stripePromise;
  axios
    .post("/createSession", { price: 100 })
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

function Cart(props) {
  return (
    <div className="cart">
      <section className="cart-header">
        <p className="cart-exit">Exit</p>
        <p className="cart-title">Scan and Go Cart</p>
        <button className="cart-faq">?</button>
      </section>

      <section className="cart-items">
        <div className="cart-indiv-item">
          <div className="item-img-box">
            <img
              className="cart-item-img"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-books-2018-14-1543248111.jpg?crop=1xw:1xh;center,top&resize=480:*"
            />
          </div>
          <div className="item-descrip-box">
            <p className="item-description-title">This Is Going To Hurt</p>
            <div className="item-price">
              <p className="dollartext">$</p>
              <p className="price-item">30</p>
            </div>
            <div className="qty-box">
              <p className="qty-text">Qty</p>
              <Dropdown
                defaultValue={1}
                compact
                selection
                options={qtyOptions}
              />
            </div>
          </div>
          <p className="x-text">x</p>
        </div>

        <div className="cart-indiv-item">
          <div className="item-img-box">
            <img
              className="cart-item-img"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-books-2018-14-1543248111.jpg?crop=1xw:1xh;center,top&resize=480:*"
            />
          </div>
          <div className="item-descrip-box">
            <p className="item-description-title">This Is Going To Hurt</p>
            <div className="item-price">
              <p className="dollartext">$</p>
              <p className="price-item">30</p>
            </div>
            <div className="qty-box">
              <p className="qty-text">Qty</p>
              <Dropdown
                defaultValue={1}
                compact
                selection
                options={qtyOptions}
              />
            </div>
          </div>
          <p className="x-text">x</p>
        </div>

        <div className="cart-indiv-item">
          <div className="item-img-box">
            <img
              className="cart-item-img"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-books-2018-14-1543248111.jpg?crop=1xw:1xh;center,top&resize=480:*"
            />
          </div>
          <div className="item-descrip-box">
            <p className="item-description-title">This Is Going To Hurt</p>
            <div className="item-price">
              <p className="dollartext">$</p>
              <p className="price-item">30</p>
            </div>
            <div className="qty-box">
              <p className="qty-text">Qty</p>
              <Dropdown
                defaultValue={1}
                compact
                selection
                options={qtyOptions}
              />
            </div>
          </div>
          <p className="x-text">x</p>
        </div>

        <div className="cart-indiv-item">
          <div className="item-img-box">
            <img
              className="cart-item-img"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-books-2018-14-1543248111.jpg?crop=1xw:1xh;center,top&resize=480:*"
            />
          </div>
          <div className="item-descrip-box">
            <p className="item-description-title">This Is Going To Hurt</p>
            <div className="item-price">
              <p className="dollartext">$</p>
              <p className="price-item">30</p>
            </div>
            <div className="qty-box">
              <p className="qty-text">Qty</p>
              <Dropdown
                defaultValue={1}
                compact
                selection
                options={qtyOptions}
              />
            </div>
          </div>
          <p className="x-text">x</p>
        </div>

        <div className="cart-indiv-item">
          <div className="item-img-box">
            <img
              className="cart-item-img"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-books-2018-14-1543248111.jpg?crop=1xw:1xh;center,top&resize=480:*"
            />
          </div>
          <div className="item-descrip-box">
            <p className="item-description-title">This Is Going To Hurt</p>
            <div className="item-price">
              <p className="dollartext">$</p>
              <p className="price-item">30</p>
            </div>
            <div className="qty-box">
              <p className="qty-text">Qty</p>
              <Dropdown
                defaultValue={1}
                compact
                selection
                options={qtyOptions}
              />
            </div>
          </div>
          <p className="x-text">x</p>
        </div>
      </section>

      <section className="second-last-cart">
        <p className="remove-all-text">Remove All</p>
        <img
          onClick={() => {
            props.history.push("/camera");
          }}
          className="camera-logo"
          src="https://gymsharkrepl.s3-us-west-1.amazonaws.com/icons/camera+icon+WHITE.svg"
        />
      </section>

      <section className="bottom-of-cart">
        <button onClick={checkout} className="checkout-button">
          Checkout
        </button>
        <div className="checkout-cart">
          <p className="amount-of-items">x items</p>
          <div className="Subtotal-cart">
            <p>Subtotal</p>
            <p>$Price</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getCart, clearCart, updateCart })(
  withRouter(Cart)
);
