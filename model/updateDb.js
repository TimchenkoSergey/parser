import getTables          from './tables';
import dbInit             from './dbInit';
import updateTeams        from '../cyberSport/model/updateTeams';
import updateEvents       from '../cyberSport/model/updateEvents';

export default updateDb;

/**
 * @function
 * @name updateDb
 * @description
 * Обновить базу данными.
 *
 * @param {object[]} teams          Массив с данными для таблицы с информацией о командах.
 * @param {object[]} events         Массив с данными для таблицы с информацией о турнирах.
 * @param {object[]} players        Массив с данными для таблицы с информацией о игроках.
 * @param {object[]} pastMatches    Массив с данными для таблицы с информацией о прошедших матчах.
 * @param {object[]} featureMatches Массив с данными для таблицы с информацией о будущих матчах.
 **/
async function updateDb(teams, events, players, pastMatches, featureMatches) {
    const {
        Sequelize,
        sequelize
    } = await dbInit();
    //Объект с объектами таблиц.
    const models = await getTables(sequelize, Sequelize);

    await updateTeams(models, teams);
    await updateEvents(models, events);
}