import getUrlsList      from './getUrlsListForPlayers';
import sendRequest      from './sendRequest';
import getLoadedHtml    from './getLoadedHtml';
import downloadImage    from './downloadImage';
import config           from '../config';
import getGameFromList  from './getGameFromList';
import Validator        from './Validator';
import getPlayerHistory from './getPlayerHistory';

const PLAYERS_LINK_SELECTOR     = '.item__nick';
const PLAYERS_NICK_SELECTOR     = '.main-wrap .main h2.nick';
const PLAYERS_LOGO_SELECTOR     = '.main-wrap .main .b-profileUser .b-user-logo img';
const PLAYERS_COUNTRY_SELECTOR  = '.main-wrap .main .b-profileUser p.name span.where.b-flag';
const PLAYERS_GAME_SELECTOR     = '.main-wrap .main .b-profileUser .rating .rating__game span';
const PLAYERS_RATING_SELECTOR   = '.main-wrap .main .b-profileUser .rating .rating__value';
const PLAYERS_HISTORY_SELECTOR  = '.main-wrap .main .table__involv-in-team';

export default getPlayersInformation;

async function getPlayersInformation(url, teams, events) {
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
            const history   = getPlayerHistory($, $(PLAYERS_HISTORY_SELECTOR), teams, game);

            if (game !== '' && allFilled(id, nick, imgPath, country, game, rating)) {
                result.push(getPayer(id, nick, imgPath, country, game, rating, history));
                id++;
            }
        }

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

        return result;
    }
    catch (err) {
        console.log(err);
    }
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

function getEventID(events, eventName) {
    const result = events.find(function (event) {
        return event.name === eventName;
    });
    
    if (result) {
        return result.id;
    }

    return 0;
}