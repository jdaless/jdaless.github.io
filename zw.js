var turn = 0;
//var pieces = ["♙", "♟", "♘", "♞", "♔", "♚"];
var pieces = ["&#9817;", "&#9823;", "&#9816;", "&#9822;", "&#9812;", "&#9818;"];
var aiMove = false;
var humans;
var diff;

function log(message){
    document.getElementById("moves").value += message;
    document.getElementById("moves").scrollTop = document.getElementById("moves").scrollHeight;
                
}

window.onload = function(){
    nextpiece();
    document.querySelectorAll('.col').forEach(function(element){
        element.onclick = function(e) {
            var button = e.srcElement;
            if (button.value.length == 0 && !winstate()) {              
                if(turn > 5){
                    var old = document.querySelector('button[value="' + (turn % 6) + '"]');
                    old.innerHTML = '&nbsp;';
                    old.value = '';
                }
                button.innerHTML = pieces[turn % 6];
                button.value = turn % 6;

                log("("+button.id[0].toLowerCase()+","+button.id[1].toLowerCase()+"),");
                turn++;
                if(winstate()){
                    log( "(" + ((winner == 0)? "1":"0") + "-" + winner + ")");
                }
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
    document.getElementById("moves").value = '';
    humans = p;
    diff = document.querySelector("#difficulty").value;
    document.querySelector("#game").style.display = "inline-block";
    document.querySelector("#game-options").style.display = "none";
    document.querySelector("#reset-button").innerHTML = "reset";
    document.querySelectorAll('.col').forEach(function(element){
        element.innerHTML = "&nbsp;"
        element.value = '';
    });
    document.getElementById('board').style.backgroundColor = "rgba(0,0,0,0)";
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

function getPlayer(place){
    return document.getElementById(place).value % 2;
}

function winstate() {
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
    for (k = 0; k < winlines.length; k++) {
        if ((document.getElementById(winlines[k][0]).value) &&
            (document.getElementById(winlines[k][1]).value) &&
            (document.getElementById(winlines[k][2]).value)) {
            if (getPlayer(winlines[k][0]) == getPlayer(winlines[k][1]) &&
                getPlayer(winlines[k][1]) == getPlayer(winlines[k][2])){
                document.getElementById('board').className = 'gameoverboard';
                winner = getPlayer(winlines[k][0]);
                var players = ['white', 'black'];
                document.querySelector("#reset-button").innerHTML = players[winner] + " wins";
                return true;
            }
        }
    }
    return false;
}