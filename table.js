// table helper

function tableRowFrom(strings) {
    if (strings.length == 0) {return}
    var rowString = "<tr>";
    for (i=0; i<strings.length; i++) {
        rowString += "<td>" + strings[i] + "</td>";
    }
    rowString += "</tr>";
    return rowString;
} 


function tableHeaderRowsFrom(strings) {
    if (strings.length == 0) {return}
    var rowString = "<tr>";
    for (i=0; i<strings.length; i++) {
        rowString += "<th>" + strings[i] + "</th>";
    }
    rowString += "</tr>";
    return rowString
}