<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css">
<!--        <link rel="stylesheet" href="css/jquery-ui.css">-->
        
        <link rel="stylesheet" href="css/canvas.css">
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
        
        <div id="knockout-tournament">
            <div id="match-data-container">
                <div id="match-fixture-container" hidden="hidden">
                    <input id="fixture-date" placeholder="Date" maxlength="10" />
                    <br />
                    <input type="time" id="fixture-time" />
                </div>

                <div id="match-result-container" hidden="hidden">
                    <br />

                    <select id="winner"></select>
                    <br />
                    <input id="home-score" placeholder="Home score" />
                    <br />
                    <input id="away-score" placeholder="Away score" />
                </div>
            </div>
        </div>
        
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
