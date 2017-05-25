const BOARD_SIZE = 13;
const p2w = 5;      // how many symbols should be in a row
const r = 0.7;      // game window heigt/width ratio

let corMin = (n) => {return n < 0 ? 0 : n;}
let corMax = (n) => {return n > BOARD_SIZE ? BOARD_SIZE : n;}

let board, playerO, playerX;;
let oNext = false;
let ended = false;

class Player {
  constructor(name, dom_obj) {
    this.points = 0;
    this.name = name;
    this.dom_obj = dom_obj;

    $(".name", this.dom_obj).html(this.name);
  }

  win() {
    this.points++;

    $(".points", this.dom_obj).html(this.points);

  }
}

let autoSizer = function() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (h/w >= r) {
    this.styles = {
      width: w + "px",
      height: w*r + "px",
      left: 0 + "px",
      top: "50%",
      marginTop: -w*r/2 + "px",
      marginLeft: 0 + "px"
    }
  } else {
    this.styles = {
      width: h/r + "px",
      height: h + "px",
      left: "50%",
      top: 0 + "px",
      marginTop: 0 + "px",
      marginLeft: -h/r/2 + "px"
    }
  }

  $(".game-body:first-child").css(this.styles);
}

let checkWin = function(x, y) {
  // vertical
  let last;
  let counter = 1;
  for (let i = corMin(x - p2w - 1); i < corMax(x + p2w); i++) {
    if ((last === "X" || last === "O") && last === board[i][y]) {
      if (counter === p2w - 1) {
        for (let k = i; k > i - p2w; k--) {
          board[k][y] = "W";
        }

        return true;
      } else {
        counter++;
      }
    } else {
      counter = 1;
    }
    last = board[i][y];
  }

  // horizontal
  last = undefined;
  counter = 1;
  for (let i = corMin(y - p2w - 1); i < corMax(y + p2w); i++) {
    if ((last === "X" || last === "O") && last === board[x][i]) {
      if (counter === p2w - 1) {
        for (let k = i; k > i - p2w; k--) {
          board[x][k] = "W";
        }

        return true;
      } else {
        counter++;
      }
    } else {
      counter = 1;
    }
    last = board[x][i];
  }

  // left-top to right-bottom diagonal
  last = undefined;
  counter = 1;
  j = y - x;
  for (let i = 0; i < x + (BOARD_SIZE - y); i++) {
    if (board[i] !== undefined) {
      if((last === "X" || last === "O") && last === board[i][j]) {
        if (counter === p2w - 1) {
          let p = j;
          for (let k = i; k > i - p2w; k--) {
            board[k][j] = "W";
            j--;
          }

          return true;
        } else {
          counter++;
        }
      } else {
        counter = 1;
      }

      last = board[i][j];
    }

    j++;
  }

  // right-top to left-bottom diagonal
  last = undefined;
  counter = 1;
  j = x + y;
  for (let i = 0; i < x + y + 1; i++) {
    if (board[i] !== undefined) {
      if ((last === "X" || last === "O") && last === board[i][j]) {
        if (counter === p2w - 1) {
          let p = j;
          for (let k = i; k > i - p2w; k--) {
            board[k][j] = "W";
            j++;
          }

          return true;
        } else {
          counter++;
        }
      } else {
        counter = 1;
      }

      last = board[i][j];
    }

    j--;
  }

  return false
}

let clearBoard = function() {
  board = [];

  for (let i = 0; i < BOARD_SIZE; ++i) {
    board.push([]);
    for (let j = 0; j < BOARD_SIZE; ++j) {
      board[i].push(null);
    }
  }

  $(".game-body > .board > .field").removeClass("O X L W");
}

let end = function() {
  ended = true;

  $("button.restart_btn").prop('disabled', false);

  let c = 1;
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === "W") {
        setTimeout(function() {
          $(".game-body > .board > .field#" + i + "_" + j).addClass("W");
        }, c * 50);
        c++;
      }
    }
  }

  (oNext ? playerO : playerX).win();
  
  // setTimeout(function() {
  //   alert(winner.name + " has won!");
  // }, p2w * 100);

  // winner.win();
}

let restart = function() {
  clearBoard();
  ended = false;
  $("button.restart_btn").prop('disabled', true);
}

let step = function(x,y){
	markField.call(document.getElementById(x.toString()+"_"+y.toString()));
}
let markField = function(e) {
  if (!ended) {
    let rx = /[-]{0,1}[\d.]*[\d]+/g;
    let coords = this.id.match(rx);
    let x = Number(coords[0]);
    let y = Number(coords[1]);
	if(window.wait && "undefined" !== typeof(e)) return;
    if (!$(this).hasClass("O") && !$(this).hasClass("X")) {
      if (oNext) {
        $(this).addClass("O");
        board[x][y] = "O";
        $(".stats .players .playerO").removeClass("next");
        $(".stats .players .playerX").addClass("next");
      } else {
        $(this).addClass("X");
        board[x][y] = "X";
        $(".stats .players .playerO").addClass("next");
        $(".stats .players .playerX").removeClass("next");
      }

      $(".board .field").removeClass("L");
      $(".board .field#" + x + "_" + y).addClass("L");

      if (checkWin(x, y)) {
        end();
      }

      oNext = !oNext;
	  /*
	  window.wait=true;
      $.getJSON("/json").then(function(resp){window.interval = setInterval(function (){
		  $.getJSON("/json").then(function(resp){ 
			if(resp.type === "new_step"){
			clearInterval(window.interval);
			window.wait = false;
			step(resp.x,resp.y);
		  }})
	  },1000)})
	  //*/
    } else {
      console.log("Already marked.");
    }
  } else {
    restart();
  }
}

//Init

$(document).ready(function() {
  autoSizer();
  clearBoard();

  $(".stats .players .playerX").addClass("next");

  playerO = new Player("John", $(".stats .playerO"));
  playerX = new Player("Bob", $(".stats .playerX"));

  const s = 100 / 13;
  
  let gb = $(".game-body > .board");

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let obj = $("<span/>", {id   : i + "_" + j,
                             class: "field",
                             style: "width: " + s + "%;\
                                     height: " + s + "%",});
      gb.append(obj);

      obj.on("click", markField);
    }
  }
});

$(window).on("resize", autoSizer);
