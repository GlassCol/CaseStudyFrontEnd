import React, { Fragment, useEffect, useState } from 'react'
import ItemService from '../services/ItemService';
import AddItem from './AddItem';
import EditItemRow from './EditItemRow';
import Item from './Item';
const ItemDisplay = () => {

    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editItemId, setEditItemId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        itemId: "",
        name: "",
        restId: "",
        price: ""
    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await ItemService.getItems();
                setItems(response.data);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleEditFormChange = (e) => {
        e.prevDefault();

        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        
        setEditFormData(newFormData);
    }

    const handleEditClick = (e, item) => {
        e.prevDefault();
        setEditItemId(item.id);

        const formValues = {
            itemId: item.id,
            name: item.name,
            restId: item.restId,
            price: item.price
        }
    }
    const deleteItem = (e, id) => {
        e.preventDefault();
        ItemService.deleteItem(id).then((itm) => {
            if (items) {
                setItems((prevElement) => {
                    return prevElement.filter((item) => item.id !== id);
                })
            }
        });
    };

    return (
        <form>
            <table className='table' style={{ width: 800 }}>
                <thead>
                    <tr>
                        <th scope='col'>Item Id</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Restaurant Id</th>
                        <th scope='col'>Price</th>
                        <th></th>
                        <th scope='col' className='text-right'>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                {!loading && (
                    <tbody>
                        {items.map((item) => (
                            <Fragment>
                                {  editItemId === item.id ? (
                                    <EditItemRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} key={item.id + "edit"}/>
                                ) : (
                                    <Item
                                        item={item}
                                        handleEditClick={handleEditClick}
                                        deleteItem={deleteItem}
                                        key={item.id}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                )}
            </table>
            <AddItem />
        </form>
    )
}

export default ItemDisplay