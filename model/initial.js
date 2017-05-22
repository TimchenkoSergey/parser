import getTables from './tables';
import dbInit    from './dbInit';

export default initial;

async function initial() {
    const {
        Sequelize,
        sequelize
    } = await dbInit();
    //Объект с объектами таблиц.
    const models = await getTables(sequelize, Sequelize);
    
    return models;
}