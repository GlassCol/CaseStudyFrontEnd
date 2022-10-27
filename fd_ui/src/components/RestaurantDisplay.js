import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService';
import Restaurant from './Restaurant';

const RestaurantDisplay = () => {

const [restaurants, setRestaurants] = useState(null);
const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try{
        const response = await RestaurantService.getRestaurants();
        setRestaurants(response.data);
        } catch (error) {
            console.log (error)
        }
        setLoading(false);
        };
        fetchData();
    }, []);

    const deleteRestaurant = (e, id) => {
        e.preventDefault();
        RestaurantService.deleteResaurant(id).then((res) => {
            if(restaurants) {
                setRestaurants((prevElement) => {
                    return prevElement.filter((restaurant) => restaurant.id !== id);
                })
            }
        });
    };

  return (
    <table className='table'>
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
  )
}

export default RestaurantDisplay