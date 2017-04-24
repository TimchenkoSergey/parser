import Validator from './Validator';

const TEAM_SELECTOR  = 'td.team a.team-name';
const TEAM_NO_LINK_SELECTOR  = 'td.team';
const DATE_SELECTOR  = 'td.team .date';
const WIN_SELECTOR   = 'td.stats .wins span.percentage';
const LOSE_SELECTOR  = 'td.stats .loses span.percentage';
const TIE_SELECTOR   = 'td.stats .ties span.percentage';
const ROWS_SELECTOR  = 'tr';
const CUPS_SELECTOR  = '.table__involv-in-team__awards';
const PRIZE_SELECTOR = '.rank-icon-prize';

export default getPlayerHistory;

function getPlayerHistory($, element, teams, game) {
    let result = [];
    const rows = element.find(ROWS_SELECTOR);

    rows.each(function (i) {
        if (i !== 0) {
            const team   = getTeamName($(this));
            const date   = getDate($(this).find(DATE_SELECTOR).text());
            const wins   = getNumbers($(this).find(WIN_SELECTOR).text());
            const ties   = getNumbers($(this).find(TIE_SELECTOR).text());
            const loses  = getNumbers($(this).find(LOSE_SELECTOR).text());
            const teamID = getTeamID(team, teams, game);
            const cups   = getCups($, $(this).find(CUPS_SELECTOR));

            if (date && allFilled(teamID, date.dateIn, date.dateOut, wins, ties, loses)) {
                result.push(getHistoryObj(teamID, date.dateIn, date.dateOut, wins, ties, loses, cups));
            }
        }
    });
    
    return result;
}

function getCups($, element) {
    let result = [];
    const cups = element.find(PRIZE_SELECTOR);

    cups.each(function () {
        const title = $(this).attr('title');
        const place = getPlace(title);
        const events = title.replace(/\•/g, '').split('\n').splice(1);
        const logo   = getLogoForCup(place);

        events.forEach(function (item) {
            result.push({
                place,
                logo,
                name : item
            });
        });
    });

    return result;
}
function getPlace(str) {
    const places = ['Золото', 'Серебро', 'Бронза'];
    const result = places.find(function (item) {
        return str.indexOf(item) > -1;
    });

    return result;
}

function getLogoForCup(str) {
    const logoMap = {
      'Золото'  : './public/img/ico-cup-gold.png',
      'Серебро' : './public/img/ico-cup-silver.png',
      'Бронза'  : './public/img/ico-cup-bronze.png'
    };

    return logoMap[str];
}

function getTeamName(element) {
    let name = '';

    if (element.find(TEAM_SELECTOR).contents()[0]) {
        name = element.find(TEAM_SELECTOR).contents()[0].data;
    }
    else if (element.find(TEAM_NO_LINK_SELECTOR).contents()[0]) {
        name = element.find(TEAM_NO_LINK_SELECTOR).contents()[0].data;
    }

    return name.trim();
}

function getDate(str) {
    if (!str) {
        return;
    }

    let result = {};
    let date   = str.split('-');

    let dateInArr = date[0].trim().split('.');
    let dateIn    = `${dateInArr[1]}.${dateInArr[0]}.${dateInArr[2]}`;
    let dateOut;

    if (date[1].trim() !== 'сейчас') {
        let dateOutArr = date[1].trim().split('.');
        dateOut        = `${dateOutArr[1]}.${dateOutArr[0]}.${dateOutArr[2]}`;
    }
    else {
        dateOut = Date.now();
    }

    result.dateIn  = dateIn;
    result.dateOut = dateOut;

    return result;
}

function getNumbers(str) {
    if (!str) {
        return;
    }

    return str.split('%')[1].replace(/[\(\)]/g, '').trim();
}

function getTeamID(name, teams, game) {
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

function getHistoryObj(teamID, dateIn, dateOut, wins, ties, loses, cups) {
    return {
        teamID,
        dateIn,
        dateOut,
        cups,
        wins  : +wins,
        ties  : +ties,
        loses : +loses
    };
}

function allFilled(teamID, dateIn, dateOut, wins, ties, loses) {
    const data = {
        teamID,
        dateIn,
        dateOut,
        wins,
        ties,
        loses
    };
    const config = {
        teamID  : 'isNumber',
        dateIn  : 'isNonEmpty',
        dateOut : 'isNonEmpty',
        wins    : 'isNumber',
        ties    : 'isNumber',
        loses   : 'isNumber'
    };
    const validator = new Validator(data, config);

    return validator.isFilled();
}