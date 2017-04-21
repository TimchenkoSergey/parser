import fs from 'fs';

export default isFileExists;

function isFileExists(path) {
    return new Promise(function (resolve, reject) {
        fs.exists(path, function (exists) {
            resolve(exists);
        });
    });
}