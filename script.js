var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var circles = [];

var colorValues = ['#06bdff', '#ff050a', '#0514ff', '#b8ff05', '#fc6042',
                   '#42fcf6', '#7d42fc', '#a57cff', '#fbb3c4', '#b1e9fa',
                   '#145c73', '#731517', '#155773', '#4a1573', '#2f8773'];


// Create a 1000 circles and add them to the array 'circles'
for (var i = 0; i < 1000; i++) {
    circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        rad: Math.random() * 20 + 1,
        color: getRandomColor(),
        speed: Math.random() * 2 + 1,
        burstTimer: Math.random() * 1000
    });
}

animateCircles();
console.log(circles);

function animateCircles() {
    // Clear the canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each circle and update its properties
    circles.forEach(function(circle) {
        drawCircle(circle);

        // Update burst timer and radius
        circle.burstTimer--;
        if (circle.burstTimer <= 0) {
            circle.rad = Math.random() * 20 + 1;
            circle.burstTimer = Math.random() * 1000;
        }

    circle.rad = updateRadius(circle.rad, circle.speed);
    });

    // Request the next animation frame
    requestAnimationFrame(animateCircles);
}

function drawCircle(circle) {
    c.beginPath();
    c.arc(circle.x, circle.y, circle.rad, 0, Math.PI * 2);
    c.fillStyle = circle.color;
    c.fill();
}

function updateRadius(currentRadius, speed) {
    // Adjust these values for the desired animation speed and size range
    var minRadius = 1;
    var maxRadius = 200;

    // Calculate the new radius
    var newRadius = currentRadius + speed;

    // If the radius exceeds the maximum, reset to the minimum
    if (newRadius > maxRadius) {
        newRadius = minRadius;
    }

    return newRadius;
}

function getRandomColor() {
    // Generate a random hex color code
    return colorValues[Math.floor(Math.random() * 15)];
}
