let colors = document.querySelectorAll("#color-button-box  ul  li div");

function borderReset(item){
    item.style.border = "none";
    item.style.outline = "none";
    item.style.margin = "0";
}

colors.forEach(color => color.addEventListener("click", ()=>{
    for(let other of colors){
        if (other.style.border !== "none")
            borderReset(other)
    }
    color.style.border = "2px solid #d7c7c7";
    color.style.outline = "#ffefee solid 1px";
    color.style.outlineOffset = "-2px";
    color.style.margin = "-2px 0 0 -2px";
}));

document.querySelector('html').onclick = function (event){
    let target = event.target;
        if(!(target in colors)){
            for(let color of colors){
                if (color !== target) {
                    borderReset(color)
                }
            }
        }
}