import getTeamModel           from './models/teamModel';
import getCupModel            from './models/cupModel';
import getEventModel          from './models/eventModel';
import getPlayerModel         from './models/playerModel';
import getPlayerHistoryModel  from './models/playerHistoryModel';
import getMatchesPastModel    from './models/matchesPastModel';
import getMatchesFeatureModel from './models/matchesFeatureModel';

export default getModels;

async function getModels(sequelize, Sequelize) {
    const team           = await getTeamModel(sequelize, Sequelize);
    const cup            = await getCupModel(sequelize, Sequelize);
    const player         = await getPlayerModel(sequelize, Sequelize);
    const event          = await getEventModel(sequelize, Sequelize);
    const playerHistory  = await getPlayerHistoryModel(sequelize, Sequelize);
    const matchesPast    = await getMatchesPastModel(sequelize, Sequelize);
    const matchesFeature = await getMatchesFeatureModel(sequelize, Sequelize);
    
    return {
        team,
        cup,
        player,
        event,
        playerHistory,
        matchesPast,
        matchesFeature
    };
}