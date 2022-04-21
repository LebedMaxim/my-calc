let operator, isNextNumber;
const bigArea = document.getElementById("bigArea");
const smallArea = document.getElementById("smallArea");
bigArea.innerHTML = "0";
const sandwich = document.querySelectorAll(".sandwich");
const programInfo = document.getElementById("programInfo");

const pushMenuFunction = () => {
  document.querySelector(".sideMenu").classList.toggle("show");
  document.querySelector(".hiddenOverlay").classList.toggle("show");
  document.body.classList.toggle("contentOpened");
};
for (let i = 0; i < sandwich.length; i++) {
  sandwich[i].addEventListener("click", pushMenuFunction, false);
}

programInfo.onclick = () => {
  alert("Калькулятор 1.6.2\nМаксим Лебедь, 2022\nmaxle130691@gmail.com");
}
