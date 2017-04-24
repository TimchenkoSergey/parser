export default getPlayerHistoryModel;

async function getPlayerHistoryModel(sequelize, Sequelize) {
    const history = sequelize.define('player_history', {
        history_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        team_id   : Sequelize.INTEGER,
        player_id : Sequelize.INTEGER,
        date_in   : Sequelize.DATE,
        date_out  : Sequelize.DATE,
        win       : Sequelize.INTEGER,
        lose      : Sequelize.INTEGER,
        tie       : Sequelize.INTEGER
    });

    await history.sync();

    return history;
}