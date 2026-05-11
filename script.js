let currentMonth =
localStorage.getItem("selectedMonth")
|| "Janeiro";

document.getElementById(
"monthSelect"
).value = currentMonth;

let allTransactions =
JSON.parse(
localStorage.getItem(
"allTransactions"
)
) || {};

if(!allTransactions[currentMonth]){
allTransactions[currentMonth] = [];
}

let transactions =
allTransactions[currentMonth];

const financialTips = [

"Evite gastos impulsivos.",

"Guarde pelo menos 10% da sua renda.",

"Tenha uma reserva de emergência.",

"Evite parcelamentos desnecessários.",

"Organize seus gastos mensais."

];

document.getElementById(
"financialTip"
).innerText =

financialTips[
Math.floor(
Math.random()
* financialTips.length
)
];

const darkModeBtn =
document.getElementById(
"darkModeBtn"
);

if(
localStorage.getItem(
"darkMode"
) === "enabled"
){
document.body.classList.add(
"dark-mode"
);
}

darkModeBtn.addEventListener(
"click",
() => {

document.body.classList.toggle(
"dark-mode"
);

if(
document.body.classList.contains(
"dark-mode"
)
){

localStorage.setItem(
"darkMode",
"enabled"
);

}else{

localStorage.setItem(
"darkMode",
"disabled"
);
}
});

document.getElementById(
"monthSelect"
).addEventListener(
"change",
(e)=>{

currentMonth =
e.target.value;

localStorage.setItem(
"selectedMonth",
currentMonth
);

if(
!allTransactions[currentMonth]
){
allTransactions[currentMonth] = [];
}

transactions =
allTransactions[currentMonth];

updateScreen();
});

function addTransaction(){

const description =
document.getElementById(
"description"
).value;

const amount =
parseFloat(
document.getElementById(
"amount"
).value
);

const type =
document.getElementById(
"type"
).value;

if(
!description ||
!amount
){

alert(
"Preencha todos os campos."
);

return;
}

transactions.push({

description,
amount,
type

});

saveTransactions();

updateScreen();

document.getElementById(
"description"
).value = "";

document.getElementById(
"amount"
).value = "";
}

function saveTransactions(){

allTransactions[currentMonth] =
transactions;

localStorage.setItem(
"allTransactions",
JSON.stringify(
allTransactions
)
);
}

function saveGoal(){

const goal =
document.getElementById(
"goalInput"
).value;

localStorage.setItem(
"goal",
goal
);

document.getElementById(
"goalText"
).innerText =

"Meta salva: R$ "
+ goal;
}

const savedGoal =
localStorage.getItem(
"goal"
);

if(savedGoal){

document.getElementById(
"goalText"
).innerText =

"Meta salva: R$ "
+ savedGoal;
}

let chart;

function updateChart(
income,
expense
){

const ctx =
document.getElementById(
"financeChart"
);

if(chart){
chart.destroy();
}

chart = new Chart(ctx, {

type:'doughnut',

data:{

labels:[
'Entradas',
'Saídas'
],

datasets:[{

data:[
income,
expense
]

}]
}
});
}

function updateScreen(){

const list =
document.getElementById(
"transaction-list"
);

list.innerHTML = "";

let income = 0;
let expense = 0;

transactions.forEach(
(transaction,index)=>{

const item =
document.createElement("li");

item.innerHTML = `

<span>
${transaction.description}
</span>

<div>

<strong>
R$ ${transaction.amount.toFixed(2)}
</strong>

<button
onclick="removeTransaction(${index})"
>

X

</button>

</div>
`;

list.appendChild(item);

if(
transaction.type ===
"income"
){

income += transaction.amount;

}else{

expense += transaction.amount;
}
});

const total =
income - expense;

document.getElementById(
"income"
).textContent =

income.toFixed(2);

document.getElementById(
"expense"
).textContent =

expense.toFixed(2);

document.getElementById(
"total"
).textContent =

total.toFixed(2);

updateChart(
income,
expense
);
}

function removeTransaction(index){

transactions.splice(
index,
1
);

saveTransactions();

updateScreen();
}

updateScreen();
