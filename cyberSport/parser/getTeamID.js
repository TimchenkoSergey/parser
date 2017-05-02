export default getTeamID;

function getTeamID(teams, name, game) {
    const result = teams.find(function (item) {
        return item.name === name && item.game === game;
    });

    if (result) {
        return result.id;
    }
    
    return 0;
}