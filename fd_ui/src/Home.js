import './css/Home.css';
import React from 'react'
import Header from './components/Header';
import AddRestaurant from './components/AddRestaurant';
import RestaurantDisplay from './components/RestaurantDisplay';

function Home() {
    return (
      <div className='parent'>
      <div><Header /></div>
      <div><AddRestaurant /></div>
      <div><RestaurantDisplay /></div>
      <div><h2>Food Delivery System</h2></div>
      </ div>
    )
  }
  
  export default Home