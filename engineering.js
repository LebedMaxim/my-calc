let x; let lastX; let operator; let isNextNumber; let isClickedLogItem;
let isChangedOperator; let absArr; let firstOperator; /* let beforeBrack; */
let selectedMemItem;

let trigSecondIsOpened = false; let hypIsOpened = false; let error = false;
let isInterimResult = false;

let angleUnit = "DEG"; let unclosedBrackets = 0;
let arrCalc = []; let arrSmall = []; let arrLog = []; let arrMem = []; let arrTrigElems = [];

const bigArea = document.getElementById("bigArea"); bigArea.innerHTML = 0;
const smallArea = document.getElementById("smallArea");
const content = document.getElementById("content");
const mcr = document.querySelectorAll(".mcr");
const trigAndFuction = document.querySelectorAll(".grey2");
const trigElems = document.getElementsByClassName("button grey trig");
const backSpace = document.getElementById("backSpace");
const fract = document.getElementById("fract");
const clearLog = document.getElementById("clearLog");
const startBracket = document.getElementById("startBracket");
const endBracket = document.getElementById("endBracket");
const pi = document.getElementById("pi");
const euler = document.getElementById("euler");
const exp = document.getElementById("exp");
const deg = document.getElementById("deg");
const rand = document.getElementById("rand");
const clean = document.getElementById("clean");
const trigSecond = document.getElementById("trigSecond");
const hyp = document.getElementById("hyp");
const sandwich = document.querySelectorAll(".sandwich");
const hiddenOverley = document.querySelector(".hiddenOverley");
const secondButton = document.querySelector(".button.grey.second");

const arrActions = ["abs(", "floor(", "ceil(", "dms(", "degrees(",
  "sqr(", "1/(", "&radic;(", "fact(", "10^(", "log(", "ln(",
  "cube(", "cuberoot(", "2^(", "e^(", "negate(",

  "sinh(", "cosh(", "tanh(", "sech(", "csch(", "coth(",
  "sinh<sup>-1</sup>(", "cosh<sup>-1</sup>(", "tanh<sup>-1</sup>(",
  "sech<sup>-1</sup>(", "csch<sup>-1</sup>(", "coth<sup>-1</sup>(",

  "sin<sub>0</sub>(", "sin<sub>r</sub>(", "sin<sub>g</sub>(",
  "cos<sub>0</sub>(", "cos<sub>r</sub>(", "cos<sub>g</sub>(",
  "tan<sub>0</sub>(", "tan<sub>r</sub>(", "tan<sub>g</sub>(",
  "sec<sub>0</sub>(", "sec<sub>r</sub>(", "sec<sub>g</sub>(",
  "csc<sub>0</sub>(", "csc<sub>r</sub>(", "csc<sub>g</sub>(",
  "cot<sub>0</sub>(", "cot<sub>r</sub>(", "cot<sub>g</sub>(",

  "sin<sub>0</sub><sup>-1</sup>(", "sin<sub>r</sub><sup>-1</sup>(", "sin<sub>g</sub><sup>-1</sup>(",
  "cos<sub>0</sub><sup>-1</sup>(", "cos<sub>r</sub><sup>-1</sup>(", "cos<sub>g</sub><sup>-1</sup>(",
  "tan<sub>0</sub><sup>-1</sup>(", "tan<sub>r</sub><sup>-1</sup>(", "tan<sub>g</sub><sup>-1</sup>(",
  "sec<sub>0</sub><sup>-1</sup>(", "sec<sub>r</sub><sup>-1</sup>(", "sec<sub>g</sub><sup>-1</sup>(",
  "csc<sub>0</sub><sup>-1</sup>(", "csc<sub>r</sub><sup>-1</sup>(", "csc<sub>g</sub><sup>-1</sup>(",
  "cot<sub>0</sub><sup>-1</sup>(", "cot<sub>r</sub><sup>-1</sup>(", "cot<sub>g</sub><sup>-1</sup>(",
];

let factorial = (n, output) => {
  let result = output;
  result = result || 1;
  if (!n) {
    return result;
  }
  return factorial(n - 1, result * n);
};

