

    <!--

// Checkers Game


// black.gif

// gray.gif

// you1.gif -- normal piece (player/red)

// you2.gif -- highlighted piece

// you1k.gif -- kinged normal piece

// you2k.gif -- kinged highlighted piece

// me1.gif -- normal piece (computer/black)

// me2.gif -- highlighted piece

// me1k.gif -- kinged normal piece

// me2k.gif -- kinged highlighted piece


        function preload() {

            this.length = preload.arguments.length;

            for (var i = 0; i < this.length; i++) {

                this[i] = new Image();

                this[i].src = preload.arguments[i];

            }

        }

var pics = new preload("black.gif","gray.gif",

    "you1.gif","you2.gif","you1k.gif","you2k.gif",

    "me1.gif","me2.gif","me1k.gif","me2k.gif");


var black = -1; // computer is black

var red = 1; // visitor is red

var square_dim = 35;

var piece_toggled = false;

var my_turn = false;

var double_jump = false;

var comp_move = false;

var game_is_over = false;

var safe_from = safe_to = null;

var toggler = null;

var togglers = 0;


function Board() {

    board = new Array();

    for (var i=0;i<8; i++) {

        board[i] = new Array();

        for (var j=0;j<8;j++)

            board[i][j] = Board.arguments[8*j+i];

    }

    board[-2] = new Array(); // prevents errors

    board[-1] = new Array(); // prevents errors

    board[8] = new Array(); // prevents errors

    board[9] = new Array(); // prevents errors

}

var board;

Board(1,0,1,0,1,0,1,0,

    0,1,0,1,0,1,0,1,

    1,0,1,0,1,0,1,0,

    0,0,0,0,0,0,0,0,

    0,0,0,0,0,0,0,0,

    0,-1,0,-1,0,-1,0,-1,

    -1,0,-1,0,-1,0,-1,0,

    0,-1,0,-1,0,-1,0,-1);


function message(str) {

    if (!game_is_over)

        document.disp.message.value = str;

}

function moveable_space(i,j) {

// calculates whether it is a gray (moveable)

// or black (non-moveable) space

    return (((i%2)+j)%2 == 0);

}

function Coord(x,y) {

    this.x = x;

    this.y = y;

}

function coord(x,y) {

    c = new Coord(x,y);

    return c;

}


document.write("<table border=0 cellspacing=0 cellpadding=0 width="+(square_dim*8+8)

    +"<tr><td><img src='black.gif' width="+(square_dim*8+8)

    +" height=4><br></td></tr>");

for(var j=0;j<8;j++) {

    document.write("<tr><td><img src='black.gif' width=4 height="+square_dim+">");

    for(var i=0;i<8;i++) {

        if (moveable_space(i,j))

            document.write("<a href='javascript:clicked("+i+","+j+")'>");

        document.write("<img src='");

        if (board[i][j]==1) document.write("you1.gif");

        else if (board[i][j]==-1) document.write("me1.gif");

        else if (moveable_space(i,j)) document.write("gray.gif");

        else document.write("black.gif");

        document.write("' width="+square_dim+" height="+square_dim

            +" name='space"+i+""+j+"' border=0>");

        if (moveable_space(i,j)) document.write("</a>");

    }

    document.write("<img src='black.gif' width=4 height="+square_dim+"></td></tr>");

}

document.write("<tr><td><img src='black.gif' width="+(square_dim*8+8)

    +" height=4><br></td></tr></table><br>"

    +"<form name='disp'><textarea name='message' wrap=virtual rows=2 cols=40>