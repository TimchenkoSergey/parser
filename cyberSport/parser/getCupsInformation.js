import getUrlsList     from './getUrlsList';
import downloadImage   from '../../libs/downloadImage';
import config          from '../../config';
import getGameFromList from '../../libs/getGameFromList';
import isValid         from './isValid';
import getLoadedPage   from './getLoadedPage';

const CUP_LINK_SELECTOR    = '.main-wrap .main #tournaments-list tr td a';
const CUP_LIST_SELECTOR    = 'table';
const CUP_ROWS_SELECTOR    = 'tr';
const CUP_NAME_SELECTOR    = '.battles-report-name-title a';
const CUP_DATE_SELECTOR    = '.battles-report-date';
const CUP_LOGO_SELECTOR    = '.main-wrap .main .tournament-row .tournament-table div.tournament-image a img';
const CUP_GAME_SELECTOR    = '.battles-games-col a span.icon-game';
const CUP_FOUND_SELECTOR   = '.battles-prize-col span';
const CUP_FORM_ID_SELECTOR = 'form#jsonFilterTM';

export default getCupsInformation;

async function getCupsInformation(url) {
    const links  = await getUrlsList(url, CUP_LINK_SELECTOR);
    let   result = [];

    for (let i = 0, len = links.length; i < len; i++) {
        try {
            const $ = await getLoadedPage(links[i].link);
            const imgPath = await downloadImage($(CUP_LOGO_SELECTOR).attr('src'));
            const tournamentID = getTournamentID($(CUP_FORM_ID_SELECTOR).attr('action'));
            const ajaxUrl = getAJAXUrl(tournamentID);
            const $$ = await getLoadedPage(ajaxUrl);
            const cups = getCupsList($$, $$(CUP_LIST_SELECTOR));

            cups.forEach(function (item) {
                item.logo = imgPath;
            });

            result.push(...cups);
        }
        catch (err) {
            console.log(err);
        }
    }

    result.forEach(function (item, i) {
        item.id = i + 1;
    });

    return result;
}

function getAJAXUrl(id) {
    const firstPath  = '/AJAX/cached2/reports_list.php?tournament_id=';
    const secondPath = '&first_load=Y&active=N&game=&active_elems=active&sort_field=0&sort_order=0&TM_NAME=';
    
    return firstPath + id + secondPath;
}

function getTournamentID(str) {
    return str.slice(str.lastIndexOf('=') + 1);
}

function getCupsList($, list) {
    const rows = list.find(CUP_ROWS_SELECTOR);
    let result = [];

    rows.each(function (i) {
        if (i !== 0) {
            const name      = getName($(this).find(CUP_NAME_SELECTOR).text());
            const date      = getDate($(this).find(CUP_DATE_SELECTOR).text());
            const found     = $(this).find(CUP_FOUND_SELECTOR).text();
            const gameClass = $(this).find(CUP_GAME_SELECTOR).attr('class');
            const game      =  getGameFromList(gameClass);

            if (game !== '' && allFilled({ name, date, found })) {
                result.push(getCup(name, date, found, game));
            }
        }
    });

    return result;
}

function getCup(name, date, found, game) {
    return {
        name,
        date,
        found,
        game
    };
}

function getName(str) {
    if (!str) {
        return '';
    }

    return str.trim();
}

function getDate(str) {
    if (!str) {
        return '';
    }

    const strArr     = str.trim().split(' ');
    const date       = strArr[1];
    const dataAtt    = date.split('.');
    const resultDate = `${dataAtt[1]}.${dataAtt[0]}.${dataAtt[2]}`;
    
    return resultDate;
}

function allFilled(data) {
    const config = {
        name  : 'isNonEmpty',
        date  : 'isNonEmpty',
        found : 'isNonEmpty'
    };
    
    return isValid(data, config);
}