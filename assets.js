class Asset {
    constructor(name, price, cashflow) {
        this.name = name;
        this.price = price;
        this.cashflow = cashflow;
    }
}

class Stock extends Asset {
    constructor(name, price, dividend) {
        super(name, price, dividend);

        this.dividend = dividend;
    }
}

function setupStocks() {
    var stocks = [
        new Stock("Coca-Cola", 100, 3),
        new Stock("McDonalds", 150, 4),
        new Stock("Nestle", 75, 2),
        new Stock("Facebook", 300, 0)
    ];

    return stocks;
}