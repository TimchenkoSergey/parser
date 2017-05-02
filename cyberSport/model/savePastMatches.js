import model from '../../model/model';

export default savePastMatches;

function savePastMatches(models, matches) {
    matches.forEach(function (match) {
        try {
            model.save(models.matchesPast, {
                competition_past_id : +match.id,
                event_id            : +match.eventID,
                first_team_id       : +match.firstTeamID,
                second_team_id      : +match.secondTeamID,
                result_first        : +match.resultFirst,
                result_second       : +match.resultSecond,
                date                : new Date(match.date),
                time                : match.time
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}