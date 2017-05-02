import model             from '../../model/model';
import savePlayerHistory from './savePlayerHistory';

export default savePlayers;

function savePlayers(models, players) {
    players.forEach(function (player) {
        try {
            model.save(models.player, {
                player_id : +player.id,
                rating    : +player.rating,
                rating_gb : +player.gbRating,
                nick      : player.nick,
                photo     : player.photo,
                country   : player.country,
                game      : player.game
            });
    
            if (player.history && player.history.length > 0) {
                savePlayerHistory(models, player.history);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}