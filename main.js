$ = (x) => { return document.getElementById(x + ""); }


let width = 16;
let height = 16;
let scale = 32;

let ctx = $("canvas").getContext("2d");

let pixels;

let tick = 1;
function reload() {
    $('log').innerHTML = "";
    ctx.clearRect(0, 0, width, height);
    let i = 1;
    try {
        for (var x = 0; x < pixels.length; x++) {
            for (var y = 0; y < pixels[x].length; y++) {
                updateBasicCode(x, y, i);
                let res = runCode();
                pixels[x][y] = res;
                drawPixel(x, y, res.r, res.g, res.b, res.a);
                i += 1;
            }
        }
    } catch (error) {
        $('log').innerHTML += error + "\n";
    }

}

let basicCode;
function updateBasicCode(x, y, i) {
    basicCode = `
let pixel = {r:"0", g:"0", b:"0", a:"255"};
const t = ${tick};
const x = ${x};
const y = ${y};
const i = ${i};
const w = ${width};
const h = ${height};
const mx = ${mouseX-0.5};
const my = ${mouseY-0.5};
const md = ${mouseDown};
`
}
function runCode() {
    var script = $("code").value;
    var evalValue = (new Function(basicCode + script)());
    return evalValue;
}

function drawPixel(x, y, r, g, b, a) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    ctx.fillRect(x, y, 1, 1);
}

function updateSize(w, h, s) {
    if (w == undefined || w == null || w == "") {
        updateSize($('width').value, $('height').value, $('scale').value);
        return;
    }
    $("canvas").width = w * s;
    $("canvas").height = h * s;
    ctx.scale(s, s);

    width = Number(w);
    height = Number(h);
    scale = Number(s);

    pixels = new Array(width);
    for (var i = 0; i < pixels.length; i++) {
        pixels[i] = new Array(height);
    }
}

updateSize(width, height, scale);

let animationI;

function startAnimation(fps) {
    animationI = setInterval(function () {
        reload();
        tick++;
    }, 1000 / fps)
}

function stopAnimation() {
    clearInterval(animationI);
}

function setTick(val) {
    tick = val;
}

let mouseX;
let mouseY;

function updateMousePos(e) {
    let rect = $('canvas').getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    mouseX = minMax(mouseX, 0, width*scale);
    mouseY = minMax(mouseY, 0, height*scale);
    mouseX = mouseX/scale;
    mouseY = mouseY/scale;
    
}

function minMax(v, min, max) {
    if (v < min) {
        return min;
    }
    if (v > max) {
        return max;
    }
    return v;
}

function updateMouseDown(y){
    mouseDown = y;
}