var tileImages = []; // This is the main container for game images
                  var tileArray = [];
                  var tileFlippedOver = [];
                  var cardFlipped = -1;
                  var timer = '';
                  var playLockout = false;
                  var gamePlay = false; // controls if we rebuild the board restart
              
                  var startButton = document.getElementById('start');
                  var gameBoard = document.getElementById('gameboard');
                  var message = document.getElementById('message');
                  var mySound = new sound("media/thundr04.mp3");
                  var myMusic;
              
                  //event listener to start game
                  startButton.addEventListener('click', startGame);
              
                  function startGame() {
                    cardFlipped = -1;
                    playLockout = false;
                    startButton.style.display = 'none';
                    if (!gamePlay) {
                      gamePlay = true;
                      buildArray();
                      tileArray = tileImages.concat(tileImages);
                      shuffleArray(tileArray);
                      buildBoard();
                      message.innerHTML = "Click any Tile to Begin the Matching Game";
                    //mySound = new sound("media/thundr04.mp3");
                    myMusic = new sound ("media/122767__folkart-films__yucatan-jungle.mp3");
                      myMusic.play();
                  
                    }
                  }
                   // This function is coded to make the sound play when the game starts
                  function sound(src) {
                    this.sound = document.createElement("audio");
                    this.sound.src = src;
                    this.sound.setAttribute("preload", "auto");
                    this.sound.setAttribute("controls", "none");
                    this.sound.style.display = "none";
                    document.body.appendChild(this.sound);
                    this.play = function(){
                        this.sound.play();
                    }
                    this.stop = function(){
                        this.sound.pause();
                    }    
                }
                //This function is the building of my image array
                  function buildArray() {
                    for (var x = 1; x < 9; x++) {
                      tileImages.push(x + '.png');
                    }
                  }
                  //This function builds my game board
                  function buildBoard() {
                    var html = "";
                    for (var x = 0; x <= (tileArray.length - 1); x++) {
                      html += '<div class="gameTile"><div class="gameTile">';
                      html += '<img id="cardz' + x + '" src="images/back.png" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
                    }
                    gameBoard.innerHTML = html;
                  }
                  //This function controls what happens when a card is picked, it stays up if it's a match, and flips over if it is not
              
                  function pickCard(tileIndex, t) {
                    if (!isinArray(t.id, tileFlippedOver) && !playLockout) {
                      if (cardFlipped >= 0) {
                        cardFlip(t, tileIndex);
                        playLockout = true;
                        if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2])) {
                          message.innerHTML = "Match Found.  Click More Tiles";
                          playLockout = false;
                          cardFlipped = -1;
                          if (tileFlippedOver.length == tileArray.length) {
                            gameover();
                          }
                        } else {
                          message.innerHTML = "No Match";
                          timer = setInterval(hideCard, 1000);
                        }
                      } else {
                        cardFlipped = tileIndex;
                        cardFlip(t, tileIndex);
                      }
                    } else {
                      message.innerHTML = "Not Clickable";
                    }
                  }
                   
                  //This function hides the card if it is not a match
                  function hideCard() {
                    for (var x = 0; x < 2; x++) {
                      var vid = tileFlippedOver.pop();
                      document.getElementById(vid).src = "images/back.png";
                    }
                    clearInterval(timer);
                    playLockout = false;
                    cardFlipped = -1;
                    message.innerHTML = "Click any Tile";
                  }
                   
                  //This function is the beginning of a new game if they want to play again
                  function gameover() {
                    startButton.style.display = 'block';
                    message.innerHTML = "Click to Start New Game";
                    gamePlay = false;
                    tileImages = [];
                    tileFlippedOver = [];
                  }
              
                  function isinArray(v, array) {
                    return array.indexOf(v) > -1;
                  }
              
                  function cardFlip(t, ti) {
                    t.src = "images/" + tileArray[ti];
                    tileFlippedOver.push(t.id);
                  }
              
                  function checkSrc(v) {
                    var v = document.getElementById(v).src;
                    return v;
                  }
                   //This function shuffles the cards
                  function shuffleArray(array) {
                    for (var x = array.length - 1; x > 0; x--) {
                      var holder = Math.floor(Math.random() * (x + 1));
                      var itemValue = array[x];
                      array[x] = array[holder];
                      array[holder] = itemValue;
                    }
                    return array;
                  }