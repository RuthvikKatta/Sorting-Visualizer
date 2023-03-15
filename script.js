// Global Variables
var numbers = new Array(50);
var total = 1;


GenerateIntial();

function GenerateIntial() {
    let bars = document.querySelector(".bars");
    while (bars.firstChild) {
        bars.removeChild(bars.firstChild);
    }
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = Math.floor(Math.random() * (400 - 5) + 5);
        let child = document.createElement("div");
        child.classList.add("bar");
        child.setAttribute('data-value', `${numbers[i]}`);
        child.innerHTML = `<p>${numbers[i]}</p>`
        child.style.height = numbers[i] + "px";
        bars.appendChild(child);
    }
}

document.getElementById('generate').addEventListener('click', function () {
    if (total == 1) {
        GenerateIntial();
        total = 1;
    }
});



document.getElementById('Sort').addEventListener('click', () => {

    // Options Selection 

    let select = document.getElementById("Algos");
    Algorithm = select.value;

    if (Algorithm === "InsertionSort") {
        var i = 1;
        let parent = document.querySelector(".bars");
        function myLoop() {
            insertionSort(i);
            setTimeout(function () {
                i++;
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                for (var j = 0; j < numbers.length; j++) {
                    let child = document.createElement("div");
                    child.classList.add("bar");
                    child.setAttribute('data-value', `${numbers[j]}`);
                    child.innerHTML = `<p>${numbers[j]}</p>`
                    child.style.height = numbers[j] + "px";
                    parent.appendChild(child);
                }
                if (i < numbers.length) {
                    myLoop();
                }
                else {
                    sorted();
                    total = 1;
                }
            }, 250)
        }
        if (total == 1) {
            total = 0;
            myLoop();
        }
    }

    else if (Algorithm === "SelectionSort") {
        var i = 0;
        function myLoop() {
            selectionsort(i);
            setTimeout(function () {
                i++;
                let bars = document.querySelector(".bars");
                while (bars.firstChild) {
                    bars.removeChild(bars.firstChild);
                }
                for (var j = 0; j < numbers.length; j++) {
                    let child = document.createElement("div");
                    child.classList.add("bar");
                    child.setAttribute('data-value', `${numbers[j]}`);
                    child.innerHTML = `<p>${numbers[j]}</p>`
                    child.style.height = numbers[j] + "px";
                    bars.appendChild(child);
                }
                if (i < numbers.length) {
                    myLoop();
                }
                else {
                    sorted();
                    total = 1;
                }
            }, 500)
        }
        if (total == 1) {
            total = 0;
            myLoop();
        }
    }

    else if (Algorithm === "BubbleSort") {
        var i = 0;
        function myLoop() {
            bubblesort(i);
            setTimeout(function () {
                i++;
                if (i < numbers.length) {
                    let bars = document.querySelector(".bars");
                    while (bars.firstChild) {
                        bars.removeChild(bars.firstChild);
                    }
                    for (var j = 0; j < numbers.length; j++) {
                        let child = document.createElement("div");
                        child.classList.add("bar");
                        child.setAttribute('data-value', `${numbers[j]}`);
                        child.innerHTML = `<p>${numbers[j]}</p>`
                        child.style.height = numbers[j] + "px";
                        bars.appendChild(child);
                    }
                    myLoop();
                }
                else {
                    sorted();
                    total = 1;
                }
            }, 500)
        }
        if (total == 1) {
            total = 0;
            myLoop();
        }
    }
})

// Insertion Sort

var g;
function insertionSort(i) {
    let bars = document.querySelectorAll('.bar');
    bars[i].style.background = "red";
    if (g>=0 && g != i)
        bars[g-1].style.background = "rgb(72, 250, 120)";
    g = -1;
    for (var j = i; j > 0; j--) {
        if (numbers[j] < numbers[j - 1]) {
            var temp = numbers[j];
            numbers[j] = numbers[j - 1];
            numbers[j - 1] = temp;
            g = j;
        }
    }
}

// Bubble Sort

function bubblesort(i) {
    let bars = document.querySelectorAll('.bar');
    var j = 0; 
    function bubbleloop() {
        if (numbers[j] > numbers[j + 1]) {
            var temp = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = temp;
        }
        bars[(numbers.length - i - 1) - j].style.background = "rgb(72, 250, 120)";
        bars[numbers.length - i - 1].style.background = "red";
        setTimeout(function () {
            j++;
            if (j < numbers.length - i) {
                bubbleloop();
            }
        }, 5)
    }
    bubbleloop();
}

// Selection Sort

function selectionsort(i) {
    var min = numbers[i];
    var min_index = i;
    var j = i + 1;
    let bars = document.querySelectorAll('.bar');
    bars[i].style.background = "red";
    function Selectionloop() {
        if (j < numbers.length)
            bars[j].style.background = "rgb(72, 250, 120)";
        if (min > numbers[j]) {
            min = numbers[j];
            min_index = j;
        }
        setTimeout(function () {
            j++;
            if (j < numbers.length) {
                Selectionloop();
            } else {
                var temp = numbers[min_index];
                numbers[min_index] = numbers[i];
                numbers[i] = temp;
                bars[min_index].style.background = "blue";
                return min_index;
            }
        }, 5)
    }
    Selectionloop();
}

// Sorted

function sorted() {
    let bars = document.querySelectorAll('.bar');
    for (let one of bars) {
        one.style.background = "white";
    }
    var i = 0;
    function myLoopgreen() {
        bars[i].style.background = "lightgreen";
        setTimeout(function () {
            i++;
            if (i < numbers.length) {
                myLoopgreen();
            }
            else {
                i = 0;
                myLoopwhite();
            }
        }, 2.5)
    }
    myLoopgreen();
    function myLoopwhite() {
        bars[i].style.background = "white";
        setTimeout(function () {
            i++;
            if (i < numbers.length) {
                myLoopwhite();
            }
        }, 2.5)
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
ScrollReveal().reveal('.visualizer', { scale: 0.85, duration: 1200 });