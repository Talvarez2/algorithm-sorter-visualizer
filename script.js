// Global variables
let array = [];
let arraySize = 50;
let speed = 50;
let isSorting = false;
let animationSpeed = 100; // milliseconds between updates
let algorithm = 'bubble';

// DOM Elements
const arrayContainer = document.getElementById('arrayContainer');
const arraySizeSlider = document.getElementById('arraySize');
const sizeValue = document.getElementById('sizeValue');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');
const algorithmSelect = document.getElementById('algorithm');
const generateBtn = document.getElementById('generateBtn');
const sortBtn = document.getElementById('sortBtn');
const algorithmInfo = document.getElementById('algorithmInfo');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners
    arraySizeSlider.addEventListener('input', updateArraySize);
    speedSlider.addEventListener('input', updateSpeed);
    algorithmSelect.addEventListener('change', updateAlgorithm);
    generateBtn.addEventListener('click', generateArray);
    sortBtn.addEventListener('click', startSort);
    
    // Generate initial array
    generateArray();
});

// Update array size from slider
function updateArraySize() {
    arraySize = parseInt(arraySizeSlider.value);
    sizeValue.textContent = arraySize;
    generateArray();
}

// Update speed from slider
function updateSpeed() {
    speed = parseInt(speedSlider.value);
    speedValue.textContent = speed;
    updateAnimationSpeed();
}

// Update algorithm from dropdown
function updateAlgorithm() {
    algorithm = algorithmSelect.value;
    updateAlgorithmInfo();
}

// Update animation speed based on slider value
function updateAnimationSpeed() {
    // Map speed slider (1-100) to animation speed (1-200ms)
    animationSpeed = Math.max(10, 200 - (speed * 1.9));
}

// Generate a new random array
function generateArray() {
    if (isSorting) return;
    
    array = [];
    arrayContainer.innerHTML = '';
    
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 95) + 5); // Values between 5-100
    }
    
    renderArray();
    updateAlgorithmInfo();
}

// Render the array as bars
function renderArray(arr = array) {
    arrayContainer.innerHTML = '';
    
    // Find max value to normalize bar heights
    const maxValue = Math.max(...arr);
    
    arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar default';
        bar.style.height = `${(value / maxValue) * 90}%`;
        bar.setAttribute('data-value', value);
        arrayContainer.appendChild(bar);
    });
}

// Update algorithm info text
function updateAlgorithmInfo() {
    const infoText = {
        bubble: "Bubble Sort: Compares adjacent elements and swaps them if they're in the wrong order. O(n²) time complexity.",
        quick: "Quick Sort: Divides the array into smaller sub-arrays based on a pivot element. O(n log n) average time complexity.",
        merge: "Merge Sort: Divides the array into halves, sorts them, and merges them back together. O(n log n) time complexity.",
        insertion: "Insertion Sort: Builds the final sorted array one item at a time by repeatedly inserting elements into their correct position. O(n²) time complexity.",
        selection: "Selection Sort: Repeatedly finds the minimum element and places it at the beginning. O(n²) time complexity.",
        heap: "Heap Sort: Uses a binary heap data structure. Builds a max heap and repeatedly extracts the maximum element. O(n log n) time complexity.",
        counting: "Counting Sort: Counts occurrences of each unique element and uses this information to place elements in order. O(n+k) time complexity where k is the range.",
        radix: "Radix Sort: Sorts numbers by processing individual digits from least to most significant. O(d×n) time complexity where d is the number of digits."
    };
    
    if (algorithmInfo) {
        algorithmInfo.textContent = infoText[algorithm] || "Select an algorithm to view information.";
    }
}

// Start the sorting process
function startSort() {
    if (isSorting) return;
    
    isSorting = true;
    sortBtn.disabled = true;
    generateBtn.disabled = true;
    
    // Reset array to default state
    resetBars();
    
    // Execute appropriate sorting algorithm
    switch(algorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'quick':
            quickSort(0, array.length - 1);
            break;
        case 'merge':
            mergeSort(0, array.length - 1);
            break;
        case 'insertion':
            insertionSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'heap':
            heapSort();
            break;
        case 'counting':
            countingSort();
            break;
        case 'radix':
            radixSort();
            break;
    }
}

// Reset all bars to default color
function resetBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.className = 'bar default';
    });
}

// Animation helper function
function updateBars(animationData) {
    return new Promise((resolve) => {
        const bars = document.querySelectorAll('.bar');
        
        // Clear previous animations
        bars.forEach(bar => {
            bar.className = 'bar default';
        });
        
        // Apply new animation data
        animationData.forEach((data, index) => {
            if (data.type === 'compare') {
                bars[index].className = 'bar comparing';
            } else if (data.type === 'swap') {
                bars[index].className = 'bar swapping';
            } else if (data.type === 'pivot') {
                bars[index].className = 'bar pivot';
            } else if (data.type === 'sorted') {
                bars[index].className = 'bar sorted';
            }
        });
        
        setTimeout(() => {
            // Update bar values if needed
            const updatedBars = document.querySelectorAll('.bar');
            animationData.forEach((data, index) => {
                if (data.value !== undefined) {
                    updatedBars[index].setAttribute('data-value', data.value);
                }
            });
            resolve();
        }, animationSpeed);
    });
}

