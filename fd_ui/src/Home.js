import './css/Home.css';
import React from 'react'
import Header from './components/Header';
import RestaurantDisplay from './components/RestaurantDisplay';

function Home() {
  return (
    <div className='parent'>
      <div><Header /></div>
      <div><RestaurantDisplay /></div>
    </ div>
  )
}

export default Home