function calcOutside(arr) {
  let prevX; let k;
  for (k = 0; k < arr.length; k++) {
    if (["/", "*", "Mod", "^", "yroot", "logBase"].includes(arr[k])) {
      prevX = parseFloat(arr[k - 1]);
      operator = arr[k];
      lastX = parseFloat(arr[k + 1]);
      isInterimResult = true;
      if (arr[k] === "/") {
        arr.splice(k - 1, 3, parseFloat((prevX / lastX)));
      } else if (arr[k] === "*") {
        arr.splice(k - 1, 3, parseFloat((prevX * lastX)));
      } else if (arr[k] === "Mod") {
        arr.splice(k - 1, 3, parseFloat((prevX % lastX)));
      } else if (arr[k] === "^") {
        arr.splice(k - 1, 3, parseFloat((prevX ** lastX)));
      } else if (arr[k] === "yroot") {
        arr.splice(k - 1, 3, parseFloat((prevX ** (1 / lastX))));
      } else if (arr[k] === "logBase") {
        Math.logb = (number, base) => Math.log(number) / Math.log(base);
        arr.splice(k - 1, 3, parseFloat((Math.logb(prevX, lastX))));
      }
      k = 0;
    }
  }
  for (k = 0; k < arr.length; k++) {
    if (arr[k] === "-" || arr[k] === "+") {
      prevX = parseFloat(arr[k - 1]);
      operator = arr[k];
      lastX = parseFloat(arr[k + 1]);
      isInterimResult = true;
      if (arr[k] === "-") {
        arr.splice(k - 1, 3, parseFloat((prevX - lastX)));
      } else if (arr[k] === "+") {
        arr.splice(k - 1, 3, parseFloat((prevX + lastX)));
      }
      k = 0;
    }
  }
}

