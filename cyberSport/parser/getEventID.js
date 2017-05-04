export default getEventID;

/**
 * @function
 * @name getEventID
 * @description
 * Возвращает из массива турниров id турнира с подходящим именем.
 *
 * @param {object[]} events Массив турниров.
 * @param {string} eventName Имя искомого турнира.
 * @return {number} Id искомого турнира или 0 если его нет.
 **/
function getEventID(events, eventName) {
    const result = events.find(function (event) {
        return event.name === eventName;
    });

    if (result) {
        return result.id;
    }

    return 0;
}