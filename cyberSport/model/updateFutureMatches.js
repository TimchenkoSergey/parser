import model              from '../../model/model';
import saveFeatureMatches from './saveFeatureMatches';

export default updateFutureMatches;

/**
 * @function
 * @name updateFutureMatches
 * @description
 * Обновляет данные о предстоящих играх.
 *
 * @param {object} tables Объект с объектами таблиц.
 * @param {object[]} matches Массив объектов с информацией о предстоящих играх.
 **/
async function updateFutureMatches(tables, matches) {
    await model.destroy(tables.matchesFeature, {});
    await saveFeatureMatches(tables, matches);
}