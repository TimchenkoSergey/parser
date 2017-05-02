import model from '../../model/model';

export default saveTeams;

function saveTeams(models, teams) {
    teams.forEach(function (team) {
        try {
            model.save(models.team, {
                team_id   : +team.id,
                rating    : +team.rating,
                rating_gb : +team.gbRating,
                name      : team.name,
                logo      : team.logo,
                game      : team.game
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}