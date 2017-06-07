import initial            from './initial';
import saveTeams          from '../cyberSport/model/saveTeams';
import saveEvents         from '../cyberSport/model/saveEvents';
import savePlayers        from '../cyberSport/model/savePlayers';
import savePastMatches    from '../cyberSport/model/savePastMatches';
import saveFeatureMatches from '../cyberSport/model/saveFeatureMatches';

export default fillDB;

/**
 * @function
 * @name fillDB
 * @description
 * Заполняет базу данными.
 *
 * @param {object[]} teams          Массив с данными для таблицы с информацией о командах.
 * @param {object[]} events         Массив с данными для таблицы с информацией о турнирах.
 * @param {object[]} players        Массив с данными для таблицы с информацией о игроках.
 * @param {object[]} pastMatches    Массив с данными для таблицы с информацией о прошедших матчах.
 * @param {object[]} featureMatches Массив с данными для таблицы с информацией о будущих матчах.
 **/
async function fillDB(teams, events, /*players,*/ pastMatches, featureMatches) {
    const models = await initial();

    await saveTeams(models, teams);
    await saveEvents(models, events);
    //await savePlayers(models, players);
    await savePastMatches(models, pastMatches);
    await saveFeatureMatches(models, featureMatches);
}