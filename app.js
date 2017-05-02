import 'babel-polyfill';
import config            from './config';
import getTeams          from './cyberSport/parser/getTeamsInformation';
import getPlayers        from './cyberSport/parser/getPlayersInformation';
import getCups           from './cyberSport/parser/getCupsInformation';
import getMatchesPast    from './cyberSport/parser/getMatchesPastInformation';
import getMatchesFeature from './cyberSport/parser/getMatchesFeatureInformation';
import fillDb            from './model/fillDb';

const BASE_URL            = config.get('baseUrl');
const TEAMS_URL           = BASE_URL + config.get('urls:teams');
const EVENTS_URL          = BASE_URL + config.get('urls:events');
const PLAYERS_URL         = BASE_URL + config.get('urls:players');
const MATCHES_PAST_URL    = config.get('urls:matchesPast');
const MATCHES_FEATURE_URL = config.get('urls:matchesFeature');

start();

async function start() {
    try {
        //Парсинг всех нужных данных
        const teams          = await getTeams(TEAMS_URL);
        console.log('teams');
        const events         = await getCups(EVENTS_URL);
        console.log('events');
        const players        = await getPlayers(PLAYERS_URL, teams, events);
        console.log('players');
        const pastMatches    = await getMatchesPast(MATCHES_PAST_URL, teams, events);
        console.log('pastMatches');
        const featureMatches = await getMatchesFeature(MATCHES_FEATURE_URL, teams, events);
        console.log('featureMatches');

        await fillDb(
            teams,
            events,
            players,
            pastMatches,
            featureMatches
        );
    }
    catch (err) {
        console.log(err);
    }
}