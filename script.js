//get all id from html
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransaction = JSON.parse(localStorage.getItem("Transactions"));

let Transactions = localStorage.getItem("Transactions") !== null ? localStorageTransaction: [];
//add transactions
function addTrasaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please Enter Text And Value")
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };
        Transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}
//generateId
function generateId() {
    return Math.floor(Math.random() * 10000000);
}
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );
    item.innerHTML = `
${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
<button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button> 
    `
    list.appendChild(item);
}
//removeTransaction 
function removeTransaction(id) {
    Transactions = Transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}
//update values
function updateValues() {
    const amount = Transactions.map(transaction => transaction.amount);
    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amount.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    //to run
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}
//update local storage
function updateLocalStorage(){
localStorage.setItem(
    "Transactions",JSON.stringify(Transactions)
);
}
//Init function
function Init() {
    list.innerHTML = "";
    Transactions.forEach(addTransactionDOM);
    updateValues();
}
Init();
form.addEventListener("submit", addTrasaction);