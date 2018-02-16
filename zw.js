var turn = 0;
//var pieces = ["♙", "♟", "♘", "♞", "♔", "♚"];
var pieces = ["&#9817;", "&#9823;", "&#9816;", "&#9822;", "&#9812;", "&#9818;"];
var winlines = [
    ['AA', 'BA', 'CA'],
    ['AB', 'BB', 'CB'],
    ['AC', 'BC', 'CC'],
    ['AA', 'AB', 'AC'],
    ['BA', 'BB', 'BC'],
    ['CA', 'CB', 'CC'],
    ['AA', 'BB', 'CC'],
    ['CA', 'BB', 'AC']
];
var players = ['white', 'black'];
var aiMove = false;
var humans;
var diff;
window.onload = function(){
    nextpiece();
    document.querySelectorAll('.col').forEach(function(element){
        element.onclick = function(e) {
            var button = e.srcElement;
            if (button.value.length == 0 && !winstate()) {
                var boardstate = document.querySelectorAll('.col').forEach(function(e) {
                    return e.value;
                })
                button.innerHTML = pieces[turn];
                if(turn > 5){
                    button.innerHTML = pieces[turn % 6];
                    var old = document.querySelector('button[value="' + (turn % 6) + '"]');
                    old.innerHTML = '&nbsp;';
                    old.value = '';
                }
                button.value = turn % 6;
                turn++;
                winstate();
                nextpiece();
                if(humans == 1)
                    aiMove = !aiMove;
            }
        }
    });

    setInterval(function(){
        if(aiMove && humans != 2){
            aiTurn(turn, diff);
        }
    }, 750);

}
function startGame(p){
    humans = p;
    diff = document.querySelector("#difficulty").value;
    document.querySelector("#game").style.display = "inline-block";
    document.querySelector("#game-options").style.display = "none";
    document.querySelector("#reset-button").style.display = "inline-block";
    document.querySelector("#reset-button").innerHTML = "reset";
    document.querySelectorAll('.col').forEach(function(element){
        element.innerHTML = "&nbsp;"
        element.value = '';
    });
    document.getElementById('board').style.backgroundColor = "rgba(0,0,0,0)"
    document.getElementById('board').className = '';
    turn = 0;
    nextpiece();
    aiMove = Math.floor(Math.random() * 2) == 0 || humans == 0;

}
function reset(){
    document.querySelector("#game").style.display = "none";
    document.querySelector("#game-options").style.display = "inline-block";
}
function nextpiece() {
    document.getElementById("next").innerHTML = " " +
        pieces[(turn) % 6] + ' | ' +
        pieces[(turn + 1) % 6] +
        pieces[(turn + 2) % 6] +
        pieces[(turn + 3) % 6] +
        pieces[(turn + 4) % 6] +
        pieces[(turn + 5) % 6];
}
function winstate() {
    for (k = 0; k < winlines.length; k++) {
        if ((document.getElementById(winlines[k][0]).value) &&
            (document.getElementById(winlines[k][1]).value) &&
            (document.getElementById(winlines[k][2]).value)) {
            if ((document.getElementById(winlines[k][0]).value % 2 == document.getElementById(winlines[k][1]).value % 2) &&
                (document.getElementById(winlines[k][1]).value % 2 == document.getElementById(winlines[k][2]).value % 2)) {
                document.getElementById('board').className = 'gameoverboard';
                document.querySelector("#reset-button").style.display = "inline-block";

                document.querySelector("#reset-button").innerHTML = ((document.getElementById(winlines[k][1]).value % 2 == 0) ? "white" : "black") + " wins";
                return true;
            }
        }
    }
    return false;
}