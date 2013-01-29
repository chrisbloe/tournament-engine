;(function($){
    SubmitScoreView = function(knockout){
        var $position = $("#score-position");
        var $winner = $("#winner");
        var $homeScore = $("#home-score");
        var $awayScore = $("#away-score");
        var $scoreButton = $("#score-button");
        
        $scoreButton.on("click", function(){
            var position = $position.val();
            var winner = $winner.val();
            var homeScore = $homeScore.val();
            var awayScore = $awayScore.val();
           
            var result = {winner:winner, scores:[homeScore, awayScore], position: position};
            knockout.addResult(result);
        });
    };
    
    SubmitFixture = function(knockout){
        var $position = $("#fixture-position");
        var $date = $("#date");
        var $time = $("#time");
        var $fixtureButton = $("#fixture-button");
        
        $fixtureButton.on("click", function(){
            var position = $position.val();
            var date = $date.val();
            var time = $time.val();
           
            var fixture = {date:date, time:time, position: position};
            knockout.addFixture(fixture);
        });
    };
    
    CreateTournament = function(knockout){
        var $createDiv = $("#create-div");
        var $tournamentDiv = $("#tournament-div");
        
        var $newTeam = $("#new-team");
        var $addTeamButton = $("#add-team-button");
        var $currentTeams = $('#current-teams');
        var $createCournamentButton = $("#create-cournament-button");
        
        $addTeamButton.on("click", function(){
            $currentTeams.append("<option value='"+$newTeam.val()+"'>"+$newTeam.val()+"</option>");
        });
        
        $createCournamentButton.on("click", function(){
            var teams = [];
            $('#current-teams option').attr('selected', 'selected');

            $('#current-teams :selected').each(function(i, selected){
                teams[i] = $(selected).text();
            });
            
            knockout.createRandomTournament(teams);
            
            $createDiv.hide();
            $tournamentDiv.show();
        });
    };
})(jQuery);