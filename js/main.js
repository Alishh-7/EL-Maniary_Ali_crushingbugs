console.log("Javascript is connected");

//variables
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const puzzlePieces = document.querySelectorAll(".puzzle-pieces img");
const dropZones = document.querySelectorAll(".drop-zone");
// Selecting the container for puzzle pieces.
const puzzlePieceDiv7 = document.querySelector(".puzzle-pieces");
let draggedPiece;

console.log(theButtons);
console.log(puzzleBoard);

//functions

function changeBGImage(event) {
    console.log("changeBGimage called");
    
    console.log(event.currentTarget.id);
    puzzleBoard.style.backgroundImage = `url('./images/backGround${event.currentTarget.id}.jpg')`;
    const puzzleId = event.currentTarget.id; // i add this code for the id to the clicked thumbnail, so we know which puzzle to show once clicked.

   // change the puzzle to match the background thumbnail  clicked 
   puzzlePieces.forEach((piece, index)=> {
    piece.src = `./images/puzzle${puzzleId}_piece${index + 1}.jpg`;
   });

   // adding the pieceNames and forEach  go through each puzzle piece and update on the image source based on the position and the thumbnail clicked
   const pieceNames = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
     puzzlePieces.forEach((piece, index) => {
     piece.src = `./images/${pieceNames[index]}${puzzleId}.jpg`; });
}

function handleStartDrag() {
    console.log(`started dragging ${this}`);
    draggedPiece = this;
}

function handleOver(e) {
    e.preventDefault();
    console.log("Dragged Over");
}

function handleDrop(e) {
    e.preventDefault();
    console.log("Dropped")

//// here is the fix for the drop of the piece that already been dropped,cannot have another piece to drop in the same place//
if(this.children.length > 0) {
    console.log("Drop zone occupied");
    return;
}

    this.appendChild(draggedPiece);
}

//eventListeners

theButtons.forEach(button =>  button.addEventListener("click", changeBGImage));

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));