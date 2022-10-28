import React from 'react'
 import '../css/Home.css';
 const editRestaurant = (e, id) => {
  e.preventDefault();
 };

const Restaurant = ({ restaurant, deleteRestaurant}) => {
  return (
    <tr key={restaurant.id}>
                <td>{restaurant.id}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.emailId}</td>
                <td className='text-right'><button className='px-2 dropdown-item' onClick={(e, id) => editRestaurant(e, id)}>Edit</button></td>
                <td><button className='px-2 dropdown-item'>Display</button></td>
                <td><button onClick={(e, id) => deleteRestaurant(e, restaurant.id)} className='px-2 dropdown-item'>Delete</button></td>
    </tr>
  )
}

export default Restaurant