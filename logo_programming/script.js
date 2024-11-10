const canvas = document.getElementById('logoCanvas');
const ctx = canvas.getContext('2d');

// Initial turtle position and angle (facing upwards)
let x = canvas.width / 2;
let y = canvas.height / 2;
let angle = -90; // Start at -90 degrees so that 0 degrees points upwards
let penDown = true; // Tracks if the pen is down (drawing mode)
let turtleVisible = true; // Tracks if the turtle is visible

// Function to clear the canvas and redraw the turtle
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (turtleVisible) {
        drawTurtle();
    }
}

// Function to draw the turtle as a triangle pointing in the direction of movement
function drawTurtle() {
    const size = 10; // Size of the turtle
    const radians = (Math.PI / 180) * angle;

    ctx.beginPath();
    ctx.moveTo(
        x + size * Math.cos(radians),
        y + size * Math.sin(radians)
    );
    ctx.lineTo(
        x + size * Math.cos(radians + (2 * Math.PI) / 3),
        y + size * Math.sin(radians + (2 * Math.PI) / 3)
    );
    ctx.lineTo(
        x + size * Math.cos(radians - (2 * Math.PI) / 3),
        y + size * Math.sin(radians - (2 * Math.PI) / 3)
    );
    ctx.closePath();
    ctx.fillStyle = 'green';
    ctx.fill();
}

// Function to move the turtle forward or backward
function move(distance) {
    const radians = (Math.PI / 180) * angle;
    const newX = x + distance * Math.cos(radians);
    const newY = y + distance * Math.sin(radians);

    if (penDown) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(newX, newY);
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    x = newX;
    y = newY;
    redraw();
}

// Function to turn the turtle right
function right(degrees) {
    angle += degrees;
    redraw();
}

// Function to turn the turtle left
function left(degrees) {
    angle -= degrees;
    redraw();
}

// Function to move the turtle to specific coordinates
function setXY(newX, newY) {
    x = newX;
    y = newY;
    redraw();
}

// Function to clean the canvas while keeping the turtle position
function clean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTurtle();
}

// Function to clear the screen and reset the turtle
function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = canvas.width / 2;
    y = canvas.height / 2;
    angle = -90; // Reset to face upwards
    drawTurtle();
}

// Function to bring the turtle back to the center (home)
function home() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    redraw();
}

// Function to run commands sequentially
function runCommands() {
    const commands = document.getElementById('commands').value.split('\n');
    let commandIndex = 0;

    function runNextCommand() {
        if (commandIndex >= commands.length) return;

        const parts = commands[commandIndex].trim().split(' ');
        const cmd = parts[0].toUpperCase();
        const value = parseFloat(parts[1]);

        switch (cmd) {
            case 'FD':
                move(value);
                break;
            case 'BK':
                move(-value);
                break;
            case 'SETXY':
                const newX = parseFloat(parts[1]);
                const newY = parseFloat(parts[2]);
                setXY(newX, newY);
                break;
            case 'CLEAN':
                clean();
                break;
            case 'CS':
            case 'CLEARSCREEN':
                clearScreen();
                break;
            case 'HOME':
                home();
                break;
            case 'RT':
                right(value);
                break;
            case 'LT':
                left(value);
                break;
            case 'PU':
                penDown = false;
                break;
            case 'PD':
                penDown = true;
                break;
            case 'HT':
                turtleVisible = false;
                redraw();
                break;
            case 'ST':
                turtleVisible = true;
                redraw();
                break;
            case 'BYE':
                clearScreen();
                return; // Stop processing further commands
            default:
                alert(`Unknown command: ${cmd}`);
                break;
        }

        commandIndex++;
        setTimeout(runNextCommand, 500); // Run the next command after a small delay for better visualization
    }

    runNextCommand();
}
