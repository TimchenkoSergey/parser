export default getMatchesPastModel;

async function getMatchesPastModel(sequelize, Sequelize) {
    const matchesPast = sequelize.define('matches_past', {
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