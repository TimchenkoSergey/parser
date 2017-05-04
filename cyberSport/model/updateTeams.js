import model     from '../../model/model';
import saveTeams from './saveTeams';
import getMaxId  from '../../libs/getMaxId';

export default updateTeams;

/**
 * @function
 * @name updateTeams
 * @description
 * Обновляет данные о командах.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} teams Массив объектов с информацией о командах.
 **/
async function updateTeams(tables, teams) {
    const teamsInDb = await model.findAll(tables.team, {});
    let   id        = getMaxId(teamsInDb, 'team_id');
    
    teams.forEach(async function (item) {
        const team = teamsInDb.find(function (teamInDb) {
            return item.name === teamInDb.name && item.game === teamInDb.game;
        });

        if (team) {
            await updateRating(tables.team, item, team);
        }
        else {
            id++;
            item.id = id;
            await saveTeams(tables, [ item ]);
        }
    });
}

/**
 * @function
 * @name updateRating
 * @description
 * Обновляет рейтинг команды.
 *
 * @param {object} table Объект с объектами таблиц.
 * @param {object} team Объект только распаршеной команды.
 * @param {object} teamInDb Объект команды из базы данных.
 **/
async function updateRating(table, team, teamInDb) {
    if (+team.rating !== +teamInDb.rating) {
        await model.update(table, { team_id : teamInDb.team_id }, { rating : +team.rating });
    }
}