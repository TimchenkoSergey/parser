import model  from '../../model/model';

export default updateCoefficients;

async function updateCoefficients(tables) {
    const teams           = await model.findAll(tables.team, {});
    const upcomingMatches = await model.findAll(tables.matchesFeature, {});

    for (let i = 0, len = upcomingMatches.length; i < len; i++) {
        const firstTeam  = getTeamById(teams, upcomingMatches[i].first_team_id);
        const secondTeam = getTeamById(teams, upcomingMatches[i].second_team_id);

        if (firstTeam && secondTeam && isProbabilityNotNull(firstTeam) && isProbabilityNotNull(secondTeam)) {
            const probability        = getRealWinProbability(firstTeam, secondTeam);
            const absoluteDifference = getAbsoluteDifferenceOfProbabilities(probability);
            const firstEquilibriumCoefficient  = getEquilibriumCoefficient(probability.firstTeamWinProbability);
            const secondEquilibriumCoefficient = getEquilibriumCoefficient(probability.secondTeamWinProbability);

            await model.update(tables.matchesFeature,
                {
                    competition_feature_id : upcomingMatches[i].competition_feature_id
                },
                {
                    first_team_win_probability     : probability.firstTeamWinProbability,
                    second_team_win_probability    : probability.secondTeamWinProbability,
                    absolute_difference            : absoluteDifference,
                    first_equilibrium_coefficient  : firstEquilibriumCoefficient,
                    second_equilibrium_coefficient : secondEquilibriumCoefficient
                });
        }
    }
}

function getTeamById(teams, id) {
    return teams.find(item => id == item.team_id);
}

function isProbabilityNotNull(team) {
    return team.probability_winning > 0 && team.probability_losing > 0;
}

function getWinProbability(firstTeam, secondTeam) {
    return firstTeam.probability_winning * secondTeam.probability_losing;
}

function getRealWinProbability(firstTeam, secondTeam) {
    const firstTeamWinProbability  = getWinProbability(firstTeam, secondTeam);
    const secondTeamWinProbability = getWinProbability(secondTeam, firstTeam);
    const sum = firstTeamWinProbability + secondTeamWinProbability;

    return {
        firstTeamWinProbability  : firstTeamWinProbability  / sum,
        secondTeamWinProbability : secondTeamWinProbability / sum
    }
}

function getAbsoluteDifferenceOfProbabilities({ firstTeamWinProbability, secondTeamWinProbability }) {
    return Math.abs(firstTeamWinProbability - secondTeamWinProbability);
}

function getEquilibriumCoefficient(probability) {
    return 1 /probability;
}