import model  from '../../model/model';

export default updateGbRating;

const POINTS_FOR_WIN      = 2;
const POINTS_FOR_TIE      = 1;
const MIN_NUMBER_OF_GAMES = 30;

async function updateGbRating(tables) {
    const teams = await model.findAll(tables.team, {});
    const games = await model.findAll(tables.matchesPast, {});

    for (let i = 0, len = teams.length; i < len; i++) {
        try {
            const teamId      = teams[i].team_id;
            const gamesFirst  = games.filter(item => item.first_team_id  == teamId);
            const gamesSecond = games.filter(item => item.second_team_id == teamId);
            const gamesCount  = gamesFirst.length + gamesSecond.length;

            if (gamesCount >= MIN_NUMBER_OF_GAMES) {
                let pointsCount = 0;
                let wins        = 0;
                let loses       = 0;

                pointsCount += getPoints(gamesFirst, 'result_first', 'result_second');
                pointsCount += getPoints(gamesSecond, 'result_second', 'result_first');
                loses       += getCountOfLoses(gamesFirst, 'result_first', 'result_second');
                loses       += getCountOfLoses(gamesSecond, 'result_second', 'result_first');
                wins        += getCountOfWins(gamesFirst, 'result_first', 'result_second');
                wins        += getCountOfWins(gamesSecond, 'result_second', 'result_first');

                const mathExpectation    = pointsCount / gamesCount;
                const probabilityWinning = wins        / gamesCount;
                const probabilityLosing  = loses       / gamesCount;

                await model.update(tables.team,
                    {
                        team_id : teamId
                    },
                    {
                        math_expectation    : mathExpectation,
                        probability_winning : probabilityWinning,
                        probability_losing  : probabilityLosing
                    });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

function getPoints(games, first, second) {
    let points = 0;

    games.forEach(function (item) {
        if (item[first] > item[second]) {
            points += POINTS_FOR_WIN;
        }
        else if (item[first] === item[second]) {
            points += POINTS_FOR_TIE;
        }
    });

    return points;
}

function getCountOfLoses(games, first, second) {
    let loses = 0;

    games.forEach(function (item) {
        if (item[first] < item[second]) {
            loses++;
        }
    });

    return loses;
}

function getCountOfWins(games, first, second) {
    let wins = 0;

    games.forEach(function (item) {
        if (item[first] > item[second]) {
            wins++;
        }
    });

    return wins;
}