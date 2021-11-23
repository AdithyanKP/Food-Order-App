import { useRef,useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
   const[formInputValidity,setFormInputValidity] = useState({
      name:true,
      street:true,
      postalcode:true,
      city:true
    })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity ({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      postalcode:enteredPostalCodeIsValid,
      city:enteredCityIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&-
      enteredPostalCodeIsValid &&
      enteredCityIsValid;
      if(!formIsValid){
        return;
      }
      props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postalcode:enteredPostalCode,
        city:enteredCity
      });
  };
  const nameControlClasses = `${classes.control} ${formInputValidity.name ?  '' : classes.invalid}`;
  
  const streetControlClasses = `${classes.control} ${formInputValidity.street ?  '' : classes.invalid}`;
  
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalcode ?  '' : classes.invalid}`;
  
  const cityControlClasses = `${classes.control} ${formInputValidity.city ?  '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>please enter name </p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalcodeInputRef} />
        {!formInputValidity.postalcode && <p>Invalid postalcode</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>please enter the City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler} >Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
