export default getPlayerHistoryModel;

/**
 * @function
 * @name getPlayerHistoryModel
 * @description
 * Модель описывающая таблицу историю игр игрока в разных командах.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getPlayerHistoryModel(sequelize, Sequelize) {
    const history = sequelize.define('player_history', {
        history_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        team_id   : Sequelize.INTEGER,
        player_id : Sequelize.INTEGER,
        //Дата присоединения игрока к команде.
        date_in   : Sequelize.DATE,
        //Дата ухода игрока из команды.
        date_out  : Sequelize.DATE,
        win       : Sequelize.INTEGER,
        lose      : Sequelize.INTEGER,
        tie       : Sequelize.INTEGER
    });

    await history.sync();

    return history;
}