export default getCupModel;

/**
 * @function
 * @name getCupModel
 * @description
 * Модель описывающая таблицу кубков полученных игроком за определённую команду.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getCupModel(sequelize, Sequelize) {
    const cup = sequelize.define('players_cup', {
        cup_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        logo       : Sequelize.TEXT,
        //Позиция занятая командой/игроком на турнире.
        //Может принимать значения из списка : Золото, Серебро, Бронза
        place      : Sequelize.TEXT,
        event_id   : Sequelize.INTEGER,
        player_id  : Sequelize.INTEGER,
        history_id : Sequelize.INTEGER
    });

    await cup.sync();

    return cup;
}