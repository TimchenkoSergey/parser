const model = {
    save
};

export default model;

/**
 * @function
 * @name save
 * @description
 * Сохраняет кортеж в таблицу.
 *
 * @param {object} table   Таблица для которой нужно сохранить данные.
 * @param {object} options Данные для кортежа.
 **/
function save(table, options) {
    table.create(options);
}