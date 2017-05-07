const model = {
    save,
    findAll,
    findOne,
    update,
    destroy
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
 * @return {object} Promise куда при ошибке отправляется объект ошибки,
 * а при успешном выполнении объект с данными кортежа.
 **/
function save(table, options) {
    return table.create(options);
}

/**
 * @function
 * @name findAll
 * @description
 * Возращает данные для таблици подходящий по объекту запроса.
 *
 * @param {object} table   Таблица для которой нужно найти данные.
 * @param {object} options Данные для поиска.
 * @return {object[]} Promise куда при ошибке отправляется объект ошибки,
 * а при успешном выполнении массив объектов с данными кортежей.
 **/
function findAll(table, options) {
    return table.findAll({ where : options });
}

/**
 * @function
 * @name findOne
 * @description
 * Возращает данные для таблици подходящий по объекту запроса.
 *
 * @param {object} table   Таблица для которой нужно найти данные.
 * @param {object} options Данные для поиска.
 * @return {object} Promise куда при ошибке отправляется объект ошибки,
 * а при успешном выполнении объект с данными кортежа.
 **/
function findOne(table, options) {
    return table.findOne({ where : options });
}

/**
 * @function
 * @name update
 * @description
 * Обновляет данные для таблици.
 *
 * @param {object} table   Таблица для которой нужно обновить данные.
 * @param {object} options Данные для поиска.
 * @param {object} newData Данные для обновления.
 * @return {object} Promise куда при ошибке отправляется объект ошибки,
 * а при успешном выполнении обновлённый объект с данными кортежа.
 **/
function update(table, options, newData) {
    return table.update(newData, { where : options });
}

/**
 * @function
 * @name destroy
 * @description
 * Удаляет данные из таблици.
 *
 * @param {object} table   Таблица для которой нужно удалить данные.
 * @param {object} options Данные для поиска.
 * @return {object} Promise куда при ошибке отправляется объект ошибки,
 * а при успешном выполнении 1 или 0.
 **/
function destroy(table, options) {
    return table.destroy({ where: options });
}