import isValid         from './isValid';
import getGameFromList from '../../libs/getGameFromList';
import isNextPageExist from './isNextPageExist';
import getTeamID       from './getTeamID';
import getEventID      from './getEventID';
import getTrimString   from '../../libs/getTrimString';
import getLoadedPage   from './getLoadedPage';

const MATCH_ROWS_SELECTOR        = '.main-wrap .main .b-match-list tr';
const MATCH_DATE_TIME_SELECTOR   = '.b-match-list-item__date time';
const MATCH_EVENT_SELECTOR       = '.b-match-list-item__desc-report-name a > span';
const MATCH_FIRST_TEAM_SELECTOR  = '.b-match-list-item__entrant .b-match-list-item__first-entrant ' +
                                   '.b-match-list-item__team-name ';
const MATCH_SECOND_TEAM_SELECTOR = '.b-match-list-item__entrant .b-match-list-item__second-entrant ' +
                                   '.b-match-list-item__team-name';
const MATCH_GAME_SELECTOR        = '.b-match-list-item__icon span';

export default getMatchesFeatureInformation;

async function getMatchesFeatureInformation(url, teams, events) {
    try {
        let matches = [];
        let id      = 1;

        for (let i = 1; ; i++) {
            const $    = await getLoadedPage(url + i);
            const rows = $(MATCH_ROWS_SELECTOR);

            rows.each(function (index) {
                try {
                    if (index !== 0) {
                        const game = getGameFromList($(this).find(MATCH_GAME_SELECTOR).attr('class'));
                        const dateTime = getDateTime($(this).find(MATCH_DATE_TIME_SELECTOR).attr('datetime'),
                            $(this).find(MATCH_DATE_TIME_SELECTOR).attr('title'));
                        const firstTeam = getTrimString($(this).find(MATCH_FIRST_TEAM_SELECTOR).text());
                        const secondTeam = getTrimString($(this).find(MATCH_SECOND_TEAM_SELECTOR).text());
                        const event = $(this).find(MATCH_EVENT_SELECTOR).text();

                        if (game !== '' && allFilled({
                                date: dateTime.date,
                                time: dateTime.time,
                                firstTeam,
                                secondTeam,
                                event
                            })) {
                            const firstTeamID = getTeamID(teams, firstTeam, game);
                            const secondTeamID = getTeamID(teams, secondTeam, game);
                            const eventID = getEventID(events, event);

                            matches.push(getMatch(id, dateTime.time, dateTime.date, firstTeamID, secondTeamID, eventID));
                            id++;
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                }
            });

            if (!isNextPageExist($)) {
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

function allFilled(data) {
    const config = {
        date       : 'isNonEmpty',
        time       : 'isNonEmpty',
        firstTeam  : 'isNonEmpty',
        secondTeam : 'isNonEmpty',
        event      : 'isNonEmpty'
    };
    
    return isValid(data, config);
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