import model   from '../model/model';
import initial from '../model/initial';

export default getGameId;

let gamesTable = null;

/**
 * @function
 * @name getGameId
 * @description
 * Из переданного класса элемента с иконкой игры,
 * определяет что это за игра выбирая из списка заданых игр.
 * Список храниться в базе данных в таблице games.
 *
 * @param {string} elementClass Класс элемента с иконкой игры.
 * @return {number} game ID игры.
 **/
async function getGameId(elementClass) {
    let game;
    
    if (elementClass) {
        if (!gamesTable) {
            const tables = await initial();
            gamesTable   = await model.findAll(tables.game, {});

        }
        
        const classLower = elementClass.toLowerCase();

        game = gamesTable.find(function (item) {
            return classLower.indexOf(item.game_name) >= 0;
        });
    }

    return game ? game.game_id : 0;
}