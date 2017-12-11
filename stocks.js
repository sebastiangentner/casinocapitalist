class Stock {
    constructor(name, price, dividend) {
        this.name = name;
        this.price = price;
        this.dividend = dividend;
    }
}

function createStocks(count) {
    var stocks = [];
    for (i = 0; i < count; i++) {
        let s = new Stock();
        s.name = "name" + i;
        s.price = i * 10;
        s.dividend = s.price * 0.03;
        stocks.push(s);
    }
    console.log(stocks.length + " stocks created");
    return stocks;
}