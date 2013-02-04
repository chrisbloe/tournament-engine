<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link rel="stylesheet" href="css/jquery-ui.css">
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
        
        <div id="tournament-div" hidden="hidden">
            <div class="canvas-container">
                <canvas id="knockout-canvas"></canvas>
            </div>

            <br />
            
            <input id="position" hidden="hidden" />
            
            <div id="match-fixture-container" hidden="hidden">
                <input id="fixture-date" placeholder="Date" maxlength="10" />
                <input id="fixture-time" placeholder="Time (19:30)" maxlength="5" />
                <button id="fixture-button">Submit fixture</button>
            </div>
            
            <div id="match-result-container" hidden="hidden">
                <br />
                
                <select id="winner"/>
                <input id="home-score" placeholder="Home score" />
                <input id="away-score" placeholder="Away score" />
                <button id="score-button">Submit score</button>
            </div>
        </div>
        
        <footer>
            <p>&copy; Answer Consulting Ltd. <script>document.write(new Date().getFullYear())</script></p>
        </footer>
        
        <script type="text/javascript" src="js/vendor/jquery.js"></script>
        <script type="text/javascript" src="js/vendor/jquery-ui.js"></script>
        <script type="text/javascript" src="js/vendor/paper.js"></script>
        <script type="text/javascript" src="js/knockout.js"></script>
        <script type="text/javascript" src="js/views.js"></script>
        <script type="text/javascript" src="js/myCanvas.js"></script>
    </body>
</html>
