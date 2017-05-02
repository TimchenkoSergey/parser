export default getMatchesFeatureModel;

/**
 * @function
 * @name getMatchesFeatureModel
 * @description
 * Модель описывающая таблицу будущих игр.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект созданой таблицы позволяющий работать с ней.
 **/
async function getMatchesFeatureModel(sequelize, Sequelize) {
    const matchesPast = sequelize.define('upcoming_match', {
        competition_feature_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        time           : Sequelize.TEXT,
        date           : Sequelize.DATE,
        event_id       : Sequelize.INTEGER,
        first_team_id  : Sequelize.INTEGER,
        second_team_id : Sequelize.INTEGER
    });

    await matchesPast.sync();

    return matchesPast;
}