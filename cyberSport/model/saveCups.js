import model from '../../model/model';

export default saveCups;

/**
 * @function
 * @name saveCups
 * @description
 * Сохраняет переданные данные из массива в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} cups Массив объектов с информацией о выграных игроком кубков.
 **/
async function saveCups(tables, cups) {
    cups.forEach(async function (cup) {
        try {
            await model.save(tables.cup, {
                cup_id     : +cup.cupID,
                event_id   : +cup.eventID,
                player_id  : +cup.playerID,
                history_id : +cup.historyID,
                logo       : cup.logo,
                place      : cup.place
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}