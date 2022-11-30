
// read csv file
var csv = require('csv');
var fs = require('fs');
var path = require('path');
const { Z_PARTIAL_FLUSH } = require('zlib');
var csvPath = path.join('StockEtablissementLiensSuccession_utf8.csv');
var csvData = [];
var csvStream = fs.createReadStream
(csvPath).
pipe(csv.parse({delimiter: ','})).
on('data', function(dataRow) {
        csvData.push(dataRow);
    }).on('end', function() { 
        console.log(csvData);
    }
);

// console.log(csvData);
