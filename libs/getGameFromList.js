import config from '../config';

export default getGameFromList;

function getGameFromList(gameClass) {
    let classes = gameClass.toLowerCase();
    let result  = '';
    const games = config.get('gamesClasses');

    games.forEach(function (item) {
        if (classes.indexOf(item) >= 0) {
            result = item;
        }
    });

    return result;
}