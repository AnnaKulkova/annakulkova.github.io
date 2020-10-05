const colors = document.querySelectorAll("#color-button-box  ul  li div"); //color boxes
const checks = document.querySelectorAll(".check-item-box"); //check-item blocks
const addButton = document.getElementById("add-button");
const itemBox = document.getElementById("item-box");
let pToDelete = document.querySelector("#item-box p"); //paragraph on clear screen
const colorsAsArray = Array.from(colors);
const colorHex = [
    '#ee6a68', '#f379a2',
    '#9170cb', '#5eb3f6',
    '#67d7e5', '#ffe083'
] //set of color codes

let checkedColor;
let selectedColor;

function resetBorder(item){
    item.style.border = "none";
    item.style.outline = "none";
    item.style.margin = "0";
}
function getRandomColor(colorSet) {
    let randomIndex = Math.trunc(Math.random()*6);
    return colorSet[randomIndex];
}

//set styles to completed task
function completeToDo (item){
    let checkBox = item.firstElementChild.firstElementChild;
    if (checkBox.checked){
        item.style.backgroundPosition = 'left bottom';
        item.style.color = "rgba(255, 255, 255, 0.4)";
        item.style.textDecoration = "line-through";
    }

    else{
        item.style.backgroundPosition = 'right bottom';
        item.style.color = "rgba(255, 255, 255, 1)";
        item.style.textDecoration = "none";
    }
}
function makeToDoItem(color, text){
    let outerDiv = document.createElement('div');
    outerDiv.className = "check-item-box";
    outerDiv.innerHTML =
        `<div class = "check-box">
            <input type="checkbox">
        </div>
        <div class = "todo-item">${text}</div>`;
    outerDiv.style.background =
         `linear-gradient(to right, gray 50%, ${color} 50%) right bottom`;
    outerDiv.style.backgroundSize = "200% 100%";
    outerDiv.style.transition = "all 1s ease";
    outerDiv.addEventListener('change', ()=>completeToDo(outerDiv));
    return outerDiv;
}

for(let i = 0; i < colorHex.length; i++)
    colorsAsArray[i].style.backgroundColor = colorHex[i];

colors.forEach(color => color.addEventListener("click", ()=> {
    if (checkedColor) resetBorder(checkedColor);
    color.style.border = "2px solid #d7c7c7";
    color.style.outline = "#ffefee solid 1px";
    color.style.outlineOffset = "-2px";
    color.style.margin = "-2px 0 0 -2px";
    selectedColor = color.style.backgroundColor;
    checkedColor = color;
}));

document.querySelector('html').onclick = function (event){
    let target = event.target;
    if(!(target in colors)) {
        if (target !== checkedColor && checkedColor) {
            resetBorder(checkedColor);
            checkedColor = null;
            selectedColor = null;
        }
    }
}

checks.forEach(item => addEventListener('change', () => {
    completeToDo(item);
}))

addButton.querySelector("input").onclick = function (){
    let textField = document.querySelector('#input-text input');
    let text = textField.value;
    if (text === "") return;

    if(pToDelete) pToDelete.remove();
    let color;
    color = selectedColor || getRandomColor(colorHex);
    let newElement = makeToDoItem(color, text);
    itemBox.prepend(newElement);
    setTimeout(()=>newElement.className+=" show",50);
    textField.value = "";
    textField.focus();
}

document.querySelector('#input-text input')
    .addEventListener("keyup", event=>{
    if (event.key === "Enter"){
        addButton.querySelector("input").click();
    }
})