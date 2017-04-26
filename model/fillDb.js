import getModels from './models';
import dbInit    from './dbInit';
import model     from './model';

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

function saveTeams(models, teams) {
    teams.forEach(function (team) {
        model.save(models.team, {
            team_id   : + team.id,
            rating    : + team.rating,
            rating_gb : + team.gbRating,
            name      : team.name,
            logo      : team.logo,
            game      : team.game
        });
    });
}

function saveEvents(models, events) {
    events.forEach(function (event) {
        model.save(models.event, {
            event_id : + event.id,
            date     : new Date(event.date),
            name     : event.name,
            found    : event.found,
            game     : event.game,
            logo     : event.logo
        });
    });
}

function savePlayers(models, players) {
    players.forEach(function (player) {
        model.save(models.player, {
            player_id : + player.id,
            rating    : + player.rating,
            rating_gb : + player.gbRating,
            nick      : player.nick,
            photo     : player.photo,
            country   : player.country,
            game      : player.game
        });

        if (player.history && player.history.length > 0) {
            savePlayerHistory(models, player.history);
        }
    });
}

function savePlayerHistory(models, histories) {
    histories.forEach(function (history) {
        model.save(models.playerHistory, {
            history_id : + history.historyID,
            team_id    : + history.teamID,
            player_id  : + history.playerID,
            win        : + history.wins,
            lose       : + history.loses,
            tie        : + history.ties,
            date_in    : new Date(history.dateIn),
            date_out   : new Date(history.dateOut)
        });

        if (history.cups && history.cups.length > 0) {
            saveCups(models, history.cups);
        }
    });
}

function saveCups(models, cups) {
    cups.forEach(function (cup) {
        model.save(models.cup, {
            cup_id     : + cup.cupID,
            event_id   : + cup.eventID,
            player_id  : + cup.playerID,
            history_id : + cup.historyID,
            logo       : cup.logo,
            place      : cup.place
        });
    });
}

function savePastMatches(models, matches) {
    matches.forEach(function (match) {
        model.save(models.matchesPast, {
            competition_past_id : + match.id,
            event_id            : + match.eventID,
            first_team_id       : + match.firstTeamID,
            second_team_id      : + match.secondTeamID,
            result_first        : + match.resultFirst,
            result_second       : + match.resultSecond,
            date                : new Date(match.date),
            time                : match.time
        });
    });
}

function saveFeatureMatches(models, matches) {
    matches.forEach(function (match) {
        model.save(models.matchesFeature,  {
            competition_feature_id : + match.id,
            event_id               : + match.eventID,
            first_team_id          : + match.firstTeamID,
            second_team_id         : + match.secondTeamID,
            date                   : new Date(match.date),
            time                   : match.time
        });
    });
}