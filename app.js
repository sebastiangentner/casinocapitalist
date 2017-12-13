// ui elements
let divHeader = document.getElementById("divHeader");

let divIncome = window.document.getElementById("divIncome");
let tableIncome = window.document.getElementById("tableIncome");

let divExpenses = window.document.getElementById("divExpenses");
let tableExpenses = window.document.getElementById("tableExpenses");

let divCashflow = window.document.getElementById("divCashflow");
let tableCashflow = window.document.getElementById("tableCashflow");

let divStocks = window.document.getElementById("divStocks");
let tableStocks = window.document.getElementById("tableStocks");

let btnPlayRound = window.document.getElementById("btnPlayRound");

var user;
var stocks;

// life cycle

window.addEventListener('load', e => {
    windowDidLoad();
});

btnPlayRound.addEventListener("click", myFunction);

function myFunction() {
    console.log("play round");
    playRound();
}

async function windowDidLoad() {

    // setup user
    user = new User();
    user.firstname = "Max";
    user.lastname = "Mustermann";
    user.cash = 10000;
    user.job = new Job("Bäcker", 3000);
    
    // setup assets
    stocks = setupStocks();
    user.addAsset(stocks[0]);

    // setup liabilities
    let credit1 = new Liability("Konsum Kredit", 8000, 260);
    user.addLiability(credit1);

    let credit2 = new Liability("KFZ Kredit", 10000, 365);
    user.addLiability(credit2);

    let rent = new Liability("Miete", 0, 700);
    user.addLiability(rent);

    let policy = new Liability("Versicherung", 0, 400);
    user.addLiability(policy);

    let boytoy = new Liability("Boytoy", 0, 125);
    user.addLiability(boytoy);

    // init ui
    updateUi();
}

// play round
function playRound() {
    user.cash += user.cashflow();
    updateUi();
}

function updateUi() {
    updateHeader();
    updateIncomeTable();
    updateOutgoingTable();
    updateStocksTable();
    updateCashflowTable();
}

// ui updates

function updateHeader() {
    var welcomeString = "Willkommen " + user.displayedName();
    welcomeString += "! Du bist " + user.job.name + " und verdienst " + user.job.salary + ".";
    divHeader.innerHTML = welcomeString;
}

function updateCashflowTable() {
    var s = "<tbody>";
    s += "<th>Cashflow</th>";
    s += tableRowFrom(["Einnahmen", user.income()]);
    s += tableRowFrom(["Ausgaben", user.outgoing()]);
    s += tableRowFrom(["<b>Cashflow</b>", user.cashflow()]);
    s += tableRowFrom(["<b>Cash</b>", user.cash]);

    tableCashflow.innerHTML = s;
}

function updateIncomeTable() {
    var tableString = "<tbody>";
    tableString += "<th>Einnahmen</th>";
    
    tableString += tableRowFrom(["Gehalt", user.job.salary]);

    for (row = 0; row < user.assets.length; row++) {
        let asset = user.assets[row];

        let str1 = asset.name + " (x" + asset.amount + ")";
        let str2 = asset.cashflow * asset.amount;
        tableString += tableRowFrom([str1, str2]);
    }
    
    tableString += "</tbody>";

    tableIncome.innerHTML = tableString;
}

function updateOutgoingTable() {
    var tableString = "<tbody>";
    tableString += "<th>Ausgaben</th>";

    var colspan = 0;

    for (row = 0; row < user.liabilities.length; row++) {
        let liability = user.liabilities[row];

        let entries = [liability.name, liability.cost];
        colspan = entries.length;
        tableString += tableRowFrom(entries);

    }
    
    tableString += "</tbody>";

    tableExpenses.innerHTML = tableString;
}

function updateStocksTable() {
    
    var tableString = "<tbody>";
    tableString += tableHeaderRowsFrom(["Aktie", "Preis", "Dividende"]);
    
    for (row = 0; row < stocks.length; row++) {
        var stock = stocks[row];

        var strings = [stock.name, stock.price, stock.cashflow];
        var rowString = "<tr>";
        for (i=0; i<strings.length; i++) {
            rowString += "<td>" + strings[i] + "</td>";
        }

        // buy
        rowString += "<td><button class=default onclick=buyStockInRow("+row+")";
        if (userCanBuyStockInRow(row) == false) {
            rowString += " disabled";
        }

        // sell
        rowString += ">Buy</button></td>";
        rowString += "<td><button class=default onclick=sellStockInRow("+row+")";
        if (userOwnsStockInRow(row) == false) {
            rowString += " disabled";
        }
        rowString += ">Sell</button></td>";
        rowString += "</tr>";

        tableString += rowString;
    }
    
    tableString += "</tbody>"

    tableStocks.innerHTML = tableString;
}

function buyStockInRow(row) {
    let stock = this.stocks[row];
    if (userCanBuyStockInRow(row)) {
        console.log("buy 1x " + stock.name + " for " + stock.price);
        user.addAsset(stock);
        user.cash -= stock.price;
        updateUi();
    } else {
        alert("not enough money");
    }
    
}

function userCanBuyStockInRow(row) {
    let stock = this.stocks[row];
    var canBuy = false;
    if ((user.cash - stock.price) > 0) {
        canBuy = true;
    }
    return canBuy;
}

function userOwnsStockInRow(row) {
    let stock = this.stocks[row];
    var owns = false;
    for (i = 0; i < user.assets.length; i++) {
        let asset = user.assets[i];

        if (asset.name == stock.name) {
            owns = true;
            break;
        }
    }
    return owns;
}

function sellStockInRow(row) {
    let stockToSell = this.stocks[row];
    // check is user owns
    
    if (userOwnsStockInRow(row)) {
        console.log("sell 1x " + stockToSell.name + " for " + stockToSell.price);
        user.removeAsset(stockToSell);
        user.cash += stockToSell.price;
        updateUi();
    } else {
        alert("you do not own this asset");
    }
    
}