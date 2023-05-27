// Global Variables
const SIZE = 50;

var numbers = new Array(SIZE);

const generate = document.getElementById('generate')
const sort = document.getElementById('Sort')
const select = document.getElementById("Algos")
const speedChanger = document.getElementById('speed')
const increaseButton = document.querySelector('.increase')
const decreaseButton = document.querySelector('.decrease')
const arrayaccess = document.querySelector('.arrayAccess')
const swaps = document.querySelector('.swaps')
const arrow = document.querySelector(".arrow");
const themes = document.querySelector(".themes");



var noOfSwaps = 0
var noOfArrayAccess = 0
var speed = 350
var Algorithm = select.value
var clr

window.onload = () => {
    generateBars();
	clr = localStorage.getItem('color')
    if(clr === null) clr = "teal"
	document.documentElement.style.setProperty("--primary", clr);
    colors.forEach((color) => {
        if (clr === getComputedStyle(color).getPropertyValue("--clr")) {
            color.checked = true
        }
    });
};

arrow.addEventListener("click", () => {
	let child = arrow.firstChild;
	if (child.classList.contains("fa-angle-up")) {
		arrow.innerHTML = `<i class="fa fa-angle-down"></i>`;
		themes.classList.add("collapse");
	} else {
		arrow.innerHTML = `<i class="fa fa-angle-up"></i>`;
		themes.classList.remove("collapse");
	}
});

const colors = document.querySelectorAll(".color");
colors.forEach((color) => {
	color.addEventListener("change", () => {
		if (color.checked) {
			var clr = getComputedStyle(color).getPropertyValue("--clr");
			document.documentElement.style.setProperty("--primary", clr);
			UpdateLocalStorage(clr)
		}
	});
});

function UpdateLocalStorage(clr){
	localStorage.setItem("color",clr)
}

function generateBars() {
    var digits = new Array();

    var i = 0
    while(digits.length != SIZE){
        i = i + 8
        digits.push(i);
    }

    let bars = document.querySelector(".bars");
    bars.innerHTML = "";

    var children = "";
    for (var i = 0; i < numbers.length; i++) {
        var index = Math.floor(Math.random()*digits.length);
        numbers[i] = digits[index];
        digits.splice(index,1);
        children += `<div class = "bar" style="height:${numbers[i]}px" data-value = "${numbers[i]}"><p>${numbers[i]}</p></div>`
    }
    bars.innerHTML = children;

    sort.style.pointerEvents = "all"
    swaps.innerHTML = `Swaps : 0`
    arrayaccess.innerHTML = `Array Accesses : 0`
    speedChanger.value = 40
    noOfSwaps = 0
    noOfArrayAccess = 0
}

function updateSpeed(){
    if (speedChanger.value > 60)
        speed = 1000 - parseInt(speedChanger.value) * 10
    else
        speed = 1000 - parseInt(speedChanger.value) * 10
}

increaseButton.addEventListener('click',()=>{
    speedChanger.value = parseInt(speedChanger.value) + 5
    updateSpeed()
})

decreaseButton.addEventListener('click',()=>{
    speedChanger.value = parseInt(speedChanger.value) - 5
    updateSpeed()
})

speedChanger.addEventListener('input',()=>{
    updateSpeed();
})

generate.addEventListener('click', function () {
    generateBars();
});


select.addEventListener('change',function(){
    generateBars();
    Algorithm = select.value;
})

