import httpInstance from "../../shared/services/http.instance.js";

/**
 * @class PublicationsService
 * @description Service class for handling CRUD operations on categories using HTTP requests
 */
export class PublicationsService {
    resourceEndpoint = '/mypublishedvehicles';


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


    getByName(name) {
        return httpInstance.get(`${this.resourceEndpoint}?name=${name}`);
    }
}