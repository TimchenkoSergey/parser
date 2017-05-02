import getUrlsList      from './getUrlsList';
import downloadImage    from '../../libs/downloadImage';
import getGameFromList  from '../../libs/getGameFromList';
import getPlayerHistory from './getPlayerHistory';
import isValid          from './isValid';
import getEventID       from './getEventID';
import getLoadedPage    from './getLoadedPage';
import getTrimString    from '../../libs/getTrimString';

const PLAYERS_LINK_SELECTOR     = '.item__nick';
const PLAYERS_NICK_SELECTOR     = '.main h2.nick';
const PLAYERS_LOGO_SELECTOR     = '.main .b-profileUser .b-user-logo img';
const PLAYERS_COUNTRY_SELECTOR  = '.main .b-profileUser p.name span.where.b-flag';
const PLAYERS_GAME_SELECTOR     = '.main .b-profileUser .rating .rating__game span';
const PLAYERS_RATING_SELECTOR   = '.main .b-profileUser .rating .rating__value';
const PLAYERS_HISTORY_SELECTOR  = '.main .table__involv-in-team';

export default getPlayersInformation;

async function getPlayersInformation(url, teams, events) {
    const links  = await getUrlsList(url, PLAYERS_LINK_SELECTOR);
    let   result = [];
    let   id     = 1;

    for (let i = 0, len = links.length; i < len; i++) {
        try {
            const $         = await getLoadedPage(links[i].link);
            const nick      = getTrimString($(PLAYERS_NICK_SELECTOR).text());
            const country   = getTrimString($(PLAYERS_COUNTRY_SELECTOR).attr('title'));
            const logoPath  = $(PLAYERS_LOGO_SELECTOR).attr('src');
            const imgPath   = await downloadImage(logoPath);
            const rating    = $(PLAYERS_RATING_SELECTOR).text();
            const game      = getGameFromList($(PLAYERS_GAME_SELECTOR).attr('class'));
            const history   = getPlayerHistory($, $(PLAYERS_HISTORY_SELECTOR), teams, game);

            if (game !== '' && allFilled({ id, nick, imgPath, country, game, rating })) {
                result.push(getPayer(id, nick, imgPath, country, game, rating, history));
                id++;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    setID(result, events);

    return result;
}

function setID(result, events) {
    let historyID = 1;
    let cupID     = 1;

    result.forEach(function (player) {
        if (player.history && player.history.length > 0) {
            const playerID = player.id;

            player.history.forEach(function (history) {
                history.playerID  = playerID;
                history.historyID = historyID;

                if (history.cups && history.cups.length > 0) {

                    history.cups.forEach(function (cup) {
                        cup.playerID  = playerID;
                        cup.historyID = historyID;
                        cup.cupID     = cupID;
                        cup.eventID   = getEventID(events, cup.name);

                        cupID++;
                    });
                }
                historyID++;
            });
        }
    });
}

function getPayer(id, nick, photo, country, game, rating, history) {
    return {
        id,
        nick,
        photo,
        country,
        game,
        rating,
        history,
        gbRating : 0
    };
}

function allFilled(data) {
    const config = {
        id      : 'isNumber',
        nick    : 'isNonEmpty',
        imgPath : 'isNonEmpty',
        country : 'isNonEmpty',
        rating  : 'isNumber',
        game    : 'isNonEmpty'
    };

    return isValid(data, config);
}