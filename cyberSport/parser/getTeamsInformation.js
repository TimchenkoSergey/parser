import getUrlsList     from './getUrlsList';
import downloadImage   from '../../libs/downloadImage';
import getGameId       from '../../libs/getGameIdByClass';
import isValid         from './isValid';
import getLoadedPage   from '../../libs/getLoadedPage';
import getTrimString   from '../../libs/getTrimString';

const TEAM_LINK_SELECTOR   = '.main td.team a';
const TEAM_NAME_SELECTOR   = '.main h1';
const TEAM_LOGO_SELECTOR   = '.main .b-team-logo img';
const TEAM_RATING_SELECTOR = '.main .b-profile .rating .rating__value';
const TEAM_GAME_SELECTOR   = '.main .b-profile .rating .rating__game span';

export default getTeamsInformation;

/**
 * @function
 * @name getTeamsInformation
 * @description
 * Возвращает массив объектов содержащих информацию о командах.
 *
 * @param {string} url URL куда нужно отправить запрос.
 * @return {object[]} Массив объектов содержащих информацию о командах.
 **/
async function getTeamsInformation(url) {
    const links  = await getUrlsList(url, TEAM_LINK_SELECTOR);
    let   result = [];
    let   id     = 1;
    
    for (let i = 0, len = links.length; i < len; i++) {
        try {
            const $         = await getLoadedPage(links[i].link);
            const name      = getTrimString($(TEAM_NAME_SELECTOR).text());
            const logoPath  = $(TEAM_LOGO_SELECTOR).attr('src');
            const rating    = getTrimString($(TEAM_RATING_SELECTOR).text());
            const imgPath   = await downloadImage(logoPath);
            const gameId    = await getGameId($(TEAM_GAME_SELECTOR).attr('class'));
            
            //Если игра команды это одна из интресующих нас и данные валидны добавляем команду.
            if (gameId !== 0 && allFilled({ id, name, imgPath, rating, gameId })) {
                result.push(getTeam(id, name, imgPath, rating, gameId));
                id++;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return result;
}

/**
 * @function
 * @name getTeam
 * @description
 * Возвращает объект команды с переданными данными в виде аргументов.
 *
 * @param {number} id Id команды.
 * @param {string} name Название команды.
 * @param {string} logo Путь к логотипу команды.
 * @param {string} rating Рэйтинг команды.
 * @param {number} gameId Игра в которую команда играет.
 * @return {object} Объект содержащий данные.
 **/
function getTeam(id, name, logo, rating, gameId) {
    return {
        id,
        name,
        logo,
        rating,
        gameId,
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
        name    : 'isNonEmpty',
        imgPath : 'isNonEmpty',
        rating  : 'isNumber',
        gameId  : 'isNumber'
    };
    
    return isValid(data, config);
}