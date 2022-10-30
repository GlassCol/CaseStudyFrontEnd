import React, { Fragment, useEffect, useState } from 'react'
import ItemService from '../services/ItemService';
import EditItemRow from './EditItemRow';
import Item from './Item';
const ItemDisplay = () => {

    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editItemId, setEditItemId] = useState(null);
    const [item, setItem] = useState({
        id: "",
        name: "",
        restId: "",
        price: ""
    })
    
    const handleChange = (e) => {
        const value = e.target.value;
        setItem({ ...item, [e.target.name]: value });
    };

    const saveItem = (e) => {
        e.preventDefault();
        ItemService.saveItem(item).then((response) => {
            console.log(response)
            fetchData();
        }).catch((error) => {
            console.log(error)
        })
    }
    const [editFormData, setEditFormData] = useState({
        id: item.id,
        name: "",
        restId: item.restId,
        price: ""
    })

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

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const fetchItem = async () => {
        try {
            const response = await ItemService.getItemById(editFormData.id)
            setItem(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        fetchItem();
        ItemService.updateItem(item.id, item).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
        fetchData()
    }

    const handleEditClick = (e, item) => {
        e.preventDefault();
        setEditItemId(item.id);

        const formValues = {
            id: item.id,
            name: item.name,
            restId: item.restId,
            price: item.price
        }
        setEditFormData(formValues);
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
        <>
            <form>
                <table className='table' style={{ width: 800 }}>
                    <thead key={"thead"}>
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
                        <tbody key={"tbody"}>
                            {items.map((item) => (
                                <Fragment key={"Fragment" + item.id}>
                                    {editItemId === item.id ? (
                                        <EditItemRow editFormData={editFormData} handleEditFormSubmit={handleEditFormSubmit} handleEditFormChange={handleEditFormChange} key={item.id} />
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
            </form>
            <form>
                <input
                    type='text'
                    name="name"
                    required="required"
                    placeholder='Item Name'
                    value={item.name}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type='number'
                    name="restId"
                    required="required"
                    placeholder='Enter A Restaurant Id'
                    value={item.restId}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type='number'
                    name="price"
                    required="required"
                    placeholder='Enter Price'
                    value={item.price}
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit' onClick={saveItem}>Save</button>
            </form>
        </>
    )
}

export default ItemDisplay