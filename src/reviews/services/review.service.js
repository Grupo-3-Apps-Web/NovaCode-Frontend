import httpInstance from "../../shared/services/http.instance.js";


export class ReviewService {
    resourceEndpoint = "/publishedVehicles";
    reviewsEndpoint = "/reviews";

    getAll(){
        return httpInstance.get(this.resourceEndpoint);
    }

    getReviewsForVehicleId(vehicleId) {
        return httpInstance.get(`${this.reviewsEndpoint}?vehicleId=${vehicleId}`);
    }

    createReview(vehicleId, review) {
        return httpInstance.post(this.reviewsEndpoint, {...review, vehicleId});
    }

    update(id, review) {
        return httpInstance.put(`${this.reviewsEndpoint}/${id}`, review);
    }
}
