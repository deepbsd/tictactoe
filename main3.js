$(document).ready(function(){


  var turn = 1;
  var canplay = true;
  var origBoard = ["","","","","","","","",""];

  // human
  var huPlayer = "X";
  
  // ai
  var aiPlayer = "O";
  
  // returns list of the indexes of empty spots on the board
  function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
  }

  $("#board tr td").click(function() {
    if ($(this).text()=="" && canplay) {
      if ((turn%2)==1) { $(this).append(huPlayer); } 
      else { 
          let aiChoice = `#${minimax(getValues(),aiPlayer)}`
          $(aiChoice).append(aiPlayer); 
      }
      turn++;
      console.log("turn: ",turn);


     if (winning(getValues(),huPlayer)) { $("#gameinfo").append("Player 1 wins!"); canplay = false;  }
     if (winning(getValues(),aiPlayer)) { $("#gameinfo").append("Player 2 wins!"); canplay = false;  }
     }
     if (!winning(getValues(),aiPlayer) && !winning(getValues(),huPlayer) && turn > 9){
          $("#gameinfo").append("Cats game!");
          canplay = false;
     }
      
  });

	function getValues(){
        var space1 = $("#1").text();
        var space2 = $("#2").text();
        var space3 = $("#3").text();
        var space4 = $("#4").text();
        var space5 = $("#5").text();
        var space6 = $("#6").text();
        var space7 = $("#7").text();
        var space8 = $("#8").text();
        var space9 = $("#9").text();
		return [space1,space2,space3,space4,space5,space6,space7,space8,space9]

	}


	// winning combinations using the board indexies
	function winning(board, player){
	 if (
	 (board[0] == player && board[1] == player && board[2] == player) ||
	 (board[3] == player && board[4] == player && board[5] == player) ||
	 (board[6] == player && board[7] == player && board[8] == player) ||
	 (board[0] == player && board[3] == player && board[6] == player) ||
	 (board[1] == player && board[4] == player && board[7] == player) ||
	 (board[2] == player && board[5] == player && board[8] == player) ||
	 (board[0] == player && board[4] == player && board[8] == player) ||
	 (board[2] == player && board[4] == player && board[6] == player)
	 ) {
	 return true;
	 } else {
	 return false;
	 }
	}

	// the main minimax function
	function minimax(newBoard, player){
	  
	  //available spots
	  var availSpots = emptyIndexies(newBoard);

	  // checks for the terminal states such as win, lose, and tie 
	  //and returning a value accordingly
	  if (winning(newBoard, huPlayer)){
		 return {score:-10};
	  }
		else if (winning(newBoard, aiPlayer)){
		return {score:10};
		}
	  else if (availSpots.length === 0){
		return {score:0};
	  }
	 
      // an array to collect all the objects
	  var moves = [];

	  // loop through available spots
	  for (var i = 0; i < availSpots.length; i++){
		//create an object for each and store the index of that spot 
		var move = {};
		move.index = newBoard[availSpots[i]];

		// set the empty spot to the current player
		newBoard[availSpots[i]] = player;

		/*collect the score resulted from calling minimax 
		  on the opponent of the current player*/
		if (player == aiPlayer){
		  var result = minimax(newBoard, huPlayer);
		  move.score = result.score;
		}
		else{
		  var result = minimax(newBoard, aiPlayer);
		  move.score = result.score;
		}

		// reset the spot to empty
		newBoard[availSpots[i]] = move.index;

		// push the object to the array
		moves.push(move);
	  }

	  // if it is the computer's turn loop over the moves and choose the move with the highest score
	  var bestMove;
	  if(player === aiPlayer){
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++){
		  if(moves[i].score > bestScore){
			bestScore = moves[i].score;
			bestMove = i;
		  }
		}
	  }else{
	    // else loop over the moves and choose the move with the lowest score
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++){
		  if(moves[i].score < bestScore){
			bestScore = moves[i].score;
			bestMove = i;
		  }
		}
	  }

	  // return the chosen move (object) from the moves array
	  return moves[bestMove];
	}

    $("button").click(function(){
        location.reload();
    })


})
