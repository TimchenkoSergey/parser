export default getCupModel;

async function getCupModel(sequelize, Sequelize) {
    const cup = sequelize.define('cup', {
        cup_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        logo       : Sequelize.TEXT,
        place      : Sequelize.TEXT,
        event_id   : Sequelize.INTEGER,
        player_id  : Sequelize.INTEGER,
        history_id : Sequelize.INTEGER
    });

    await cup.sync();

    return cup;
}