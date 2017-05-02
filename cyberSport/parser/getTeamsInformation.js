import getUrlsList     from './getUrlsList';
import downloadImage   from '../../libs/downloadImage';
import getGameFromList from '../../libs/getGameFromList';
import isValid         from './isValid';
import getLoadedPage   from './getLoadedPage';
import getTrimString   from '../../libs/getTrimString';

const TEAM_LINK_SELECTOR   = '.main td.team a';
const TEAM_NAME_SELECTOR   = '.main h1';
const TEAM_LOGO_SELECTOR   = '.main .b-team-logo img';
const TEAM_RATING_SELECTOR = '.main .b-profile .rating .rating__value';
const TEAM_GAME_SELECTOR   = '.main .b-profile .rating .rating__game span';

export default getTeamsInformation;

async function getTeamsInformation(url) {
    const links  = await getUrlsList(url, TEAM_LINK_SELECTOR);
    let   result = [];
    let   id     = 1;
    
    for (let i = 0, len = links.length; i < len; i++) {
        try {
            const $         = await getLoadedPage(links[i].link);
            const name      = getTrimString($(TEAM_NAME_SELECTOR).text());
            const logoPath  = $(TEAM_LOGO_SELECTOR).attr('src');
            const rating    = getTrimString($(TEAM_RATING_SELECTOR).text());
            const imgPath   = await downloadImage(logoPath);
            const game      = getGameFromList($(TEAM_GAME_SELECTOR).attr('class'));

            if (game !== '' && allFilled({ id, name, imgPath, rating, game })) {
                result.push(getTeam(id, name, imgPath, rating, game));
                id++;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return result;
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

function allFilled(data) {
    const config = {
        id      : 'isNumber',
        name    : 'isNonEmpty',
        imgPath : 'isNonEmpty',
        rating  : 'isNumber',
        game    : 'isNonEmpty'
    };
    
    return isValid(data, config);
}