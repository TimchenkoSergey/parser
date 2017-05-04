export default getMaxId;

/**
 * @function
 * @name getMaxId
 * @description
 * Возращает максимальный id из массива обьектов.
 *
 * @param {object[]} arr Объект с объектами таблиц.
 * @param {string} idPropName Объект только распаршеной команды.
 * @return {number} Максимальное значения поля id в таблице.
 **/
function getMaxId(arr, idPropName) {
    const ids = arr.map(function (item) {
        return item[idPropName];
    });

    return Math.max(...ids);
}