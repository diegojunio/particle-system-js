let frameSize = {
    width: 1280,
    height: 600
}

let particle = {
    posX:null,
    posY:null,
    speedX:null,
    speedY:null,
    direction: null,
    speed: null,
}

const myCanvas = document.createElement("canvas");
myCanvas.setAttribute("id", "screen");
myCanvas.setAttribute("height", `${frameSize.height}`)
myCanvas.setAttribute("width", `${frameSize.width}`)
document.body.appendChild(myCanvas);

let context = myCanvas.getContext("2d");
let minParticleSpeed = 5;

const maxParticles = 20;
var particles = [];
let sPart = 0;
let starParticles = [];

function mapedParticles(star){
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
        particle.posX = frameSize.width / 2;
        particle.posY = frameSize.height / 2;
        particle.direction = Math.floor(Math.random() * 360);
        particle.speed = minParticleSpeed + Math.floor(Math.random() * 10);
        particle.speedX = Math.cos(particle.direction)  * particle.speed;
        particle.speedY = Math.sin(particle.direction) * particle.speed;
        [particle].map(mapedParticles);
    }
}

function clearScreen(){
    context.fillStyle = "black";
    context.fillRect(0, 0, frameSize.width, frameSize.height);
}

function starShape(x, y){
    context.font = "12px sans-serif";
    context.fillStyle = "white";
    context.fillText("⭐", x, y);
}
//var gravity = 0;
function drawStars() {
    for(let i = 0; i < maxParticles; i++){
  //      gravity += 0.005;
        sPart = starParticles[i];

        if(sPart.pY > frameSize.height)
            sPart.speedY *= -1;

        if(sPart.pY < 0)
            sPart.speedY *= -1;

         if(sPart.pX > frameSize.width) 
            sPart.speedX *= -1;

        if(sPart.pX < 0)
            sPart.speedX *= -1;

        //sPart.speedY += gravity;

        sPart.pX += sPart.speedX;
        sPart.pY += sPart.speedY;
        
        starShape(starParticles[i].pX, starParticles[i].pY);
    }
}

createParticleSystem();

function play(){
    clearScreen();
    drawStars();
}

gamePlay = setInterval(play, 30);