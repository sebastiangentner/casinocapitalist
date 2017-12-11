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


function tableHeaderRowFrom(strings) {
    if (strings.length == 0) {return}
    var rowString = "<thead>";
    rowString += tableRowFrom(strings);
    rowString += "</thead>";
    return rowString
}