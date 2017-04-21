import getUrlsList     from './getUrlsListForPlayers';
import sendRequest     from './sendRequest';
import getLoadedHtml   from './getLoadedHtml';
import downloadImage   from './downloadImage';
import config          from '../config';
import getGameFromList from './getGameFromList';
import Validator       from './Validator';

const PLAYERS_LINK_SELECTOR    = '.item__nick';
const PLAYERS_NICK_SELECTOR    = '.main-wrap .main h2.nick';
const PLAYERS_LOGO_SELECTOR    = '.main-wrap .main .b-profileUser .b-user-logo img';
const PLAYERS_COUNTRY_SELECTOR = '.main-wrap .main .b-profileUser p.name span.where.b-flag';
const PLAYERS_GAME_SELECTOR    = '.main-wrap .main .b-profileUser .rating .rating__game span';
const PLAYERS_RATING_SELECTOR  = '.main-wrap .main .b-profileUser .rating .rating__value';

export default getPlayersInformation;

async function getPlayersInformation(url) {
    try {
        const links  = await getUrlsList(url, PLAYERS_LINK_SELECTOR);
        let   result = [];
        let   id     = 1;

        for (let i = 0, len = links.length; i < len; i++) {
            let   response  = await sendRequest(config.get('baseUrl') + links[i].link);
            const $         = getLoadedHtml(response.body);
            const nick      = $(PLAYERS_NICK_SELECTOR).text().trim();
            const country   = $(PLAYERS_COUNTRY_SELECTOR).attr('title').trim();
            const logoPath  = $(PLAYERS_LOGO_SELECTOR).attr('src');
            const imgPath   = await downloadImage(logoPath);
            const gameClass = $(PLAYERS_GAME_SELECTOR).attr('class');
            const rating    = $(PLAYERS_RATING_SELECTOR).text();
            const game      = getGameFromList(gameClass);

            if (game !== '' && allFilled(id, nick, imgPath, country, game, rating)) {
                result.push(getPayer(id, nick, imgPath, country, game, rating));
                id++;
            }
        }

        return result;
    }
    catch (err) {
        console.log(err);
    }
}

function getPayer(id, nick, photo, country, game, rating) {
    return {
        id,
        nick,
        photo,
        country,
        game,
        rating,
        gbRating : 0
    };
}

function allFilled(id, nick, imgPath, country, game, rating) {
    const data = {
        id,
        nick,
        imgPath,
        country,
        rating,
        game
    };
    const config = {
        id      : 'isNumber',
        nick    : 'isNonEmpty',
        imgPath : 'isNonEmpty',
        country : 'isNonEmpty',
        rating  : 'isNumber',
        game    : 'isNonEmpty'
    };
    const validator = new Validator(data, config);

    return validator.isFilled();
}