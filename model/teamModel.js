export default getTeamModel;

async function getTeamModel(sequelize, Sequelize) {
    const team = sequelize.define('team', {
        team_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.TEXT,
        logo: Sequelize.TEXT
    });

    await team.sync();
    
    return team;
}