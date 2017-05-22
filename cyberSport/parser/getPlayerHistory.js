import getTeamID from './getTeamID';
import isValid   from './isValid';

const TEAM_SELECTOR          = 'td.team a.team-name';
const TEAM_NO_LINK_SELECTOR  = 'td.team';
const DATE_SELECTOR          = 'td.team .date';
const WIN_SELECTOR           = 'td.stats .wins span.percentage';
const LOSE_SELECTOR          = 'td.stats .loses span.percentage';
const TIE_SELECTOR           = 'td.stats .ties span.percentage';
const ROWS_SELECTOR          = 'tr';
const CUPS_SELECTOR          = '.table__involv-in-team__awards';
const PRIZE_SELECTOR         = '.rank-icon-prize';

export default getPlayerHistory;

/**
 * @function
 * @name getPlayerHistory
 * @description
 * Возвращает массив историй игр в командах для игрока.
 *
 * @param {object} $ DOM объект страници с информацией о игроке.
 * @param {object} element DOM элемент в котором мы ищем информацию.
 * @param {object[]} teams Массив команд.
 * @param {number} gameId Игра в которую игрок играет.
 * @return {object[]} Массив историй игр в командах.
 **/
function getPlayerHistory($, element, teams, gameId) {
    let   result = [];
    const rows   = element.find(ROWS_SELECTOR);

    rows.each(function (i) {
        try {
            if (i !== 0) {
                const team   = getTeamName($(this));
                const date   = getDate($(this).find(DATE_SELECTOR).text());
                const wins   = getNumbers($(this).find(WIN_SELECTOR).text());
                const ties   = getNumbers($(this).find(TIE_SELECTOR).text());
                const loses  = getNumbers($(this).find(LOSE_SELECTOR).text());
                const teamID = getTeamID(teams, team, gameId);
                const cups   = getCups($, $(this).find(CUPS_SELECTOR));

                //Если объект даты существует и данные валидны добавляем историю.
                if (date && allFilled({
                        teamID,
                        dateIn  : date.dateIn,
                        dateOut : date.dateOut,
                        wins,
                        ties,
                        loses
                    })) {
                    result.push(getHistoryObj(teamID, date.dateIn, date.dateOut, wins, ties, loses, cups));
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    });
    
    return result;
}

/**
 * @function
 * @name getCups
 * @description
 * Возвращает массив выгранных турниров игроком за команду.
 *
 * @param {object} $ DOM объект страници с информацией о игроке.
 * @param {object} element DOM элемент в котором мы ищем информацию.
 * @return {object[]} Массив выгранных турниров игроком за команду.
 **/
function getCups($, element) {
    let result = [];
    const cups = element.find(PRIZE_SELECTOR);

    cups.each(function () {
        const title  = $(this).attr('title');
        const place  = getPlace(title);
        const events = title.replace(/\•/g, '').split('\n').splice(1);
        const logo   = getLogoForCup(place);

        events.forEach(function (item) {
            result.push({
                place,
                logo,
                name : item
            });
        });
    });

    return result;
}

/**
 * @function
 * @name getPlace
 * @description
 * Возвращает строку с названием кубка.
 *
 * @param {string} str Строка содержащая название кубка.
 * @return {string} Строка с названием кубка.
 **/
function getPlace(str) {
    const places = ['Золото', 'Серебро', 'Бронза'];

    return places.find(function (item) {
        return str.indexOf(item) > -1;
    });
}

/**
 * @function
 * @name getLogoForCup
 * @description
 * Возвращает строку с путем к нужному изображению кубка.
 *
 * @param {string} str Строка содержащая название кубка.
 * @return {string} Строка с путем к нужному изображению кубка.
 **/
function getLogoForCup(str) {
    const logoMap = {
      'Золото'  : './public/img/ico-cup-gold.png',
      'Серебро' : './public/img/ico-cup-silver.png',
      'Бронза'  : './public/img/ico-cup-bronze.png'
    };

    return logoMap[str];
}

/**
 * @function
 * @name getTeamName
 * @description
 * Возвращает строку с названием команды взятую из переданного элемента.
 *
 * @param {object} element Эдемент DOM в котором ищем название команды.
 * @return {string} Строка с названием команды.
 **/
function getTeamName(element) {
    let name = '';

    if (element.find(TEAM_SELECTOR).contents()[0]) {
        name = element.find(TEAM_SELECTOR).contents()[0].data;
    }
    else if (element.find(TEAM_NO_LINK_SELECTOR).contents()[0]) {
        name = element.find(TEAM_NO_LINK_SELECTOR).contents()[0].data;
    }

    return name.trim();
}

/**
 * @function
 * @name getDate
 * @description
 * Возвращает объект содержащий дату входа в команду и дату выхода.
 *
 * @param {string} str Строка содержащая даты.
 * @return {object} Объект содержащий дату входа в команду и дату выхода.
 **/
function getDate(str) {
    if (!str) {
        return '';
    }

    let result    = {};
    let date      = str.split('-');
    let dateInArr = date[0].trim().split('.');
    //Приводим дату в формату удобному для преобразования в объект даты(MM:DD:YY)
    let dateIn    = `${dateInArr[1]}.${dateInArr[0]}.${dateInArr[2]}`;
    let dateOut;

    if (date[1] && date[1].trim() !== 'сейчас') {
        let dateOutArr = date[1].trim().split('.');
        dateOut        = `${dateOutArr[1]}.${dateOutArr[0]}.${dateOutArr[2]}`;
    }
    else {
        dateOut = Date.now();
    }

    result.dateIn  = dateIn;
    result.dateOut = dateOut;

    return result;
}

/**
 * @function
 * @name getNumbers
 * @description
 * Возвращает строку содержащую только число, остальные символы удаляет.
 *
 * @param {string} str Строка содержащая число.
 * @return {string} Строка содержая только число.
 **/
function getNumbers(str) {
    if (!str) {
        return '';
    }

    return str.split('%')[1].replace(/[\(\)]/g, '').trim();
}

/**
 * @function
 * @name getPayer
 * @description
 * Возвращает объект истории игрока с переданными данными в виде аргументов.
 *
 * @param {number} teamID Id команды в которой играл игрок.
 * @param {string} dateIn Дата прихода в команду.
 * @param {string} dateOut Дата ухода из команды.
 * @param {string} wins Количество побед.
 * @param {string} ties Количество ничьих.
 * @param {string} loses Количество поражений.
 * @param {object[]} cups Кубки выгранные в команде.
 * @return {object} Объект содержащий данные.
 **/
function getHistoryObj(teamID, dateIn, dateOut, wins, ties, loses, cups) {
    return {
        teamID,
        dateIn,
        dateOut,
        cups,
        wins,
        ties,
        loses
    };
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
        teamID  : 'isNumber',
        dateIn  : 'isNonEmpty',
        dateOut : 'isNonEmpty',
        wins    : 'isNumber',
        ties    : 'isNumber',
        loses   : 'isNumber'
    };

    return isValid(data, config);
}