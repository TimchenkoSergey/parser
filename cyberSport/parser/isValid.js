import Validator from '../../libs/Validator';

export default isValid;

/**
 * @function
 * @name isValid
 * @description
 * Функция фасад для проверки валидности данных.
 *
 * @param {object} data   Объект с исходными данными для проверки.
 * @param {object} config Конфигурационный объект.
 * @return {boolean} Значение валидны ли данные.
 **/
function isValid(data, config) {
    const validator = new Validator(data, config);

    return validator.isFilled();
}