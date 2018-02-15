function aiTurn(turn){
    var winlines = [
        ['AA', 'BA', 'CA'], // Top row
        ['AB', 'BB', 'CB'], // Middle Row
        ['AC', 'BC', 'CC'], // Bottom Row
        ['AA', 'AB', 'AC'], // Left col
        ['BA', 'BB', 'BC'], // Middle Col
        ['CA', 'CB', 'CC'], // Right Col
        ['AA', 'BB', 'CC'], // Top left diagonal
        ['CA', 'BB', 'AC']  // Top right diagonal
    ];

    // the move, then the priority
    var move = ['',4];
    // buffer with possible moves and priorities
    var moves = [];

    winlines.forEach(function(line, index){
        // i win, i can block, i can zw, i can block zw
        var conditions = [0,0,0,0];
        var buffer = '';
        var values = [];
        for(i=0;i<3;i++)
            values.push([document.querySelector("#"+line[i]).value, line[i]]);

        values.forEach(function(value){
            if(value[0] == '')
                buffer = value[1];
            else{
                value[0] = parseInt(value[0]);
                // line has last 2 pieces i've placed
                if(value[0] == (turn - 2)%6 || value[0] == (turn - 4)%6)
                    conditions[0]++;
                // line has last 2 pieces player has placed
                if(value[0] == (turn - 1)%6 || value[0] == (turn - 3)%6)
                    conditions[1]++;
                // line has my last piece and the player's next piece
                if(value[0] == (turn - 2)%6 || value[0] == (turn + 1)%6)
                    conditions[2]++;
                // line has the player's last piece and my next piece
                if(value[0] == (turn - 1)%6 || value[0] == (turn + 2)%6)
                    conditions[3]++;
            }
        });

        // check each condition for the line
        for(i=0;i<4;i++){
            if(conditions[i] == 2 && buffer != '')
                moves.push([buffer, i]);
        }            
    });

    // pick the candidate move with the lowest priority
    moves.forEach(function(candidate){
        if(candidate[1] < move[1])
            move = candidate;
    });

    //If no better option, random placement		
    var valid = move[0] != '' && document.querySelector("#"+move[0]).value == '';

    while(!valid){
        var letters = ['A','B','C'];
        move[0] = letters[Math.floor(Math.random() * 3)] + letters[Math.floor(Math.random() * 3)];
        if(document.querySelector("#"+move[0]).value == '')
            valid = true;
    }
    
    document.querySelector("#"+move[0]).click();
}