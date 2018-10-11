$(document).ready(function(){

	//var origBoard;
    let turn = 1;
    let canplay = true;
	const huPlayer = 'X';
	const aiPlayer = '0';

    let player = huPlayer;

    let cells = [];


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


    function checkForWinner(){
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
        if      ((space1===space2) && (space2===space3)) { return space3; }
        else if ((space4===space5) && (space5===space6)) { return space6; }	
        else if ((space7===space8) && (space8===space9)) { return space9; }
        // check columns
        else if ((space1===space4) && (space4===space7)) { return space7; }
        else if ((space2===space5) && (space5===space8)) { return space8; }
        else if ((space3===space6) && (space6===space9)) { return space9; }
        // check diagonals
        else if ((space1===space5) && (space5===space9)) { return space9; }
        else if ((space3===space5) && (space5===space7)) { return space7; }
        // no winner
        return -1;
    }
	
	//console.log("cells: ",cells)
	startGame();

    // Need to refactor this so we don't need a click for aiPlayer to enter choice
	function startGame() {
        $("#board tr td").click(function(){
            if (turn%2===0){ player = aiPlayer }
            else { player = huPlayer }
            if ($(this).text()=="" && canplay){
              if (player === huPlayer){
                $(this).append( huPlayer ); 
              } else {
                aiChoice = getAIChoice();
                $(aiChoice).append(aiPlayer);
              }
              console.log(`turn: ${turn} player: ${player} `)
              turn++;
              if (checkForWinner()!==-1 && checkForWinner()!==""){
                  if (checkForWinner()===huPlayer){$("#gameinfo").append("Human Player wins!");}
                  else { $("#gameinfo").append("AI player wins!"); }
                  canplay = false
              }
            } 
        })
	}

    function getAIChoice(){
        let available = [];
        //var space1 = $("#1").text();
        //var space2 = $("#2").text();
        //var space3 = $("#3").text();
        //var space4 = $("#4").text();
        //var space5 = $("#5").text();
        //var space6 = $("#6").text();
        //var space7 = $("#7").text();
        //var space8 = $("#8").text();
        //var space9 = $("#9").text();
       
        //let cells = [space1, space2, space3, space4, space5, space6, space7, space8, space9]
        let cells = getValues();
        
          for (let i=1; i<=9; i++){ 
            let id = `#${i}`;
            if ($(id).text() === "") {
                available.push(id)
            }
          }
        
          let choice = available[Math.floor(Math.random()*available.length)]
          console.log("cells: ", cells, " available: ", available, " choice: ",choice)
          return choice;

    }

});
