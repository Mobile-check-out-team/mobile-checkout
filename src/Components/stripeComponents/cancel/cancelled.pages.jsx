import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="success">
      <section>
        <p className="border-box">
          Forgot to add something to your cart? Shop around then come back to
          pay!
        </p>
        <Link to="/cart">
          <p className="back-to-cart-link">Back to Cart</p>
        </Link>
      </section>
    </div>
  );
};

export default Cancel;
