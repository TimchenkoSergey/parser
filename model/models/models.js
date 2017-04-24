import getTeamModel          from './teamModel';
import getCupModel           from './cupModel';
import getEventModel         from './eventModel';
import getPlayerModel        from './playerModel';
import getPlayerHistoryModel from './playerHistoryModel';

export default getModels;

async function getModels(sequelize, Sequelize) {
    const team          = await getTeamModel(sequelize, Sequelize);
    const cup           = await getCupModel(sequelize, Sequelize);
    const player        = await getPlayerModel(sequelize, Sequelize);
    const event         = await getEventModel(sequelize, Sequelize);
    const playerHistory = await getPlayerHistoryModel(sequelize, Sequelize);
    
    return {
        team,
        cup,
        player,
        event,
        playerHistory
    };
}