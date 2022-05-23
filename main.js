const bill = document.querySelector(".input-bill");
const tipBtn = document.querySelectorAll(".tip-buttons .btn");
const customInput = document.querySelector(".input-custom");
const people = document.querySelector(".input-people");
const peopleWrapper = document.querySelector(".people-wrapper");
const amountNumber = document.querySelector(".amount-number");
const totalNumber = document.querySelector(".total-number");
const resetBtn = document.querySelector(".btn-reset");

let billValue = 0.0;
let tipValue = 0;
let peopleValue = 0;
let tipAmount = 0;
let total = 0;

bill.addEventListener("input", handleBill);
tipBtn.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
customInput.addEventListener("input", handleCustomTip);
people.addEventListener("input", handlePeople);
resetBtn.addEventListener("click", handleReset);

window.addEventListener("load", handlePeople);

function handleBill(prev, cur) {
  if (bill.value === "0" || bill.value === "") {
    bill.value = 0;
  }
  console.log(billValue, bill.value.length);

  billValue = parseFloat(bill.value);
  calcTip();
}

function handleClick(event) {
  tipBtn.forEach((btn) => {
    btn.classList.remove("active");

    if (event.target.innerHTML === btn.innerHTML) {
      btn.classList.add("active");
      let tipText = btn.innerText.slice(0, -1);
      tipValue = parseFloat(tipText / 100);

      customInput.value = "";
    }
  });

  calcTip();
}

function handleCustomTip(e) {
  tipValue = parseFloat(customInput.value / 100);
  tipBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
  calcTip();
}

function handlePeople() {
  if (people.value === "0" || people.value === "") {
    peopleWrapper.classList.add("show-warning");
    setTimeout(() => {
      peopleWrapper.classList.remove("show-warning");
    }, 3000);
  } else {
    peopleWrapper.classList.remove("show-warning");
    peopleValue = parseFloat(people.value);
  }
  calcTip();
}

function calcTip() {
  if (peopleValue >= 1) {
    tipAmount = (billValue * tipValue) / peopleValue;
    total = (billValue * (tipValue + 1)) / peopleValue;
  }

  amountNumber.textContent = tipAmount.toFixed(2);
  totalNumber.textContent = total.toFixed(2);
}

function handleReset() {
  bill.value = 0.0;
  handleBill();

  tipBtn[0].click();

  people.value = 0;
  handlePeople;
}
