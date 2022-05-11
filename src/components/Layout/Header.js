import React from 'react'
import mainImage from '../../assets/food.jpg'
import classes from './Header.module.css';
import HeaderCardButton from './HeaderCardButton';
const Header = (props) => {
  return (
    <>
      <header className={classes.header }>
          <h1>Joy Meals</h1>
          <HeaderCardButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
          <img src={mainImage} alt="Lots of Food"/>
      </div>
    </>
  )
}

export default Header