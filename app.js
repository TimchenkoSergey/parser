import 'babel-polyfill';
import getTeamsInformation from './libs/getTeamsInformation';
import getPlayersInformation from './libs/getPlayersInformation';
import fill from './model/dbInit';

let urlTeams = 'https://www.cybersport.ru/base/teams/?MUL_MODE=&page=';
let urlPlayers = 'https://www.cybersport.ru/AJAX/cached2/gamer_section_list.php?active=Y&sort_field=0&sort_order=0&NAME=&page=';

start();

async function start() {
    const teamsArray = await getTeamsInformation(urlTeams);
    //const playersArray = await getPlayersInformation(urlPlayers);
    
    console.log(teamsArray);
    console.log(teamsArray.length);
    //await fill(teamsArray);
}