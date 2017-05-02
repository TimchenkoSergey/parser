import model from '../../model/model';

export default saveEvents;

function saveEvents(models, events) {
    events.forEach(function (event) {
        try {
            model.save(models.event, {
                event_id : +event.id,
                date     : new Date(event.date),
                name     : event.name,
                found    : event.found,
                game     : event.game,
                logo     : event.logo
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}