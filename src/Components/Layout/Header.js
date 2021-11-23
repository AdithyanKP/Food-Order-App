import { Fragment } from "react";
import MealsImage from "../../Assets/meals.jpg";
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
          <h1>Food Court</h1>
         <HeaderCartButton onClick={props.onShowcart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={MealsImage} alt="This is the delicious food in a table" />
      </div>
    </Fragment>
  );
};
export default Header;
