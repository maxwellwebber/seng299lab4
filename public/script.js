
/**
 * Requests a new board state from the server's /data route.
 * 
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        // handle any errors here....
        // draw the board....
        cb(data);  

    }); 
}

/**
 * Draws the board to the #canvas element on the page. 
 *
 * You may find the following links helpful: 
 *  - https://api.jquery.com/
 *  - https://api.jquery.com/append/
 *  - http://www.tutorialspoint.com/jquery/
 *  - http://www.w3schools.com/jquery/ 
 *
 * @param state {object} - an object representing the state of the board.  
 */ 
function drawBoard(state){

    var canvas = $("#canvas"); 

    // Change the height and width of the board here...
    // everything else should adapt to an adjustable
    // height and width.
    var W = 600, H = 600; 
    canvas.css("height", H); 
    canvas.css("width", W); 

    // The actual SVG element to add to. 
    // we make a jQuery object out of this, so that 
    // we can manipulate it via calls to the jQuery API. 
    var svg = $(makeSVG(W, H));

    // TODO: Implement board drawing. 
    var size = state.size;
    var board = state.board;
    var gridSizeNonScaled = 600/size
    var gridSizeScaled = (600-2*gridSizeNonScaled)/size
    svg.append(makeRectangle(gridSizeNonScaled,gridSizeNonScaled,600-2*gridSizeNonScaled,600-2*gridSizeNonScaled,"#bf8040"));
    var ratio = size/(size-1);
    for (var i = 1; i < size-1; i++) 
        svg.append(makeLine(i*gridSizeScaled*ratio+gridSizeNonScaled,gridSizeNonScaled,i*gridSizeScaled*ratio+gridSizeNonScaled,600-gridSizeNonScaled,"#000000",1));
    console.log(state);
    for (var i = 1; i < size-1; i++) 
        svg.append(makeLine(gridSizeNonScaled,i*gridSizeScaled*ratio+gridSizeNonScaled,600-gridSizeNonScaled,i*gridSizeScaled*ratio+gridSizeNonScaled,"#000000",1));

    for (var i = 0;i< size; i++) {
        for (var j = 0;j< size; j++) {
            if (board[i][j] == 1) 
                svg.append(makeCircle(j*gridSizeScaled*ratio+gridSizeNonScaled,i*gridSizeScaled*ratio+gridSizeNonScaled,gridSizeScaled/2.5,"#FFFFFF"));
            if (board[i][j] == 2) 
                svg.append(makeCircle(j*gridSizeScaled*ratio+gridSizeNonScaled,i*gridSizeScaled*ratio+gridSizeNonScaled,gridSizeScaled/2.5,"#000000"));
        }
    }
    
    //  You will want to append elements to the 
    //  svg variable using the svg.append(....) 
    //  method. 

    // append the svg object to the canvas object.
    canvas.append(svg);

}

function init(){

    // do page load things here...

    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}
