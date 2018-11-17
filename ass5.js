/**
 * ************************* Defining variables ***********************************
 */

var cardsArr = ["https://images.emojiterra.com/twitter/v11/512px/1f426.png", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/105/giraffe-face_1f992.png", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/81/monkey_1f412.png", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/tropical-fish_1f420.png", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/dog-face_1f436.png", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emoji-one/104/cat-face_1f431.png"];
var count = 0;
var attempts = 0;
var delay;
var card = document.getElementsByClassName("card");
var gameGrid = cardsArr.concat(cardsArr);
myButton = document.getElementById("btn");
myButton2 = document.getElementById("btn2");
var modal = document.getElementById("display-score");
var score = document.getElementById("score");
var scoreFinal = document.getElementById("essais");
modal.style.display = "none";

/**
 * ************************* Definig function Section***********************************
 */

//Randomize Cards:
function random() {
    for (var flips = 0; flips < 100; flips++) {
        var i = Math.floor(Math.random() * gameGrid.length);
        var j = Math.floor(Math.random() * gameGrid.length);
        var temp = gameGrid[i];
        gameGrid[i] = gameGrid[j];
        gameGrid[j] = temp;
    }
}

//Display Cards:
function showCard() {
    var clicked = event.target;
    for (var i = 0; i < card.length; i++) {
        if (clicked === card[i]) {
            card[i].src = gameGrid[i];
        }
    }
}

var arrClicked = [];// Initialize an empty array
var cardsRevealed = [];// Initialize an empty array of matched cards

/**
 * ************************* Check if cards are matched and count them***********************************
 */
function isMatch() {

    arrClicked.push(this);
    if (!cardsRevealed.includes(arrClicked[0]) && !cardsRevealed.includes(arrClicked[1])) {

        if (arrClicked.length === 2) {
            block();
            if (arrClicked[0].src === arrClicked[1].src) {
                cardsRevealed.push(arrClicked[0]);
                cardsRevealed.push(arrClicked[1]);
                arrClicked = [];
                count++;
                if (count == 6) {
                    var span = document.getElementById("mymodal");
                    modal.style.display = "block";
                    myButton.style.display = "none";
                    scoreFinal.innerHTML= 'WELL DONE, YOU WON !! YOUR SCORE IS : '+ attempts + ' TRY TO DO BETTER';
                }
            }
            else {
                var selec1 = arrClicked[0];
                var selec2 = arrClicked[1];
                delay = setTimeout(function () {
                    selec1.src = 'https://png.pngtree.com/element_origin_min_pic/17/07/20/2460c5b5070f54ae8781a0e4ba6d5b8a.jpg';
                    selec2.src = 'https://png.pngtree.com/element_origin_min_pic/17/07/20/2460c5b5070f54ae8781a0e4ba6d5b8a.jpg';
                }, 1000);
                attempts++;
                score.innerHTML="SCORE :"+ attempts;
                arrClicked = [];
            }
        }
    }

    else {
        arrClicked;
        var selec1 = arrClicked[0];
        var selec2 = arrClicked[1];
            if (cardsRevealed.includes(arrClicked[1])) {
                delay = setTimeout(function () {
                    selec1.src = 'https://png.pngtree.com/element_origin_min_pic/17/07/20/2460c5b5070f54ae8781a0e4ba6d5b8a.jpg';
                }, 1000);
                arrClicked = [];
            }
            else {
                delay = setTimeout(function () {
                    selec2.src = 'https://png.pngtree.com/element_origin_min_pic/17/07/20/2460c5b5070f54ae8781a0e4ba6d5b8a.jpg';
                }, 1000);
                arrClicked = [];
            }
    }
}
// start the game
function play() {
    for (var i = 0; i < card.length; i++) {
        card[i].addEventListener("click", showCard);
        card[i].addEventListener("click", isMatch);
    }
}
// disable the cards one second
function block() {
    for (var i = 0; i < card.length; i++) {
        card[i].removeEventListener("click", showCard);
        card[i].removeEventListener("click", isMatch);
        setTimeout(function () { play() }, 1000);

    }
}
//Restart the game
function newGame() {
    for (var i = 0; i < gameGrid.length; i++) {
        card[i].src = 'https://png.pngtree.com/element_origin_min_pic/17/07/20/2460c5b5070f54ae8781a0e4ba6d5b8a.jpg';
    }
    for (var i = 0; i < card.length; i++) {
        card[i].addEventListener("click", showCard);
        card[i].addEventListener("click", isMatch);
    }
    random();
    modal.style.display = "none";
    myButton.style.display = "block";
}
//When player won the play a new game
function refresh() {
    location.reload();
}

/**
 * ************************* Add event listeners ***********************************
 */
play();
random();
myButton.addEventListener("click", newGame);


