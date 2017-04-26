import sendRequest     from './sendRequest';
import getLoadedHtml   from './getLoadedHtml';
import Validator       from './Validator';
import getGameFromList from './getGameFromList';

const MATCH_ROWS_SELECTOR        = '.main-wrap .main .b-match-list tr';
const MATCH_DATE_TIME_SELECTOR   = '.b-match-list-item__date time';
const MATCH_EVENT_SELECTOR       = '.b-match-list-item__desc-report-name a > span';
const MATCH_FIRST_TEAM_SELECTOR  = '.b-match-list-item__entrant .b-match-list-item__first-entrant .b-match-list-item__team-name ';
const MATCH_SECOND_TEAM_SELECTOR = '.b-match-list-item__entrant .b-match-list-item__second-entrant .b-match-list-item__team-name';
const MATCH_GAME_SELECTOR        = '.b-match-list-item__icon span';
const NEXT_PAGE_SELECTOR         = '.main-wrap .main ul.pager li.next a';

export default getMatchesFeatureInformation;

async function getMatchesFeatureInformation(url, teams, events) {
    try {
        let matches = [];
        let id      = 1;

        for (let i = 1; ; i++) {
            const response   = await sendRequest(url + i);
            const $          = getLoadedHtml(response.body);
            const nextPage   = $(NEXT_PAGE_SELECTOR);
            const rows       = $(MATCH_ROWS_SELECTOR);

            rows.each(function (index) {
                if (index !== 0) {
                    const gameClass  = $(this).find(MATCH_GAME_SELECTOR).attr('class');
                    const game       = getGameFromList(gameClass);
                    const dateTime   = getDateTime($(this).find(MATCH_DATE_TIME_SELECTOR).attr('datetime'),
                                                   $(this).find(MATCH_DATE_TIME_SELECTOR).attr('title'));
                    const firstTeam  = $(this).find(MATCH_FIRST_TEAM_SELECTOR).text().trim();
                    const secondTeam = $(this).find(MATCH_SECOND_TEAM_SELECTOR).text().trim();
                    const event      = $(this).find(MATCH_EVENT_SELECTOR).text();

                    if (game !== '' && allFilled(dateTime.date, dateTime.time, firstTeam, secondTeam, event)) {
                        const firstTeamID  = getTeamID(teams, firstTeam, game);
                        const secondTeamID = getTeamID(teams, secondTeam, game);
                        const eventID      = getEventID(events, event);

                        matches.push(getMatch(id, dateTime.time, dateTime.date, firstTeamID, secondTeamID, eventID));
                        id++;
                    }
                }
            });

            if (!nextPage.text()) {
                break;
            }
        }

        return matches;
    }
    catch (err) {
        console.log(err);
    }
}

function getMatch(id, time, date, firstTeamID, secondTeamID, eventID) {
    return {
        id,
        time,
        date,
        firstTeamID,
        secondTeamID,
        eventID
    };
}

function getTeamID(teams, name, game) {
    const result = teams.find(function (item) {
        return item.name === name && item.game === game;
    });

    if (result) {
        return result.id;
    }
    else {
        return 0;
    }
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

function allFilled(date, time, firstTeam, secondTeam, event) {
    const data = {
        date,
        time,
        firstTeam,
        secondTeam,
        event
    };
    const config = {
        date         : 'isNonEmpty',
        time         : 'isNonEmpty',
        firstTeam    : 'isNonEmpty',
        secondTeam   : 'isNonEmpty',
        event        : 'isNonEmpty'
    };
    const validator = new Validator(data, config);

    return validator.isFilled();
}

function getDateTime(date, time) {
    let result = {};

    if (date && time) {
        result.date = date.split('T')[0];
        result.time = time.split(',')[1].trim();
    }
    else {
        result.date = '';
        result.time = '';
    }

    return result;
}