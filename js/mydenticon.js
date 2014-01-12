/** Identicon playgound **/
/***************************
Give credit where it is due:
Original identicon idea by Don Park (and the source of identicon_canvas.js used in this example: https://github.com/donpark/identicon/
Pretty neat implementation by Francis Shanahan and the source of identicon5.js : http://francisshanahan.com/index.php/identicon5 )
 
MD5 jquery plugin source: https://github.com/gabrieleromanato/jQuery-MD5
*****************************/
$(document).ready(function () {
    //Perform Don Park's canvas solution's tasks
    //  render_identicon_canvases('donpark');
});


$('#make-identicon').click(function () {
    //On click, generate hash and populate field
    var input = $('#user-input').val();
    //ideally, do some basic input checking here to catch empty input, etc.
    var md5hash = $.md5(input);
    $("#input-hash").text(md5hash);
    $('#identicon5-test').text(md5hash);
    //Use Don Park's solution. This is a hacky solution because I don't want to change his code
    var truncatedhashint = parseInt(md5hash.substring(0, 8), 16);
    $('#donpark-canvas').attr("title", "donpark " + truncatedhashint);
    render_identicon_canvases('donpark');
    //Perform Identicon5 tasks
    $('#identicon5-test').identicon5({ size: 50 });
    //My tasks
    make_identicon($("#dk-identicon"), md5hash);
    //show content:
    $('#solutions').addClass("fade-in");
    //Server-side coolness
    server_make_identicon(md5hash);

});


function server_make_identicon(hash) {
    var color = hash.substring(hash.length - 6); //color information as hex
    //Send request to server for processing
    $.getJSON(
        "php/server.php?method=identicon&hash=" + hash.substring(0, 8),
        function (data) {
          //  console.log("Server says: ", data);
            render_idenicon(data, $('#dk-identicon-server'), color); //render function on canvas
        }
    );
}

function render_idenicon(data, target, color) {
    //Called when the server returns information about how to fill the canvas element
    //Inputs: json object with the grid information, and color to fill with
    var grid_size = 5; //define the grid size (n x n )
    var border_size = 15; //unsued
    var square_size = 20; //the size of the squares that will be painted
    var response = data//$.parseJSON(data); //{ grid: [[][]] } 2D array
    //create canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", grid_size * square_size);
    canvas.setAttribute("height", grid_size * square_size);
    var context = canvas.getContext("2d");
    context.fillStyle = "#" + color;
    //console.log(response.grid)
    for (var i = 0; i < response.grid.length; i++) {
        for (var j = 0; j < response.grid[i].length; j++) {
            //Fill the canvas with the defined parameters if 1
            if (response.grid[i][j] == 1) {
                context.fillRect(i * square_size, j * square_size, square_size, square_size);
                //cretae mirror
                context.fillRect((grid_size - i - 1) * square_size, j * square_size, square_size, square_size);
            }
        }
    }
    //All done! Show on screen. Result SHOULD match the client-side solution
    //write the result back to document
    target.html($(canvas));
}


function make_identicon(target, hash) {
    //target: the target object to hold the results
    var grid_size = 5; //define the grid size (n x n )
    var border_size = 15; //unsued
    var square_size = 20; //the size of the squares that will be painted
    var step_size = square_size; //Reduce as necessary

    if (hash.length < 11) {
        //Not enough information
        //Won't be hit in this version, but necessary for plugin since user will provide their own hash
        return;
    }

    //Assign color from hashvalue
    var color = hash.substring(hash.length - 6); //get last characters = 24 bits (for color information)
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", grid_size * square_size);
    canvas.setAttribute("height", grid_size * square_size);
    var context = canvas.getContext("2d");
    context.fillStyle = "#" + color;
    // context.fillStyle = "#" + (parseInt("FFFFFF", 16) - parseInt(color, 16)).toString(16); //Inverted color if you please
    var posx = 0;
    var posy = 0;
    var x = 0;
    var y = 0;
    var truncatedhash = hash.toString().substring(0, 8); //truncate and take first 8 characters => each hex character = 4 bits so total is 32 bits
   // var binaryhash = parseInt(truncatedhash, 16).toString(2); //unused. Fixed bug with bitshifting of integer
    var inthash = parseInt(truncatedhash, 16);

    //Loop through the hash and assign a value
    var max_steps = (grid_size % 2 == 0) ? ((grid_size * grid_size) / 2) : ((grid_size * (grid_size + 1)) / 2); //unused
    for (var i = 0; i < max_steps; i++) {
            if((inthash & 1) == 1) {
            //turn square on
            posx = x * (square_size);
            posy = y * (square_size);
            context.fillRect(posx, posy, square_size, square_size);
            //Mirror image to other half
            context.fillRect((grid_size - x - 1) * square_size, posy, square_size, square_size);

        }
      
        inthash >>= 1; //shift right by 1 bit

        y += 1; //move down by one unit
        if (y == grid_size) {
            //Reached a border, loop around and move to the right
            x += 1;
            y = 0;
        }
    }

    //write the result back to document
    target.html($(canvas));

}

///bind enter keypress
$(document).keypress(function (e) {
    if (e.which == 13) { //enter key
        $("#make-identicon").trigger("click"); //catch the enter keypress for us
    }
});