import React from 'react'
import '../css/Home.css';

const editItem = (e, id) => {
    e.preventDefault();
   };

const Item = ({ item, deleteItem }) => {
  return (
    <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td className='text-right'><button className='px-2 dropdown-item' onClick={(e, id) => editItem(e, id)}>Edit</button></td>
                <td><button onClick={(e, id) => deleteItem(e, item.id)} className='px-2 dropdown-item'>Delete</button></td>
    </tr>
  )
}

export default Item