function calcInBracks(arr) {
  let i = 0;
  for (; i < arr.length; i++) {
    if (arr[i] === ")") {
      for (let j = i; j > -1; j--) {
        if (arrActions.concat("(").includes(arr[j])) {
          let arrIn = arr.slice(j + 1, i);
          calcOutside(arrIn);
          if (arr[j] === "abs(") {
            arr.splice(j, i - j + 1, Math.abs(arrIn));
          } else if (arr[j] === "floor(") {
            arr.splice(j, i - j + 1, Math.floor(arrIn));
          } else if (arr[j] === "ceil(") {
            arr.splice(j, i - j + 1, Math.ceil(arrIn));
          } else if (arr[j] === "dms(") {
            arr.splice(j, i - j + 1, Math.ceil(arrIn));
          } else if (arr[j] === "degrees(") {
            arr.splice(j, i - j + 1, Math.ceil(arrIn));
          } else if (arr[j] === "sqr(") {
            arr.splice(j, i - j + 1, arrIn ** 2);
          } else if (arr[j] === "1/(") {
            arr.splice(j, i - j + 1, 1 / arrIn);
          } else if (arr[j] === "&radic;(") {
            arr.splice(j, i - j + 1, Math.sqrt(arrIn));
          } else if (arr[j] === "fact(") {
            arr.splice(j, i - j + 1, factorial(arrIn));
          } else if (arr[j] === "10^(") {
            arr.splice(j, i - j + 1, 10 ** arrIn);
          } else if (arr[j] === "log(") {
            arr.splice(j, i - j + 1, Math.log10(arrIn));
          } else if (arr[j] === "ln(") {
            arr.splice(j, i - j + 1, Math.log(arrIn));
          } else if (arr[j] === "cube(") {
            arr.splice(j, i - j + 1, arrIn ** 3);
          } else if (arr[j] === "cuberoot(") {
            arr.splice(j, i - j + 1, Math.cbrt(arrIn));
          } else if (arr[j] === "2^(") {
            arr.splice(j, i - j + 1, 2 ** arrIn);
          } else if (arr[j] === "e^(") {
            arr.splice(j, i - j + 1, Math.E ** arrIn);
          } else if (arr[j] === "negate(") {
            arr.splice(j, i - j + 1, arrIn * (-1));
          } else if (arr[j] === "sinh(") {
            arr.splice(j, i - j + 1, Math.sinh(arrIn));
          } else if (arr[j] === "cosh(") {
            arr.splice(j, i - j + 1, Math.cosh(arrIn));
          } else if (arr[j] === "tanh(") {
            arr.splice(j, i - j + 1, Math.tanh(arrIn));
          } else if (arr[j] === "sech(") {
            arr.splice(j, i - j + 1, 1 / Math.cosh(arrIn));
          } else if (arr[j] === "csch(") {
            arr.splice(j, i - j + 1, 1 / Math.sinh(arrIn));
          } else if (arr[j] === "coth(") {
            arr.splice(j, i - j + 1, 1 / Math.tanh(arrIn));
          } else if (arr[j] === "sinh<sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asinh(arrIn));
          } else if (arr[j] === "cosh<sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acosh(arrIn));
          } else if (arr[j] === "tanh<sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atanh(arrIn));
          } else if (arr[j] === "sech<sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acosh(1 / arrIn));
          } else if (arr[j] === "csch<sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asinh(1 / arrIn));
          } else if (arr[j] === "coth<sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atanh(1 / arrIn));
          } else if (arr[j] === "sin<sub>0</sub>(") {
            arr.splice(j, i - j + 1, Math.sin(arrIn * (Math.PI / 180)));
          } else if (arr[j] === "sin<sub>r</sub>(") {
            arr.splice(j, i - j + 1, Math.sin(arrIn));
          } else if (arr[j] === "sin<sub>g</sub>(") {
            arr.splice(j, i - j + 1, Math.sin(arrIn * (Math.PI / 200)));
          } else if (arr[j] === "cos<sub>0</sub>(") {
            arr.splice(j, i - j + 1, Math.cos(arrIn * (Math.PI / 180)));
          } else if (arr[j] === "cos<sub>r</sub>(") {
            arr.splice(j, i - j + 1, Math.cos(arrIn));
          } else if (arr[j] === "cos<sub>g</sub>(") {
            arr.splice(j, i - j + 1, Math.cos(arrIn * (Math.PI / 200)));
          } else if (arr[j] === "tan<sub>0</sub>(") {
            arr.splice(j, i - j + 1, Math.tan(arrIn * (Math.PI / 180)));
          } else if (arr[j] === "tan<sub>r</sub>(") {
            arr.splice(j, i - j + 1, Math.tan(arrIn));
          } else if (arr[j] === "tan<sub>g</sub>(") {
            arr.splice(j, i - j + 1, Math.tan(arrIn * (Math.PI / 200)));
          } else if (arr[j] === "sec<sub>0</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.cos(arrIn * (Math.PI / 180)));
          } else if (arr[j] === "sec<sub>r</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.cos(arrIn));
          } else if (arr[j] === "sec<sub>g</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.cos(arrIn * (Math.PI / 200)));
          } else if (arr[j] === "csc<sub>0</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.sin(arrIn * (Math.PI / 180)));
          } else if (arr[j] === "csc<sub>r</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.sin(arrIn));
          } else if (arr[j] === "csc<sub>g</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.sin(arrIn * (Math.PI / 200)));
          } else if (arr[j] === "cot<sub>0</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.tan(arrIn * (Math.PI / 180)));
          } else if (arr[j] === "cot<sub>r</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.tan(arrIn));
          } else if (arr[j] === "cot<sub>g</sub>(") {
            arr.splice(j, i - j + 1, 1 / Math.tan(arrIn * (Math.PI / 200)));
          } else if (arr[j] === "sin<sub>0</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asin(arrIn) * (180 / Math.PI));
          } else if (arr[j] === "sin<sub>r</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asin(arrIn));
          } else if (arr[j] === "sin<sub>g</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asin(arrIn) * (200 / Math.PI));
          } else if (arr[j] === "cos<sub>0</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acos(arrIn) * (180 / Math.PI));
          } else if (arr[j] === "cos<sub>r</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acos(arrIn));
          } else if (arr[j] === "cos<sub>g</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acos(arrIn) * (200 / Math.PI));
          } else if (arr[j] === "tan<sub>0</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atan(arrIn) * (180 / Math.PI));
          } else if (arr[j] === "tan<sub>r</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atan(arrIn));
          } else if (arr[j] === "tan<sub>g</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atan(arrIn) * (200 / Math.PI));
          } else if (arr[j] === "sec<sub>0</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acos(1 / arrIn) * (180 / Math.PI));
          } else if (arr[j] === "sec<sub>r</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acos(1 / arrIn));
          } else if (arr[j] === "sec<sub>g</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.acos(1 / arrIn) * (200 / Math.PI));
          } else if (arr[j] === "csc<sub>0</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asin(1 / arrIn) * (180 / Math.PI));
          } else if (arr[j] === "csc<sub>r</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asin(1 / arrIn));
          } else if (arr[j] === "csc<sub>g</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.asin(1 / arrIn) * (200 / Math.PI));
          } else if (arr[j] === "cot<sub>0</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atan(1 / arrIn) * (180 / Math.PI));
          } else if (arr[j] === "cot<sub>r</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atan(1 / arrIn));
          } else if (arr[j] === "cot<sub>g</sub><sup>-1</sup>(") {
            arr.splice(j, i - j + 1, Math.atan(1 / arrIn) * (200 / Math.PI));
          } else if (arr[j] === "(") {
            arr.splice(j, i - j + 1, arrIn);
          }
          operator = null;
          i = 0;
          break;
        }
      }
    }
  }
}

