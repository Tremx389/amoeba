let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

var autoSizer = function() {
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

let corMin = function(n) {
  return n < 0 ? 0 : n;
}

let corMax = function(n) {
  return n > board[0].length ? board[0].length : n;  
}

let checkWin = function(x, y) {
  // vertical
  let last;
  let counter = 1;
  for (let i = corMin(x - 4); i < corMax(x + 5); i++) {
    if ((last === "X" || last === "O") && last === board[i][y]) {
      if (counter === 4) {
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
  for (let i = corMin(y - 4); i < corMax(y + 5); i++) {
    if ((last === "X" || last === "O") && last === board[x][i]) {
      if (counter === 4) {
        return true;
      } else {
        counter++;
      }
    } else {
      counter = 1;
    }
    last = board[x][i];
  }

  // left to right diagonal
  last = undefined;
  counter = 1;
  let j = corMin(y - 4);
  for (let i = corMin(x - 4); i < corMax(x + 5); i++) {
    if ((last === "X" || last === "O") && last === board[i][j]) {
      if (counter === 4) {
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

  return false

// left top to right bottom diagonal
  last = undefined;
  counter = 1;
  j = corMax(y + 4);
  for (let i = corMin(x - 4); i < corMax(x + 5); i++) {
    if ((last === "X" || last === "O") && last === board[i][j]) {
      if (counter === 4) {
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
      alert("Jatekos nyert!");
    }

    oNext = !oNext;
  } else {
    console.log("Already marked.");
  }
}

$(document).ready(function() {
  const n = board[0].length;
  const s = 100 / 13 - 0.00;
  
  let gb = $(".game-body > .board");

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let obj = $("<span/>", {id   : i + "_" + j,
                             class: "field",
                             style: "width: " + s + "%;\
                                     height: " + s + "%",});
      gb.append(obj);

      obj.on("click", markField);
    }
  }
});



$(document).ready(autoSizer);
$(window).on("resize", autoSizer);