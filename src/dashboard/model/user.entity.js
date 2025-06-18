export class User{
    constructor( { id= '',
                     fullName= '',
                     email= '',
                     phone= '',
                     address= '',
                     birthday= '',
                     dni= '',
                     imageProfile= ''
                 }) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.birthday = birthday;
        this.dni = dni;
        this.imageProfile = imageProfile;

    }
}