let gridSize = 80; // Number of rows and columns
let squareSize;
let gridState = [];

function setup() {
  createCanvas(400, 400);
  squareSize = width / gridSize;

  // Initialize the grid state
  for (let i = 0; i < gridSize; i++) {
    gridState[i] = [];
    for (let j = 0; j < gridSize; j++) {
      gridState[i][j] = random() < 0.5; // Randomly set to true (red) or false (white)
    }
  }

  frameRate(1); // Update the grid every second
}

function draw() {
  background(255); // White background

  // Draw the grid in a heart shape
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (isInHeartShape(i, j)) { // Check if the cell is in the heart
        if (gridState[i][j]) {
          fill(213, 41, 41); // Red color
        } else {
          fill(255); // White color (background)
        }
        noStroke();
        rect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  }

  // Randomize the grid state for the next frame
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (isInHeartShape(i, j)) {
        gridState[i][j] = random() < 0.5;
      }
    }
  }
}

function isInHeartShape(x, y) {
  let cx = gridSize / 2; // Center X
  let cy = gridSize / 1.8; // Center Y (shift up slightly for a heart shape)
  let nx = (x - cx) / (gridSize / 2); // Normalize x
  let ny = (y - cy) / (gridSize / 2); // Normalize y

  // Rotate the point by 180 degrees (PI radians)
  let angle = Math.PI; // 180 degrees in radians
  let rotatedNx = nx * Math.cos(angle) - ny * Math.sin(angle);
  let rotatedNy = nx * Math.sin(angle) + ny * Math.cos(angle);

  // Use the rotated coordinates to check if the point is inside the heart shape
  return (rotatedNx * rotatedNx + rotatedNy * rotatedNy - 0.3) ** 3 - rotatedNx * rotatedNx * rotatedNy * rotatedNy * rotatedNy < 0;
}
