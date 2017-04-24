import Sequelize from 'sequelize';
import getModels      from './models/models';

const sequelize = new Sequelize('dota', 'root', 'sst291196meiddD');

export default fillDb;

async function fillDb(teams, events, players) {
    try {
        await sequelize.authenticate();
        const models = await getModels(sequelize, Sequelize);

        teams.forEach(function (item) {
            models.team.create({
                team_id   : +item.id,
                name      : item.name,
                logo      : item.logo,
                game      : item.game,
                rating    : +item.rating,
                rating_gb : +item.gbRating
            });
        });

        events.forEach(function (item) {
            models.event.create({
                event_id : +item.id,
                name     : item.name,
                date     : new Date(item.date),
                found    : item.found,
                game     : item.game,
                logo     : item.logo
            });
        });

        players.forEach(function (player) {
            models.player.create({
                player_id : +player.id,
                nick      : player.nick,
                photo     : player.photo,
                country   : player.country,
                game      : player.game,
                rating    : +player.rating,
                rating_gb : +player.gbRating
            });
            
            if (player.history && player.history.length > 0) {
                player.history.forEach(function (hist) {
                    models.playerHistory.create({
                        history_id : +hist.historyID,
                        team_id    : +hist.teamID,
                        player_id  : +hist.playerID,
                        date_in    : new Date(hist.dateIn),
                        date_out   : new Date(hist.dateOut),
                        win        : hist.wins,
                        lose       : hist.loses,
                        tie        : hist.ties
                    });

                    if (hist.cups && hist.cups.length > 0) {
                        hist.cups.forEach(function (cup) {
                            models.cup.create({
                                cup_id     : +cup.cupID,
                                logo       : cup.logo,
                                place      : cup.place,
                                event_id   : +cup.eventID,
                                player_id  : +cup.playerID,
                                history_id : +cup.historyID
                            });
                        });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}