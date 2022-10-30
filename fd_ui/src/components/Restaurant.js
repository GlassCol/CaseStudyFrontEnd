import React from 'react'
import '../css/Home.css';


const Restaurant = ({ restaurant, deleteRestaurant, handleEditClick }) => {
  return (
    <tr key={restaurant.id}>
      <td>{restaurant.id}</td>
      <td>{restaurant.name}</td>
      <td>{restaurant.emailId}</td>
      <td className='text-right'><button className='px-2 dropdown-item' onClick={(e) => handleEditClick(e, restaurant)}>Edit</button></td>
      <td><button onClick={(e, id) => deleteRestaurant(e, restaurant.id)} className='px-2 dropdown-item'>Delete</button></td>
    </tr>
  )
}

export default Restaurant