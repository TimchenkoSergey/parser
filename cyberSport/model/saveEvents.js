import model from '../../model/model';

export default saveEvents;

/**
 * @function
 * @name saveEvents
 * @description
 * Сохраняет переданные данные из массива в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} events Массив объектов с информацией о турнирах.
 **/
function saveEvents(tables, events) {
    events.forEach(function (event) {
        try {
            model.save(tables.event, {
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