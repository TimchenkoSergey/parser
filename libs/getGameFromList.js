import config from '../config';

export default getGameFromList;

function getGameFromList(gameClass) {
    let result  = '';
    
    if (gameClass) {
        let classes = gameClass.toLowerCase();

        const games = config.get('gamesClasses');

        games.forEach(function (item) {
            if (classes.indexOf(item) >= 0) {
                result = item;
            }
        });
    }

    return result;
}