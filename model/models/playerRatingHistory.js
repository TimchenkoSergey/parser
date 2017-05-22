export default getPlayerRatingHistory;

/**
 * @function
 * @name getPlayerRatingHistory
 * @description
 * Модель описывающая изминения рейтинга игрока.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getPlayerRatingHistory(sequelize, Sequelize) {
    const history = sequelize.define('player_rating_history', {
        rating_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        date      : Sequelize.DATE,
        rating    : Sequelize.INTEGER,
        player_id : Sequelize.INTEGER
    });

    await history.sync();

    return history;
}