import model from '../../model/model';

export default saveFeatureMatches;

function saveFeatureMatches(models, matches) {
    matches.forEach(function (match) {
        try {
            model.save(models.matchesFeature,  {
                competition_feature_id : +match.id,
                event_id               : +match.eventID,
                first_team_id          : +match.firstTeamID,
                second_team_id         : +match.secondTeamID,
                date                   : new Date(match.date),
                time                   : match.time
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}