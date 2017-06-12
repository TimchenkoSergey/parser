import sendRequest  from '../libs/sendRequest';
import model        from '../model/model';
import getGameId    from '../libs/getGameId';
import isCoefficientGraterThanZero from '../libs/isCoefficientGraterThanZero';
import saveCoefficients            from '../cyberSport/model/saveCoefficientsBets';

const MILLISECONDS_IN_SECOND = 1000;
const EGB_URL                = 'https://egb.com/bets?st=0&ut=0&f=';
const BOOKMAKER_NAME         = 'egb';

export default getEGB;

/**
 * @function
 * @name getEGB
 * @description
 * Парсит сайт egb.
 *
 * @param {object} tables Объект таблиц.
 **/
async function getEGB(tables) {
    const response    = await sendRequest(EGB_URL);
    const bets        = JSON.parse(response.body).bets;
    const bookmaker   = await model.findAll(tables.bookmaker, { name : BOOKMAKER_NAME });
    const matchesInDb = await model.findAll(tables.matchesFeature, {});

    for (let i = 0, len = bets.length; i < len; i++) {
        const game = getGameName(bets[i].game);
        
        if (game) {
            const gameId = await getGameId(game);
            const match  = getMatch(bets[i]);

            if (isCoefficientGraterThanZero(match)) {
                await saveCoefficients(match, matchesInDb, gameId, bookmaker, tables);
            }
        }
    }
}

/**
 * @function
 * @name getMatch
 * @description
 * Возращает преобразованную информацию о матче.
 *
 * @param {object} match Объект таблиц.
 * @return {object} Преобразованный объект.
 **/
function getMatch(match) {
    const date              = new Date(match.date * MILLISECONDS_IN_SECOND);
    const firstCoefficient  = + match.coef_1;
    const secondCoefficient = + match.coef_2;
    const firstTeam         = match.gamer_1;
    const secondTeam        = match.gamer_2;
    const firstTeamName     = getTeamName(firstTeam.nick);
    const secondTeamName    = getTeamName(secondTeam.nick);
    
    return {
        date,
        firstCoefficient,
        secondCoefficient,
        firstTeamName,
        secondTeamName
    };
}

/**
 * @function
 * @name getGameName
 * @description
 * Возращает корректное название игры из базы.
 *
 * @param {string} game Строка содержащая название игры.
 * @return {string} Корректное название игры из базы.
 **/
function getGameName(game) {
    const gameMap = {
        'Dota2'          : 'dota2',
        'LoL'            : 'lol',
        'StarCraft2'     : 'sc2',
        'Counter-Strike' : 'cs-go'
    };

    return gameMap[game];
}

/**
 * @function
 * @name getTeamName
 * @description
 * Возращает корректное название команды.
 *
 * @param {string} name Строка содержащая имя команды.
 * @return {string} Название команды.
 **/
function getTeamName(name) {
    let result = name;

    if (name.indexOf('(') > -1) {
        result = name.slice(0, name.indexOf('('));
    }

    return result.trim();
}