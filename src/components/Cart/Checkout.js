import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6; 

const Checkout = (props) => {

  const [formInputIsValidity, setFormInputIsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);

    setFormInputIsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    })

    const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalCodeIsValid;

    if(!formIsValid){

      
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

  };

  const nameInputRef = useRef();
  const postalCodeInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const nameControlClass = `${classes.control} ${formInputIsValidity.name?'':classes.invalid}`;
  const streetControlClass = `${classes.control} ${formInputIsValidity.street?'':classes.invalid}`;
  const postalCodeControlClass = `${classes.control} ${formInputIsValidity.postalCode?'':classes.invalid}`;
  const cityControlClass = `${classes.control} ${formInputIsValidity.city?'':classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      
      <div className={nameControlClass}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputIsValidity.name && <p>Please enter a valid name</p>}
      </div>
      
      <div className={streetControlClass}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputIsValidity.street && <p>Please enter a valid street</p>}
      </div>
      
      <div className={postalCodeControlClass}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='postal' />
        {!formInputIsValidity.postalCode && <p>Please enter a valid postal code (6 characters long)</p>}
      </div>

      <div className={cityControlClass}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputIsValidity.city && <p>Please enter a valid city</p>}
      </div>
      
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    
    </form>
  );
};

export default Checkout;