function addElemArrLog() {
  if (Number.isFinite(arrCalc[arrCalc.length - 1]) && !error) {
    arrLog.push([arrSmall, arrCalc[arrCalc.length - 1]]);
    if (arrLog.length > 20) {
      arrLog.shift();
    }
  }
}

function showArrLog() {
  if (document.querySelector(".log.opened")) {
    if (arrLog.length) {
      document.querySelector(".clearLog").classList.add("show");
      content.innerHTML = "";
      for (let i = 0; i < arrLog.length; i++) {
        content.innerHTML = `<div class="logItem">${arrLog[i][0].join(" ")}<br><big><big> ${arrLog[i][1]}</big></big></div><br>
            ${content.innerHTML}`;
      }
    } else {
      content.innerHTML = "Журнала еще нет";
      document.querySelector(".clearLog").classList.remove("show");
    }
  }
}
function showLogItem(e) {
  isClickedLogItem = true;
  let text = e.currentTarget.textContent;
  let arrLogItem = text.slice(0, text.indexOf("=") + 1).split(" ");
  bigArea.innerHTML = text.slice(text.indexOf("=") + 2).split(" ");
  arrSmall = arrLogItem;
  smallArea.innerHTML = arrSmall.slice(0, arrSmall.length).join("");
  arrCalc = arrLogItem.slice(0, arrLogItem.length - 1);
  operator = arrCalc[arrCalc.length - 2];
  x = arrCalc[arrCalc.length - 1];
}

function clickLogItem() {
  if (document.querySelector(".log.opened")) {
    let logItem = document.querySelectorAll(".logItem");
    for (let i = 0; i < logItem.length; i++) {
      logItem[i].addEventListener("click", showLogItem);
    }
  }
}

function changeClean() {
  if (bigArea.textContent === "0" || bigArea.textContent === "Infinity" || bigArea.textContent === "-Infinity") {
    clean.innerHTML = "C";
  } else {
    clean.innerHTML = "CE";
  }
}

function selectMemItem(e) {
  if (selectedMemItem) {
    for (let j = 0; j < selectedMemItem.length; j++) {
      selectedMemItem[j].classList.remove("opened");
    }
  }
  selectedMemItem = e.currentTarget.querySelectorAll(".button.memAction");
  for (let k = 0; k < selectedMemItem.length; k++) {
    selectedMemItem[k].classList.add("opened");
  }
}

function hoverMemItem() {
  if (document.querySelector(".mem.opened")) {
    let memItem = document.querySelectorAll(".memItem");
    for (let i = 0; i < memItem.length; i++) {
      memItem[i].addEventListener("mouseover", selectMemItem);
    }
  }
}

function showArrMem() {
  if (document.querySelector(".mem.opened")) {
    if (arrMem.length) {
      document.querySelector(".clearMem").classList.add("show");
      content.innerHTML = "";
      for (let i = 0; i < arrMem.length; i++) {
        content.innerHTML = `<div data-memitem class="memItem"><big><big>${arrMem[i]}</big></big><br>
                <button onclick="arrMem.splice(${i}, 1);
                    showArrMem();"
                    class="button memAction">MC</button>
                <button onclick="arrMem[${i}] += parseFloat(bigArea.textContent);
                    showArrMem();"
                    class="button memAction">M+</button>
                <button onclick="arrMem[${i}] -= parseFloat(bigArea.textContent);
                    showArrMem();"
                    class="button memAction">M-</button></div>
                ${content.innerHTML}`;
        hoverMemItem();
      }
    } else {
      content.innerHTML = "В памяти ничего не сохранено";
      document.querySelector(".clearMem").classList.remove("show");
      for (let i = 0; i < mcr.length; i++) mcr[i].classList.add("nomemory");
      // for (let elem of mcr) elem.classList.add("nomemory");
    }
  }
}

