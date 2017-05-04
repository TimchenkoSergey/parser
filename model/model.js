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

function findAll(table, options) {
    
}

function findOne(table, options) {
    
}

function update(table, options, newData) {
    
}

function destroy(table, options) {
    
}