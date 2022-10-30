import React, { Fragment, useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService';
import Restaurant from './Restaurant';
import '../css/Home.css';
import ItemDisplay from './ItemDisplay';
import EditRestaurantRow from './EditRestaurantRow';
import {omit} from 'lodash';

const RestaurantDisplay = () => {

    const [restaurants, setRestaurants] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editRestaurantId, setEditRestaurantId] = useState(null);
    const [restaurant, setRestaurant] = useState({
        id: "",
        name: "",
        emailId: "",
        license: ""
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setRestaurant({ ...restaurant, [e.target.name]: value });
    };

    const saveRestaurant = (e) => {
        e.preventDefault();
        validate(e, restaurant.name, restaurant.emailId, restaurant.license);
        RestaurantService.saveRestaurant(restaurant).then((response) => {
            console.log(response)
            fetchData();
        }).catch((error) => {
            console.log(error)
        })
    }
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await RestaurantService.getRestaurants();
            setRestaurants(response.data);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchData()
    }, []);

    const [editFormData, setEditFormData] = useState({
        id: restaurant.id,
        name: "",
        emailId: "",
        price: ""
    })

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const fetchRestaurant = async () => {
        try {
            const response = await RestaurantService.getRestaurantById(editFormData.id)
            setRestaurant(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        fetchRestaurant();
        RestaurantService.updateRestaurant(restaurant.id, restaurant).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
        fetchData()
    }

    const handleEditClick = (e, restaurant) => {
        e.preventDefault();
        setEditRestaurantId(restaurant.id);

        const formValues = {
            id: restaurant.id,
            name: restaurant.name,
            emailId: restaurant.emailId,
            license: restaurant.license
        }
        setEditFormData(formValues);
    }

    const deleteRestaurant = (e, id) => {
        e.preventDefault();
        RestaurantService.deleteResaurant(id).then((res) => {
            if (restaurants) {
                setRestaurants((prevElement) => {
                    return prevElement.filter((restaurant) => restaurant.id !== id);
                })
            }
        });
    };

    const [errors, setErrors] = useState({});

    const validate = (e, name, email, license) => {
        switch (name) {
            case 'restaurantName':
                if (name.length <= 0) {

                    setErrors({
                        ...errors,
                        restaurantName:'Name must not be empty'
                    })
                } else {


                    let newObj = omit(errors, "restaurantName");
                    setErrors(newObj);
                    
                }
                break;

            default:
                break;
        }
    }

    return (
        <>
            <form>
                <table className='table' style={{ width: 800 }}>
                    <thead>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col' className='text-right'>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody key={"tbody"}>
                            {restaurants.map((restaurant) => (
                                <Fragment key={"Fragment" + restaurant.id}>
                                    {editRestaurantId === restaurant.id ? (
                                        <EditRestaurantRow
                                            editFormData={editFormData}
                                            handleEditFormSubmit={handleEditFormSubmit}
                                            handleEditFormChange={handleEditFormChange}
                                            key={restaurant.id}
                                        />
                                    ) : (
                                        <Restaurant
                                            restaurant={restaurant}
                                            handleEditClick={handleEditClick}
                                            deleteRestaurant={deleteRestaurant}
                                            key={restaurant.id}
                                        />
                                    )}
                                </Fragment>
                            ))};
                        </tbody>
                    )}
                </table>
            </form>
            <form>
                <input
                    type='text'
                    name="name"
                    required="required"
                    placeholder='Restaurant Name'
                    value={restaurant.name}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type='email'
                    name="emailId"
                    required="required"
                    placeholder='Enter Email'
                    value={restaurant.emailId}
                    onChange={(e) => handleChange(e)}
                />
                <input
                    type='file'
                    name="license"
                    required="required"
                    placeholder='Upload Safety License'
                    value={restaurant.license}
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit' onClick={saveRestaurant}>Save</button>
            </form>
            <div><ItemDisplay /></div>
        </>
    )
}

export default RestaurantDisplay