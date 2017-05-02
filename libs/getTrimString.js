export default getTrimString;

/**
 * @function
 * @name getTrimString
 * @description
 * Если строка существует то возращает её обрезав лишние пробельные символы,
 * если её нет то возращает пустую строку.
 *
 * @param {string} str Строка для обрезки.
 * @return {string} str Пустая или обрезанная строка.
 **/
function getTrimString(str) {
    if (!str) {
        return '';
    }
    
    return str.trim();
}