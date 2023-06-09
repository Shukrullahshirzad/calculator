let display = document.querySelector(".display");
let display2 = document.querySelector(".display2");
let setTheme = document.documentElement;
let themeBtn = document.querySelector("#theme-btn");
let num1 = 0;
let num2 = 0;
let result = 0;

// change theme
function themeSwitcher(id){
    if(id == "1")
    themeValue = "dark";
    else if(id == "2")
    themeValue = "light";
    else{
        themeValue = "love";
    }
    return themeValue;
}
let themeValue = "dark";
themeBtn.addEventListener("input", ()=>{
    themeValue = themeSwitcher(themeBtn.value);
    setTheme.setAttribute("data-theme", themeValue);
})
//================= change-theme end ================

//================= working with dispaly ================

function setNumberDisplay(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay
    if(isNaN(integerDigits)){
        integerDisplay = "";
    }
    else{
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if(decimalDigits !=null){
        return `${integerDisplay}.${decimalDigits.slice(0, 3)}`
    }
    else{
        return integerDisplay
    }
}
let intake = "";
function appendNumber(x){
    intake += x;
}
function updateDisplay(){
    display.textContent = setNumberDisplay(intake)
}
function reset(){
    display.textContent = "";
    intake = "";
    display2.textContent = "";
}
// add selected numbers to display
let buttons = Array.from(document.querySelectorAll(".num"));
buttons.forEach(button=>{
    button.addEventListener("click", (e)=>{
        if(display.textContent.includes(".")){
            // this will prevent adding decimal point
            // if it already has one
            if(e.target.textContent == "."){
                return
            }
            else{
                appendNumber(e.target.textContent)
                updateDisplay()
            }
        }
        else{
            appendNumber(e.target.textContent)
            updateDisplay()
        }
    })
}) 

let operator = "";
let operatorBtn = Array.from(document.querySelectorAll(".op"));
operatorBtn.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        if(display.textContent == "" && display2.textContent == ""){
            return
        }
        else if(display2.textContent == "" && display.textContent !== ""){
            operator = e.target.textContent;
            num1 = parseFloat(display.textContent.split(',').join(''));
            display2.textContent = `${setNumberDisplay(num1)} ${operator}`
            display.textContent = "";
            intake = ""
        }
        else if( display.textContent == "" && display2.textContent !== ""){
            operator = e.target.textContent;
            display2.textContent = `${setNumberDisplay(num1)} ${operator}`
        }
        else if(display2.textContent !== "" && display.textContent !== ""){
            num2 = parseFloat(display.textContent.split(',').join(''));
            result = operate(num1, num2, operator);
            num1 = result;
            operator = e.target.textContent;
            display2.textContent = `${setNumberDisplay(num1)} ${operator}`
            display.textContent = "";
            intake = "";
        }
    })
});

const delBtn = document.querySelector(".del");
delBtn.addEventListener("click", (e)=>{
    intake = intake.slice(0, -1);
    updateDisplay()
})

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", ()=>{
    reset()
})


// function deffinations 
function add(num1, num2){
    return num1 + num2;
}
function subtruct(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}

function operate(num1, num2, operand){
    if(operand == "+"){
        return add(num1, num2)
    }
    else if(operand == "-"){
        return subtruct(num1, num2)
    }
    else if(operand == "x"){
        return multiply(num1, num2)
    }
    else if(operand == "/"){
        return divide(num1, num2)
    }
}

let equal = document.querySelector(".equal");
equal.addEventListener("click", (e)=>{
    if(display.textContent == ""){
        return
    }
    else if(display2.textContent == "") return
    num2 = parseFloat(display.textContent.split(',').join(''));
    display2.textContent = "";
    result = operate(num1, num2, operator);
    display.textContent = setNumberDisplay(result);
})