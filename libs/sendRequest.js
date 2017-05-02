import request from 'request';

export default sendRequest;

/**
 * @function
 * @name sendRequest
 * @description
 * Проверяет существует ли файл по указанному пути.
 *
 * @param {object} options Объект с конфигурациями для отправки запроса, указывается свойства url и encoding.
 * @return {object} request Объект Promise в функцию успешного выполнения которого передается объект с ответом,
 * а в функцию неуспешного выполнения которого передается объект ошибки.
 **/
async function sendRequest(options) {
    return new Promise(function (resolve, reject) {
        request.get(options, function (err, res, body) {
            if (err) {
                reject(err);
            }
            
            resolve({ res, body });
        });
    });
}