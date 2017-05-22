import getUrlsList     from './getUrlsList';
import downloadImage   from '../../libs/downloadImage';
import getGameId       from '../../libs/getGameId';
import isValid         from './isValid';
import getLoadedPage   from './getLoadedPage';
import getTrimString   from '../../libs/getTrimString';

const CUP_LINK_SELECTOR    = '.main-wrap .main #tournaments-list tr td a';
const CUP_LIST_SELECTOR    = 'table';
const CUP_ROWS_SELECTOR    = 'tr';
const CUP_NAME_SELECTOR    = '.battles-report-name-title a';
const CUP_DATE_SELECTOR    = '.battles-report-date';
const CUP_LOGO_SELECTOR    = '.main-wrap .main .tournament-row .tournament-table div.tournament-image a img';
const CUP_GAME_SELECTOR    = '.battles-games-col a span.icon-game';
const CUP_FOUND_SELECTOR   = '.battles-prize-col span';
const CUP_FORM_ID_SELECTOR = 'form#jsonFilterTM';

export default getCupsInformation;

/**
 * @function
 * @name getCupsInformation
 * @description
 * Возвращает массив турниров.
 *
 * @param {string} url URL страници с турнирами.
 * @return {object[]} Массив турниров.
 **/
async function getCupsInformation(url) {
    const links  = await getUrlsList(url, CUP_LINK_SELECTOR);
    let   result = [];

    for (let i = 0, len = links.length; i < len; i++) {
        try {
            const $ = await getLoadedPage(links[i].link);
            const imgPath = await downloadImage($(CUP_LOGO_SELECTOR).attr('src'));
            //Т.к. список турниров подгружается на страницу по AJAX
            //Мы ищем на страницу id турнира, и после этого отправляем
            //запрос для получения списка турниров.
            const tournamentID = getTournamentID($(CUP_FORM_ID_SELECTOR).attr('action'));
            const ajaxUrl = getAJAXUrl(tournamentID);
            const $$ = await getLoadedPage(ajaxUrl);
            const cups = await getCupsList($$, $$(CUP_LIST_SELECTOR));

            cups.forEach(function (item) {
                item.logo = imgPath;
            });

            result.push(...cups);
        }
        catch (err) {
            console.log(err);
        }
    }

    result.forEach(function (item, i) {
        item.id = i + 1;
    });

    return result;
}

/**
 * @function
 * @name getAJAXUrl
 * @description
 * Возвращает путь для загрузки списка турниров по AJAX..
 *
 * @param {string} id Id турнира для отправки AJAX.
 * @return {string} Путь для загрузки списка турниров по AJAX.
 **/
function getAJAXUrl(id) {
    const firstPath  = '/AJAX/cached2/reports_list.php?tournament_id=';
    const secondPath = '&first_load=Y&active=N&game=&active_elems=active&sort_field=0&sort_order=0&TM_NAME=';
    
    return firstPath + id + secondPath;
}

/**
 * @function
 * @name getTournamentID
 * @description
 * Возвращает id взятый со страници из строки экшена формы.
 *
 * @param {string} str Строка экшена формы.
 * @return {string} Id турнира.
 **/
function getTournamentID(str) {
    return str.slice(str.lastIndexOf('=') + 1);
}

/**
 * @function
 * @name getCupsList
 * @description
 * Возвращает массив турниров проводимых под одним названием.
 *
 * @param {object} $ DOM объект страници.
 * @param {object} list Элемент со списком турниров.
 * @return {object[]} Массив турниров проводимых под одним названием.
 **/
async function getCupsList($, list) {
    const rows = list.find(CUP_ROWS_SELECTOR);
    let result = [];

    for (let i = 0; i < rows.length; i++) {
        if (i !== 0) {
            const name      = getTrimString($(rows[i]).find(CUP_NAME_SELECTOR).text());
            const date      = getDate($(rows[i]).find(CUP_DATE_SELECTOR).text());
            const found     = $(rows[i]).find(CUP_FOUND_SELECTOR).text();
            const gameClass = $(rows[i]).find(CUP_GAME_SELECTOR).attr('class');
            const gameId    = await getGameId(gameClass);

            if (gameId !== 0 && allFilled({ name, date, found })) {
                result.push(getCup(name, date, found, gameId));
            }
        }
    }

    return result;
}

/**
 * @function
 * @name getCup
 * @description
 * Возвращает объект турнира с переданными данными в виде аргументов.
 *
 * @param {string} name Название турнира.
 * @param {string} date Дата проведения турнира.
 * @param {string} found Призовой фонд турнира.
 * @param {number} gameId Игра по которой проводится турнир.
 * @return {object} Объект содержащий данные.
 **/
function getCup(name, date, found, gameId) {
    return {
        name,
        date,
        found,
        gameId
    };
}

/**
 * @function
 * @name getDate
 * @description
 * Возвращает строку содержащая дату в нужном для преобразования в объект формате.
 *
 * @param {string} str Строка содержащая дату.
 * @return {string} Строка содержащая дату в нужном для преобразования в объект формате.
 **/
function getDate(str) {
    if (!str) {
        return '';
    }

    const strArr  = str.trim().split(' ');
    const date    = strArr[1];
    const dataAtt = date.split('.');
    
    return `${dataAtt[1]}.${dataAtt[0]}.${dataAtt[2]}`;
}

/**
 * @function
 * @name allFilled
 * @description
 * Конфигирирует объект для проверки данных и проводит валидацию.
 * Возращает логическое значение валидны данные или нет.
 *
 * @param {object} data Объект с данными для проверки.
 * @return {boolean} Валидны данные или нет.
 **/
function allFilled(data) {
    const config = {
        name  : 'isNonEmpty',
        date  : 'isNonEmpty',
        found : 'isNonEmpty'
    };
    
    return isValid(data, config);
}