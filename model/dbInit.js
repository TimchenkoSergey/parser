import Sequelize from 'sequelize';
import config    from '../config';
import getTeamModel      from './teamModel';

const sequelize = new Sequelize('dota', 'root', 'sst291196meiddD');

export default fillDb;

async function fillDb(data) {
    try {
        await sequelize.authenticate();
        const team = await getTeamModel(sequelize, Sequelize);

        data.forEach(function (item) {
            team.create({
                team_id: item.id,
                name: item.name,
                logo: item.logo
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}