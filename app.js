// ui elements
let divHeader = document.getElementById("divHeader");

let divIncome = window.document.getElementById("divIncome");
let tableIncome = window.document.getElementById("tableIncome");

let divExpenses = window.document.getElementById("divExpenses");
let tableExpenses = window.document.getElementById("tableExpenses");

let divCash = window.document.getElementById("divCash");

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

    user = new User();
    user.firstname = "Max";
    user.lastname = "Mustermann";
    user.cash = 1000;
    user.job = new Job("Lehrer", 2500);
    
    stocks = setupStocks();

    let credit = new Liability();
    credit.name = "Auto Kredit";
    credit.cost = 250;
    credit.price = 10000;
 
    user.addAsset(stocks[0]);
    user.addLiability(credit);

    updateUi();
}

// play round
function playRound() {

    user.cash += user.cashflow();

    updateUi();
}

function updateUi() {
    updateCash();
    updateHeader();
    updateIncomeTable();
    updateOutgoingTable();
    updateStocksTable();
}


// ui updates

function updateCash() {
    var str = "Cash: " + user.cash;
    divCash.innerHTML = str;
}

function updateHeader() {
    var welcomeString = "Willkommen " + user.displayedName();
    welcomeString += "! Du bist " + user.job.name + " und verdienst " + user.job.salary + ".";
    divHeader.innerHTML = welcomeString;
}

function updateIncomeTable() {
    var tableString = "<tbody>";
    tableString += "<th>Einnahmen</th>";
    
    tableString += tableRowFrom(["Gehalt", user.job.salary]);

    for (row = 0; row < user.assets.length; row++) {
        let asset = user.assets[row];

        tableString += tableRowFrom([asset.name, asset.cashflow]);
    }
    
    tableString += "<tfoot><tr><td colspan=" + 2 +">";
    tableString += "+" + user.income();
    tableString += "</td></tr></tfoot>";
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
    
    tableString += "<tfoot><tr><td colspan=" + colspan +">";
    tableString += user.outgoing();
    tableString += "</td></tr></tfoot>";
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
        rowString += "<td onclick=buyStockInRow("+row+")>buy</td>";
        rowString += "<td onclick=sellStockInRow("+row+")>sell</td>";
        rowString += "</tr>";

        tableString += rowString;
    }
    
    tableString += "</tbody>"

    tableStocks.innerHTML = tableString;
}

function buyStockInRow(row) {
    let stock = this.stocks[row];
    if ((user.cash - stock.price) > 0) {
        console.log("buy 1x " + stock.name + " for " + stock.price);
        user.addAsset(stock);
        user.cash -= stock.price;
        updateUi();
    } else {
        alert("not enough money");
    }
    
}

function sellStockInRow(row) {
    let stockToSell = this.stocks[row];
    // check is user owns
    var owns = false;
    for (i = 0; i < user.assets.length; i++) {
        let asset = user.assets[i];

        if (asset.name == stockToSell.name) {
            owns = true;
            break;
        }
    }

    if (owns) {
        console.log("sell 1x " + stockToSell.name + " for " + stockToSell.price);
        user.removeAsset(stockToSell);
        user.cash += stockToSell.price;
        updateUi();
    } else {
        alert("you do not own this asset");
    }
    
}