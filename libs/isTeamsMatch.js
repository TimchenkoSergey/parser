import teamsMap from '../teamsMap';

export default isTeamsMatch;

/**
 * @function
 * @name isTeamsMatch
 * @description
 * Проверяет сходиться ли название команды матче с названиями из базы.
 *
 * @param {string} team Имя команды для проверки.
 * @param {string} firstTeamInBet Имя первой команды из базы.
 * @param {string} secondTeamInBet Имя второй команды из базы.
 * @return {boolean} True если они равны, иначе false.
 **/
function isTeamsMatch(team, firstTeamInBet, secondTeamInBet) {
    const teams = teamsMap[team] || [];

    return teams.includes(firstTeamInBet)  ||
        teams.includes(secondTeamInBet) ||
        team == firstTeamInBet          ||
        team == secondTeamInBet;
}