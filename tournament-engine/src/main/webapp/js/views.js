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
})(jQuery);