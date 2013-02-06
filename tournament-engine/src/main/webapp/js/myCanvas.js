$(document).ready(function(){
    var knockout = $('#knockout-canvas').knockout();
    
    $("#create-div").tournamentCreator(knockout);
    $("#new-team").focus();
});
