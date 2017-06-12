import model   from '../model/model';
import initial from '../model/initial';

export default getGameId;

let gamesTable = null;

/**
 * @function
 * @name getGameId
 * @description
 * Возращает Id переданой игры.
 *
 * @param {string} gameName Название игры.
 * @return {number} game ID игры.
 **/
async function getGameId(gameName) {
    let game;
    
    if (!gamesTable) {
        const tables = await initial();
        gamesTable   = await model.findAll(tables.game, {});
    }
    
    game = gamesTable.find(function (item) {
        return item.game_name == gameName;
    });

    return game ? game.game_id : 0;
}