// Sort Button
sort.addEventListener('click', () => {

    // Disabling Buttons and dropdown.

    generate.style.pointerEvents = "none";
    sort.style.pointerEvents = "none";
    select.style.pointerEvents = "none";
    
    // Options Selection 

    if(Algorithm === 'QuickSort'){
        quickSort(numbers);
    }
    else if(Algorithm === 'MergeSort'){
        mergeSort(numbers,0,numbers.length - 1);
    }
    else if(Algorithm === 'HeapSort'){
        heapSort(numbers)
    }
    else if (Algorithm === "InsertionSort") {
        var i = 1;
        function myInsertionSortLoop() {
            insertionSort(i);
            setTimeout(function () {
                i++;
                generateInLoops();
                if (i < numbers.length) {
                    swaps.innerHTML = `Swaps : ${noOfSwaps}`
                    arrayaccess.innerHTML = `Array Accesses : ${noOfArrayAccess}`
                    myInsertionSortLoop();
                }
                else {
                    sorted();
                }
            }, speed)
        }
        myInsertionSortLoop();
    }

    else if (Algorithm === "SelectionSort") {
        var i = 0;
        function mySelectionSortLoop() {
            selectionsort(i);
            setTimeout(function () {
                i++;
                generateInLoops();
                if (i < numbers.length) {
                    swaps.innerHTML = `Swaps : ${noOfSwaps}`
                    arrayaccess.innerHTML = `Array Accesses : ${noOfArrayAccess}`
                    mySelectionSortLoop();
                }
                else {
                    sorted();
                }
            }, speed)
        }
        mySelectionSortLoop();
    }
    else if (Algorithm === "BubbleSort") {
        var i = numbers.length;
        function myBubbleSortLoop() {
            bubblesort(i);
            setTimeout(function () {
                i--;
                generateInLoops();
                if (i >= 0) {
                    swaps.innerHTML = `Swaps : ${noOfSwaps}`
                    arrayaccess.innerHTML = `Array Accesses : ${noOfArrayAccess}`
                    myBubbleSortLoop();
                }else {
                    sorted();
                }
            }, speed)
        }
        myBubbleSortLoop();    
    }
})

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    noOfArrayAccess += 5
    noOfSwaps++
}

// Merge Sort

function mergeSort(array,low,high){
    if(low < high){
        var mid = Math.floor((low + high) / 2);
        mergeSort(array,low,mid);
        mergeSort(array,mid+1,high);
        merge(array,low,mid,high);
        store(array,noOfSwaps,noOfArrayAccess)
    }
    if(low == 0 && high == numbers.length-1){
        myGenerationLoop();
    }
}

function merge(arr,l,m,r){
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1);
    var R = new Array(n2);

    for (var i = 0; i < n1; ++i)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; ++j)
        R[j] = arr[m + 1 + j];

    var i = 0, j = 0;

    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k++] = L[i++];
    }

    while (j < n2) {
        arr[k++] = R[j++];
    }

    noOfArrayAccess += 3*n1 + 3*n2
}


// QuickSort

function quickSort(array) {
    quickSortHelper(array, 0, array.length - 1);
}

function quickSortHelper(array, low, high) {
    if (low < high) {
        const pivotIndex = partition(array, low, high);
        quickSortHelper(array, low, pivotIndex - 1);
        quickSortHelper(array, pivotIndex + 1, high);
    }
    if(low == 0 && high == numbers.length-1){
        store(array,noOfSwaps,noOfArrayAccess)
        myGenerationLoop();
    }
}

function partition(array,low,high){
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            swap(array, i, j);
            store(array,noOfSwaps,noOfArrayAccess)
        }
        noOfArrayAccess+=2;
    }
    
    swap(array, i + 1, high);
    return i + 1;
}

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
            noOfSwaps++
            noOfArrayAccess += 5
            g = j;
        }
        noOfArrayAccess+=2
    }
}

// Bubble Sort

function bubblesort(i) {
    let bars = document.querySelectorAll('.bar');
    for (var j = 0; j < i; j++) {
        if (numbers[j] > numbers[j + 1]) {
            var temp = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = temp;
            noOfSwaps++
            noOfArrayAccess += 3
        }
        noOfArrayAccess+=2
    }
    bars[Math.round(Math.random()*(i))].style.background = "red";
}

// Selection Sort

