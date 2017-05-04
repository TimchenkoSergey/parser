export default isNextPageExist;

const NEXT_PAGE_LINK_SELECTOR = 'ul.pager li.next a';

/**
 * @function
 * @name isNextPageExist
 * @description
 * Проверяет существует ли следующая страница,
 * посредством проверки наличия на странице ссылки (наличия в ней текста)
 * ведущей на следующею страницу.
 *
 * @param {object} $ Объект DOM для страници.
 * @return {boolean} Значение существует ли страница.
 **/
function isNextPageExist($) {
    return $(NEXT_PAGE_LINK_SELECTOR).text() ? true : false
}