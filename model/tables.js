import getTeamModel           from './models/teamModel';
import getCupModel            from './models/cupModel';
import getEventModel          from './models/eventModel';
import getPlayerModel         from './models/playerModel';
import getPlayerHistoryModel  from './models/playerHistoryModel';
import getMatchesPastModel    from './models/matchesPastModel';
import getMatchesFeatureModel from './models/matchesFeatureModel';
import getGameModel           from './models/gameModel';
import getTeamRatingHistory   from './models/teamRatingHistory';
import getPlayerRatingHistory from './models/playerRatingHistory';
import getBookmakerModel      from './models/bookmakerModel';
import getBetModel            from './models/betModel';

export default getTables;

/**
 * @function
 * @name getTables
 * @description
 * Возвращает объект с объектом таблиц для большего удобства.
 *
 * @param {object} sequelize Экземпляр класса Sequelize позволяющий инициализировать и создать таблицу.
 * @param {object} Sequelize Sequelize класс представляющий типы данных.
 * @return {object} Объект с объектами таблиц.
 **/
async function getTables(sequelize, Sequelize) {
    const team                = await getTeamModel(sequelize, Sequelize);
    const cup                 = await getCupModel(sequelize, Sequelize);
    const player              = await getPlayerModel(sequelize, Sequelize);
    const event               = await getEventModel(sequelize, Sequelize);
    const playerHistory       = await getPlayerHistoryModel(sequelize, Sequelize);
    const matchesPast         = await getMatchesPastModel(sequelize, Sequelize);
    const matchesFeature      = await getMatchesFeatureModel(sequelize, Sequelize);
    const game                = await getGameModel(sequelize, Sequelize);
    const teamRatingHistory   = await getTeamRatingHistory(sequelize, Sequelize);
    const playerRatingHistory = await getPlayerRatingHistory(sequelize, Sequelize);
    const bookmaker           = await getBookmakerModel(sequelize, Sequelize);
    const bet                 = await getBetModel(sequelize, Sequelize);

    return {
        team,
        cup,
        player,
        event,
        playerHistory,
        matchesPast,
        matchesFeature,
        game,
        teamRatingHistory,
        playerRatingHistory,
        bookmaker,
        bet
    };
}