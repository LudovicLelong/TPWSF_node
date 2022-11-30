
// create express app
const express = require("express")
const app = express()
const port = 3000


var progressBar = 0; 

/* 3 étapes: les 3 fonctions / code ci-dessus sont appelées dans l'ordre suivant: 
appelé par promise après */

  /* Etape 1: dowload ZIP */
  function dowloadZip() {
    const download = require('download-file')


    const dowload = download('https://files.data.gouv.fr/insee-sirene/StockEtablissementLiensSuccession_utf8.zip', function(err){
        if (err) throw err
        console.log("Le fichier est téléchargé avec succès")
    })

    return dowload; progressBar = 1 ; console.log("Etape 1 terminée");
}


/* Etape 2: DéZip ZIP file */

function unzip() {
    const unzipper = require('unzipper');
    const fs = require('fs');

    return [
        fs.createReadStream('StockEtablissementLiensSuccession_utf8.zip')
        .pipe(unzipper.Parse())
        .on('entry', function (entry) {
            const fileName = entry.path;
            const type = entry.type;
            const size = entry.size;
            if (fileName === "StockEtablissementLiensSuccession_utf8.csv") {
                entry.pipe(fs.createWriteStream('StockEtablissementLiensSuccession_utf8.csv'));
            } else {
                entry.autodrain();
            }
        }),
        progressBar = 2,
    ] 
    
}        

                

/* Les promises pour lancer les fonctions en série */

 /* déclenchement 1: téléchargement du fichier ZIP */
    
    function promiseDowload() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                progressBar = 10;
                resolve(progressBar);
            }, 100);
        });
    }

    // call the promise function
    promiseDowload().then(successCallback2, failureCallback);


// this function will be called when the promise is resolved
    function successCallback2(result) {
        dowloadZip()
        console.log("Etape 1 terminée");
    }
    
    // this function will be called when the promise is rejected
    function failureCallback(error) {
        console.log("Etape 1 échouée");
    }



/* déclenchement 2: promiseUnzip() */

    function promiseUnzip() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                progressBar = 10;
                resolve(progressBar);
            }, 100000);
        });
    }

    // call the promise function
    promiseUnzip().then(successCallback, failureCallback2);


// this function will be called when the promise is resolved
    function successCallback(result) {
        unzip();
        console.log("Etape 2 terminée");
        progressBar = 3;
    }
    
    // this function will be called when the promise is rejected
    function failureCallback2(error) {
        console.log("Etape 2 échouée");
    }



/* Fin des promises */

// promise fini, on lance la lecture du fichier CSV



// Attendre avant de commenencer
setTimeout(function() {
    console.log(progressBar);
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


            // coumpter le nombre de true dans la 4ème colonne
            var count = 0;
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][4] == "true") {
                    count++;
                }
            }
            console.log('Il y a ' + count);
            
                
                progressBar = 3;
               
               ////////// . console.log("Etape 3 terminée" + csvData +  );
               
                //  route
                app.get("/", (req, res) => {
                    res.send('Il y a tant d\'entreprise ' + csvData.length + ' Il y a  ' + csvColumn);
                });
    
                app.listen(port, () => {
                    console.log(`Server is listening on port ${port}`);
                });
       

              
}, 900000);



 