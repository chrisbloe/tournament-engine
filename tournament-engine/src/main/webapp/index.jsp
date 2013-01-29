<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Canvas demo area</title>
    </head>
    <body>
        <div id="create-div">
            Enter your teams!
            
            <br /><br />
            
            <input id="new-team" placeholder="New team" />
            <button id="add-team-button">Add team</button>
            
            <br /><br />
            
            <select id="current-teams" multiple="true" size="7"></select>
            <button id="create-cournament-button">Create knockout tournament</button>
        </div>
        
        <div id="tournament-div" hidden="hidden">
<!--          <canvas id="knockoutCanvas" resize></canvas>-->
            <canvas id="knockoutCanvas" height="500" width="900"></canvas>

            <br />

            <input id="score-position" placeholder="Position" />
            <input id="winner" placeholder="Winner" />
            <input id="home-score" placeholder="Home score" />
            <input id="away-score" placeholder="Away score" />
            <button id="score-button">Submit score</button>

            <br />

            <input id="fixture-position" placeholder="Position" />
            <input id="date" placeholder="Date" />
            <input id="time" placeholder="Time" />
            <button id="fixture-button">Submit fixture</button>
        </div>
        
        <footer>
            <p>&copy; Answer Consulting Ltd. <script>document.write(new Date().getFullYear())</script></p>
        </footer>
        
        <script type="text/javascript" src="js/vendor/jquery.js"></script>
        <script type="text/javascript" src="js/vendor/paper.js"></script>
        <script type="text/javascript" src="js/knockout.js"></script>
        <script type="text/javascript" src="js/views.js"></script>
        <script type="text/javascript" src="js/myCanvas.js"></script>
    </body>
</html>
