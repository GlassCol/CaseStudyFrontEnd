import React, { useEffect, useState } from 'react'
import ItemService from '../services/ItemService';
import Item from './Item';
const ItemDisplay = () => {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try{
        const response = await ItemService.getItems();
        setItems(response.data);
        } catch (error) {
            console.log (error)
        }
        setLoading(false);
        };
        fetchData();
    }, []);

    const deleteItem = (e, id) => {
        e.preventDefault();
        ItemService.deleteItem(id).then((itm) => {
            if(items) {
                setItems((prevElement) => {
                    return prevElement.filter((item) => item.id !== id);
                })
            }
        });
    };

  return (
    <table className='table' style={{width: 800}}>
            <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th></th>
                <th scope='col' className='text-right'>Actions</th>
                <th></th>
            </tr>

        {!loading && (
        <tbody>
        {items.map((item) => (
                <Item item={item} deleteItem={deleteItem} key={item.id} />
            ))}
            </tbody>
        )}
    </table>
  )
}

export default ItemDisplay