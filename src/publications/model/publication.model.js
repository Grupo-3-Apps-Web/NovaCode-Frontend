export class Publication {
    constructor({
                    id = "",
                    model = "",
                    brand = "",
                    year = "",
                    description = "",
                    image = "",
                    price = 0,
                    publishedDate = "",
                }) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.year = year;
        this.description = description;
        this.image = image;
        this.price = price;
        this.publishedDate = publishedDate;
        }
}