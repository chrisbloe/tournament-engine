;(function($, paper){
    $.fn.knockout = function(tournamentOptions){
        var $matchFixtureContainer = $('<div/>', {'class':'match-fixture-container', 'hidden':'hidden'})
                                        .append(
                                            $('<input/>', {'class':'fixture-date', 'placeholder':'Date', 'maxlength':'10'})
                                        ).append(
                                            $('<br/>')
                                        ).append(
                                            $('<input/>', {'class':'fixture-time', 'type':'time'})
                                        );
        
        var $matchResultContainer = $('<div/>', {'class':'match-result-container', 'hidden':'hidden'})
                                        .append(
                                            $('<br/>')
                                        ).append(
                                            $('<select/>', {'class':'winner'})
                                        ).append(
                                            $('<br/>')
                                        ).append(
                                            $('<input/>', {'class':'home-score', 'placeholder':'Home score'})
                                        ).append(
                                            $('<br/>')
                                        ).append(
                                            $('<input/>', {'class':'away-score', 'placeholder':'Away score'})
                                        );
        
        var $matchDataContainer = $('<div/>', {'class':'match-data-container'})
                                    .append($matchFixtureContainer).append($matchResultContainer);
        
        this.addClass("canvas-container")
            .append($('<canvas/>', {'class':'knockout-canvas'}))
            .append($matchDataContainer);
        
        var knockout = new Knockout(this, tournamentOptions);
        
        new SubmitFixture($matchFixtureContainer, knockout);
        
        new SubmitResult($matchResultContainer, knockout);
        
        return knockout;
    };
    
    var Utils = {
        applyValues : function(properties,target){
            if(properties){
                $.each(properties, function(name, value){
                    if(target.hasOwnProperty(name)){
                        target[name] = value;
                    }
                });
            }
        },

        shuffle : function(arr){
            for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
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
            margin         : 40,

            applyValues    : function(args){
                Utils.applyValues(args, this);
            }
        };
        
        optionList.applyValues(knockoutOptions);
        
        return optionList;
    };
    
    var KnockoutTournament = function(teams, knockoutTournament){
        var tournament = {
            names       : [''],
            locations   : [''],
            scores      : [['', '']],
            fixtures    : [['', '']],
            headers     : ['Winner', 'Final', 'SF', 'QF'],
            position    : 0,
            
            applyValues : function(args){
                Utils.applyValues(args, this);
            },
            
            addFixture  : function(fixture){
                this.fixtures[this.position][0] = fixture.date;
                this.fixtures[this.position][1] = fixture.time;
            },
            
            addResult   : function(result){
                this.names[this.position] = result.winner;
                this.scores[this.position][0] = result.scores[0];
                this.scores[this.position][1] = result.scores[1];
            },
            
            reset       : function(){
                this.names     = [''],
                this.locations = [''],
                this.scores    = [['', '']],
                this.fixtures  = [['', '']],
                this.headers   = ['Winner', 'Final', 'SF', 'QF'],
                this.position  = 0
            },
            
            createRandomTournament : function(teams){
                var maxDepth = Math.ceil((Math.log(teams.length))/(Math.log(2)));
                
                var minPosition = Math.pow(2, maxDepth);
                var maxPosition = Math.pow(2, maxDepth + 1) -1;
                
                // Set later rounds to blank
                for(var position = 0; position < minPosition; position++){
                    this.names[position] = '';
                }
                
                var firstRound = new Array();
                
                // Add teams to an array big enough for the first round
                for(var i = 0; i < Math.pow(2, maxDepth); i++){
                    if(teams[i]){
                        firstRound[i] = teams[i];
                    } else {
                        firstRound[i] = '-';
                    }
                }
                
                // Shuffle the first round
                firstRound = Utils.shuffle(firstRound);
                
                // Append the first round to the end of the earlier rounds
                for(var k = minPosition; k <= maxPosition; k++){
                    this.names.push(firstRound[k - minPosition]);
                }
                
                // Fill in the other parts
                for(var j = 0; j <= minPosition; j++){
                    this.locations[j] = '';
                    this.scores[j] = ['', ''];
                    this.fixtures[j] = ['', ''];
                }
            }
        };
        
        if (knockoutTournament){
            tournament.applyValues(knockoutTournament);
        } else {
            tournament.createRandomTournament(teams);
        }
        
        return tournament;
    };
    
    Knockout = function($tournamentContainer, tournamentOptions){
        var teams              = tournamentOptions.teams;
        var knockoutTournament = tournamentOptions.knockoutTournament;
        var knockoutOptions    = tournamentOptions.knockoutOptions;
        
        var $matchDataContainer = $tournamentContainer.children(".match-data-container");
        
        var $matchFixtureContainer = $matchDataContainer.children(".match-fixture-container");
        var $fixtureDate = $matchFixtureContainer.children(".fixture-date");
        var $fixtureTime = $matchFixtureContainer.children(".fixture-time");
        
        var $matchResultContainer = $matchDataContainer.children(".match-result-container");
        var $winner = $matchResultContainer.children(".winner");
        var $homeScore = $matchResultContainer.children(".home-score");
        var $awayScore = $matchResultContainer.children(".away-score");
        
        var $canvas             = $tournamentContainer.children(".knockout-canvas")
        var canvas              = $canvas[0];
        
        var tournament          = new KnockoutTournament(teams, knockoutTournament);
        var options             = new Options(knockoutOptions);

        var depth               = 0;
        var startx              = 0; // The top left corner of box[1]
        var starty              = 0; // The top left corner of box[1]
        var depthDistance       = 0;
        var ychange             = 0;

        var boxes               = new Array(); // required

        var addHeaders = function(){
            var x = startx + options.width / 2;
            var y = options.header / 2 + options.fontAllowance;

            // Add QF, SF, Final and Winner headers
            for(var i = 0; i <= depth && i < tournament.headers.length; i++){
                var finalsHeader = new paper.PointText(new paper.Point(x, y));
                finalsHeader.justification = 'center';
                finalsHeader.content = tournament.headers[i];

                // Work from the right, moving left
                x = x - options.width * (options.widthDistance + 1);
            }

            x = options.margin + options.width / 2;
            var k = 1;

            // Add any previous rounds
            for(var j = depth; j > tournament.headers.length - 1; j--){
                var roundHeader = new paper.PointText(new paper.Point(x, y));
                roundHeader.justification = 'center';
                roundHeader.content = 'Round ' + k;

                x = x + options.width * (options.widthDistance + 1);
                k++;
            }
        };

        var drawBox = function(i){
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

        var addLine = function(i){
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

        var addScoreOrFixture = function(i){
            var x = boxes[i].position.x - options.widthDistance * options.width * (1 - options.lineLength) - options.width / 2 + options.fontAllowance;
            var y = boxes[i].position.y;

            if((tournament.scores[i] != 'undefined') &&
               (tournament.scores[i][0] != '' && tournament.scores[i][1] != '')){
                var homeScore = new paper.PointText(new paper.Point(x, y - options.fontAllowance));
                homeScore.content = tournament.scores[i][0];

                var awayScore = new paper.PointText(new paper.Point(x, y + options.fontAllowance * 3));
                awayScore.content = tournament.scores[i][1];
            } else {
                if(tournament.fixtures[i][0] != 'undefined' && tournament.fixtures[i][1] != 'undefined'){
                    var fixtureDate = new paper.PointText(new paper.Point(x, y - options.fontAllowance));
                    fixtureDate.content = tournament.fixtures[i][0];

                    var fixtureTime = new paper.PointText(new paper.Point(x, y + options.fontAllowance * 3));
                    fixtureTime.content = tournament.fixtures[i][1];
                }
            }
        };

        var addByes = function(){
            var maxDepth = Math.ceil((Math.log(tournament.names.length))/(Math.log(2)));
            var minPosition = Math.pow(2, maxDepth - 1);
            
            for(var i = minPosition - 1; i > 0; i--){
                if(tournament.names[i * 2] == '-'){
                    tournament.names[i] = tournament.names[i * 2 + 1];
                    addText(i);
                } else {
                    if(tournament.names[i * 2 + 1] == '-'){
                        tournament.names[i] = tournament.names[i * 2];
                        addText(i);
                    }
                }
            }
        };

        var addSuccessColors = function(){
            for(var i = 1; i < Math.pow(2, depth); i++){
                var winningTeam = tournament.names[i];
                
                if(winningTeam != '' && winningTeam != '-'){
                    if(winningTeam == tournament.names[i * 2]){
                        boxes[i * 2].strokeColor = 'green';
                    }

                    if(winningTeam == tournament.names[i * 2 + 1]){
                        boxes[i * 2 + 1].strokeColor = 'green';
                    }
                }
            }
        };

        var setCanvasDimentions = function(){
            if(boxes[Math.pow(2, depth + 1) - 1]){
                canvas.height = boxes[Math.pow(2, depth + 1) - 1].position.y + options.height;
                canvas.width = 2 * options.margin + options.width * (1 + (depth * (options.widthDistance + 1)));
            }
        };

        var drawCanvasOutline = function(){
            new paper.Path(new paper.Point(1, 1),
                           new paper.Point(canvas.width - 1, 1),
                           new paper.Point(canvas.width - 1, canvas.height - 1),
                           new paper.Point(1, canvas.height - 1),
                           new paper.Point(1, 1))
                     .strokeColor = 'black';
        };
        
        var showMatchEditor = function(event){
            $matchFixtureContainer.hide();
            $matchResultContainer.hide();
            
            var x = event.pageX - $canvas.offset().left
            var y = event.pageY - $canvas.offset().top
            
            // Is x in range
            for(var i = 1; i <= depth; i++){
                var boxX = boxes[Math.pow(2, i)].position.x;
                
                if(boxX + options.width / 2 < x){
                    return;
                }
                
                if(boxX - options.width / 2 < x){
                    // Is y in range
                    for(var j = Math.pow(2, i - 1); j < Math.pow(2, i); j++){
                        var box1Y = boxes[j * 2].position.y;
                        var box2Y = boxes[j * 2 + 1].position.y;
                        
                        if(box1Y - options.height / 2 > y){
                            return;
                        }
                        
                        if(box2Y + options.height / 2 > y){
                            var team1 = tournament.names[j * 2];
                            var team2 = tournament.names[j * 2 + 1];
                            
                            if(team1 != "-" && team2 != "-"){
                                $matchDataContainer.dialog("open");
                                
                                tournament.position = j;
                                $matchFixtureContainer.show();
                                $fixtureDate.val(tournament.fixtures[j][0]);
                                $fixtureTime.val(tournament.fixtures[j][1]);
                                
                                if(team1 != "" && team2 != ""){
                                    $winner.empty();
                                    $winner.append(new Option("Winner", ""));
                                    $winner.append(new Option(team1, team1));
                                    $winner.append(new Option(team2, team2));
                                    $homeScore.val(tournament.scores[j][0]);
                                    $awayScore.val(tournament.scores[j][1]);
                                    $matchResultContainer.show();
                                }
                            }
                            
                            return;
                        }
                    }
                    
                    return;
                }
            }
        }

        var init = function(){
            paper.setup(canvas);
            
            depth = Math.floor((Math.log(tournament.names.length - 1))/(Math.log(2)));
            startx = depth * options.width * (options.widthDistance + 1) + options.margin;
            starty = options.height * options.heightDistance * (Math.pow(2, depth) - 1) + options.header + 1;

            addHeaders();

            boxes[1] = new paper.Path(new paper.Point(startx, starty),
                                      new paper.Point(startx + options.width, starty),
                                      new paper.Point(startx + options.width, starty + options.height),
                                      new paper.Point(startx, starty + options.height));
            boxes[1].strokeColor = 'black';
            boxes[1].closed = true;

            addText(1);

            for(var i = 1; i < Math.pow(2, depth); i++){
                // How many depths down is i?
                depthDistance = Math.floor((Math.log(i))/(Math.log(2)));

                // The difference between the two new boxes
                ychange = options.height * Math.pow(2, depth - depthDistance - 1) * options.heightDistance;

                // Draw the boxes
                drawBox(i);

                // Put the team name in the box
                addText(i * 2);
                addText(i * 2 + 1);

                // Draw the lines between the boxes
                addLine(i);

                addLocation(i);

                addScoreOrFixture(i);
            }
            
            addByes();
            
            // Needs doing after otherwise the colours will be cloned
            addSuccessColors();
            
            setCanvasDimentions();
            
            drawCanvasOutline();
            
            paper.view.draw();
        }
        
        init();
        
        $canvas.mousedown(function(event){
            showMatchEditor(event);
        });
        
        $matchDataContainer.dialog({
            autoOpen  : false,
            modal     : true,
            resizable : false,
            title     : "Edit match...",
            width     : "auto",
            buttons   : [{ text  : "Sorted.",
                          click : function(){
                                      $(this).dialog("close");
                                  }
                       }]
        });

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
            },
            
            createRandomTournament : function(teams){
                tournament.reset();
                tournament.createRandomTournament(teams);
                init();
            }
        };
    }
    
                            ///////////
                            // Views //
                            ///////////
    
    SubmitResult = function($matchResultContainer, knockout){
        var $winner = $matchResultContainer.children(".winner");
        var $homeScore = $matchResultContainer.children(".home-score");
        var $awayScore = $matchResultContainer.children(".away-score");
        
        var updateScore = function(){
            var winner = $winner.val();
            var homeScore = $homeScore.val();
            var awayScore = $awayScore.val();
           
            var result = {winner:winner, scores:[homeScore, awayScore]};
            knockout.addResult(result);
        };
        
        $winner.change(function(){
            updateScore();
        });
        
        $homeScore.on('change paste textInput input', function(){
            updateScore();
        });
        
        $awayScore.on('change paste textInput input', function(){
            updateScore();
        });
    };
    
    SubmitFixture = function($matchFixtureContainer, knockout){
        var $fixtureDate = $matchFixtureContainer.children(".fixture-date");
        var $fixtureTime = $matchFixtureContainer.children(".fixture-time");
        
        var updateFixture = function(){
            var date = $fixtureDate.val();
            var time = $fixtureTime.val();
            
            var fixture = {date:date, time:time};
            knockout.addFixture(fixture);
        };
        
        $fixtureDate.datepicker({
            autoSize    : true,
            dateFormat  : "dd-mm-yy",
            firstDay    : 1
        });
        
        $fixtureDate.on('change paste textInput input', function(){
            updateFixture();
        });
        
        $fixtureTime.on('change paste textInput input', function(){
            updateFixture();
        });
    };
})(jQuery, paper);
