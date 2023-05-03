let currentNumber = document.querySelector(".currentNum");
let prevNum = document.querySelector(".previousNum");
let setTheme = document.documentElement;
let themeBtn = document.querySelector("#theme-btn");

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
// change theme end


// let buttons = [...document.querySelector(".buttons")];
// buttons.forEach((button)=>{
//     button.addEventListner("click", (e)=>{
        
//     })
// })
