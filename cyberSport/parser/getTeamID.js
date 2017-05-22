export default getTeamID;

/**
 * @function
 * @name getTeamID
 * @description
 * Возвращает из массива команд id команды с подходящим именем и игрой,
 * если такой нет возрашает 0.
 *
 * @param {object[]} teams Массив команд.
 * @param {string} name Имя искомой команды.
 * @param {number} gameId Игра искомой команды.
 * @return {number} Id искомой команды или 0 если ни одна не подошла.
 **/
function getTeamID(teams, name, gameId) {
    const result = teams.find(function (item) {
        return item.name === name && item.gameId === gameId;
    });

    if (result) {
        return result.id;
    }
    
    return 0;
}