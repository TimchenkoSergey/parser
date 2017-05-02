import model from '../../model/model';

export default saveTeams;

/**
 * @function
 * @name saveTeams
 * @description
 * Сохраняет переданные данные из массива в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} teams Массив объектов с информацией о командах.
 **/
function saveTeams(tables, teams) {
    teams.forEach(function (team) {
        try {
            model.save(tables.team, {
                team_id   : +team.id,
                rating    : +team.rating,
                rating_gb : +team.gbRating,
                name      : team.name,
                logo      : team.logo,
                game      : team.game
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}