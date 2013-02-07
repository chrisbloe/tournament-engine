;(function($){
    $.fn.tournamentCreator = function(knockout){
        new TournamentCreator(knockout);
    }
    
    var TournamentCreator = function(knockout){
        var $createDiv = $("#create-div");
        var $knockoutTournament = $("#knockout-tournament");

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

//            var teams = ['Blackburn', 'Coventry', 'Liverpool'];
//            var teams = ['Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];
//            var teams = ['Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];
//            var teams = ['Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];

//            var knockoutTournament = {
//                names     : ['', '', 'West Ham', 'Coventry', 'Man Utd', 'West Ham', 'Blackburn', 'Coventry', 'Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'],
//                locations : ['', 'Wembley', 'Old Trafford', 'Ewood Park', 'Galpharm Stadium', 'Upton Park', 'Globe Arena', 'Ricoh Arena'],
//                scores    : [['', ''], ['', ''], ['1 (1)', '4 (3)'], ['0 (0)', '2 (2)'], ['0 (0)', '0* (0) [2-4]'], ['1* (0) [6-5]', '1 (1)'], ['4 (3)', '5 (4)'], ['4 (1)', '2 (0)']],
//                fixtures  : [['', ''], ['18/10/2013', '15:00'], ['11/10/2013', '15:00']]
//            };
//
//            $('#knockout-canvas').knockout(knockoutTournament);

            $createDiv.hide();
            $knockoutTournament.show();
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

            // Now copy the array back into the options array
            for(var i = 0; i < options.length; i++){
                element.options[i] = new Option(options[i].text, 
                                                options[i].value, 
                                                options[i].defaultSelected, 
                                                options[i].selected);
            }
        }
    }
})(jQuery);