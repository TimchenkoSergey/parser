export default getTeamRatingHistory;

/**
 * @function
 * @name getTeamRatingHistory
 * @description
 * Модель описывающая изминения рейтинга команды.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getTeamRatingHistory(sequelize, Sequelize) {
    const history = sequelize.define('team_rating_history', {
        rating_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        date    : Sequelize.DATE,
        rating  : Sequelize.INTEGER,
        team_id : Sequelize.INTEGER
    });

    await history.sync();

    return history;
}