import httpInstance from "../../shared/services/http.instance.js";

export class BookService {

    resourceEndpoint = '/myBookedVehicles';


    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }


    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }


    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }


    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }


    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }


    getByName(model) {
        return httpInstance.get(`${this.resourceEndpoint}?model=${model}`);
    }
}