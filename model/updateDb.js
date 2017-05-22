import initial             from './initial';
import updateTeams         from '../cyberSport/model/updateTeams';
import updateEvents        from '../cyberSport/model/updateEvents';
import updatePastMatches   from '../cyberSport/model/updatePastMatches';
import updateFutureMatches from '../cyberSport/model/updateFutureMatches';
import updatePlayers       from '../cyberSport/model/updatePlayers';

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
    const models = await initial();

    await updateTeams(models, teams);
    await updateEvents(models, events);
    await updatePlayers(models, players, teams, events);
    await updatePastMatches(models, pastMatches);
    await updateFutureMatches(models, featureMatches);
}