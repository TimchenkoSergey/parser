import 'babel-polyfill';
import getTeamsInformation from './libs/getTeamsInformation';
import getPlayersInformation from './libs/getPlayersInformation';
import fill from './model/dbInit';
import getCupsInformation from './libs/getCupsInformation';

let urlCups = 'https://www.cybersport.ru/base/tournaments/?MUL_MODE=&page=';
let urlTeams = 'https://www.cybersport.ru/base/teams/?MUL_MODE=&page=';
let urlPlayers = 'https://www.cybersport.ru/AJAX/cached2/gamer_section_list.php?active=Y&sort_field=0&sort_order=0&NAME=&page=';

start();

async function start() {
    const teamsArray = await getTeamsInformation(urlTeams);
    const cups = await getCupsInformation(urlCups);
    const playersArray = await getPlayersInformation(urlPlayers, teamsArray, cups);
    
    await fill(teamsArray, cups, playersArray);
}