function correctError() {
  if (error) {
    bigArea.style.fontSize = "170%";
    let inactive = document.querySelectorAll(".inactive");
    for (let i = 0; i < inactive.length; i++) {
      inactive[i].classList.remove("inactive");
      inactive[i].classList.add("active");
    }
    /* for (let elem of inactive) {
      elem.classList.remove("inactive");
      elem.classList.add("active");
    } */
    error = false;
    bigArea.innerHTML = 0;
    smallArea.innerHTML = "";
    operator = null;
    x = null;
    arrCalc.length = 0;
  } else if (bigArea.textContent === "Infinity" || bigArea.textContent === "-Infinity"
    || bigArea.textContent === "NaN") {
    bigArea.style.fontSize = "130%";
    bigArea.innerHTML = "Ошибка!";
    let active = document.querySelectorAll(".active");
    for (let i = 0; i < active.length; i++) {
      active[i].classList.remove("active");
      active[i].classList.add("inactive");
    }
    /* for (let elem of active) {
      elem.classList.remove("active");
      elem.classList.add("inactive");
    } */
    error = true;
  }
}

function showMemButtons() {
  for (let i = 0; i < mcr.length; i++) mcr[i].classList.remove("nomemory");
}

function hideMemButtons() {
  for (let i = 0; i < mcr.length; i++) mcr[i].classList.add("nomemory");
}

class Memory {
  constructor(elem) {
    let name = elem;
    this.name = name;
    name.onclick = this.onClick.bind(this);
  }

  mc() {
    if (arrMem.length > 0) {
      arrMem.length = 0;
      hideMemButtons();
    }
  }

  mr() {
    if (arrMem.length > 0) {
      bigArea.innerHTML = arrMem[arrMem.length - 1];
      arrCalc.splice(0, arrCalc.length, arrMem[arrMem.length - 1]);
    }
  }

  mPlus() {
    if (arrMem.length === 0) {
      arrMem.push(parseFloat(bigArea.textContent));
      showMemButtons();
    } else {
      arrMem[arrMem.length - 1] += parseFloat(bigArea.textContent);
    }
  }

  mMinus() {
    if (arrMem.length === 0) {
      arrMem.push(parseFloat(bigArea.textContent) * (-1));
      showMemButtons();
    } else {
      arrMem[arrMem.length - 1] -= parseFloat(bigArea.textContent);
    }
  }

  ms() {
    arrMem.push(parseFloat(bigArea.textContent));
    showMemButtons();
  }

  onClick(event) {
    let actMemory = event.target.dataset.actmemory;
    if (actMemory && !error) {
      this[actMemory]();
      showArrMem();
      hoverMemItem();
      isNextNumber = true;
      smallArea.innerHTML = "";
    }
  }
}
// const tableRow = document.getElementById("tablerow");
new Memory(tableRow);

document.addEventListener("click", (event) => {
  if (event.target.dataset.logmem !== undefined) {
    if (event.target.value === "log") {
      event.currentTarget.querySelector(".log").classList.add("opened");
      document.querySelector(".mem").classList.remove("opened");
      document.querySelector(".clearMem").classList.remove("show");
      showArrLog();
      clickLogItem();
    } else {
      event.currentTarget.querySelector(".mem").classList.add("opened");
      document.querySelector(".log").classList.remove("opened");
      document.querySelector(".clearLog").classList.remove("show");
      showArrMem();
      hoverMemItem();
    }
  } else if (event.target.dataset.memitem !== undefined) {
    bigArea.innerHTML = parseFloat(event.target.textContent);
    smallArea.innerHTML = "";
  }
});

backSpace.onclick = () => {
  if (error) {
    correctError();
  } else if (smallArea.textContent.endsWith("=")) {
    smallArea.innerHTML = "";
  } else if (bigArea.textContent.length > 1 && Number.isFinite(parseFloat(bigArea.textContent))) {
    bigArea.innerHTML = bigArea.textContent.slice(0, bigArea.textContent.length - 1);
  } else {
    bigArea.innerHTML = 0;
  }
};

fract.onclick = () => {
  if (!error) {
    isNextNumber = false;
    if (smallArea.textContent.includes("=")) {
      smallArea.innerHTML = 0;
      bigArea.innerHTML = "0.";
    } else if (bigArea.textContent.indexOf(".") === -1) {
      bigArea.insertAdjacentText("beforeEnd", ".");
    }
  }
};

clearLog.onclick = () => {
  arrLog.length = 0;
  showArrLog();
};

function hideButtons(buttons) {
  document.querySelector(".trigHidden").classList.remove("show");
  document.querySelector(".funcHidden").classList.remove("show");
  for (let i = 0; i < buttons.length; i++) buttons[i].classList.remove("opened");
  document.querySelector("body").classList.toggle("contentOpened");
}

