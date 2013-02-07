<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />
<!--        <link rel="stylesheet" href="css/jquery-ui.css">-->
        
        <link rel="stylesheet" href="css/canvas.css" />
        <title>Canvas demo area</title>
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
            <p>&copy; Answer Consulting Ltd. <script>document.write(new Date().getFullYear())</script></p>
        </footer>
        
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script src="http://code.jquery.com/jquery-migrate-1.1.0.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.0/jquery-ui.min.js"></script>
<!--        <script type="text/javascript" src="js/vendor/jquery.js"></script>
        <script type="text/javascript" src="js/vendor/jquery-ui.js"></script>-->
        
        <script type="text/javascript" src="js/vendor/paper.js"></script>
        <script type="text/javascript" src="js/knockout.js"></script>
        <script type="text/javascript" src="js/tournamentCreator.js"></script>
        <script type="text/javascript" src="js/myCanvas.js"></script>
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
        <script type="text/javascript" src="http://code.jquery.com/ui/1.10.0/jquery-ui.min.js"></script>
        <script type="text/javascript" src="js/vendor/paper.js"></script>
        <script type="text/javascript" src="js/knockout.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                var teams = ['Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];
                
                var knockoutTournament = {
                    names     : ['', '', 'West Ham', 'Coventry', 'Man Utd', 'West Ham', 'Blackburn', 'Coventry', 'Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'],
                    locations : ['', 'Wembley', 'Old Trafford', 'Ewood Park', 'Galpharm Stadium', 'Upton Park', 'Globe Arena', 'Ricoh Arena'],
                    scores    : [['', ''], ['', ''], ['1 (1)', '4 (3)'], ['0 (0)', '2 (2)'], ['0 (0)', '0* (0) [2-4]'], ['1* (0) [6-5]', '1 (1)'], ['4 (3)', '5 (4)'], ['4 (1)', '2 (0)']],
                    fixtures  : [['', ''], ['18/10/2013', '15:00'], ['11/10/2013', '15:00'], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]
                };

                var displayOptions = {
                    width          : 90,  // The width of each box
                    height         : 30,  // The height of each box
                    header         : 30,  // The space given for the round headers
                    lineLength     : 0.2, // For far between the rounds the lines meet
                    widthDistance  : 1.2, // The distance between each round
                    heightDistance : 0.9, // The distance between the far left boxes
                    fontAllowance  : 5,   // Add fontAllowance so the text isn't covered by the lines
                    margin         : 25   // The extra space given to the right and left of the canvas
                };

                var knockout = $('#knockout-tournament').knockout({
                    teams              : teams,
                    knockoutTournament : knockoutTournament,
                    displayOptions     : displayOptions
                });
            });
        </script>
    </body>
</html>-->