import sendRequest   from '../../libs/sendRequest';
import getLoadedHtml from '../../libs/getLoadedHtml';
import config        from '../../config';

export default getLoadedPage;

/**
 * @function
 * @name getLoadedPage
 * @description
 * Возвращает DOM объект построеный для страници по переданой ссылке.
 *
 * @param {string} link Ссылка на страницу, которую нужно распарсить.
 * @return {object} DOM объект построеный для страници по переданой ссылке.
 **/
async function getLoadedPage(link) {
    const response  = await sendRequest(config.get('baseUrl') + link);
    
    return getLoadedHtml(response.body);
}