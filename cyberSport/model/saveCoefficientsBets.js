import isMatchExistsInDb from '../../libs/isMatchExistsInDb';
import getMaxId          from '../../libs/getMaxId';
import model             from '../../model/model';
import saveBet           from './saveBet';

export default saveCoefficients;

/**
 * @function
 * @name saveCoefficients
 * @description
 * Сохроняет новые ставки с коэфами.
 *
 * @param {object} match Объект матча.
 * @param {object[]} matchesInDb Массив объектов матчей в бд.
 * @param {number} gameId Id игры.
 * @param {object} bookmaker Объект букмекера.
 * @param {object} tables Объект таблиц.
 **/
async function saveCoefficients(match, matchesInDb, gameId, bookmaker, tables) {
    const bets = await model.findAll(tables.bet, {});
    let   id   = getMaxId(bets, 'bet_id');

    for (let j = 0; j < matchesInDb.length; j++) {
        try {
            if (gameId == matchesInDb[j].game_id && isMatchExistsInDb(match, matchesInDb[j])) {
                id++;

                const betInDb = bets.find(function (item) {
                    return item.bookmaker_id == bookmaker[0].bookmaker_id &&
                        item.match_id     == matchesInDb[j].competition_feature_id;
                });

                if (!betInDb) {
                    await saveBet(tables, {
                        id                    : id,
                        bookmakerId           : bookmaker[0].bookmaker_id,
                        firstTeamId           : matchesInDb[j].first_team_id,
                        secondTeamId          : matchesInDb[j].second_team_id,
                        matchId               : matchesInDb[j].competition_feature_id,
                        firstTeamCoefficient  : match.firstCoefficient,
                        secondTeamCoefficient : match.secondCoefficient,
                        tieCoefficient        : 0
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}