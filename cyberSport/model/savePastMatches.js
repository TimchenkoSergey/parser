import model from '../../model/model';

export default savePastMatches;

/**
 * @function
 * @name savePastMatches
 * @description
 * Сохраняет переданные данные из массива в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} matches Массив объектов с информацией о прошедщих матчах.
 **/
function savePastMatches(tables, matches) {
    matches.forEach(function (match) {
        try {
            model.save(tables.matchesPast, {
                competition_past_id : +match.id,
                event_id            : +match.eventID,
                first_team_id       : +match.firstTeamID,
                second_team_id      : +match.secondTeamID,
                result_first        : +match.resultFirst,
                result_second       : +match.resultSecond,
                date                : new Date(match.date),
                time                : match.time
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}