document.addEventListener("DOMContentLoaded", () => {
  hiddenOverley.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("show");
    document.querySelector(".sideMenu").classList.remove("show");
    hideButtons(trigAndFuction);
  });

  secondButton.addEventListener("click", (e) => {
    if (!error) {
      e.currentTarget.classList.toggle("opened");
      document.querySelector(".secondHidden").classList.toggle("show");
    }
  });

  const pushmenuFunction = () => {
    document.querySelector(".sideMenu").classList.toggle("show");
    document.querySelector(".hiddenOverley").classList.toggle("show");
    document.body.classList.toggle("contentOpened");
  };
  for (let i = 0; i < sandwich.length; i++) {
    sandwich[i].addEventListener("click", pushmenuFunction, false);
  }

  const hidingFunction = (e) => {
    if (!error) {
      let table = e.currentTarget.parentNode.querySelector("table");
      if (table) {
        e.currentTarget.classList.toggle("opened");
        table.classList.toggle("show");
        document.querySelector(".hiddenOverley").classList.toggle("show");
        document.body.classList.toggle("contentOpened");
      }
    }
  };
  for (let i = 0; i < trigAndFuction.length; i++) {
    trigAndFuction[i].addEventListener("click", hidingFunction, false);
  }

  for (let i = 0; i < trigElems.length; i++) arrTrigElems.push(trigElems[i]);
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.number !== undefined) {
    if (smallArea.textContent.endsWith("=") || error) {
      if (error) correctError();
      smallArea.innerHTML = "";
      arrCalc.length = 0;
      bigArea.innerHTML = event.target.value;
      isNextNumber = false;
    } else if (bigArea.textContent.includes(",e+0")) {
      let bigCont = bigArea.textContent;
      bigArea.innerHTML = bigCont.slice(0, bigCont.length - 1) + event.target.value;
      isNextNumber = false;
    } else if (bigArea.textContent === "0" || bigArea.textContent === "undefined" || isNextNumber) {
      bigArea.innerHTML = event.target.value;
      isNextNumber = false;
    } else if (bigArea.textContent.length < 13) {
      bigArea.insertAdjacentText("beforeEnd", event.target.value);
    }
    changeClean();
  }
});

function addExp() {
  if (bigArea.textContent.includes(",e+")) {
    let ePlus = bigArea.textContent.indexOf(",e+");
    x = parseFloat(bigArea.textContent.slice(0, ePlus));
    x *= 10 ** bigArea.textContent.slice(ePlus + 3);
  } else x = parseFloat(bigArea.textContent);
}

function calcInterimResult() {
  let arr;
  if (arrCalc[arrCalc.length - 1] === ")") {
    let openBrack = 0;
    let closeBrack = 1;
    let i = arrCalc.length - 2;
    while (openBrack !== closeBrack) {
      if (arrCalc[i] === ")") closeBrack += 1;
      if (arrActions.concat("(").includes(arrCalc[i])) openBrack += 1;
      i--;
    }
    arr = arrCalc.slice(i + 1, arrCalc.length);
  } else if (["/", "*", "Mod", "^", "yroot", "logBase",
    "-", "+"].includes(arrCalc[arrCalc.length - 1])) {
    arr = arrCalc.slice(0, arrCalc.length - 1);
  }
  calcInBracks(arr);
  calcOutside(arr);
  bigArea.innerHTML = arr[arr.length - 1];
  smallArea.innerHTML = arrCalc.slice(0, arrCalc.length).join("");
  correctError();
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.operator !== undefined && !error) {
    x = parseFloat(bigArea.textContent);
    operator = event.target.value;
    if (arrCalc[arrCalc.length - 1] === ")" && isNextNumber) {
      arrCalc.push(operator);
    } else if (!isNextNumber) {
      addExp();
      arrCalc.push(x, operator);
      isChangedOperator = false;
      firstOperator = operator;
      calcInterimResult();
    } else if (["/", "*", "Mod", "^", "yroot", "logBase",
      "-", "+"].includes(arrCalc[arrCalc.length - 1])) {
      if ((firstOperator === "-" || firstOperator === "+") && isInterimResult) {
        if ((["/", "*", "Mod", "^", "yroot", "logBase"].includes(operator)) && !isChangedOperator) {
          arrCalc.pop();
          arrCalc.unshift("(");
          arrCalc.push(")", operator);
          isChangedOperator = true;
        }
      }
      arrCalc[arrCalc.length - 1] = operator;
    } else {
      arrCalc.splice(0, arrCalc.length, x, operator);
    }
    isNextNumber = true;
    smallArea.innerHTML = arrCalc.join("");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.equal !== undefined) {
    if (["/", "*", "Mod", "^", "yroot", "logBase",
      "-", "+", "("].includes(arrCalc[arrCalc.length - 1])) {
      addExp();
      arrCalc.push(x);
    } else if (isClickedLogItem) {
      isClickedLogItem = false;
    } else if (arrCalc[arrCalc.length - 1] === ")") {
      // do nothing
    } else if (!operator) {
      addExp();
      arrCalc.splice(0, arrCalc.length, x);
    } else {
      arrCalc.splice(0, arrCalc.length, parseFloat(bigArea.textContent), operator, lastX);
    }

    while (unclosedBrackets) {
      arrCalc.push(")");
      unclosedBrackets--;
    }
    arrSmall = arrCalc.concat("=");
    isNextNumber = true;
    isChangedOperator = false;
    calcInBracks(arrCalc);
    calcOutside(arrCalc);
    addElemArrLog();
    showArrLog();
    clickLogItem();
    hoverMemItem();
    smallArea.innerHTML = arrSmall.slice(0, arrSmall.length).join("");
    bigArea.innerHTML = arrCalc;
    isInterimResult = false;
    changeClean();
    correctError();
  }
});

