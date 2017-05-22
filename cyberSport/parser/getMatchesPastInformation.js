import getGameFromList from '../../libs/getGameId';
import isNextPageExist from './isNextPageExist';
import getTeamID       from './getTeamID';
import getEventID      from './getEventID';
import isValid         from './isValid';
import getLoadedPage   from './getLoadedPage';
import getTrimString   from '../../libs/getTrimString';

const MATCH_ROWS_SELECTOR        = '.main-wrap .main .b-match-list tr';
const MATCH_DATE_TIME_SELECTOR   = '.b-match-list-item__date time';
const MATCH_RESULT_SELECTOR      = '.b-match-list-item__entrant .b-match-list-item__score__a';
const MATCH_EVENT_SELECTOR       = '.b-match-list-item__desc-report-name a > span';
const MATCH_FIRST_TEAM_SELECTOR  = '.b-match-list-item__entrant .b-match-list-item__first-entrant ' +
                                   '.b-match-list-item__team-name ';
const MATCH_SECOND_TEAM_SELECTOR = '.b-match-list-item__entrant .b-match-list-item__second-entrant ' +
                                   '.b-match-list-item__team-name';
const MATCH_GAME_SELECTOR        = '.b-match-list-item__icon span';

export default getMatchesPastInformation;

/**
 * @function
 * @name getMatchesPastInformation
 * @description
 * Возвращает массив матчей которые уже сыграны.
 *
 * @param {string} url URL страници с матчами.
 * @param {object[]} teams Массив команд.
 * @param {object[]} events Массив турниров.
 * @return {object[]} Объект содержащий данные о сыграных матчах.
 **/
async function getMatchesPastInformation(url, teams, events) {
    let matches = [];
    let id      = 1;

    for (let i = 1; i < 2; i++) {
        const $    = await getLoadedPage(url + i);
        const rows = $(MATCH_ROWS_SELECTOR);

        rows.each(function (index) {
            try {
                if (index !== 0) {
                    const game = getGameFromList($(this).find(MATCH_GAME_SELECTOR).attr('class'));
                    const dateTime = getDateTime($(this).find(MATCH_DATE_TIME_SELECTOR).attr('datetime'),
                                                 $(this).find(MATCH_DATE_TIME_SELECTOR).attr('title'));
                    const result = getResult($(this).find(MATCH_RESULT_SELECTOR).text());
                    const firstTeam = getTrimString($(this).find(MATCH_FIRST_TEAM_SELECTOR).text());
                    const secondTeam = getTrimString($(this).find(MATCH_SECOND_TEAM_SELECTOR).text());
                    const event = $(this).find(MATCH_EVENT_SELECTOR).text();

                    if (game !== '' && allFilled({
                            date: dateTime.date,
                            time: dateTime.time,
                            resultFirst: result.first,
                            resultSecond: result.second,
                            firstTeam,
                            secondTeam,
                            event
                        })) {
                        const firstTeamID = getTeamID(teams, firstTeam, game);
                        const secondTeamID = getTeamID(teams, secondTeam, game);
                        const eventID = getEventID(events, event);

                        matches.push(getMatch(
                            id,
                            dateTime.time,
                            dateTime.date,
                            firstTeamID,
                            secondTeamID,
                            eventID,
                            result.first,
                            result.second
                        ));
                        id++;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });

        if (!isNextPageExist($)) {
            break;
        }
    }

    return matches;
}

/**
 * @function
 * @name getMatch
 * @description
 * Возвращает объект матча с переданными данными в виде аргументов.
 *
 * @param {number} id Id матча.
 * @param {string} time Время проведения матча.
 * @param {string} date Дата проведения матча.
 * @param {number} firstTeamID Id первой команды.
 * @param {number} secondTeamID Id второй команды.
 * @param {number} eventID Id турнира в котором проводится игра.
 * @param {string} resultFirst Результат игры первой команды.
 * @param {string} resultSecond Результат игры второй команды.
 * @return {object} resultSecond содержащий данные.
 **/
function getMatch(id, time, date, firstTeamID, secondTeamID, eventID, resultFirst, resultSecond) {
    return {
        id,
        time,
        date,
        firstTeamID,
        secondTeamID,
        eventID,
        resultFirst,
        resultSecond
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
        date         : 'isNonEmpty',
        time         : 'isNonEmpty',
        resultFirst  : 'isNumber',
        resultSecond : 'isNumber',
        firstTeam    : 'isNonEmpty',
        secondTeam   : 'isNonEmpty',
        event        : 'isNonEmpty'
    };

    return isValid(data, config);
}

/**
 * @function
 * @name getResult
 * @description
 * Возвращает объект с информацией о результате матча.
 *
 * @param {string} str Строка содержащая рузультат.
 * @return {object} Объект содержащий результат первой и второй команд.
 **/
function getResult(str) {
    let result = {};

    if (str) {
        result.first  = str.split(':')[0].trim();
        result.second = str.split(':')[1].trim();
    }
    else {
        result.first  = '';
        result.second = '';
    }

    return result;
}

/**
 * @function
 * @name getDateTime
 * @description
 * Возвращает объект с датой и временем проведения матча.
 *
 * @param {string} date Строка содержащая дату.
 * @param {string} time Строка содержащая время.
 * @return {object} Объект содержащий дату и время.
 **/
function getDateTime(date, time) {
    let result = {};

    if (date && time) {
        result.date = date.split('T')[0];
        result.time = time.split(',')[1].trim();
    }
    else {
        result.date = '';
        result.time = '';
    }

    return result;
}