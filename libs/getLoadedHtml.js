import cheerio from 'cheerio';

export default getLoadedHtml;

/**
 * @function
 * @name getLoadedHtml
 * @description
 * Возвращает объект DOM построенный для переданного в функцию HTML кода.
 *
 * @param {string} html Строка с HTML кодом страници.
 * @return {object} dom Построеный DOM.
 **/
function getLoadedHtml(html) {
    return cheerio.load(html);
}