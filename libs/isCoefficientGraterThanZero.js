export default isCoefficientGraterThanZero;

/**
 * @function
 * @name isCoefficientGraterThanZero
 * @description
 * Проверяет являются ли коэфы больше нуля.
 *
 * @param {object} match Объект матча.
 * @return {boolean} True если оба коэфа больше, иначе false.
 **/
function isCoefficientGraterThanZero(match) {
    return match.firstCoefficient > 0 && match.secondCoefficient > 0;
}