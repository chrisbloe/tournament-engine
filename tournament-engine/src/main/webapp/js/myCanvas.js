$(document).ready(function(){
    var knockout = $('#knockout-tournament').knockout();
    
    $("#create-div").tournamentCreator(knockout);
    $("#new-team").focus();
});
