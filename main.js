$(document).ready(function(){

  var turn = 1;
  var canplay = true;

  $("#board tr td").click(function() {
    if ($(this).text()=="" && canplay) {
      if ((turn%2)==1) { $(this).append("X"); } 
      else { $(this).append("O"); }
      turn++;
      if (checkForWinner()!=-1 && checkForWinner()!="") { 
	    if (checkForWinner()=="X") { $("#gameinfo").append("Player 1 wins!"); }
        else { $("#gameinfo").append("Player 2 wins!"); }
        play = false; 
      }
    }
  });

  function checkForWinner() {
    var space1 = $("#1").text();
    var space2 = $("#2").text();
    var space3 = $("#3").text();
    var space4 = $("#4").text();
    var space5 = $("#5").text();
    var space6 = $("#6").text();
    var space7 = $("#7").text();
    var space8 = $("#8").text();
    var space9 = $("#9").text();
    // check rows
    if      ((space1==space2) && (space2==space3)) { return space3; }
    else if ((space4==space5) && (space5==space6)) { return space6; }	
    else if ((space7==space8) && (space8==space9)) { return space9; }
    // check columns
    else if ((space1==space4) && (space4==space7)) { return space7; }
    else if ((space2==space5) && (space5==space8)) { return space8; }
    else if ((space3==space6) && (space6==space9)) { return space9; }
    // check diagonals
    else if ((space1==space5) && (space5==space9)) { return space9; }
    else if ((space3==space5) && (space5==space7)) { return space7; }
    // no winner
    return -1;
  }



});
