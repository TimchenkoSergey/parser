export default getPlayerModel;

/**
 * @function
 * @name getPlayerModel
 * @description
 * Модель описывающая таблицу игрока.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getPlayerModel(sequelize, Sequelize) {
    const player = sequelize.define('player', {
        player_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        nick      : Sequelize.TEXT,
        photo     : Sequelize.TEXT,
        country   : Sequelize.TEXT,
        game      : Sequelize.TEXT,
        rating    : Sequelize.FLOAT,
        rating_gb : Sequelize.FLOAT
    });

    await player.sync();

    return player;
}