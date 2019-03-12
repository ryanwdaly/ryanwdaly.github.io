// window.onload = function () {
//     Barba.Pjax.start();
// }
const navSlide = () => {
    const navMobile = document.querySelector('.nav-mobile');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    navMobile.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('nav-active');

        //Animate Links
        navLinks.forEach((link, index)=>{
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`; //Use of backticks!!!!
            }
        });

        //navMobile animation
        navMobile.classList.toggle('toggle')
    });
}

const textToParticles = () => {
    var canvas = document.querySelector("#scene"),
        ctx = canvas.getContext("2d"),
        particles = [],
        amount = 0,
        mouse = { x: 0, y: 0 },
        radius = 1;

    // var colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];

    var ww = canvas.width = window.innerWidth;
    var wh = canvas.height = window.innerHeight;

    function Particle(x, y) {
        this.x = Math.random() * ww;
        this.y = Math.random() * wh;
        this.dest = {
            x: x,
            y: y
        };
        this.r = Math.random() * 0.5 + 1; //size
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 20;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random() * 0.005 + 0.94;

        this.color = "#FFFFFF"
    }

    Particle.prototype.render = function () {


        this.accX = (this.dest.x - this.x) / 1000;
        this.accY = (this.dest.y - this.y) / 1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);

        ctx.fill();

        var a = this.x - mouse.x;
        var b = this.y - mouse.y;

        var distance = Math.sqrt(a * a + b * b);
        if (distance < (radius * 70)) {
            this.accX = (this.x - mouse.x) / 100;
            this.accY = (this.y - mouse.y) / 100;
            this.vx += this.accX;
            this.vy += this.accY;
        }

    }

    function onMouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }

    function onTouchEnd(e) {
        mouse.x = -9999;
        mouse.y = -9999;
    }

    function initScene() {
        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold " + (ww / 10) + "px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Ryan W Daly", ww / 2, wh / 2);

        var data = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];
        for (var i = 0; i < ww; i += Math.round(ww / 500)) {
            for (var j = 0; j < wh; j += Math.round(ww / 500)) {
                if (data[((i + j * ww) * 4) + 3] > 150) {
                    particles.push(new Particle(i, j));
                }
            }
        }
        amount = particles.length;

    }

    function onMouseClick() {
        radius++;
        if (radius === 5) {
            radius = 0;
        }
    }

    function render(a) {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < amount; i++) {
            particles[i].render();
        }
    };


    window.addEventListener("resize", initScene);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("touchend", onTouchEnd);
    initScene();
    requestAnimationFrame(render);
}

// const loadStars = () => {
//     var obj = document.getElementById("particles-js");
//     obj.style.position = "fixed";
//     obj.style.top = 50;
//     obj.style.left = 0;
// }



const draw = () => {
    var canvas = document.getElementById("scene");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillSyle = "#000000";
    ctx.color = "#000000";
    ctx.textAlign = center;
    ctx.fillText("Fullstack Developer", 10, 50);
}


textToParticles();
// loadStars();
navSlide();
draw();
//Use this style to keep it cleaner
// const app = () =>{
//     navSlide();
//      ..etc();
// }


