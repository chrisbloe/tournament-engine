<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.1/themes/ui-lightness/jquery-ui.min.css">
    </head>
    <body>
        <div id="create-div">
            Enter your teams!
            
            <br /><br />
            
            <input id="new-team" placeholder="New team" />
            <button id="add-team-button">Add team</button>
            
            <br /><br />
            
            <select id="current-teams" multiple="multiple" size="7"></select>
            <button id="remove-team-button">Remove selected teams</button>
            
            <br /><br />
            
            <button id="create-cournament-button">Create knockout tournament</button>
        </div>
        
        <div id="knockout-tournament"></div>
        
        <footer>
            <p style="text-align:center;">&copy; Answer Consulting Ltd. <script>document.write(new Date().getFullYear());</script></p>
        </footer>
        
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script src="http://code.jquery.com/jquery-migrate-1.1.1.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.1/jquery-ui.min.js"></script>
<!--        <script type="text/javascript" src="js/vendor/jquery.js"></script>
        <script type="text/javascript" src="js/vendor/jquery-ui.js"></script>-->
        
        <script type="text/javascript" src="js/vendor/paper.js"></script>
        <script type="text/javascript" src="js/knockout.js"></script>
        <script type="text/javascript">
            (function($){
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

                        knockout.createRandomTournament("Test title", teams);
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
        </script>
        <script type="text/javascript">
            $(document).ready(function(){
                var knockoutTournament = {
                    title     : "This is my frikkin' awesome tournament 2!",
                    names     : ['', '', 'West Ham', 'Coventry', 'Man Utd', 'West Ham', 'Blackburn', 'Coventry', 'Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'],
                    locations : ['', 'Wembley', 'Old Trafford', 'Ewood Park', 'Galpharm Stadium', 'Upton Park', 'Globe Arena', 'Ricoh Arena'],
                    scores    : [['', ''], ['', ''], ['1 (1)', '4 (3)'], ['0 (0)', '2 (2)'], ['0 (0)', '0* (0) [2-4]'], ['1* (0) [6-5]', '1 (1)'], ['4 (3)', '5 (4)'], ['4 (1)', '2 (0)']],
                    fixtures  : [['', ''], ['18/10/2013', '15:00'], ['11/10/2013', '15:00'], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]
                };

                var displayOptions = {

                };

                var knockout = $('#knockout-tournament').knockout({
                    teams              : ['Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'],
                    knockoutTournament : knockoutTournament,
                    displayOptions     : displayOptions
                });

                $("#create-div").tournamentCreator(knockout);
                $("#new-team").focus();
            });
        </script>
    </body>
</html>

<!--<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />
    </head>
    <body>
        <div id="knockout-tournament"></div>
        
        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/ui/1.10.1/jquery-ui.min.js"></script>
        <script type="text/javascript" src="js/vendor/paper.js"></script>
        <script type="text/javascript" src="js/knockout.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                var teams = ['Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];
                
                var knockoutTournament = {
                    title     : "This is my frikkin' awesome tournament 2!",
                    names     : ['', '', 'West Ham', 'Coventry', 'Man Utd', 'West Ham', 'Blackburn', 'Coventry', 'Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'],
                    locations : ['', 'Wembley', 'Old Trafford', 'Ewood Park', 'Galpharm Stadium', 'Upton Park', 'Globe Arena', 'Ricoh Arena'],
                    scores    : [['', ''], ['', ''], ['1 (1)', '4 (3)'], ['0 (0)', '2 (2)'], ['0 (0)', '0* (0) [2-4]'], ['1* (0) [6-5]', '1 (1)'], ['4 (3)', '5 (4)'], ['4 (1)', '2 (0)']],
                    fixtures  : [['', ''], ['18/10/2013', '15:00'], ['11/10/2013', '15:00'], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]
                };

                var displayOptions = {
                    lineLength    : 0.2, // For far between the rounds the lines meet
                    textSize      : 10
                };

                var knockout = $('#knockout-tournament').knockout({
                    teams              : teams,
                    knockoutTournament : knockoutTournament
                    displayOptions     : displayOptions
                });
            });
        </script>
    </body>
</html>-->