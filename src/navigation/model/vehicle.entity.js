export class Vehicle{
    constructor( { id= '',
                     model= '',
                     brand= '',
                     year= 0,
                     description= '',
                     image= '',
                     price= 0,
                     rating= 0
                 }) {

        this.id = id;
        this.model = model;
        this.brand = brand;
        this.year = year;
        this.description = description;
        this.image = image;
        this.price = price;
        this.rating = rating;

    }
}