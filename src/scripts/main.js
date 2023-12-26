let screenSize = {
    width: 1280,
    height: 720
}

let star = {
    posX:null,
    posY:null,
    speedX:null,
    speedY:null,
    direction: null,
    speed: null,
}

const myCanvas = document.getElementById("screen");
myCanvas.setAttribute("height", `${screenSize.height}`)
myCanvas.setAttribute("width", `${screenSize.width}`)
let context = myCanvas.getContext("2d");
let minParticleSpeed = 0.5;

const maxParticles = 50;
var particles = [];
let sPart = 0;
let starParticles = [];

function mapedStars(star){
    starParticles.push({
        pX: star.posX,
        pY: star.posY,
        speedX: star.speedX,
        speedY: star.speedY,
        direction: star.direction
    });
}

function createParticleSystem() {
    for(let index = 0; index < maxParticles; index++) {
        star.posX = screenSize.width / 2;
        star.posY = screenSize.height / 2;
        star.direction = Math.floor(Math.random() * 360);
        star.speed = minParticleSpeed + Math.floor(Math.random() * 10);
        star.speedX = Math.cos(star.direction) * star.speed;
        star.speedY = Math.sin(star.direction) * star.speed;
        [star].map(mapedStars);
    }
}

createParticleSystem();

function clearScreen(){
    context.fillStyle = "black";
    context.fillRect(0, 0, screenSize.width, screenSize.height);
}

function starShape(x, y){
    context.font = "12px sans-serif";
    context.fillStyle = "white";
    context.fillText("⭐", x, y);
    
}

function drawStars() {
    for(let i = 0; i < maxParticles; i++){
        sPart = starParticles[i];

        sPart.pX += sPart.speedX;
        sPart.pY += sPart.speedY;

        if(sPart.pY > screenSize.height)
            sPart.speedY *= -1;

        if(sPart.pY < 24)
            sPart.speedY *= -1;

         if(sPart.pX > screenSize.width - 12) 
            sPart.speedX *= -1;

        if(sPart.pX < 12)
            sPart.speedX *= -1;
        
        starShape(starParticles[i].pX, starParticles[i].pY);
    }
}

function play(){
    clearScreen();
    drawStars();
}

gamePlay = setInterval(play, 30);