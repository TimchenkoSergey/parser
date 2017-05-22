export default getBookmakerModel;

/**
 * @function
 * @name getBookmakerModel
 * @description
 * Модель описывающая таблицу букмекеров.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getBookmakerModel(sequelize, Sequelize) {
    const bookmaker = sequelize.define('bookmaker', {
        bookmaker_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        name : Sequelize.TEXT
    });

    await bookmaker.sync();

    return bookmaker;
}