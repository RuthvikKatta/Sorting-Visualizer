var numbers = new Array(50);
var total = 1;

Generate(0,0,0);

function Generate(flag,index,green){
    let bars = document.querySelector(".bars"); 
    while (bars.firstChild) {
        bars.removeChild(bars.firstChild);
    }
    if(flag === 0){
        for (var i = 0; i < numbers.length; i++) {
            numbers[i] = Math.floor(Math.random() * (400-20)+20);
        }
    }
    for (var i = 0; i < numbers.length; i++) {
        let child = document.createElement("div");
        child.classList.add("bar");
        child.setAttribute('data-value', `${numbers[i]}`);
        child.innerHTML = `<p>${numbers[i]}</p>`
        child.style.height = numbers[i] + "px";
        if(index != 0 && index === i)
            child.style.background = "rgb(240, 41, 41)";
        else    
            child.style.background = "white";
        if(green-1 === i)
            child.style.background = "lightgreen";
        bars.appendChild(child);
    }
}

document.getElementById('generate').addEventListener('click', function(){
    if(total == 1){
        Generate(0,0,0);
        total = 1;
    }
});


document.getElementById('Sort').addEventListener('click', () => {
    var i = 1;
    
    function myLoop() {
        var j = insertionSort(i);
        Generate(1,i,j);
        setTimeout(function () {
            i++;
            if (i < numbers.length) {
                myLoop();
            }
            else {
                sorted();
                total = 1;
            }
        }, 150)
    }
    if(total == 1){
        total = 0;
        myLoop();
    }
})

function insertionSort(i) {
    var g = -1;
    for (var j = i; j > 0; j--) {
        if (numbers[j] < numbers[j - 1]) {
            var temp = numbers[j];
            numbers[j] = numbers[j - 1];
            numbers[j - 1] = temp;
            g = j;
        }
    }
    return g;
}
  
function sorted(){
    let bars = document.querySelectorAll('.bar');
    var i = 0;
    function myLoopgreen() {
        bars[i].style.background = "lightgreen";
        setTimeout(function () {
            i++;
            if (i < numbers.length) {
                myLoopgreen();
            }
            else{
                i = 0;
                myLoopwhite();
            }
        }, 10)
    }
    myLoopgreen();
    function myLoopwhite() {
        bars[i].style.background = "white";
        setTimeout(function () {
            i++;
            if (i < numbers.length) {
                myLoopwhite();
            }
        }, 10)
    }
}

var slideDown = {
    distance: '150%',
    origin: 'top',
    opacity: null,
    duration: 1200
};
var slideUp = {
    distance: '150%',
    origin: 'bottom',
    opacity: null,
    duration: 1200
};


ScrollReveal().reveal('#Title', slideDown);
ScrollReveal().reveal('.buttons', slideUp);
ScrollReveal().reveal('.visualizer', { scale: 0.85,duration:1200});