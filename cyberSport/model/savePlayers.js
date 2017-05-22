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
async function savePlayers(tables, players) {
    players.forEach(async function (player, i) {
        try {
            await model.save(tables.player, {
                player_id : +player.id,
                rating    : +player.rating,
                rating_gb : +player.gbRating,
                nick      : player.nick,
                photo     : player.photo,
                country   : player.country,
                game_id   : player.gameId
            });

            await model.save(tables.playerRatingHistory, {
                rating_id : i + 1,
                date      : new Date(),
                rating    : +player.rating,
                player_id : player.id
            });
    
            if (player.history && player.history.length > 0) {
                await savePlayerHistory(tables, player.history);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}