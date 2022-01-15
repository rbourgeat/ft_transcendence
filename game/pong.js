//tutoriel : https://www.youtube.com/watch?v=nl0KXCa5pJk

//select canvas 
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
//Premiere barre laterale

//context.fillStyle = "BLACK";
//context.fillRect(100, 200, 50, 75);


//Draw function
function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

//drawRect(0, 0, canvas.width, canvas.height, "BLACK");

/* Draw circle // ball */
function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

//drawCircle(100, 100, 50, "WHITE");

/* */
function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "75px fantasy";
    context.fillText(text, x, y);
}
//drawText("Something", 300, 200, "PINK");

/*  */
let rectX = 0;
function render() {
    drawRect(0, 0, 600, 400, "black");
    drawRect(rectX, 0, 600, 400, "black");
    rectX = rectX + 10;
}

//setInterval(render, 1000);

//premier joueur
const user1 = {
    x: 0,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0

}
//deuxieme joueur ou computer
const user2 = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 100 / 2,
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
    x: canvas.width / 2 - 2 / 2,
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
    speed: 5,
    //velocity = speed + direction
    velocityX: 5,
    velocityY: 5,
}

//Remet la balle au milieu
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    //depending on who won
    ball.velocityX = - ball.velocityX;
}

function update() {
    //update du sens de la balle 
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //if hits top of bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    //colission with paddle
    let player = (ball.x < canvas.width / 2) ? user1 : user2;
    /*
    if (collision(ball, player)) {
        //change depending on the velocity
        let collidePoint = ball.y - (player.y + player.height / 2);
        //normalize
        let a = collidePoint / player.height / 2;
        let angleRad = (Math.PI / 4 * a);

        //the game will gard harder
        ball.speed += 0.1;
        //la direction differe en fonction de si c est le joueur 1 ou joueur 2 qui a touché la balle
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * cos(angleRad);
        ball.velocityY = direction * ball.speed * sin(angleRad);
    console.log('colission !');
}
    */
}
/*
//changer la direction si on a trouve un bord





//update du score
if (ball.x - ball.radius < 0) {
    user2.score++;
    resetBall();
}
else if (ball.x + ball.radius > canvas.width) {
    user1.score++;
    resetBall();
}
*/

function movePaddle(evt) {
    //everytime the mouse moves
    //useful if you scroll
    let rect = canvas.getBoundingClientRect();//returns the x and y posititons among others

    user.y = evt.clientY - rect.top;
}

//If you want to play against a computer
//let computerLevel = 0.1;
//computerLevel.x += (ball.y - (com.y + com.height / 2) * computerLevel);

//control the user's paddle
canvas.addEventListener("mousemove", movePaddle);

//collision detection 
/* 
function collision(ball, player) {
    player.top = player.y;
    player.bottom = player.y + height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top;
}
*/

//Draw the ball
//drawCircle(ball.x, ball.y, ball.radius, ball.color);

//Draw the score
//drawText(user1.score, canvas.width / 4, canvas.height / 5, "WHITE");
//drawText(user2.score, canvas.width / 4, canvas.height / 5, "WHITE");

function render() {
    //clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    //draw score
    drawText(user1.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(user2.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");
    drawNet();
    drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
    drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
    // update();
}

const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);
//game();