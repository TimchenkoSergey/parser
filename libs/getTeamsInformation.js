import getUrlsList     from './getUrlsList';
import sendRequest     from './sendRequest';
import getLoadedHtml   from './getLoadedHtml';
import downloadImage   from './downloadImage';
import config          from '../config';
import getGameFromList from './getGameFromList';
import Validator       from './Validator';

const TEAM_LINK_SELECTOR   = '.main-wrap .main .col-md-12 td.team a';
const TEAM_NAME_SELECTOR   = '.main-wrap .main h1';
const TEAM_LOGO_SELECTOR   = '.main-wrap .main .b-team-logo img';
const TEAM_RATING_SELECTOR = '.main-wrap .main .b-profile .rating .rating__value';
const TEAM_GAME_SELECTOR   = '.main-wrap .main .b-profile .rating .rating__game span';

export default getTeamsInformation;

async function getTeamsInformation(url) {
    try {
        const links  = await getUrlsList(url, TEAM_LINK_SELECTOR);
        let   result = [];
        let   id     = 1;
        
        for (let i = 0, len = links.length; i < len; i++) {
            let   response  = await sendRequest(config.get('baseUrl') + links[i].link);
            const $         = getLoadedHtml(response.body);
            const name      = $(TEAM_NAME_SELECTOR).text().trim();
            const logoPath  = $(TEAM_LOGO_SELECTOR).attr('src');
            const rating    = $(TEAM_RATING_SELECTOR).text().trim();
            const gameClass = $(TEAM_GAME_SELECTOR).attr('class');
            const imgPath   = await downloadImage(logoPath);
            const game      = getGameFromList(gameClass);
            
            if (game !== '' && allFilled(id, name, imgPath, rating, game)) {
                result.push(getTeam(id, name, imgPath, rating, game));
                id++;
            }
        }
        
        return result;
    }
    catch (err) {
        console.log(err);
    }
}

function getTeam(id, name, logo, rating, game) {
    return {
        id,
        name,
        logo,
        rating,
        game,
        gbRating : 0
    };
}

function allFilled(id, name, imgPath, rating, game) {
    const data = { 
        id,
        name,
        imgPath,
        rating,
        game
    };
    const config = {
        id      : 'isNumber',
        name    : 'isNonEmpty',
        imgPath : 'isNonEmpty',
        rating  : 'isNumber',
        game    : 'isNonEmpty'
    };
    const validator = new Validator(data, config);
    
    return validator.isFilled();
}