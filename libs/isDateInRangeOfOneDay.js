const HOURS_ID_DAY           = 24;
const MINUTES_IN_HOUR        = 60;
const SECONDS_IN_MINUTE      = 60;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_DAY         = HOURS_ID_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

export default isDateInRangeOfOneDay;

/**
 * @function
 * @name isDateInRangeOfOneDay
 * @description
 * Проверяет входит ли дата в промежуток -1 дня, +1 дня.
 *
 * @param {string} dateMatchInDb Дата матча в базе данных.
 * @param {string} dateMatch Дата матча.
 * @return {boolean} True если входит, иначе false.
 **/
function isDateInRangeOfOneDay(dateMatchInDb, dateMatch) {
    const dateMinusDay = +dateMatch - SECONDS_IN_DAY;
    const datePlusDay  = +dateMatch + SECONDS_IN_DAY;

    return +(new Date(dateMatchInDb)) >= dateMinusDay && +(new Date(dateMatchInDb)) <= datePlusDay;
}