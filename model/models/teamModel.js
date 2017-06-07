export default getTeamModel;

/**
 * @function
 * @name getTeamModel
 * @description
 * Модель описывающая таблицу команды.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getTeamModel(sequelize, Sequelize) {
    const team = sequelize.define('team', {
        team_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        name      : Sequelize.TEXT,
        logo      : Sequelize.TEXT,
        game_id   : Sequelize.INTEGER,
        rating    : Sequelize.FLOAT,
        rating_gb : Sequelize.FLOAT,
        math_expectation    : Sequelize.FLOAT,
        probability_winning : Sequelize.FLOAT,
        probability_losing  : Sequelize.FLOAT
    });

    await team.sync();
    
    return team;
}