// Bubble Sort Implementation
async function bubbleSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Mark elements as comparing
            const animationData = [
                { type: 'compare', value: array[j] },
                { type: 'compare', value: array[j+1] }
            ];
            
            await updateBars(animationData);
            
            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                
                // Mark as swapping
                const swapAnimationData = [
                    { type: 'swap', value: array[j] },
                    { type: 'swap', value: array[j+1] }
                ];
                
                await updateBars(swapAnimationData);
            }
        }
        
        // Mark last element as sorted
        const sortedAnimationData = [
            { type: 'sorted', value: array[n - i - 1] }
        ];
        await updateBars(sortedAnimationData);
    }
    
    // Mark entire array as sorted
    const finalAnimationData = Array(array.length).fill().map(() => ({ type: 'sorted' }));
    await updateBars(finalAnimationData);
    
    finishSorting();
}

// Quick Sort Implementation
async function quickSort(low, high) {
    if (low < high) {
        // Partition the array
        const pi = await partition(low, high);
        
        // Recursively sort elements before and after partition
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    // Select the rightmost element as pivot
    const pivot = array[high];
    
    // Mark pivot for visualization
    const pivotAnimationData = Array(array.length).fill().map((_, i) => 
        i === high ? { type: 'pivot', value: array[i] } : { type: 'default', value: array[i] }
    );
    await updateBars(pivotAnimationData);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // Mark elements as comparing
        const compareAnimationData = Array(array.length).fill().map((_, index) => {
            if (index === j || index === i+1) {
                return { type: 'compare', value: array[index] };
            } else if (index === high) {
                return { type: 'pivot', value: array[index] };
            }
            return { type: 'default', value: array[index] };
        });
        await updateBars(compareAnimationData);
        
        if (array[j] < pivot) {
            i++;
            // Swap elements
            [array[i], array[j]] = [array[j], array[i]];
            
            // Mark swap for visualization
            const swapAnimationData = Array(array.length).fill().map((_, index) => {
                if (index === i || index === j) {
                    return { type: 'swap', value: array[index] };
                } else if (index === high) {
                    return { type: 'pivot', value: array[index] };
                }
                return { type: 'default', value: array[index] };
            });
            await updateBars(swapAnimationData);
        }
    }
    
    // Place pivot in correct position
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    
    const finalSwapAnimationData = Array(array.length).fill().map((_, index) => {
        if (index === i+1 || index === high) {
            return { type: 'swap', value: array[index] };
        } else if (index === high) {
            return { type: 'pivot', value: array[index] };
        }
        return { type: 'default', value: array[index] };
    });
    await updateBars(finalSwapAnimationData);
    
    return i + 1;
}

// Merge Sort Implementation
async function mergeSort(low, high) {
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
    
    // Mark elements for comparison
    const mergeAnimationData = Array(array.length).fill().map((_, index) => {
        if (index >= low && index <= high) {
            return { type: 'compare', value: array[index] };
        }
        return { type: 'default', value: array[index] };
    });
    await updateBars(mergeAnimationData);
    
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;
    }
    
    // Mark sorted elements 
    const sortAnimationData = Array(array.length).fill().map((_, index) => {
        if (index >= low && index < k) {
            return { type: 'sorted', value: array[index] };
        }
        return { type: 'default', value: array[index] };
    });
    await updateBars(sortAnimationData);
    
    // Copy remaining elements
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
    
    // Final update
    const finalAnimationData = Array(array.length).fill().map((_, index) => {
        if (index >= low && index <= high) {
            return { type: 'sorted', value: array[index] };
        }
        return { type: 'default', value: array[index] };
    });
    await updateBars(finalAnimationData);
}

// Insertion Sort Implementation
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        // Mark elements as comparing
        const compareAnimationData = Array(array.length).fill().map((_, index) => {
            if (index === i) {
                return { type: 'compare', value: array[index] };
            } else if (index === j) {
                return { type: 'compare', value: array[index] };
            }
            return { type: 'default', value: array[index] };
        });
        await updateBars(compareAnimationData);
        
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            
            // Mark as swapping
            const swapAnimationData = Array(array.length).fill().map((_, index) => {
                if (index === j+1 || index === j) {
                    return { type: 'swap', value: array[index] };
                }
                return { type: 'default', value: array[index] };
            });
            await updateBars(swapAnimationData);
            
            j--;
        }
        array[j + 1] = key;
    }
    
    // Mark all elements as sorted
    const finalAnimationData = Array(array.length).fill().map(() => ({ type: 'sorted' }));
    await updateBars(finalAnimationData);
    
    finishSorting();
}

