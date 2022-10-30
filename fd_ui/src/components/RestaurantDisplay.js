import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService';
import Restaurant from './Restaurant';
import '../css/Home.css';

const RestaurantDisplay = () => {

    const [restaurants, setRestaurants] = useState(null);
    const [loading, setLoading] = useState(true);
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
        RestaurantService.saveRestaurant(restaurant).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
        fetchData()
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

    return (
        <>
            <table className='table' style={{ width: 800 }}>
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
                    <tbody>
                        {restaurants.map((restaurant) => (
                            <Restaurant restaurant={restaurant} deleteRestaurant={deleteRestaurant} key={restaurant.id} />
                        ))}
                    </tbody>
                )}
            </table>
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
        </>
    )
}

export default RestaurantDisplay