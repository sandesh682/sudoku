// Load Boards....!

const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

  let selectedNum;
  let selectedTile;
  let disableSelect;
  let timer;

  window.onload = function(){
    
    // Start the game
    id('start-button').addEventListener('click',startGame)
    // Adding the event listener
    for(let i=0;i<9;i++){
      id("number-container").children[i].addEventListener('click',()=>{
        // If selecting is not disabled
        if(!disableSelect){
          if(id("number-container").children[i].classList.contains("selected")){
            id("number-container").children[i].classList.remove("selected")
            selectedNum = null
          }else{
            // Deselect prvious all selections
            for(let i=0;i<9;i++){
              id("number-container").children[i].classList.remove("selected")
            }

            id("number-container").children[i].classList.add('selected')
            selectedNum = id("number-container").children[i];
            updateMove()

          }
        }
      })
    }
  }

  function generateBoard(board){
    //   Clear previous Board
    clearPrevious()

    let idCount = 0
    // Create 81 tiles
    for(let i=0; i < 81;i++){
        // Create a new paragraph element
        let tile = document.createElement("p")
        if(board.charAt(i) != "-"){
            // Adding the number to a tile
            tile.textContent = board.charAt(i)
        }
        else{
           // Adding the click event to a tile
           tile.addEventListener('click',()=>{
             if(!disableSelect){
               if(tile.classList.contains('selected')){
                 tile.classList.remove('selected')
                 selectedTile = null
               }
               else{
                 for(let i=0;i<81;i++){
                   qsa(".tile")[i].classList.remove('selected')
                 }
                //  Add selection variable
                tile.classList.add('selected')
                selectedTile = tile;
                updateMove()
               }

             }
           })
        }
        tile.id = idCount;
        idCount++
        // Add tile class to each tile
        tile.classList.add("tile")
        if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)){
            tile.classList.add("bottomBorder")
        }
        if(((tile.id+1) % 9 == 3) || ((tile.id+1) % 9 == 6)){
            tile.classList.add("rightBorder")
        }
        // Add tile to board 
        id("board").appendChild(tile)
        
        // Start the timer
        startTimer()
        // Show the NumberContainer
        id("number-container").classList.remove("hidden")
    }
  }



  function startTimer(){

    let min = 0
    let sec = 0
    id("min").innerText = min
    timer = setInterval(()=>{
      if(sec == 60){
        min++
        sec = 0
        id("min").innerText = min
      }
      sec ++
      id("sec").innerText = sec   
    },1000)
  }

  function updateMove(){

    if(selectedTile && selectedNum){

      selectedTile.textContent = selectedNum.textContent

      if(checkCorrect(selectedTile)){

        selectedTile.classList.remove('selected')
        selectedNum.classList.remove('selected')

        selectedTile = null
        selectedNum = null

        if(checkDone()){
          endGame()
        }
      }// if the selection is wrong
      else{
         disableSelect = true
         selectedTile.classList.add('incorrect')
         setTimeout(()=>{
           disableSelect = false
           selectedTile.classList.remove('selected')
           selectedTile.classList.remove('incorrect')
           selectedNum.classList.remove('selected')

           selectedTile.textContent = ""
           selectedTile = null
           selectedNum = null
         },1000)
      }
    }
  }

  function endGame(){
    disableSelect = true
  }

  function checkDone(){
    let tiles = qsa(".tile")
    
    for(let i=0;i<81;i++){
      if(tiles[i].textContent == ""){
        return false
      }
    }
    return true
  }

  function checkCorrect(tile) {
    let solution ;
    if(id("easy").checked){
        solution = easy[1]
      }
      else if(id("medium").checked){
        solution = medium[1]
      }
      else{
        solution = hard[1]
      }

      if(solution.charAt(tile.id) === tile.textContent){
        return true
      }
      else{
        return false
      }
  }

  function clearPrevious(){
    
    //   Access all of the tiles
    let tiles = qsa(".tile")
    // Remove each tile
    for(let i = 0;i<tiles.length;i++){
        tiles[i].remove();
    }
    // If there is timer to clean it
    if(timer) {
      clearInterval(timer)
    }
    // Deselect any numbers
    for(let i=0;i<id("number-container").children.length;i++){
        id("number-container").children[i].classList.remove("selected")
    }
    // Clear selected variables
    selectedTile = null;
    selectedNum = null
  }


  function startGame(){

    //   Choose the difficulty
      let board;
      if(id("easy").checked){
          board = easy[0]
      }
      else if(id("medium").checked){
        board = medium[0]
      }
      else{
         board = hard[0]
      }
    // Generate board based on difficulty
    generateBoard(board)
  }

// Helper Functions

function id(id){
    return document.getElementById(id);
}

function qs(selector){
    return document.querySelector(selector);
}

function qsa(selector){
    return document.querySelectorAll(selector);
}
