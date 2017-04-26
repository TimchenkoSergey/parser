import 'babel-polyfill';
import config            from './config';
import getTeams          from './libs/getTeamsInformation';
import getPlayers        from './libs/getPlayersInformation';
import getCups           from './libs/getCupsInformation';
import getMatchesPast    from './libs/getMatchesPastInformation';
import getMatchesFeature from './libs/getMatchesFeatureInformation';
import fillDb            from './model/fillDb';

const BASE_URL            = config.get('baseUrl');
const TEAMS_URL           = BASE_URL + config.get('urls:teams');
const EVENTS_URL          = BASE_URL + config.get('urls:events');
const PLAYERS_URL         = BASE_URL + config.get('urls:players');
const MATCHES_PAST_URL    = BASE_URL + config.get('urls:matchesPast');
const MATCHES_FEATURE_URL = BASE_URL + config.get('urls:matchesFeature');

start();

async function start() {
    try {
        const teams          = await getTeams(TEAMS_URL);
        const events         = await getCups(EVENTS_URL);
        const players        = await getPlayers(PLAYERS_URL, teams, events);
        const pastMatches    = await getMatchesPast(MATCHES_PAST_URL, teams, events);
        const featureMatches = await getMatchesFeature(MATCHES_FEATURE_URL, teams, events);

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