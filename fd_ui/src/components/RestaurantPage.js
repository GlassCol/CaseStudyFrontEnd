import React from 'react'
import Header from './Header'
import ItemDisplay from './ItemDisplay'
import {useLocation} from 'react-router-dom'

function RestaurantPage() {
  return (
    <>
    <Header />
    <ItemDisplay />
    </>
  )
}

export default RestaurantPage