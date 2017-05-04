import model from '../../model/model';

export default saveFeatureMatches;

/**
 * @function
 * @name saveFeatureMatches
 * @description
 * Сохраняет переданные данные из массива в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} matches Массив объектов с информацией о будущих матчах.
 **/
async function saveFeatureMatches(tables, matches) {
    matches.forEach(async function (match) {
        try {
            await model.save(tables.matchesFeature,  {
                competition_feature_id : +match.id,
                event_id               : +match.eventID,
                first_team_id          : +match.firstTeamID,
                second_team_id         : +match.secondTeamID,
                date                   : new Date(match.date),
                time                   : match.time
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}