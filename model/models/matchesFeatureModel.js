export default getMatchesFeatureModel;

async function getMatchesFeatureModel(sequelize, Sequelize) {
    const matchesPast = sequelize.define('matches_feature', {
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