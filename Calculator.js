//declare all the i/o needed for calculations
let prevEntry = 0;
let operator = null;
let currentEntry = 0;
let result = 0;

let display = document.querySelector('#display')
let buttons = document.querySelectorAll('.btn')
updateScreen(result);

buttons.forEach(btn =>{
	btn.addEventListener("click", function(){
		let btnClicked = this.innerText;
		display.value = btnClicked;
		
		
//define the functionality of each button
		if (btnClicked === "AC"){
			currentEntry = 0;
			result = 0;
		} else if (btnClicked === "+/-"){
			currentEntry *= -1;
		} else if (btnClicked === "."){
			currentEntry += ".";
		} else if (btnClicked === "x"){
			prevEntry=currentEntry;
			operation="*";
			currentEntry="";
		} else if (btnClicked === "/"){
			prevEntry=currentEntry;
			operation="/";
			currentEntry="";
		} else if (isNumber(btnClicked)){
			//if your display shows 0, replace 0 with a buttonclicked
			if (currentEntry === 0){
				currentEntry = btnClicked;
			}
			else{
				currentEntry += btnClicked;
			}
		} else if (isOperator(btnClicked)){
			prevEntry=currentEntry;
			operation = btnClicked;
			currentEntry="";
		} else if (btnClicked==="="){
			result = operate (prevEntry, operation, currentEntry);
			operation=null;
			currentEntry=result;
		} else if (btnClicked === "%"){
			currentEntry /= 100;
		} else if (btnClicked === "="){
			result = operate(prevEntry, operation, currentEntry);
		}
		updateScreen(currentEntry);

	});
});

function isNumber(value){
	return !isNaN(value); 
}
function isOperator(value){
	return value === "+" || value === "*" || value === "/" || value === "-";
}

function operate(a, operation, b){
	a = parseFloat(a);
	b = parseFloat(b);
	switch (operation){
		case "+":
		return a + b;
		case "-":
		return a - b;
		case "*":
		return a * b;
		case "/":
		return a / b;
	}
}

//create a function to display all the results
function updateScreen(result){
	let displayValue = result.toString();
	display.value = displayValue.substring(0,6);
}