startBracket.onclick = () => {
  if (!error) {
    arrCalc.push("(");
    smallArea.innerHTML = arrCalc.join("");
    unclosedBrackets++;
    // isNextNumber = true;
  }
};

endBracket.onclick = () => {
  if (unclosedBrackets > 0 && !error) {
    if (arrCalc[arrCalc.length - 1] !== ")") {
      // x = parseFloat(bigArea.textContent);
      arrCalc.push(parseFloat(bigArea.textContent), ")");
    } else {
      arrCalc.push(")");
    }
    // smallArea.innerHTML = arrCalc.join("");
    unclosedBrackets--;
    isNextNumber = true;
    calcInterimResult();
  }
};

pi.onclick = () => {
  if (!error) bigArea.innerHTML = Math.PI;
};

euler.onclick = () => {
  if (!error) bigArea.innerHTML = Math.E;
};

class Push {
  constructor(elem) {
    let name = elem;
    this.name = name;
    name.onclick = this.onClick.bind(this);
  }

  sqrX() {
    this.beforeBrack = "sqr(";
  }

  oneDivideX() {
    this.beforeBrack = "1/(";
  }

  moduleX() {
    this.beforeBrack = "abs(";
  }

  floorX() {
    this.beforeBrack = "floor(";
  }

  ceilX() {
    this.beforeBrack = "ceil(";
  }

  dms() {
    this.beforeBrack = "dms(";
  }

  deg() {
    this.beforeBrack = "degrees(";
  }

  sqrtX() {
    this.beforeBrack = "&radic;(";
  }

  fact() {
    this.beforeBrack = "fact(";
  }

  tenX() {
    this.beforeBrack = "10^(";
  }

  lg() {
    this.beforeBrack = "log(";
  }

  ln() {
    this.beforeBrack = "ln(";
  }

  cubeX() {
    this.beforeBrack = "cube(";
  }

  cubeRootX() {
    this.beforeBrack = "cuberoot(";
  }

  twoX() {
    this.beforeBrack = "2^(";
  }

  eX() {
    this.beforeBrack = "e^(";
  }

  negate() {
    this.beforeBrack = "negate(";
  }

  sin() { }

  cos() { }

  tan() { }

  sec() { }

  csc() { }

  cot() { }

