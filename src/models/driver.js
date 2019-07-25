export default class Driver {
    rut = '';
    name = '';
    licenceType = '';
    age = '';
    active = false;

}

export class DriverForm {
    constructor(init) {
        this.rut = init;
        this.name = init;
        this.licenceType = init;
        this.age = init;
    }
}




