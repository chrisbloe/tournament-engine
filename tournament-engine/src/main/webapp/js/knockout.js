;(function($, paper){
    var Utils = {
        applyValues : function(properties,target){
            if(properties) {
                $.each(properties, function(name, value){
                    if(target.hasOwnProperty(name)) {
                        target[name] = value;
                    }
                });
            }
        }
    };
    
    var Options = function(knockoutOptions){
        var optionList = {
            width          : 90,
            height         : 30,
            header         : 30,
            lineLength     : 0.2,
            widthDistance  : 1.2, // The distance between each round
            heightDistance : 0.9, // The distance between the far left boxes
            fontAllowance  : 5,   // Add fontAllowance so the text isn't covered by the lines
            leftmargin     : 40,

            applyValues    : function(args) {
                Utils.applyValues(args, this);
            }
        };
        
        optionList.applyValues(knockoutOptions);
        
        return optionList;
    };
    
    var KnockoutTournament = function(knockoutTournament){
        var tournament = {
            names       : [''],
            locations   : [''],
            scores      : [['', '']],
            fixtures    : [['', '']],
            headers     : ['Winner', 'Final', 'SF', 'QF'],

            applyValues : function(args){
                Utils.applyValues(args, this);
            },
            
            addFixture  : function(fixture){
                var position = fixture.position;
                this.fixtures[position][0] = fixture.date;
                this.fixtures[position][1] = fixture.time;
            },
            
            addResult   : function(result){
                var position = result.position;
                this.names[position] = result.winner;
                this.scores[position][0] = result.scores[0];
                this.scores[position][1] = result.scores[1];
            }
        };
        
        tournament.applyValues(knockoutTournament);
        
        return tournament;
    };
    
    Knockout = function(id, knockoutTournament, knockoutOptions){
        var canvas        = $('#'+id)[0];
        
        var tournament    = new KnockoutTournament(knockoutTournament);
        var options       = new Options(knockoutOptions);

        var depth         = 0;
        var startx        = 0; // The top left corner of box[1]
        var starty        = 0; // The top left corner of box[1]
        var depthDistance = 0;
        var ychange       = 0;

        var boxes         = new Array(); // required

        var addHeaders = function(){
            var x = startx + options.width / 2;
            var y = options.header / 2 + options.fontAllowance;

            // Add QF, SF, Final and Winner headers
            for(var i = 0; i <= depth && i < tournament.headers.length; i++) {
                var finalsHeader = new paper.PointText(new paper.Point(x, y));
                finalsHeader.justification = 'center';
                finalsHeader.content = tournament.headers[i];

                // Work from the right, moving left
                x = x - options.width * (options.widthDistance + 1);
            }

            x = options.leftmargin + options.width / 2;
            var k = 1;

            // Add any previous rounds
            for(var j = depth; j > tournament.headers.length - 1; j--) {
                var roundHeader = new paper.PointText(new paper.Point(x, y));
                roundHeader.justification = 'center';
                roundHeader.content = 'Round ' + k;

                x = x + options.width * (options.widthDistance + 1);
                k++;
            }
        };

        var drawBoxes = function(i){
            boxes[i * 2] = boxes[i].clone();
            boxes[i * 2].position.x -= options.width * (options.widthDistance + 1);
            boxes[i * 2].position.y -= ychange;

            boxes[i * 2 + 1] = boxes[i * 2].clone();
            boxes[i * 2 + 1].position.y += options.height * Math.pow(2, depth - depthDistance) * options.heightDistance;
        };

        var addText = function(i){
            var y = boxes[i].position.y + options.fontAllowance;

            var participant = new paper.PointText(new paper.Point(boxes[i].position.x, y));
            participant.justification = 'center';
            participant.content = tournament.names[i];
        };

        var addLines = function(i){
            //   .       .
            //(x1,y1) (x2,y1)
            //
            //           .       .
            //        (x2,y2)  (x,y2)
            //
            //   .       .
            //(x1,y3) (x2,y3)
            var x = boxes[i].position.x - options.width / 2;
            var x1 = x - options.width * options.widthDistance;
            var x2 = x1 + options.lineLength * (x - x1)

            var y = boxes[i].position.y - options.height / 2;
            var y1 = y + options.height / 2 - ychange;
            var y2 = y + options.height / 2;
            var y3 = y + options.height / 2 + ychange;

            new paper.Path(new paper.Point(x1, y1),
                           new paper.Point(x2, y1),
                           new paper.Point(x2, y2),
                           new paper.Point(x, y2),
                           new paper.Point(x2, y2),
                           new paper.Point(x2, y3),
                           new paper.Point(x1, y3))
                     .strokeColor = 'black';
        };

        var addLocation = function(i){
            var x = boxes[i].position.x - options.width * (options.widthDistance + 1);
            var y = boxes[i].position.y + options.fontAllowance;

            var location = new paper.PointText(new paper.Point(x, y));
            location.justification = 'center';
            location.content = tournament.locations[i];
        };

        var addScoresAndFixtures = function(i){
            var x = boxes[i].position.x - options.widthDistance * options.width * (1 - options.lineLength) - options.width / 2 + options.fontAllowance;
            var y = boxes[i].position.y;

            if((tournament.scores[i][0] != 'undefined' && tournament.scores[i][1] != 'undefined') &&
               (tournament.scores[i][0] != '' && tournament.scores[i][1] != '')) {
                var homeScore = new paper.PointText(new paper.Point(x, y - options.fontAllowance));
                homeScore.content = tournament.scores[i][0];

                var awayScore = new paper.PointText(new paper.Point(x, y + options.fontAllowance * 3));
                awayScore.content = tournament.scores[i][1];
            } else {
                if(tournament.fixtures[i][0] != 'undefined' && tournament.fixtures[i][1] != 'undefined') {
                    var fixtureDate = new paper.PointText(new paper.Point(x, y - options.fontAllowance));
                    fixtureDate.content = tournament.fixtures[i][0];

                    var fixtureTime = new paper.PointText(new paper.Point(x, y + options.fontAllowance * 3));
                    fixtureTime.content = tournament.fixtures[i][1];
                }
            }
        };

        var addSuccessColors = function(){
            for(var i = 1; i < Math.pow(2, depth); i++) {
                if(tournament.names[i] == tournament.names[i * 2]) {
                    boxes[i * 2].strokeColor = 'green';
                }

                if(tournament.names[i] == tournament.names[i * 2 + 1]) {
                    boxes[i * 2 + 1].strokeColor = 'green';
                }
            }
        };

        var init = function(){
            paper.setup(canvas);
            depth = Math.floor((Math.log(tournament.names.length - 1))/(Math.log(2)));
            startx = depth * options.width * (options.widthDistance + 1) + options.leftmargin;
            starty = options.height * options.heightDistance * (Math.pow(2, depth) - 1) + options.header + 1;

            addHeaders();

            boxes[1] = new paper.Path(new paper.Point(startx, starty),
                                      new paper.Point(startx + options.width, starty),
                                      new paper.Point(startx + options.width, starty + options.height),
                                      new paper.Point(startx, starty + options.height));
            boxes[1].strokeColor = 'black';
            boxes[1].closed = true;

            addText(1);

            for(var i = 1; i < Math.pow(2, depth); i++) {
                // How many depths down is i?
                depthDistance = Math.floor((Math.log(i))/(Math.log(2)));

                // The difference between the two new boxes
                ychange = options.height * Math.pow(2, depth - depthDistance - 1) * options.heightDistance;

                // Draw the boxes
                drawBoxes(i);

                // Put the team name in the box
                addText(i * 2);
                addText(i * 2 + 1);

                // Draw the lines between the boxes
                addLines(i);

                addLocation(i);

                addScoresAndFixtures(i);
            }

            // Needs doing after otherwise the colours will be cloned
            addSuccessColors();
            
            paper.view.draw();
        }

        init();

        return {
            redraw : function(knockoutOptions){
                options.applyValues(knockoutOptions);
                init();
            },
            
            addFixture : function(result){
                tournament.addFixture(result);
                init();
            },
            
            addResult : function(result){
                tournament.addResult(result);
                init();
            }
        };
    }
})(jQuery, paper);