function selectionsort(i) {
    var min = numbers[i];
    var min_index = i;
    var j = i + 1;
    let bars = document.querySelectorAll('.bar');
    bars[i].style.background = "red";
    for(j = i + 1 ; j<numbers.length;j++){
        if (min > numbers[j]) {
            min = numbers[j];
            min_index = j;
            noOfArrayAccess+=2
        }
    }
    var temp = numbers[min_index];
    numbers[min_index] = numbers[i];
    numbers[i] = temp;
    noOfSwaps++
    noOfArrayAccess += 5
    bars[min_index].style.background = "#0051ff";
}

// Heap Sort

function heapSort(array){
    var n = array.length;

    
    for(var i = n/2 - 1 ; i >= 0; i--){
        Heapify(array,n,i)
        noOfArrayAccess++;
    }
    
    for(var i = 1; i < n; i++){
        noOfArrayAccess++;
        swap(array,0,n-i);
        Heapify(array,n-i,0)
    }
    store(array,noOfSwaps,noOfArrayAccess)

    myGenerationLoop()
}

function Heapify(array, size, i){

    var largest = i
    var left = 2*i+1
    var right = 2*i+2
    
    if(left < size && array[left] > array[largest]){
        largest = left
    }

    if(right < size && array[right] > array[largest]){
        largest = right
    }

    noOfArrayAccess += 4

    if(largest != i){
        swap(array,i,largest)
        store(array,noOfSwaps,noOfArrayAccess)
        Heapify(array,size,largest)
    }
}


// Sorted
function sorted() {

    select.style.pointerEvents = "all";
    generate.style.pointerEvents = "all";

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
                i = 0;
                white()
            }
        }, 1)
    }
    myGreenLoop();

    function white(){
        bars[i].style.background = "white";
        setTimeout(function () {
            i++;
            if (i < numbers.length) {
                white()
            }
        }, 5)
    }
}


var data = new Array();
var index = 0;
function store(array,noofswaps,noofarrayaccess) {
    var string = "";
    for (var i = 0; i < numbers.length; i++) {
        string += array[i] + " ";
    }
    string += noofswaps + " "
    string += noofarrayaccess
    const subarray = string.split(" ");
    if(!data.includes(subarray)){
        data.push(subarray);
    }
}

function myGenerationLoop(){
    setTimeout(function(){
        index++;
        if (index < data.length) {
            let parent = document.querySelector(".bars");
            parent.innerHTML = "";
            var children = "";
            for (var j = 0; j < numbers.length; j++) {
                children += `<div class = "bar" style="height:${data[index][j]}px" data-value = "${data[index][j]}">
                <p>${data[index][j]}</p>
                </div>`
            }
            parent.innerHTML = children;
            swaps.innerHTML = `Swaps : ${data[index][SIZE]}`
            arrayaccess.innerHTML = `Array Accesses : ${data[index][SIZE + 1]}`
            myGenerationLoop();
        }
        else{
            sorted();
        }
    }, speed)
}

function generateInLoops(){
    let parent = document.querySelector(".bars");
    parent.innerHTML = "";
    var children = "";
    for (var j = 0; j < numbers.length; j++) {
        children += `<div class = "bar" style="height:${numbers[j]}px" data-value = "${numbers[j]}"><p>${numbers[j]}</p></div>`
    }
    parent.innerHTML = children;
}

// var slideDown = {
//     distance: '150%',
//     origin: 'top',
//     opacity: null,
//     duration: 500
// };
// var slideUp = {
//     distance: '150%',
//     origin: 'bottom',
//     opacity: null,
//     duration: 500
// };


// ScrollReveal().reveal('#Title', slideDown);
// ScrollReveal().reveal('.buttons', slideUp);
// ScrollReveal().reveal('.visualizer', { scale: 0.85, duration: 500 });


// function myLoop() {
//     setTimeout(function () {
//         i++;
//         if (i < numbers.length) {
            
//             myLoop();
//         }
//     }, 500)
//     myLoop();
// }