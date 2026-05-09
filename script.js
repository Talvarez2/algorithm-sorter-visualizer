// Global variables
let array = [];
let arraySize = 20;
let isSorting = false;
let animationSpeed = 50;

// DOM elements
const visualizer = document.getElementById('visualizer');
const generateBtn = document.getElementById('generate-btn');
const sortBtn = document.getElementById('sort-btn');
const algorithmSelect = document.getElementById('algorithm-select');
const arraySizeInput = document.getElementById('array-size');

// Initialize the visualizer
function init() {
    generateArray();
    drawArray();
    
    // Event listeners
    generateBtn.addEventListener('click', generateArray);
    sortBtn.addEventListener('click', startSorting);
    algorithmSelect.addEventListener('change', () => {
        generateArray();
        drawArray();
    });
    arraySizeInput.addEventListener('input', () => {
        arraySize = parseInt(arraySizeInput.value);
        if (arraySize < 5) arraySize = 5;
        if (arraySize > 100) arraySize = 100;
        arraySizeInput.value = arraySize;
        generateArray();
        drawArray();
    });
}

// Generate a random array
function generateArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 95) + 5); // Values from 5 to 100
    }
    drawArray();
}

// Draw the array as bars
function drawArray() {
    visualizer.innerHTML = '';
    const maxValue = Math.max(...array);
    
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / maxValue) * 250}px`;
        bar.style.width = `${Math.max(10, 800 / arraySize - 2)}px`;
        bar.dataset.value = value;
        bar.dataset.index = index;
        visualizer.appendChild(bar);
    });
}

// Swap elements in the array
function swap(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    updateBars();
}

// Update the bars visualization after swap
function updateBars() {
    const bars = document.querySelectorAll('.bar');
    array.forEach((value, index) => {
        bars[index].style.height = `${(value / Math.max(...array)) * 250}px`;
        bars[index].dataset.value = value;
    });
}

// Sorting algorithms
async function bubbleSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight bars being compared
            highlightBar(j, 'comparing');
            highlightBar(j + 1, 'comparing');
            
            await sleep(animationSpeed);
            
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                // Highlight bars being swapped
                highlightBar(j, 'swapping');
                highlightBar(j + 1, 'swapping');
                await sleep(animationSpeed);
            }
            
            // Remove highlight after comparison
            unhighlightBar(j, 'comparing');
            unhighlightBar(j + 1, 'comparing');
        }
        // Mark last element as sorted
        highlightBar(n - i - 1, 'sorted');
    }
    // Mark first element as sorted
    highlightBar(0, 'sorted');
}

async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;
    
    // Highlight pivot
    highlightBar(high, 'pivot');
    
    for (let j = low; j < high; j++) {
        // Highlight bars being compared
        highlightBar(j, 'comparing');
        
        await sleep(animationSpeed);
        
        if (array[j] < pivot) {
            i++;
            swap(i, j);
            // Highlight bars being swapped
            highlightBar(i, 'swapping');
            highlightBar(j, 'swapping');
            await sleep(animationSpeed);
        }
        
        // Remove highlight after comparison
        unhighlightBar(j, 'comparing');
    }
    
    // Swap pivot into correct position
    swap(i + 1, high);
    // Highlight pivot position
    highlightBar(i + 1, 'pivot');
    
    await sleep(animationSpeed);
    
    // Remove pivot highlight
    unhighlightBar(high, 'pivot');
    unhighlightBar(i + 1, 'pivot');
    
    // Mark sorted elements
    highlightBar(i + 1, 'sorted');
    
    return i + 1;
}

async function mergeSort(low = 0, high = array.length - 1) {
    if (low < high) {
        const mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        await merge(low, mid, high);
    }
}

async function merge(low, mid, high) {
    const leftArray = array.slice(low, mid + 1);
    const rightArray = array.slice(mid + 1, high + 1);
    
    let i = 0, j = 0, k = low;
    
    while (i < leftArray.length && j < rightArray.length) {
        // Highlight elements being compared
        highlightBar(low + i, 'comparing');
        highlightBar(mid + 1 + j, 'comparing');
        
        await sleep(animationSpeed);
        
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        
        // Show swap in visualization
        highlightBar(k, 'swapping');
        updateBars();
        await sleep(animationSpeed);
        unhighlightBar(k, 'swapping');
        
        k++;
        
        // Remove comparison highlight
        unhighlightBar(low + i, 'comparing');
        unhighlightBar(mid + 1 + j, 'comparing');
    }
    
    while (i < leftArray.length) {
        array[k] = leftArray[i];
        i++;
        k++;
    }
    
    while (j < rightArray.length) {
        array[k] = rightArray[j];
        j++;
        k++;
    }
    
    // Update visualization after merge
    updateBars();
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        // Highlight key element
        highlightBar(i, 'comparing');
        
        while (j >= 0 && array[j] > key) {
            // Highlight bars being compared
            highlightBar(j, 'comparing');
            await sleep(animationSpeed);
            
            array[j + 1] = array[j];
            
            // Show swap
            highlightBar(j + 1, 'swapping');
            updateBars();
            await sleep(animationSpeed);
            unhighlightBar(j + 1, 'swapping');
            
            j--;
        }
        
        array[j + 1] = key;
        updateBars();
        
        // Update highlights
        unhighlightBar(i, 'comparing');
        unhighlightBar(j + 1, 'comparing');
        
        // Mark sorted element
        highlightBar(j + 1, 'sorted');
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        highlightBar(minIndex, 'comparing');
        
        for (let j = i + 1; j < array.length; j++) {
            // Highlight current element
            highlightBar(j, 'comparing');
            await sleep(animationSpeed);
            
            if (array[j] < array[minIndex]) {
                // Unhighlight previous min
                unhighlightBar(minIndex, 'comparing');
                minIndex = j;
                highlightBar(minIndex, 'comparing');
            } else {
                // Unhighlight current element
                unhighlightBar(j, 'comparing');
            }
        }
        
        // Swap if needed
        if (minIndex !== i) {
            swap(i, minIndex);
            // Highlight swapped bars
            highlightBar(i, 'swapping');
            highlightBar(minIndex, 'swapping');
            await sleep(animationSpeed);
        }
        
        // Mark as sorted
        highlightBar(i, 'sorted');
        // Remove highlights
        unhighlightBar(i, 'comparing');
        unhighlightBar(minIndex, 'comparing');
        unhighlightBar(i, 'swapping');
        unhighlightBar(minIndex, 'swapping');
    }
    
    // Mark last element as sorted
    highlightBar(array.length - 1, 'sorted');
}

// Helper functions to highlight bars
function highlightBar(index, className) {
    const bars = document.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].classList.add(className);
    }
}

function unhighlightBar(index, className) {
    const bars = document.querySelectorAll('.bar');
    if (bars[index]) {
        bars[index].classList.remove(className);
    }
}

// Start the sorting process
async function startSorting() {
    if (isSorting) return;
    
    isSorting = true;
    sortBtn.disabled = true;
    
    // Clear previous highlights
    document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.remove('sorted', 'comparing', 'swapping', 'pivot');
    });
    
    const algorithm = algorithmSelect.value;
    
    switch (algorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'quick':
            await quickSort();
            break;
        case 'merge':
            await mergeSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'selection':
            await selectionSort();
            break;
    }
    
    // Mark all elements as sorted
    document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.add('sorted');
    });
    
    isSorting = false;
    sortBtn.disabled = false;
}

// Utility function for delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);