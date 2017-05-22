export default getEventModel;

/**
 * @function
 * @name getEventModel
 * @description
 * Модель описывающая таблицу турниров проводимых в обрабатываемых дисциплинах.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getEventModel(sequelize, Sequelize) {
    const event = sequelize.define('event', {
        event_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        name    : Sequelize.TEXT,
        date    : Sequelize.DATE,
        //Призовой фонд турнира.
        found   : Sequelize.TEXT,
        game_id : Sequelize.INTEGER,
        logo    : Sequelize.TEXT
    });

    await event.sync();

    return event;
}