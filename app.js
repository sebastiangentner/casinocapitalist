// ui elements
let divHeader = document.getElementById("divHeader");
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
}

async function windowDidLoad() {

    user = new User();
    user.firstname = "Max";
    user.lastname = "Mustermann";
    user.cash = 1000;

    divHeader.innerHTML = "Willkommen! " + user.displayedName();
    
    stocks = createStocks(20);
    updateStocksTable();
}

// ui updates

function updateStocksTable() {
    
    var tableString = "<tbody>";
    tableString += tableHeaderRowFrom(["Aktie", "Preis", "Dividende"]);
    
    for (row = 0; row < stocks.length; row++) {
        var stock = stocks[row];

        tableString += tableRowFrom([stock.name, stock.price, stock.dividend]);
    }
    
    tableString += "</tbody>"

    tableStocks.innerHTML = tableString;
}
