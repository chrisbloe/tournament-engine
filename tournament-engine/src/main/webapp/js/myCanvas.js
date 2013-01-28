$(document).ready(function(){
//    var teams = ['Blackburn', 'Coventry', 'Liverpool'];
//    var teams = ['Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];
//    var teams = ['Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];
    var teams = ['Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'];
    
    var knockout = new Knockout("knockoutCanvas");
    
    knockout.createRandomTournament(teams);
    
//    var knockoutTournament = {
//        names     : ['', '', 'West Ham', 'Coventry', 'Man Utd', 'West Ham', 'Blackburn', 'Coventry', 'Huddersfield', 'Man Utd', 'West Ham', 'Swindon', 'Morecambe', 'Blackburn', 'Coventry', 'Liverpool'],
//        locations : ['', 'Wembley', 'Old Trafford', 'Ewood Park', 'Galpharm Stadium', 'Upton Park', 'Globe Arena', 'Ricoh Arena'],
//        scores    : [['', ''], ['', ''], ['1 (1)', '4 (3)'], ['0 (0)', '2 (2)'], ['0 (0)', '0* (0) [2-4]'], ['1* (0) [6-5]', '1 (1)'], ['4 (3)', '5 (4)'], ['4 (1)', '2 (0)']],
//        fixtures  : [['', ''], ['18/10/2013', '15:00'], ['11/10/2013', '15:00']]
//    };
//
//    var knockout = new Knockout("knockoutCanvas", knockoutTournament);
    
    new SubmitScoreView(knockout);
    
    new SubmitFixture(knockout);
});
