import './css/Home.css';
import React from 'react'
import Header from './components/Header';
import RestaurantDisplay from './components/RestaurantDisplay';
import ItemDisplay from './components/ItemDisplay';

function Home() {
  return (
    <div className='parent'>
      <div><Header /></div>
      <div><RestaurantDisplay /></div>
      <div><ItemDisplay /></div>
    </ div>
  )
}

export default Home