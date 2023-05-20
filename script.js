// Global Variables
var numbers = new Array(50);

const generate = document.getElementById('generate');
const sort = document.getElementById('Sort');

window.onload = () => {
    generateBars();
};

function generateBars() {
    let bars = document.querySelector(".bars");
    bars.innerHTML = "";

    var children = "";
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = Math.floor(Math.random() * (400 - 5) + 5);
        children += `<div class = "bar" style="height:${numbers[i]}px" data-value = "${numbers[i]}"><p>${numbers[i]}</p></div>`
    }
    bars.innerHTML = children;
}

generate.addEventListener('click', function () {
    generateBars();
});


sort.addEventListener('click', () => {

    // Options Selection 

    let select = document.getElementById("Algos");
    Algorithm = select.value;

    if (Algorithm === "InsertionSort") {
        var i = 1;
        let parent = document.querySelector(".bars");
        function myInsertionSortLoop() {
            insertionSort(i);
            setTimeout(function () {
                i++;
                parent.innerHTML = "";
                var children = "";
                for (var j = 0; j < numbers.length; j++) {
                    children += `<div class = "bar" style="height:${numbers[j]}px" data-value = "${numbers[j]}"><p>${numbers[j]}</p></div>`
                }
                parent.innerHTML = children;
                if (i < numbers.length) {
                    myInsertionSortLoop();
                }
                else {
                    sorted();
                    generate.style.pointerEvents = "all";
                    sort.style.pointerEvents = "all";
                }
            }, 250)
        }
        generate.style.pointerEvents = "none";
        sort.style.pointerEvents = "none";
        myInsertionSortLoop();
    }

    else if (Algorithm === "SelectionSort") {
        var i = 0;
        function mySelectionSortLoop() {
            selectionsort(i);
            setTimeout(function () {
                i++;
                let parent = document.querySelector(".bars");
                parent.innerHTML = "";
                var children = "";
                for (var j = 0; j < numbers.length; j++) {
                    children += `<div class = "bar" style="height:${numbers[j]}px" data-value = "${numbers[j]}"><p>${numbers[j]}</p></div>`
                }
                parent.innerHTML = children;
                if (i < numbers.length) {
                    mySelectionSortLoop();
                }
                else {
                    sorted();
                    generate.style.pointerEvents = "all";
                    sort.style.pointerEvents = "all";
                }
            }, 500)
        }
        generate.style.pointerEvents = "none";
        sort.style.pointerEvents = "none";
        mySelectionSortLoop();
    }

    else if (Algorithm === "BubbleSort") {
        var i = 0;
        function myBubbleSortLoop() {
            bubblesort(i);
            setTimeout(function () {
                i++;
                if (i < numbers.length) {
                    let parent = document.querySelector(".bars");
                    parent.innerHTML = "";
                    var children = "";
                    for (var j = 0; j < numbers.length; j++) {
                        children += `<div class = "bar" style="height:${numbers[j]}px" data-value = "${numbers[j]}"><p>${numbers[j]}</p></div>`
                    }
                    parent.innerHTML = children;
                    myBubbleSortLoop();
                }else {
                    sorted();
                    generate.style.pointerEvents = "all";
                    sort.style.pointerEvents = "all";
                }
            }, 250)
        }
        generate.style.pointerEvents = "none";
        sort.style.pointerEvents = "none";
        myBubbleSortLoop();    
    }
})

// Insertion Sort

var g;
function insertionSort(i) {
    let bars = document.querySelectorAll('.bar');
    bars[i].style.background = "red";
    if (g>=0 && g != i)
        bars[g-1].style.background = "#40f736";
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
    for (var j = 0; j < numbers.length-i-1; j++) {
        if (numbers[j] > numbers[j + 1]) {
            var temp = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = temp;
        }
    }
    bars[Math.round(Math.random()*(numbers.length-i-1))].style.background = "red";
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
            bars[j].style.background = "#40f736";
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
                bars[min_index].style.background = "#0051ff";
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
    function myGreenLoop() {
        bars[i].style.background = "lightgreen";
        setTimeout(function () {
            i++;
            if (i < numbers.length) {
                myGreenLoop();
            }
            else {
                white()
            }
        }, 5)
    }
    myGreenLoop();

    const white = () => {
        for(var i = 0;i<bars.length;i++)
            bars[i].style.background = "white";
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


// function myLoop() {
//     setTimeout(function () {
//         i++;
//         if (i < numbers.length) {
            
//             myLoop();
//         }
//     }, 500)
//     myLoop();
// }