  onClick(event) {
    let actBrack = event.target.dataset.actbrack;
    if (actBrack && !error) {
      this[actBrack]();

      if (!this.beforeBrack) {
        if (trigSecondIsOpened && hypIsOpened) {
          this.beforeBrack = `${actBrack}h<sup>-1</sup>(`;
        } else if (trigSecondIsOpened) {
          if (angleUnit === "DEG") {
            this.beforeBrack = `${actBrack}<sub>0</sub><sup>-1</sup>(`;
          } else if (angleUnit === "RAD") {
            this.beforeBrack = `${actBrack}<sub>r</sub><sup>-1</sup>(`;
          } else if (angleUnit === "GRAD") {
            this.beforeBrack = `${actBrack}<sub>g</sub><sup>-1</sup>(`;
          }
        } else if (hypIsOpened) {
          this.beforeBrack = `${actBrack}h(`;
        } else {
          if (angleUnit === "DEG") this.beforeBrack = `${actBrack}<sub>0</sub>(`;
          if (angleUnit === "RAD") this.beforeBrack = `${actBrack}<sub>r</sub>(`;
          if (angleUnit === "GRAD") this.beforeBrack = `${actBrack}<sub>g</sub>(`;
        }
        document.querySelector(".hiddenOverley").classList.toggle("show");
        hideButtons(trigAndFuction);
      }

      if (isNextNumber && smallArea.textContent.endsWith("=")) {
        arrCalc.unshift(this.beforeBrack);
        arrCalc.push(")");
      } else if (arrCalc[arrCalc.length - 1] !== ")") {
        absArr = parseFloat(bigArea.textContent);
        arrCalc.push(this.beforeBrack, `${absArr}`, ")");
      } else if (arrCalc[arrCalc.length - 1] === ")") {
        let openBrack = 0;
        let closeBrack = 1;
        let i = arrCalc.length - 2;
        while (openBrack !== closeBrack) {
          if (arrCalc[i] === ")") closeBrack += 1;
          if (arrActions.concat("(").includes(arrCalc[i])) openBrack += 1;
          i--;
        }

        absArr = arrCalc.slice(i + 1, arrCalc.length);
        calcInBracks(absArr);
        if (arrCalc[i + 1] === "(") {
          arrCalc.splice(i + 1, 1, this.beforeBrack);
        } else if (arrActions.includes(arrCalc[i + 1])) {
          arrCalc.splice(i + 1, 0, this.beforeBrack);
          arrCalc.push(")");
        }
      }
      calcInterimResult();
      smallArea.innerHTML = arrCalc.join("");
      isNextNumber = true;
      /* this.beforeBrack = null; */
    }
  }
}
// const table = document.getElementById("table");
new Push(table);

exp.onclick = () => {
  if (!error) {
    bigArea.insertAdjacentText("beforeEnd", ",e+0");
  }
};

deg.onclick = () => {
  if (!error) {
    if (angleUnit === "DEG") {
      deg.innerHTML = "RAD";
      angleUnit = "RAD";
    } else if (angleUnit === "RAD") {
      deg.innerHTML = "GRAD";
      angleUnit = "GRAD";
    } else {
      deg.innerHTML = "DEG";
      angleUnit = "DEG";
    }
  }
};

rand.onclick = () => {
  bigArea.innerHTML = Math.random();
};

clean.onclick = () => {
  if (error) {
    correctError();
  } else if (clean.textContent === "C") {
    bigArea.innerHTML = 0;
    smallArea.innerHTML = "";
    operator = null;
    x = null;
    arrCalc.length = 0;
  } else if (smallArea.textContent.includes("=")) {
    bigArea.innerHTML = 0;
    smallArea.innerHTML = "";
  } else {
    bigArea.innerHTML = 0;
  }
  clean.innerHTML = "C";
};

function showTrigElems() {
  arrTrigElems.forEach((item) => {
    const text = item.dataset.actbrack;
    let itemText = item;
    if (trigSecondIsOpened && hypIsOpened) {
      itemText.innerHTML = `${text}h<sup>-1</sup>`;
    } else if (trigSecondIsOpened && !hypIsOpened) {
      itemText.innerHTML = `${text}<sup>-1</sup>`;
    } else if (!trigSecondIsOpened && hypIsOpened) {
      itemText.innerHTML = `${text}h`;
    } else {
      itemText.innerHTML = text;
    }
  });
  /*   for (let elem of trigElems) {
      const text = elem.dataset.actbrack;
      if (trigSecondIsOpened && hypIsOpened) {
        elem.innerHTML = `${text}h<sup>-1</sup>`;
      } else if (trigSecondIsOpened && !hypIsOpened) {
        elem.innerHTML = `${text}<sup>-1</sup>`;
      } else if (!trigSecondIsOpened && hypIsOpened) {
        elem.innerHTML = `${text}h`;
      } else {
        elem.innerHTML = text;
      }
    } */
}

trigSecond.onclick = (e) => {
  if (!error) {
    trigSecondIsOpened = !trigSecondIsOpened;
    e.currentTarget.classList.toggle("opened");
    showTrigElems();
  }
};

hyp.onclick = (e) => {
  hypIsOpened = !hypIsOpened;
  e.currentTarget.classList.toggle("opened");
  showTrigElems();
};
