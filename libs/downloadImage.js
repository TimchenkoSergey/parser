import fs           from 'fs';
import sendRequest  from './sendRequest';
import getFileName  from './getFileName';
import isFileExists from './isFileExists';
import config       from '../config';

export default downloadImage;

/**
 * @function
 * @name downloadImage
 * @description
 * Сохраняет изображение на диск.
 *
 * @param {string} imageUrl URL изображения.
 * @return {string | object} path Путь к изображению на диске,
 * или Promise при успешном выполнение которого будет возврашен тотже путь,
 * или при неуспешном выполнении - обьект ошибки.
 **/
async function downloadImage(imageUrl) {
    try {
        const url      = imageUrl ? config.get('baseUrl') + imageUrl : '';
        const fileName = getFileName(url);
        const path     = config.get('pathToImages') + fileName;
        const exists   = await isFileExists(path);
        
        if (!exists) {
            //Получаем объект с изображением в бинарном виде.
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