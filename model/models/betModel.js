export default getBetModel;

/**
 * @function
 * @name getBetModel
 * @description
 * Модель описывающая таблицу ставок букмекеров на игры.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getBetModel(sequelize, Sequelize) {
    const bet = sequelize.define('bet', {
        bet_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        bookmaker_id            : Sequelize.INTEGER,
        first_team_id           : Sequelize.INTEGER,
        second_team_id          : Sequelize.INTEGER,
        match_id                : Sequelize.INTEGER,
        first_team_coefficient  : Sequelize.FLOAT,
        second_team_coefficient : Sequelize.FLOAT,
        tie_coefficient         : Sequelize.FLOAT
    });

    await bet.sync();

    return bet;
}