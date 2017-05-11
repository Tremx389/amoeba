const BOARD_SIZE = 13;

let corMin = (n) => {return n < 0 ? 0 : n;}
let corMax = (n) => {return n > BOARD_SIZE ? BOARD_SIZE : n;}

let board = [];





let autoSizer = function() {
  const r = 0.7;
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
  const p2w = 5;      // how many symbols should be in a row

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
  let j = corMin(y - p2w + 1);
  for (let i = corMin(x - p2w + 1); i < corMax(x + p2w); i++) {
    if ((last === "X" || last === "O") && last === board[i][j]) {
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

    j++;
  }

  // right-top to left-bottom diagonal
  last = undefined;
  counter = 1;
  j = corMax(y + p2w - 1);
  for (let i = corMin(x - p2w + 1); i < corMax(x + p2w); i++) {
    console.log(i + " - " + j);
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

    j--;
  }

  return false
}

let oNext = false;
let markField = function() {
  let rx = /[-]{0,1}[\d.]*[\d]+/g;
  let coords = this.id.match(rx);
  let x = Number(coords[0]);
  let y = Number(coords[1]);

  if (!$(this).hasClass("O") && !$(this).hasClass("X")) {
    if (oNext) {
      $(this).addClass("O");
      board[x][y] = "O";
    } else {
      $(this).addClass("X");
      board[x][y] = "X";
    }

    if (checkWin(x, y)) {
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
    }

    oNext = !oNext;
  } else {
    console.log("Already marked.");
  }
}

//Init

$(document).ready(autoSizer);
$(window).on("resize", autoSizer);

for (let i = 0; i < BOARD_SIZE; ++i) {
  board.push([]);
  for (let j = 0; j < BOARD_SIZE; ++j) {
    board[i].push(null);
  }
}

$(document).ready(function() {
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

