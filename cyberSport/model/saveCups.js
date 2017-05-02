import model from '../../model/model';

export default saveCups;

function saveCups(models, cups) {
    cups.forEach(function (cup) {
        try {
            model.save(models.cup, {
                cup_id: +cup.cupID,
                event_id: +cup.eventID,
                player_id: +cup.playerID,
                history_id: +cup.historyID,
                logo: cup.logo,
                place: cup.place
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}