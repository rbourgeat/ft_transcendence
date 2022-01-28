//tutoriel : https://www.youtube.com/watch?v=nl0KXCa5pJk

//select canvas 
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

//load sounds
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

//hit.src = "sounds/hit.mp3";
//wall.src = "sounds/wall.mp3";
//comScore.src = "sounds/comScore.mp3";
//userScore.src = "sounds/userScore.mp3";

//Draw function
function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

//drawRect(0, 0, canvas.width, canvas.height, "BLACK");

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

//drawCircle(100, 100, 50, "WHITE");

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "75px fantasy";
    context.fillText(text, x, y);
}
//drawText("Something", 300, 200, "PINK");

let rectX = 0;
function render() {
    drawRect(0, 0, 600, 400, "BLACK");
    drawRect(rectX, 0, 600, 400, "BLACK");
    rectX = rectX + 10;
}

//setInterval(render, 1000);

//premier joueur
const user1 = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

//deuxieme joueur ou computer
const user2 = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

//Draw paddle
//drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
//drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

//Create the net 
const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE",
}

//la balle doit etre au milieu
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: "WHITE",
    speed: 7,
    //velocity = speed + direction
    velocityX: 5,
    velocityY: 5,
}

//Remet la balle au milieu
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    //depending on who won
    ball.velocityX = - ball.velocityX;
}

function movePaddle(evt) {
    //everytime the mouse moves
    //useful if you scroll
    let rect = canvas.getBoundingClientRect();//returns the x and y posititons among others
    //let player = player = (ball.x < canvas.width / 2) ? user1 : user2;
    user1.y = evt.clientY - rect.top;
}


canvas.addEventListener("mousemove", movePaddle);

function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();

    user1.y = evt.clientY - rect.top - user1.height / 2;
}

//collision detection 
function collision(ball, player) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}

let computerLevel = 0.1;

function update() {

    // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    if (ball.x - ball.radius < 0) {
        user2.score++;
        //comScore.play();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user1.score++;
        //userScore.play();
        resetBall();
    }

    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // computer plays for itself, and we must be able to beat it
    // simple AI
    user2.y += ((ball.y - (user2.y + user2.height / 2))) * computerLevel;

    // when the ball collides with bottom and top walls we inverse the y velocity.
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
        //wall.play();
    }

    // we check if the paddle hit the user or the com paddle
    let player = (ball.x + ball.radius < canvas.width / 2) ? user1 : user2;

    // if the ball hits a paddle
    if (collision(ball, player)) {
        // play sound
        //hit.play();
        // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height / 2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height / 2);

        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI / 4) * collidePoint;

        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.1;
    }
}

function render() {
    //clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    //draw score
    drawText(user1.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(user2.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");
    drawNet();
    drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
    drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
}

const framePerSecond = 50;
let loop = setInterval(game, 1000 / framePerSecond);