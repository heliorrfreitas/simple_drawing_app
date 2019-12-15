
let isDrawing = false;
let x = 0;
let y = 0;
let pencilColor = "black";
let previousSelectedButtonId = "black";
let eraserSize = 10;

const buttonSelectedClass = "button-selected";
const canvas = document.getElementById('panelCanvas');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
const minimumEraserSize = 10;

drawEmptyPanel();

canvas.addEventListener('mousedown', e => {
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  isDrawing = true;
});

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawEmptyPanel(){
    context.beginPath();
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
}

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  if(pencilColor === "white"){
      context.rect(x1, y1, eraserSize, eraserSize);
      context.fillStyle = "#FFFFFF";
      context.fill();
  }else{
      context.strokeStyle = pencilColor;
      context.lineWidth = 2;
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
  }

  context.closePath();
}

function selectColor(color, buttonId){
    pencilColor = color;
    unselectPreviousColor();
    selectCurrentColor(buttonId);
}

function unselectPreviousColor(){
    let previousSelectedButton = document.getElementById(previousSelectedButtonId);
    previousSelectedButton.classList.remove(buttonSelectedClass)
}

function selectCurrentColor(buttonId){
    let button = document.getElementById(buttonId);
    button.className += " " +buttonSelectedClass;
    previousSelectedButtonId = buttonId;
}

function increaseEraserSize(){
    eraserSize += 5;
}

function decreaseEraserSize(){
    if(eraserSize > minimumEraserSize){
        eraserSize -= 5;
    }
}

function downloadImage(){
    let link = document.getElementById("download-button");
    link.href = canvas.toDataURL();
    link.download = "my-art.png";

    return link;
}