// Selection Sort Implementation
async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        // Mark elements as comparing
        const compareAnimationData = Array(array.length).fill().map((_, index) => {
            if (index === i) {
                return { type: 'compare', value: array[index] };
            } else if (index === minIndex) {
                return { type: 'compare', value: array[index] };
            }
            return { type: 'default', value: array[index] };
        });
        await updateBars(compareAnimationData);
        
        for (let j = i + 1; j < array.length; j++) {
            // Mark elements as comparing
            const compareAnimationData2 = Array(array.length).fill().map((_, index) => {
                if (index === j || index === minIndex) {
                    return { type: 'compare', value: array[index] };
                } else if (index === i) {
                    return { type: 'compare', value: array[index] };
                }
                return { type: 'default', value: array[index] };
            });
            await updateBars(compareAnimationData2);
            
            if (array[j] < array[minIndex]) {
                minIndex = j;
                
                // Mark new minimum
                const minAnimationData = Array(array.length).fill().map((_, index) => {
                    if (index === minIndex) {
                        return { type: 'compare', value: array[index] };
                    } else if (index === i) {
                        return { type: 'compare', value: array[index] };
                    }
                    return { type: 'default', value: array[index] };
                });
                await updateBars(minAnimationData);
            }
        }
        
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            
            // Mark as swapping
            const swapAnimationData = Array(array.length).fill().map((_, index) => {
                if (index === i || index === minIndex) {
                    return { type: 'swap', value: array[index] };
                }
                return { type: 'default', value: array[index] };
            });
            await updateBars(swapAnimationData);
        }
        
        // Mark as sorted
        const sortedAnimationData = Array(array.length).fill().map((_, index) => {
            if (index === i) {
                return { type: 'sorted', value: array[index] };
            }
            return { type: 'default', value: array[index] };
        });
        await updateBars(sortedAnimationData);
    }
    
    // Mark last element as sorted
    const finalAnimationData = Array(array.length).fill().map((_, index) => {
        if (index === array.length - 1) {
            return { type: 'sorted', value: array[index] };
        }
        return { type: 'default', value: array[index] };
    });
    await updateBars(finalAnimationData);
    
    finishSorting();
}

// Heap Sort Implementation
async function heapSort() {
    const n = array.length;
    
    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        
        // Mark as swapping
        const swapAnimationData = Array(array.length).fill().map((_, index) => {
            if (index === 0 || index === i) {
                return { type: 'swap', value: array[index] };
            }
            return { type: 'default', value: array[index] };
        });
        await updateBars(swapAnimationData);
        
        // Call heapify on the reduced heap
        await heapify(i, 0);
    }
    
    // Mark all as sorted
    const finalAnimationData = Array(array.length).fill().map(() => ({ type: 'sorted' }));
    await updateBars(finalAnimationData);
    
    finishSorting();
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    // Mark elements as comparing
    const compareAnimationData = Array(array.length).fill().map((_, index) => {
        if (index === i || index === left || index === right) {
            return { type: 'compare', value: array[index] };
        }
        return { type: 'default', value: array[index] };
    });
    await updateBars(compareAnimationData);
    
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        
        // Mark as swapping
        const swapAnimationData = Array(array.length).fill().map((_, index) => {
            if (index === i || index === largest) {
                return { type: 'swap', value: array[index] };
            }
            return { type: 'default', value: array[index] };
        });
        await updateBars(swapAnimationData);
        
        await heapify(n, largest);
    }
}

// Counting Sort Implementation
function countingSort() {
    // We'll implement a simplified version for visualization
    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(array.length);
    
    // Count occurrences
    for (let i = 0; i < array.length; i++) {
        count[array[i] - min]++;
    }
    
    // Build output array
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build final sorted array
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i] - min] - 1] = array[i];
        count[array[i] - min]--;
    }
    
    // Update array with sorted values
    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }
    
    // Visualize the final sorted array
    const finalAnimationData = Array(array.length).fill().map(() => ({ type: 'sorted' }));
    updateBars(finalAnimationData);
    
    finishSorting();
}

// Radix Sort Implementation 
function radixSort() {
    // Find maximum value to determine number of digits
    const max = Math.max(...array);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(exp);
    }
    
    // Visualize the final sorted array
    const finalAnimationData = Array(array.length).fill().map(() => ({ type: 'sorted' }));
    updateBars(finalAnimationData);
    
    finishSorting();
}

function countingSortByDigit(exp) {
    const n = array.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(array[i] / exp) % 10;
        count[digit]++;
    }
    
    // Calculate cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(array[i] / exp) % 10;
        output[count[digit] - 1] = array[i];
        count[digit]--;
    }
    
    // Update array with sorted values
    for (let i = 0; i < n; i++) {
        array[i] = output[i];
    }
    
    // Visualize the array sorting step
    const animationData = Array(array.length).fill().map((_, i) => ({ type: 'sorted', value: array[i] }));
    updateBars(animationData);
}

// Finish sorting and reset controls
function finishSorting() {
    isSorting = false;
    sortBtn.disabled = false;
    generateBtn.disabled = false;
    
    // Mark all as sorted
    const finalAnimationData = Array(array.length).fill().map(() => ({ type: 'sorted' }));
    updateBars(finalAnimationData);
}