import sendRequest   from './libs/sendRequest';
import getLoadedHtml from './libs/getLoadedHtml';

export default oneX;

async function oneX() {
    const response = await sendRequest('https://www.marathonbet.com/su/betting/e-Sports/');
    const $ = getLoadedHtml(response.body);
    const matches = $('#container_EVENTS table tr.event-header td.first.member-area ');
    console.log(matches.length);
}