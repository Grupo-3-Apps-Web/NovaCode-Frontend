export class Review {
    constructor({
                    id = "",
                    score = 0,
                    comment = "",
                    vehicleId = 0
                })
    {
        this.id = id;
        this.score = score;
        this.comment = comment;
        this.vehicleId = vehicleId;
    }
}