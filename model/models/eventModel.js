export default getEventModel;

async function getEventModel(sequelize, Sequelize) {
    const event = sequelize.define('event', {
        event_id : {
            type       : Sequelize.INTEGER,
            primaryKey : true
        },
        name  : Sequelize.TEXT,
        date  : Sequelize.DATE,
        found : Sequelize.TEXT,
        game  : Sequelize.TEXT,
        logo  : Sequelize.TEXT
    });

    await event.sync();

    return event;
}