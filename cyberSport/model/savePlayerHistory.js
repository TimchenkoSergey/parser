import model    from '../../model/model';
import saveCups from './saveCups';

export default savePlayerHistory;

/**
 * @function
 * @name savePlayerHistory
 * @description
 * Сохраняет переданные данные из массива в таблицу.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} histories Массив объектов с информацией о истории игр игрока в командах.
 **/
async function savePlayerHistory(tables, histories) {
    histories.forEach(async function (history) {
        try {
            await model.save(tables.playerHistory, {
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
                await saveCups(tables, history.cups);
            }
        }
        catch (err) {
        }
    });
}