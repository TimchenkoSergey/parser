import model from '../../model/model';

export default saveBet;

/**
 * @function
 * @name saveBet
 * @description
 * Сохраняет переданные данные в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object} bet Объект с информацией о коэфах на игру.
 **/
async function saveBet(tables, bet) {
    try {
        await model.save(tables.bet, {
            bet_id                  : bet.id,
            bookmaker_id            : bet.bookmakerId,
            first_team_id           : bet.firstTeamId,
            second_team_id          : bet.secondTeamId,
            match_id                : bet.matchId,
            first_team_coefficient  : bet.firstTeamCoefficient,
            second_team_coefficient : bet.secondTeamCoefficient,
            tie_coefficient         : bet.tieCoefficient
        });
    }
    catch (err) {
        console.log(err);
    }
}