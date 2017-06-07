import getUrlsList      from './getUrlsList';
import downloadImage    from '../../libs/downloadImage';
import getGameId        from '../../libs/getGameId';
import getPlayerHistory from './getPlayerHistory';
import isValid          from './isValid';
import getEventID       from './getEventID';
import getLoadedPage    from '../../libs/getLoadedPage';
import getTrimString    from '../../libs/getTrimString';

const PLAYERS_LINK_SELECTOR     = '.item__nick';
const PLAYERS_NICK_SELECTOR     = '.main h2.nick';
const PLAYERS_LOGO_SELECTOR     = '.main .b-profileUser .b-user-logo img';
const PLAYERS_COUNTRY_SELECTOR  = '.main .b-profileUser p.name span.where.b-flag';
const PLAYERS_GAME_SELECTOR     = '.main .b-profileUser .rating .rating__game span';
const PLAYERS_RATING_SELECTOR   = '.main .b-profileUser .rating .rating__value';
const PLAYERS_HISTORY_SELECTOR  = '.main .table__involv-in-team';

export default getPlayersInformation;

/**
 * @function
 * @name getPlayersInformation
 * @description
 * Возвращает массив объектов содержащих информацию о игроках.
 *
 * @param {string} url URL куда нужно отправить запрос.
 * @param {object[]} teams Массив команд.
 * @param {object[]} events Массив турниров.
 * @return {object[]} Массив объектов содержащих информацию о игроках.
 **/
async function getPlayersInformation(url, teams, events) {
    const links  = await getUrlsList(url, PLAYERS_LINK_SELECTOR);
    let   result = [];
    let   id     = 1;

    for (let i = 0, len = links.length; i < len; i++) {
        try {
            const $         = await getLoadedPage(links[i].link);
            const nick      = getTrimString($(PLAYERS_NICK_SELECTOR).text());
            const country   = getTrimString($(PLAYERS_COUNTRY_SELECTOR).attr('title'));
            const logoPath  = $(PLAYERS_LOGO_SELECTOR).attr('src');
            const imgPath   = await downloadImage(logoPath);
            const rating    = $(PLAYERS_RATING_SELECTOR).text();
            const gameId    = await getGameId($(PLAYERS_GAME_SELECTOR).attr('class'));
            const history   = getPlayerHistory($, $(PLAYERS_HISTORY_SELECTOR), teams, gameId);

            //Если игра игрока это одна из интресующих нас и данные валидны добавляем игрока.
            if (gameId !== 0 && allFilled({ id, nick, imgPath, country, gameId, rating })) {
                result.push(getPayer(id, nick, imgPath, country, gameId, rating, history));
                id++;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    setID(result, events);

    return result;
}

/**
 * @function
 * @name setID
 * @description
 * Проставляет значения полей Id для историй игроков в командах и для выграных кубков.
 *
 * @param {object[]} result Массив игроков.
 * @param {object[]} events Массив турниров.
 **/
function setID(result, events) {
    let historyID = 1;
    let cupID     = 1;

    result.forEach(function (player) {
        if (player.history && player.history.length > 0) {
            const playerID = player.id;

            player.history.forEach(function (history) {
                history.playerID  = playerID;
                history.historyID = historyID;

                if (history.cups && history.cups.length > 0) {

                    history.cups.forEach(function (cup) {
                        cup.playerID  = playerID;
                        cup.historyID = historyID;
                        cup.cupID     = cupID;
                        cup.eventID   = getEventID(events, cup.name);

                        cupID++;
                    });
                }
                historyID++;
            });
        }
    });
}

/**
 * @function
 * @name getPayer
 * @description
 * Возвращает объект игрока с переданными данными в виде аргументов.
 *
 * @param {number} id Id игрока.
 * @param {string} nick Ник игрока.
 * @param {string} photo Путь к фото игрока.
 * @param {number} rating Рэйтинг игрока.
 * @param {number} gameId Игра в которую игрок играет.
 * @param {string} country Страна игрока.
 * @param {object[]} history История игр в командах игрока.
 * @return {object} Объект содержащий данные.
 **/
function getPayer(id, nick, photo, country, gameId, rating, history) {
    return {
        id,
        nick,
        photo,
        country,
        gameId,
        rating,
        history,
        gbRating : 0
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
        id      : 'isNumber',
        nick    : 'isNonEmpty',
        imgPath : 'isNonEmpty',
        country : 'isNonEmpty',
        rating  : 'isNumber',
        gameId  : 'isNumber'
    };

    return isValid(data, config);
}