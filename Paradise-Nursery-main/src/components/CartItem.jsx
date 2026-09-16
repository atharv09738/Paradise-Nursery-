import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";
import { Link } from "react-router-dom";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQuantity = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const deleteItem = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <h2>Total Cart Amount: ${totalAmount}</h2>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} width="120" />

            <div className="cart-info">
              <h3>{item.name}</h3>

              <p>Unit Price: ${item.price}</p>

              <p>Quantity: {item.quantity}</p>

              <p>Total Cost: ${item.price * item.quantity}</p>

              <button onClick={() => increaseQuantity(item)}>+</button>

              <button onClick={() => decreaseQuantity(item)}>-</button>

              <button onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <br />

      <button onClick={() => alert("Coming Soon")}>
        Checkout
      </button>

      <br />
      <br />

      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default CartItem;
