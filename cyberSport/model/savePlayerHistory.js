import model    from '../../model/model';
import saveCups from './saveCups';

export default savePlayerHistory;

function savePlayerHistory(models, histories) {
    histories.forEach(function (history) {
        try {
            model.save(models.playerHistory, {
                history_id : +history.historyID,
                team_id    : +history.teamID,
                player_id  : +history.playerID,
                win        : +history.wins,
                lose       : +history.loses,
                tie        : +history.ties,
                date_in    : new Date(history.dateIn),
                date_out   : new Date(history.dateOut)
            });
    
            if (history.cups && history.cups.length > 0) {
                saveCups(models, history.cups);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}