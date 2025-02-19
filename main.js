$ = (x) => { return document.getElementById(x + ""); }


let pixels = new Array(width);
for (var i = 0; i < pixels.length; i++) {
    pixels[i] = new Array(height);
}

let tick = 1;
function reload() {
    progress = 0;
    for (var x = 0; x < pixels.length; x++) {
        for (var y = 0; y < pixels[x].length; y++) {
            updateBasicCode(x, y);
            let res = runCode();
            pixels[x][y] = res;
        }
    }
    render();
    tick++;
}

let basicCode;
function updateBasicCode(x, y) {
    basicCode = `
let pixel = {r:"0", g:"0", b:"0", a:"255"};
const t = ${tick};
const x = ${x};
const y = ${y};
const i = ${0};
const w = ${width};
const h = ${height};
`
}
function runCode() {
    var script = $("code").value;
    var evalValue = (new Function(basicCode + script)());
    return evalValue;
}

let ctx = $("canvas").getContext("2d");
ctx.scale(scale, scale);

function drawPixel(x, y, r, g, b, a) {
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    ctx.fillRect(x, y, 1, 1);
}

function render() {
    ctx.clearRect(0, 0, width, height);

    for (var x = 0; x < pixels.length; x++) {
        for (var y = 0; y < pixels[x].length; y++) {
            let p = pixels[x][y];
            drawPixel(x, y, p.r, p.g, p.b, p.a);
        }
    }
}


let width = 32;
let height = 32;
let scale = 16;
updateSize(width, height, scale);

function updateSize(w, h, s) {
    if(w == undefined || w == null || w == ""){
        updateSize($('width').value, $('height').value, $('scale').value);
        return;
    }
    $("canvas").width = w * s;
    $("canvas").height = h * s;
    width = w;
    height = h;
    scale = s;
}