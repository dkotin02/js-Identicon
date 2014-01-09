/** Identicon playgound **/
/***************************
Give credit where it is due:
Original identicon idea by Don Park (and the source of identicon_canvas.js used in this example: https://github.com/donpark/identicon/
Pretty neat implementation by Francis Shanahan and the source of identicon5.js : http://francisshanahan.com/index.php/identicon5 )
 
MD5 jquery plugin source: https://github.com/gabrieleromanato/jQuery-MD5
*****************************/
$(document).ready(function () {
    //Perform Don Park's canvas solution's tasks
    render_identicon_canvases('donpark ');
});


$('#make-identicon').click(function () {
    //On click, generate hash and populate field
    var input = $('#user-input').val();
    //ideally, do some basic input checking here to catch empty input, etc.
    var md5hash = $.md5(input);
    $("#input-hash").text(md5hash);
    $('#identicon5-test').text(md5hash);
    //Perform Identicon5 tasks
    $('#identicon5-test').identicon5({ size: 50 });
    //show content:
    $('#solutions').addClass("fade-in");

});


function make_identicon(target,hash){
    var grid_size = 50; //define the grid size

}

///bind enter keypress
$(document).keypress(function (e) {
    if (e.which == 13) { //enter key
        $("#make-identicon").trigger("click"); //catch the enter keypress for us
    }
});