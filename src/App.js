import { useState} from "react";

import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIsShown ,setCartIsShown] = useState(false);

  const showCartHandler = ()=>{
    return setCartIsShown(true);
  };

  const hideCartHandler = ()=>{
    return setCartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart  onHideCart={hideCartHandler}/>}
      <Header onShowcart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
      </CartProvider>
  );
}

export default App;
