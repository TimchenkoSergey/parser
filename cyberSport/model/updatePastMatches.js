import model           from '../../model/model';
import savePastMatches from './savePastMatches';
import getMaxId        from '../../libs/getMaxId';

export default updatePastMatches;

/**
 * @function
 * @name updatePastMatches
 * @description
 * Обновляет данные о прошедщх играх.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} matches Массив объектов с информацией о прошедщх играх.
 **/
async function updatePastMatches(tables, matches) {
    const matchesInDb = await model.findAll(tables.matchesPast, {});
    let   id          = getMaxId(matchesInDb, 'competition_past_id');
    
    matches.forEach(async function (item) {
        const match = matchesInDb.find(function (matchInDb) {
            return item.time           === matchInDb.time &&
                   +item.resultFirst   === +matchInDb.result_first &&
                   +item.resultSecond  === +matchInDb.result_second &&
                   new Date(item.date).valueOf() === matchInDb.date.valueOf();
        });

        if (!match) {
            id++;
            item.id = id;
            await savePastMatches(tables, [ item ]);
        }
    });
}