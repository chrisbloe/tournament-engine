;(function($){
    $.fn.tournamentCreator = function(knockout){
        new TournamentCreator(knockout);
    };
    
    var TournamentCreator = function(knockout){
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

            $('#current-teams option').each(function(i, option){
                teams[i] = $(option).text();
            });
            
            knockout.createRandomTournament(teams);
        });

       /**
        * Sorts all of the options in a select element
        *
        * @author Dan Delaney http://fluidmind.org/
        * @param  element     The HTML select element to be sorted
        */
        var sortOptions = function(element){
            // We have to put the whole options array into a new array, because
            // the options array doesn't support all of the Array methods (like sort)
            // Doesn't that suck?
            var options = [];

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

            // Now copy the array back into the options array
            for(var i = 0; i < options.length; i++){
                element.options[i] = new Option(options[i].text, 
                                                options[i].value, 
                                                options[i].defaultSelected, 
                                                options[i].selected);
            }
        };
    };
})(jQuery);