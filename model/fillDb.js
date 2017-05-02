import getModels          from './models';
import dbInit             from './dbInit';
import saveTeams          from '../cyberSport/model/saveTeams';
import saveEvents         from '../cyberSport/model/saveEvents';
import savePlayers        from '../cyberSport/model/savePlayers';
import savePastMatches    from '../cyberSport/model/savePastMatches';
import saveFeatureMatches from '../cyberSport/model/saveFeatureMatches';

export default fillDB;

async function fillDB(teams, events, players, pastMatches, featureMatches) {
    const {
        Sequelize,
        sequelize
    } = await dbInit();
    const models = await getModels(sequelize, Sequelize);
    
    saveTeams(models, teams);
    saveEvents(models, events);
    savePlayers(models, players);
    savePastMatches(models, pastMatches);
    saveFeatureMatches(models, featureMatches);
}