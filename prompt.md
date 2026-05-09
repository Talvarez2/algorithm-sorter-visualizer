# Algorithm Sorter Visualizer Project

## Project Overview
Create a web-based sorting algorithm visualizer that can demonstrate 8 common sorting algorithms with interactive controls for array size and animation frame rate.

## Core Requirements

### 1. Algorithm Support
The visualizer must implement and display the following 8 sorting algorithms:
- Bubble Sort
- Quick Sort
- Merge Sort
- Insertion Sort
- Selection Sort
- Heap Sort
- Counting Sort
- Radix Sort

### 2. Interactive Controls
Implement the following user controls:
- **Array Size Selection**: Slider or input to choose number of elements (5-100 elements)
- **Frame Rate/Speed Control**: Adjustable animation speed (0-100 scale, or similar)
- **Algorithm Selection**: Dropdown menu to choose which algorithm to visualize
- **Generate Button**: Create a new random array with current settings
- **Start/Sort Button**: Begin the sorting visualization with current configuration

### 3. Visualization Features
- **Bar Graph Display**: Visual representation using colored bars where height represents value
- **Real-time Updates**: Bars should animate and change colors as sorting progresses
- **Color Coding**:
  - Default: Blue bars
  - Sorted: Green bars
  - Comparing: Red bars
  - Swapping: Orange bars
  - Pivot (for Quick Sort): Purple bars
- **Responsive Design**: Works on different screen sizes

### 4. Technical Implementation Requirements
- Use HTML5, CSS3, and JavaScript (no external libraries)
- Implement each algorithm with proper time complexity O(n log n) or O(n²) as appropriate
- Smooth animations using requestAnimationFrame or setTimeout
- Efficient DOM updates to maintain performance
- Clean, readable code with appropriate comments

### 5. User Experience
- Intuitive interface with clear labels and instructions
- Real-time feedback during sorting process
- Ability to pause/resume sorting (if possible)
- Clear indication of current algorithm state
- Visual feedback for user interactions

## File Structure
The project should include:
- `index.html` - Main HTML structure with controls and visualization area
- `style.css` - Styling for visualization and controls
- `script.js` - JavaScript implementation of all algorithms and visualization logic
- `README.md` - Project documentation

## Expected Behavior
1. User selects array size (5-100 elements)
2. User sets animation speed/frame rate
3. User selects sorting algorithm from dropdown
4. User clicks "Generate Array" to create random data
5. User clicks "Sort Array" to start visualization
6. Visualization shows step-by-step sorting process with appropriate coloring
7. Once complete, all bars should be sorted and green

## Performance Considerations
- Optimize animation for smooth 30-60 FPS
- Handle large arrays efficiently (limit to reasonable size for performance)
- Minimize DOM operations for better performance
- Implement proper cleanup of previous visualizations

## Stretch Goals (if time permits)
- Add algorithm explanation/complexity information
- Add keyboard controls
- Add ability to import/export data
- Add pause/play functionality
- Add algorithm comparison mode

The visualizer should be educational and engaging, helping users understand how different sorting algorithms work by seeing them in action.