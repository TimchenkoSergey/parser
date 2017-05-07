export default getMaxId;

/**
 * @function
 * @name getMaxId
 * @description
 * Возращает максимальный id из массива обьектов.
 *
 * @param {object[]} arr Массив объектов.
 * @param {string} idPropName Название свойства где хранится id.
 * @return {number} Максимальное значения поля id в таблице.
 **/
function getMaxId(arr, idPropName) {
    const ids = arr.map(function (item) {
        return item[idPropName];
    });
    
    if (ids && ids.length > 0) {
        return Math.max(...ids);
    }
   
    return 0;
}