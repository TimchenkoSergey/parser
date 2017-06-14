import sendRequest  from '../libs/sendRequest';
import model        from '../model/model';
import getGameId    from '../libs/getGameId';
import isCoefficientGraterThanZero from '../libs/isCoefficientGraterThanZero';
import saveCoefficients            from '../cyberSport/model/saveCoefficientsBets';

const MILLISECONDS_IN_SECOND = 1000;
const ONE_X_URL              = 'https://1xbetua.com/LineFeed/Get1x2_Zip?sports=40&count=50&tf=1000000&tz=3&mode=4&country=2';
const BOOKMAKER_NAME         = '1xBet';

export default oneX;

/**
 * @function
 * @name oneX
 * @description
 * Парсит сайт 1xBet.
 *
 * @param {object} tables Объект таблиц.
 **/
async function oneX(tables) {
    const response    = await sendRequest(ONE_X_URL);
    const bets        = JSON.parse(response.body).Value;
    const bookmaker   = await model.findAll(tables.bookmaker, { name : BOOKMAKER_NAME });
    const matchesInDb = await model.findAll(tables.matchesFeature, {});

    for (let i = 0, len = bets.length; i < len; i++) {
        try {
            const game = getGameName(bets[i].L);

            if (game) {
                const gameId = await getGameId(game);
                const match  = getMatch(bets[i]);

                if (isCoefficientGraterThanZero(match)) {
                    await saveCoefficients(match, matchesInDb, gameId, bookmaker, tables);
                }
            }
        }
        catch (err) {
            console.log(err);
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
    const date              = new Date(match.S * MILLISECONDS_IN_SECOND);
    const firstCoefficient  = + match.E[0].C;
    const secondCoefficient = + match.E[1].C;
    const firstTeamName     = match.O1;
    const secondTeamName    = match.O2;

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
 * @param {string} gameString Строка содержащая название игры.
 * @return {string} Корректное название игры из базы.
 **/
function getGameName(gameString) {
    const game = gameString.split('.')[0];

    const gameMap = {
        'Dota 2'            : 'dota2',
        'League of Legends' : 'lol',
        'StarCraft II'      : 'sc2',
        'CS:GO'             : 'cs-go'
    };

    return gameMap[game];
}