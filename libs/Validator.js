/** Класс представляющий объект для валидации данных */
export default class Validator {
    /**
     * Создаие валидатора.
     * @param {object} data   Объект с данными.
     * @param {object} config Объект с конфигурационными настройками для проверки данных.
     */
    constructor(data, config) {
        this.data   = data;
        this.config = config;
    }

    /**
     * @function
     * @name isFilled
     * @description
     * Возвращает логическое значение указывающие прошли ли данные валидацию.
     *
     * @return {boolean} Возвращает логическое значение указывающие прошли ли данные валидацию.
     **/
    isFilled() {
        let result = true;

        for (let item in this.data) {
            const checker = this.config[item];
            const field   = this.data[item];

            if (!this[checker](field)) {
                result = false;
                break;
            }
        }
        
        return result;
    }

    /**
     * @function
     * @name isNumber
     * @description
     * Проверяет являться ли аргумент числом.
     *
     * @param {number} number Число для проверки.
     * @return {boolean} Возращает логическое значение являться ли аргумент числом.
     **/
    isNumber(number) {
        return !isNaN(number);
    }

    /**
     * @function
     * @name isNonEmpty
     * @description
     * Проверяет пуста ли строка.
     *
     * @param {string} str Строка для проверки.
     * @return {boolean} Возращает логическое значение пуста ли строка или нет.
     **/
    isNonEmpty(str) {
        return str !== '';
    }
}