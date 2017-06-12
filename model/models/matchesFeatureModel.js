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
        second_team_id : Sequelize.INTEGER,
        first_team_win_probability     : Sequelize.FLOAT,
        second_team_win_probability    : Sequelize.FLOAT,
        absolute_difference            : Sequelize.FLOAT,
        first_equilibrium_coefficient  : Sequelize.FLOAT,
        second_equilibrium_coefficient : Sequelize.FLOAT,
        first_team_name  : Sequelize.TEXT,
        second_team_name : Sequelize.TEXT,
        game_id          : Sequelize.INTEGER
    });

    await matchesPast.sync();

    return matchesPast;
}