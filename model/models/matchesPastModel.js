export default getMatchesPastModel;

/**
 * @function
 * @name getMatchesPastModel
 * @description
 * Модель описывающая таблицу прошедших игр и их результаты.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getMatchesPastModel(sequelize, Sequelize) {
    const matchesPast = sequelize.define('past_match', {
        competition_past_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        time           : Sequelize.TEXT,
        date           : Sequelize.DATE,
        event_id       : Sequelize.INTEGER,
        first_team_id  : Sequelize.INTEGER,
        second_team_id : Sequelize.INTEGER,
        result_first   : Sequelize.INTEGER,
        result_second  : Sequelize.INTEGER
    });

    await matchesPast.sync();

    return matchesPast;
}