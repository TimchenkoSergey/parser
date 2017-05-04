import 'babel-polyfill';
import config            from './config';
import getTeams          from './cyberSport/parser/getTeamsInformation';
import getPlayers        from './cyberSport/parser/getPlayersInformation';
import getCups           from './cyberSport/parser/getCupsInformation';
import getMatchesPast    from './cyberSport/parser/getMatchesPastInformation';
import getMatchesFeature from './cyberSport/parser/getMatchesFeatureInformation';
import fillDb            from './model/fillDb';
import updateDb          from './model/updateDb';

const BASE_URL            = config.get('baseUrl');
const TEAMS_URL           = BASE_URL + config.get('urls:teams');
const EVENTS_URL          = BASE_URL + config.get('urls:events');
const PLAYERS_URL         = BASE_URL + config.get('urls:players');
const MATCHES_PAST_URL    = config.get('urls:matchesPast');
const MATCHES_FEATURE_URL = config.get('urls:matchesFeature');

start();

/**
 * @function
 * @name start
 * @description
 * Стартовая функция скрипта.
 **/
async function start() {
    try {
        //Парсинг всех нужных данных
        const teams          = await getTeams(TEAMS_URL);
        const events         = await getCups(EVENTS_URL);
        const players        = await getPlayers(PLAYERS_URL, teams, events);
        const pastMatches    = await getMatchesPast(MATCHES_PAST_URL, teams, events);
        const featureMatches = await getMatchesFeature(MATCHES_FEATURE_URL, teams, events);
        
        if (config.get('fillDB')) {
            await fillDb(
                teams,
                events,
                players,
                pastMatches,
                featureMatches
            ); 
        }
        else {
            await updateDb(
                teams,
                events,
                players,
                pastMatches,
                featureMatches
            );
        }
    }
    catch (err) {
        console.log(err);
    }
}