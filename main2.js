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

    function checkForNearWinner(){
        console.log("starting NearWinner()...")
        var cells = getValues();
        let [space1, space2, space3, space4, space5, space6, space7, space8, space9] = cells
        if (space5===""){ return "#5" }
        //horizontal top
        if ((space1===space2)||(space2===space3)||(space1===space3)) {
           if (space3===""){ return "#3" }
           else if (space2===""){ return "#2" }
           else if (space1===""){ return "#1" }
           else console.log("horiz one: oh crap!")
        }
        //horizontal middle
        if ((space4===space5)||(space5===space6)||(space4===space6)){
           if (space4===""){ return "#4" }
           else if (space5===""){ return "#5" }
           else if (space6===""){ return "#6" }
           else console.log("horiz two: oh crap!")
        }
        //horizontal bottom
        if ((space7===space8)||(space8===space9)||(space7===space9)){
           if (space7===""){ return "#7" }
           else if (space8===""){ return "#8" }
           else if (space9===""){ return "#9" }
           else console.log("horiz three: oh crap!")
        }
        //diagonal top left
        if ((space1===space5)||(space5===space9)||(space1===space9)){
           if (space1===""){ return "#1" }
           else if (space5===""){ return "#5" }
           else if (space9===""){ return "#9" }
           else console.log("diag one: oh crap!")
        }
        //diagonal top right
        if ((space3===space5)||(space5===space7)||(space1===space7)){
           if (space3===""){ return "#3" }
           else if (space5===""){ return "#5" }
           else if (space7===""){ return "#7" }
           else console.log("diag two: oh crap!")
        }
        //vertical right
        if ((space3===space6)||(space6===space9)||(space3===space9)){
           if (space3===""){ return "#3" }
           else if (space5===""){ return "#5" }
           else if (space7===""){ return "#7" }
           else console.log("vert three: oh crap!")
        }
        //vertical middle
        if ((space2===space5)||(space5===space8)||(space2===space8)){
           if (space2===""){ return "#2" }
           else if (space5===""){ return "#5" }
           else if (space8===""){ return "#8" }
           else console.log("vert two: oh crap!")
        }
        //vertical left
        if ((space1===space4)||(space4===space7)||(space1===space7)){
           if (space1===""){ return "#1" }
           else if (space4===""){ return "#4" }
           else if (space7===""){ return "#7" }
           else console.log("vert one: oh crap!")
        }
        return null;
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
            console.log(`turn: ${turn} player: ${player} `)
            if (turn%2===0){ player = aiPlayer }
            else { player = huPlayer }
            if ($(this).text()=="" && canplay){
              if (player === huPlayer){
                $(this).append( huPlayer ); 
                turn++;
              } 

              //aiChoice = getAIChoiceSimple();
              aiChoice = getAIChoiceSmart();
              $(aiChoice).append(aiPlayer);
              //getAIChoiceSmart();
              turn++;
              
              if (checkForWinner()!==-1 && checkForWinner()!==""){
                  if (checkForWinner()===huPlayer){$("#gameinfo").append("Human Player wins!");}
                  else { $("#gameinfo").append("AI player wins!"); }
                  canplay = false
              }
              if (checkForWinner()===-1 && turn > 9){
                  $("#gameinfo").append("Cat's game!!")
                  canplay = false;
              }
            } 
        })
        $("button").click(function(){
            location.reload();
        })
	}

    // Chooses random empty cell for now
    function getAIChoiceSimple(){
        let available = [];
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

    // Chooses smarter empty cell
    function getAIChoiceSmart(){
        let available = [];
        let cells = getValues();
        let choice = null;

        let [space1, space2, space3, space4, space5, space6, space7, space8, space9] = cells;

        for (let i=1; i<=9; i++){
            let id = `#${i}`;
            if ($(id).text() === ""){
                available.push(id)
            }
        }

        if (!checkForNearWinner()){
            console.log("NearWinnner returns: ",checkForNearWinner())
            choice = getAIChoiceSimple();
        } else {
            console.log("NearWinnner returns: ",checkForNearWinner())
            choice = checkForNearWinner();
        }

        // First check to see if AI can win the game...
        //
        // Second if AI cannot win, try to block human player and force a cats game
        //

        console.log("spaces: ", space1, space2, space3, space4, space5, space6, space7, space8, space9)
        console.log("choice: ", choice)
        return choice;

    }


});
