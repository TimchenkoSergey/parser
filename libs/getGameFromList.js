import config from '../config';

export default getGameFromList;

function getGameFromList(elementClass) {
    let result;
    
    if (elementClass) {
        const games = config.get('gamesClasses');

        result = games.find(function (item) {
            return elementClass.toLowerCase().indexOf(item) >= 0; 
        });
    }

    if (result) {
        return result;
    }
    
    return '';
}