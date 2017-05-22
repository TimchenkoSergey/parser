import getLoadedHtml   from '../../libs/getLoadedHtml';
import sendRequest     from '../../libs/sendRequest';
import isNextPageExist from './isNextPageExist';

export default getUrlsList;

/**
 * @function
 * @name getUrlsList
 * @description
 * Возвращает массив строк(выбраный из страници по заданому URL и селектору ссылок)
 * содержащий ссылки на страници.
 *
 * @param {string} url URL куда нужно отправить запрос.
 * @param {string} selector Селектор ссылок.
 * @return {string[]} Массив ссылок на страници.
 **/
async function getUrlsList(url, selector) {
    let result = [];

    for (let i = 1; i < 2; i++) {
        const urlPage = url + i;
        const urls    = await getUrlsForPage(urlPage, selector);

        result.push(...urls.links);
        
        if (urls.all) {
            break;
        }
    }

    return result;
}

/**
 * @function
 * @name getUrlsForPage
 * @description
 * Возвращает объект содержащий массив ссылок и флаг указывающий есть ли еще страници.
 *
 * @param {string} url URL куда нужно отправить запрос.
 * @param {string} selector Селектор ссылок.
 * @return {object} Объект содержащий массив ссылок и флаг указывающий есть ли еще страници.
 **/
async function getUrlsForPage(url, selector) {
    let   result    = { links : [], all : false };
    const response  = await sendRequest({ url });
    const $         = getLoadedHtml(response.body);
    const links     = $(selector);

    if (links.length === 0 || !isNextPageExist($)) {
        result.all = true;
    }

    links.each(function() {
        const link = $(this).attr('href');
        result.links.push({ link });
    });
    
    return result;
}