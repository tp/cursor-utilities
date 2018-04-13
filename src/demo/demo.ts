import * as cursorHelpers from "../index";

const canvas = document.createElement(`canvas`);
canvas.width = 64;
canvas.height = 64;
const ctx = canvas.getContext(`2d`)!;

{
    // draw dynamic cursor / badge
    ctx.fillStyle = `#f00`;
    
    ctx.beginPath();
    ctx.arc(32,32,30,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle = `#fff`;
    ctx.font = `32px sans-serif`;
    ctx.textAlign = `alphabetic`;
    ctx.fillText(`3`, 23, 42);
}

document.body.appendChild(canvas);

canvas.style.cursor = `url(${cursorHelpers.pngObjectURLFromCanvas(canvas)}) 32 32, pointer`;

const icoDiv = document.createElement(`div`);
icoDiv.style.width = `100px`;
icoDiv.style.height = `100px`;
icoDiv.style.backgroundColor = `#00f`;
icoDiv.style.cursor = `url(${cursorHelpers.curObjectURLFromCanvas(canvas, { x: 32, y: 32 })}), pointer`;

document.body.appendChild(icoDiv);