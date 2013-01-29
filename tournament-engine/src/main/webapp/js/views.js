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
        
        var $removeTeamButton = $("#remove-team-button");
        var $createTournamentButton = $("#create-cournament-button");
        
        $addTeamButton.on("click", function(){
            $currentTeams.append("<option value='"+$newTeam.val()+"'>"+$newTeam.val()+"</option>");
            sortOptions($currentTeams[0]);
            $newTeam.val("");
            $newTeam.focus();
        });
        
        $removeTeamButton.on("click", function(){
            $('#current-teams :selected').remove();
            
            $newTeam.focus();
        });
        
        $createTournamentButton.on("click", function(){
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
    
   /**
    * Sorts all of the options in a select element
    *
    * @author Dan Delaney http://fluidmind.org/
    * @param  element     The HTML select element to be sorted
    * @param  direction   The sort direction: 'asc' or 'desc' (optional)
    */
   var sortOptions = function(element, direction){
       // We have to put the whole options array into a new array, because
       // the options array doesn't support all of the Array methods (like sort)
       // Doesn't that suck?
       var options = new Array();
       for(var i = 0; i < element.options.length; i++){
           options.push(element.options[i]);
       }

       // Sort it with a function that uses the 'text' property of the Option object
       options.sort(function(a, b){
            if(a.text.toLowerCase() < b.text.toLowerCase()){
                return -1;
            }
            
            if(a.text.toLowerCase() > b.text.toLowerCase()){
                return 1;
            }
            
            return 0;
        });

       // If asked to sort in descending, reverse it
       if(direction != undefined && direction.toLowerCase() == 'desc'){
           options.reverse();
       }

       // Now copy the array back into the options array
       for(var i = 0; i < options.length; i++){
           element.options[i] = new Option(options[i].text, 
                                           options[i].value, 
                                           options[i].defaultSelected, 
                                           options[i].selected);
       }
   }
})(jQuery);