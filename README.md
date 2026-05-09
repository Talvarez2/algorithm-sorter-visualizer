# Algorithm Sorter Visualizer

A web-based tool to visualize 8 common sorting algorithms with interactive controls.

## Features

- **8 Sorting Algorithms**: 
  - Bubble Sort
  - Quick Sort
  - Merge Sort
  - Insertion Sort
  - Selection Sort
  - Heap Sort
  - Counting Sort
  - Radix Sort

- **Interactive Controls**:
  - Adjustable array size (5-100 elements)
  - Configurable animation speed/frame rate
  - Real-time visualization of sorting process
  - Color-coded bars for different states (sorted, comparing, swapping, pivot)

- **Visual Feedback**:
  - Animated bar graph showing the sorting process
  - Clear visual indicators for each algorithm's operations
  - Responsive design that works on different screen sizes

## How to Use

1. Open `index.html` in a web browser
2. Select a sorting algorithm from the dropdown menu
3. Adjust the array size using the slider (default: 20 elements)
4. Set the animation speed/frame rate using the speed control
5. Click "Generate Array" to create a new random array
6. Click "Sort Array" to start the visualization

## Technical Details

The visualizer uses HTML, CSS, and JavaScript to create an interactive demonstration of sorting algorithms. Each algorithm is implemented with detailed step-by-step visualization showing how elements are compared, swapped, and sorted.

Each bar in the visualization represents an element of the array, with different colors indicating different states during the sorting process:
- Blue: Default state
- Green: Sorted elements
- Red: Elements being compared
- Orange: Elements being swapped
- Purple: Pivot element (for Quick Sort)

## Implementation

The visualizer includes smooth animations that can be adjusted in real-time, making it easy to understand how each sorting algorithm works step by step.

## File Structure

```
algorithm-sorter-visualizer/
├── index.html          # Main HTML structure
├── style.css           # Styling for the visualization
├── script.js           # JavaScript implementation of sorting algorithms
└── README.md           # This file
```

## Future Enhancements

- Add more sorting algorithms
- Include time complexity visualization
- Add step-by-step explanation of each algorithm
- Implement keyboard controls
- Add export/import functionality for array data