class User {
    constructor(firstname, lastname, cash) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.cash = cash;
    }

    displayedName() {
        return this.firstname + this.lastname
    }
}