import model      from '../../model/model';
import saveEvents from './saveEvents';
import getMaxId   from '../../libs/getMaxId';

export default updateEvents;

/**
 * @function
 * @name updateEvents
 * @description
 * Обновляет данные о турнирах.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} events Массив объектов с информацией о турнирах.
 **/
async function updateEvents(tables, events) {
    const eventsInDb = await model.findAll(tables.event, {});
    let   id         = getMaxId(eventsInDb, 'event_id');

    events.forEach(async function (item) {
        const event = eventsInDb.find(function (eventInDb) {
            return item.name === eventInDb.name;
        });

        if (!event) {
            id++;
            item.id = id;
            await saveEvents(tables, [ item ]);
        }
    });
}