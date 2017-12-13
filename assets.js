class Asset {
    constructor(name, price, cashflow, amount) {
        this.name = name;
        this.price = price;
        this.cashflow = cashflow;
        this.amount = amount;
    }

    fullCashflow() {
        return this.cashflow * this.amount;
    }
}

class Stock extends Asset {
    constructor(name, price, dividend, amount) {
        super(name, price, dividend, amount);

        this.dividend = dividend;
    }
}

function setupStocks() {
    var stocks = [
        new Stock("Coca-Cola", 100, 3, 1),
        new Stock("McDonalds", 150, 4, 1),
        new Stock("Nestle", 75, 2, 1),
        new Stock("Facebook", 300, 0, 1)
    ];

    return stocks;
}