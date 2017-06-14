import model              from '../../model/model';
import saveFeatureMatches from './saveFeatureMatches';

export default updateFutureMatches;

/**
 * @function
 * @name updateFutureMatches
 * @description
 * Обновляет данные о предстоящих играх.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} matches Массив объектов с информацией о предстоящих играх.
 **/
async function updateFutureMatches(tables, matches) {
    await model.destroy(tables.matchesFeature, {});
    const teamsInDb = await model.findAll(tables.team, {});
    
    matches.forEach(function (item) {
        try {
            const firstTeamInDB  = getId(teamsInDb, item, 'firstTeamName');
            const secondTeamInDB = getId(teamsInDb, item, 'secondTeamName');

            if (firstTeamInDB && secondTeamInDB) {
                item.firstTeamID  = firstTeamInDB.team_id;
                item.secondTeamID = secondTeamInDB.team_id;
            }
            else {
                item.firstTeamID  = 0;
                item.secondTeamID = 0;
            }
        }
        catch (err) {
            console.log(err);
        }
    });

    await saveFeatureMatches(tables, matches);
}

function getId(teamsInDb, match, nameProp) {
    return teamsInDb.find(function (team) {
        return team.name == match[nameProp] && team.game_id == match.gameId;
    });
}