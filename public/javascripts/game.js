var autoSize = function() {
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

let oNext = false;
let markField = function() {
  if (!$(this).hasClass("O") && !$(this).hasClass("X")) {
    if (oNext) {
      $(this).addClass("O");
    } else {
      $(this).addClass("X");
    }

    oNext = !oNext;
  } else {
    console.log("Already marked.");
  }
}

$(document).ready(function() {
  const n = 13;
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



$(document).ready(autoSize);
$(window).on("resize", autoSize);