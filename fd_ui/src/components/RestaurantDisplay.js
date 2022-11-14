import React, { Fragment, useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService';
import Restaurant from './Restaurant';
import '../css/Home.css';
import Container from 'react-bootstrap/Container';
import EditRestaurantRow from './EditRestaurantRow';
import { useNavigate, } from 'react-router-dom';

const RestaurantDisplay = () => {
    const navigate = useNavigate();
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

    const handleDisplayClick = (e, displayRestaurant) => {
        e.preventDefault();
        console.log(displayRestaurant)
        navigate('/RestaurantPage/' + displayRestaurant.id);

    }
    const saveRestaurant = (e) => {
        e.preventDefault();
        if (validate()) {
            RestaurantService.saveRestaurant(restaurant).then((response) => {
                console.log(response)
                fetchData();
            }).catch((error) => {
                console.log(error)
            })
        }
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

    const handleEditFormCancel = (e) => {
        e.preventDefault()
        setEditRestaurantId(null);
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

    const validate = () => {
        if (restaurant.name === "") {
            alert("Name cannot be blank")
            return false;
        }

        if (restaurant.emailId === "") {
            alert("Email cannot be blank")
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(restaurant.emailId)) {
            alert("Not a valid email")
            return false;
        }
        if (restaurant.license === "") {
            alert("License cannot be empty")
            return false;
        }
        if (restaurant.license.split('.').pop() !== "pdf" && restaurant.license.split('.').pop() !== "docx") {
            alert("License must be pdf of docx file")
            return false;
        }
        return true;
    }

    return (
        <div>
            <Container className='align-items-center align-content-center p-5 w-75'>
                <Container className='align-items-center align-content-center p-5 w-50'>
                    <h1>Restaurants</h1>
                </Container>
                <form>
                    <table className='table' style={{ width: 900 }}>
                        <thead>
                            <tr>
                                <th scope='col'>Id</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th></th>
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
                                                handleEditFormCancel={handleEditFormCancel}
                                                key={restaurant.id}
                                            />
                                        ) : (
                                            <Restaurant
                                                restaurant={restaurant}
                                                handleDisplayClick={handleDisplayClick}
                                                handleEditClick={handleEditClick}
                                                deleteRestaurant={deleteRestaurant}
                                                key={restaurant.id}
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
            </Container>
        </div>
    )
}

export default RestaurantDisplay