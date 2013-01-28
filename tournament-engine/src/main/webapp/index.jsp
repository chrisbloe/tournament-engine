<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Canvas demo area</title>
    </head>
    <body>
<!--      <canvas id="knockoutCanvas" resize></canvas>-->
        <canvas id="knockoutCanvas" height="500" width="900"></canvas>
        
        <br />
        
        <input id="score-position" placeholder="Position" />
        <input id="winner" placeholder="Winner" />
        <input id="home-score" placeholder="Home score" />
        <input id="away-score" placeholder="Away score" />
        <button id="score-button">Submit score</button>
        
        <br />
        
        <input id="fixture-position" placeholder="Position" />
        <input id="date" placeholder="date" />
        <input id="time" placeholder="time" />
        <button id="fixture-button">Submit fixture</button>
        
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
