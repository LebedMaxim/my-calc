smallArea.innerHTML = "0";
let x1, x2, x3, equal;

document.addEventListener("click", (event) => {
  if (event.target.dataset.number !== undefined) {
    if (bigArea.textContent === "0" || bigArea.textContent === "0" || isNextNumber) {
      bigArea.innerHTML = event.target.value;
      isNextNumber = false;
    } else if (bigArea.textContent.length < 13) {
      bigArea.insertAdjacentText("beforeend", event.target.value);
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.operator !== undefined) {
    operator = event.target.value;
    isNextNumber = true;
    equal = null;
    x1 = parseFloat(bigArea.textContent);
    smallArea.innerHTML = x1 + operator;
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.equal !== undefined) {
    if (!smallArea.textContent.endsWith(equal) && equal === null) {
      equal = event.target.value;
      x2 = parseFloat(bigArea.textContent);
      isNextNumber = true;
      if (operator === "*") {
        smallArea.innerHTML = x1 + operator + x2 + equal;
        x3 = x1 * x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else if (operator === "/") {
        smallArea.innerHTML = x1 + operator + x2 + equal;
        x3 = x1 / x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else if (operator === "+") {
        smallArea.innerHTML = x1 + operator + x2 + equal;
        x3 = x1 + x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else if (operator === "-") {
        smallArea.innerHTML = x1 + operator + x2 + equal;
        x3 = x1 - x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else {
        smallArea.innerHTML = x2 + equal;
      }
    } else {
      x3 = parseFloat(bigArea.textContent);
      isNextNumber = true;
      if (operator === "*") {
        smallArea.innerHTML = x3 + operator + x2 + equal;
        x3 *= x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else if (operator === "/") {
        smallArea.innerHTML = x3 + operator + x2 + equal;
        x3 /= x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else if (operator === "+") {
        smallArea.innerHTML = x3 + operator + x2 + equal;
        x3 += x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else if (operator === "-") {
        smallArea.innerHTML = x3 + operator + x2 + equal;
        x3 -= x2;
        bigArea.innerHTML = `${parseFloat(x3.toFixed(13))}`;
      } else {
        smallArea.innerHTML = x3 + equal;
      }
    }
  }
});

const cleanEntry = document.getElementById("cleanEntry");
cleanEntry.onclick = () => {
  if (smallArea.textContent.includes(equal)) {
    bigArea.innerHTML = "0";
    smallArea.innerHTML = "0";
  } else {
    bigArea.innerHTML = "0";
  }
};

const percent = document.getElementById("percent");
percent.onclick = () => {
  if (smallArea.textContent === "0") {
    bigArea.textContent = "0";
  } else {
    bigArea.innerHTML = `${parseFloat(smallArea.textContent) * (parseFloat(bigArea.textContent) / 100)}`;
  }
};

const negative = document.getElementById("negative");
negative.onclick = () => {
  bigArea.innerHTML = `${bigArea.textContent * (-1)}`;
};

const clean = document.getElementById("clean");
clean.onclick = () => {
  bigArea.innerHTML = "0";
  smallArea.innerHTML = "0";
  operator = null;
  x3 = 0;
};

const backSpace = document.getElementById("backSpace");
backSpace.onclick = () => {
  if (smallArea.textContent.endsWith(equal)) {
    smallArea.innerHTML = "0";
  } else if (bigArea.textContent.length > 1 && Number.isFinite(parseFloat(bigArea.textContent))) {
    bigArea.innerHTML = bigArea.textContent.slice(0, bigArea.textContent.length - 1);
  } else {
    bigArea.innerHTML = "0";
  }
};

const oneDivideX = document.getElementById("oneDivideX");
oneDivideX.onclick = () => {
  smallArea.innerHTML = `1 / ${bigArea.textContent}=`;
  bigArea.innerHTML = `${parseFloat((1 / bigArea.textContent).toFixed(13))}`;
};

const sqrX = document.getElementById("sqrX");
sqrX.onclick = () => {
  smallArea.innerHTML = `sqr(${bigArea.textContent})=`;
  bigArea.innerHTML = `${parseFloat((bigArea.textContent ** 2).toFixed(13))}`;
};

const sqrtX = document.getElementById("sqrtX");
sqrtX.onclick = () => {
  smallArea.innerHTML = `&radic;(${bigArea.textContent})=`;
  bigArea.innerHTML = `${parseFloat((bigArea.textContent ** (1 / 2)).toFixed(13))}`;
};

const fraction = document.getElementById("fraction");
fraction.onclick = () => {
  isNextNumber = false;
  if (smallArea.textContent.includes(equal)) {
    smallArea.innerHTML = "0";
    bigArea.innerHTML = "0.";
  } else if (bigArea.textContent.indexOf(".") === -1) {
    bigArea.insertAdjacentText("beforeend", ".");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // const sandwich = document.getElementsByClassName("sandwich");
  /*const sandwich = document.querySelectorAll(".sandwich");*/
  const hiddenOverlay = document.querySelector(".hiddenOverlay");
  // const hiddenContent = document.querySelector(".hiddenContent");

  hiddenOverlay.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("show");
    document.querySelector(".sideMenu").classList.toggle("show");
    document.querySelector("body").classList.toggle("contentOpened");
  });

  const hiddenButtons = document.querySelectorAll(".mainContainer button:first-child");
  const hidingFunction = (e) => {
    e.currentTarget.parentNode.querySelector("table").classList.toggle("show");
    e.currentTarget.classList.toggle("opened");
    // document.querySelector(".hiddenContent").classList.toggle("show");
  };
  for (let i = 0; i < hiddenButtons.length; i++) {
    hiddenButtons[i].addEventListener("click", hidingFunction, false);
  }
});
