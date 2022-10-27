import axios from "axios";
const RESTAURANT_API_BASE_URL = "http://localhost:8080/api/v1/restaurants";

class RestaurantService {

saveRestaurant(restaurant) {
    return axios.post(RESTAURANT_API_BASE_URL, restaurant);
}

getRestaurants() {
    return axios.get(RESTAURANT_API_BASE_URL);
}

deleteResaurant(id) {
    return axios.delete(RESTAURANT_API_BASE_URL + "/" + id);
}
getRestaurantById(id){
    return axios.get(RESTAURANT_API_BASE_URL + "/" + id);
}
updateRestaurant(restaurant, id){
    return axios.put(RESTAURANT_API_BASE_URL + "/" + id, restaurant);
}

}

export default new RestaurantService();