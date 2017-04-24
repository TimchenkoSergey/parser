export default getPlayerModel;

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