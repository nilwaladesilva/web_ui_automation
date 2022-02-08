const config = require('config');
const reader = require('xlsx');
const https = require('https');
const fs = require('fs');

const dataFileUrl = config.get('data.fileUrl');
const dataFileLocalPath = config.get('data.localFilePath');
const dataFileDownloadPath = config.get('data.fileDownloadPath');
const fromUrl = config.get('data.fromUrl');
let dataFile;

async function readWorkSheet(sheetName){

    if(!dataFile) {
        if(!fs.existsSync(dataFileDownloadPath)) {
            await downloadDataFile();
        }
        dataFile = reader.readFile(dataFileDownloadPath);
    }

    const data = reader.utils.sheet_to_json(dataFile.Sheets[sheetName]);
    return data;

}

function downloadDataFile() {
    return new Promise((resolve, reject) => {
        if (fromUrl) {
            console.log(`Downloading data file from : ${dataFileUrl} ...`);
            
            const file = fs.createWriteStream(dataFileDownloadPath);
            https.get(dataFileUrl, (response) => {
                response.pipe(file).on('finish', function () {
                    resolve();
                    console.log("downloaded completed.");
                });
            });
            file.on('error',reject);
            
        } else {
            console.log(`Obtaining data file from : ${dataFileLocalPath} ...`);
            fs.copyFile(dataFileLocalPath, dataFileDownloadPath, (err) => {
                if(err) reject(err);
                else resolve();
            });        
        }
    });

}

function cleanUpDataFile() {
    console.log('removing data file...');
    fs.unlink(dataFileDownloadPath, e => {
        if (e) console.error(e.message);
    });
}

module.exports = {
    downloadDataFile: downloadDataFile,
    cleanUpDataFile: cleanUpDataFile,
    readWorkSheet: readWorkSheet
}