import config from '../config';

export default getGameFromList;

/**
 * @function
 * @name getGameFromList
 * @description
 * Из переданного класса элемента с иконкой игры,
 * определяет что это за игра выбирая из списка заданых игр.
 * Список храниться в массиве строк в конфиге.
 *
 * @param {string} elementClass Класс элемента с иконкой игры.
 * @return {string} game Название игры.
 **/
function getGameFromList(elementClass) {
    let game;
    
    if (elementClass) {
        const games      = config.get('gamesClasses');
        const classLower = elementClass.toLowerCase();

        game = games.find(function (item) {
            return classLower.indexOf(item) >= 0;
        });
    }

    return game ? game : '';
}