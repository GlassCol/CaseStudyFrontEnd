import axios from "axios";
const ITEM_API_BASE_URL = "http://localhost:8080/itemApi/v1/items";

class ItemService {

saveItem(item) {
    return axios.post(ITEM_API_BASE_URL, item);
}

getItems() {
    return axios.get(ITEM_API_BASE_URL);
}

getRestItems(id){
    return axios.get(ITEM_API_BASE_URL + "/restItems/" + id);
}

deleteItem(id) {
    return axios.delete(ITEM_API_BASE_URL + "/" + id);
}
getItemById(id){
    return axios.get(ITEM_API_BASE_URL + "/" + id);
}
updateItem(item, id){
    return axios.put(ITEM_API_BASE_URL + "/" + id, item);
}

}

export default new ItemService();