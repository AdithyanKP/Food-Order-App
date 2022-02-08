import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitting, setIsDidSubmitting] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$ ${cartCtx.totalAmount?.toFixed(2)}`;
  const hashItems = cartCtx.items.length > 0;

  const cartItemsRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemsAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemsRemoveHandler.bind(null, item.id)}
          onAdd={cartItemsAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const onClickHandler = (event) => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-b4f09-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setIsDidSubmitting(true);
    cartCtx.clearCart();
  };
  const modelActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes["button--alt"]}>
        close
      </button>
      {hashItems && (
        <button className={classes.button} onClick={onClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModelContent = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && modelActions}
    </React.Fragment>
  );
  const isSubmittingModelContent = <p>senting your order data ..</p>;
  const didSubmitContent = (
    <React.Fragment>
      <p>Succesfully sent the Order</p>{" "}
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes.button}>
          close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmitting && cartModelContent}
      {isSubmitting && !didSubmitting && isSubmittingModelContent}
      {!isSubmitting && didSubmitting && didSubmitContent}
    </Modal>
  );
};

export default Cart;
