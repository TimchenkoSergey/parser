import model             from '../../model/model';
import savePlayerHistory from './savePlayerHistory';

export default savePlayers;

/**
 * @function
 * @name savePlayers
 * @description
 * Сохраняет переданные данные из массива в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} histories Массив объектов с информацией о игроках.
 **/
function savePlayers(tables, players) {
    players.forEach(function (player) {
        try {
            model.save(tables.player, {
                player_id : +player.id,
                rating    : +player.rating,
                rating_gb : +player.gbRating,
                nick      : player.nick,
                photo     : player.photo,
                country   : player.country,
                game      : player.game
            });
    
            if (player.history && player.history.length > 0) {
                savePlayerHistory(tables, player.history);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}