import request from 'request';

export default sendRequest;

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