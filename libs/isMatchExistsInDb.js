import isDateInRangeOfOneDay from './isDateInRangeOfOneDay';
import isTeamsMatch          from './isTeamsMatch';

export default isMatchExistsInDb;

/**
 * @function
 * @name isMatchExistsInDb
 * @description
 * Проверяет равны ли данный матч и матч в базе данных.
 *
 * @param {object} match Матч для проверки.
 * @param {object} matchInDb Матч из базы.
 * @return {boolean} True если они равны, иначе false.
 **/
function isMatchExistsInDb(match, matchInDb) {
    return isDateInRangeOfOneDay(matchInDb.date, match.date) &&
        isTeamsMatch(matchInDb.first_team_name, match.firstTeamName, match.secondTeamName) &&
        isTeamsMatch(matchInDb.second_team_name, match.firstTeamName, match.secondTeamName)
}