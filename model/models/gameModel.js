export default getGameModel;

/**
 * @function
 * @name getGameModel
 * @description
 * Модель описывающая таблицу игр с которыми мы работаем.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getGameModel(sequelize, Sequelize) {
    const game = sequelize.define('game', {
        game_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        game_name : Sequelize.TEXT
    });

    await game.sync();

    return game;
}