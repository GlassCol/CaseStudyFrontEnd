import React from 'react'
import '../css/Home.css';


const Item = ({ item, deleteItem, handleEditClick}) => {
  return (
    <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.restId}</td>
                <td>{item.price}</td>
                <td></td>
                <td className='text-right'><button className='px-2 dropdown-item' onClick={(e) => handleEditClick(e, item)}>Edit</button></td>
                <td><button onClick={(e, id) => deleteItem(e, item.id)} className='px-2 dropdown-item'>Delete</button></td>
    </tr>
  )
}

export default Item