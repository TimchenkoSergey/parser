import fs           from 'fs';
import sendRequest  from './sendRequest';
import getFileName  from './getFileName';
import isFileExists from './isFileExists';
import config       from '../config';

export default downloadImage;

async function downloadImage(pathToImage) {
    try {
        const url      = pathToImage ? config.get('baseUrl') + pathToImage : '';
        const fileName = getFileName(url);
        const path     = config.get('pathToImages') + fileName;
        const exists   = await isFileExists(path);
        
        if (!exists) {
            const response = await sendRequest({ url, encoding : 'binary' });

            return new Promise(function (resolve, reject) {
                fs.writeFile(path, response.res.body, { encoding : 'binary' }, function (err) {
                    if (err) {
                        reject(err);
                    }

                    resolve(path);
                });
            });
        }
        else {
            return path;
        }
    }
    catch (err) {
        console.error(err);
    }
}