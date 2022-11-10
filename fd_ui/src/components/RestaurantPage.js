import React from 'react'
import Header from './Header'
import ItemDisplay from './ItemDisplay'
import { useParams } from 'react-router-dom'

const RestaurantPage = () => {
  const { id } = useParams();
  return (
    <>
    <Header />
    <ItemDisplay id={id}/>
    </>
  )
}

export default RestaurantPage