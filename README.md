# Algorithm Sorter Visualizer

A web-based interactive visualization tool for common sorting algorithms that demonstrates how different sorting techniques work step-by-step.

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
  - Speed control for animation
  - Algorithm selection dropdown
  - Generate and Sort buttons

- **Visual Design**:
  - Color-coded bars (blue=default, red=comparing, orange=swapping, green=sorted, purple=pivot)
  - Responsive layout that works on different screen sizes
  - Smooth animations
  - Informative algorithm descriptions

## How to Use

1. Select the desired array size using the slider (5-100 elements)
2. Adjust the animation speed using the speed slider
3. Choose a sorting algorithm from the dropdown menu
4. Click "Generate Array" to create a new random array
5. Click "Start Sort" to begin the visualization
6. Watch how the algorithm sorts the array step-by-step

## Files

- `index.html` - Main HTML structure with controls and visualization area
- `style.css` - Styling for visualization and controls
- `script.js` - JavaScript implementation of all algorithms and visualization logic
- `README.md` - This documentation file

## Technical Implementation

- **No external libraries** - Pure HTML5, CSS3, and JavaScript
- **Performance optimized** - Uses requestAnimationFrame for smooth animations
- **Clean, documented code** - Well-commented implementation
- **Responsive design** - Works on mobile, tablet, and desktop devices

## Educational Value

This visualizer helps users understand:
- How different sorting algorithms work
- Time complexity of each algorithm
- Step-by-step process of sorting
- Visual representation of algorithm behavior

## Performance Considerations

- Smooth 30-60 FPS animations
- Optimized DOM updates for better performance
- Limits array size for performance considerations
- Efficient algorithm implementations

## License

This project is created for educational purposes to help understand sorting algorithms through visualization.

## Author

Algorithm Sorter Visualizer - Educational Tool