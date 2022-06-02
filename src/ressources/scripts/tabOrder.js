var tabResponse;
var taborder = Object.values(JSON.parse(localStorage.getItem("TAB")));

//!hmax 32767px
if(state === "off") {
    document.getElementById('tngtaborder').remove();
    tabResponse = "off";
} else if(document.documentElement.scrollHeight > 32767) {
    tabResponse = "error";
} else {
    let canvas = document.createElement('canvas');
    canvas.id = 'tngtaborder';
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 99999999;
    canvas.style.pointerEvents = "none";
    canvas.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.font = '18px Candara';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for(let i = 0; i < taborder.length; i++) {
        let e = taborder[i];
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y)
        ctx.lineTo(e.b.x, e.b.y);
        ctx.stroke();
    }

    for(let i = 0; i < taborder.length; i++) {
        let e = taborder[i];
        ctx.beginPath();
        ctx.fillStyle = e.a.error ? '#d90b0b' : '#000';
        let size = 18+((i+1).toString().length > 3 ? (i+1).toString().length * 3 : 0);
        ctx.arc(e.a.x, e.a.y, size, 0, 2 * Math.PI);
        ctx.fill();

        if(i === taborder.length-1) {
            ctx.beginPath();
            ctx.fillStyle = e.b.error ? '#d90b0b' :'#000';
            let size = 18+((i+2).toString().length > 3 ? (i+1).toString().length * 3 : 0);
            ctx.arc(e.b.x, e.b.y, size, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.fillText(i+1, e.a.x, e.a.y);

        if(i === taborder.length-1) {
            ctx.fillText(i+2, e.b.x, e.b.y);
        }
    }

    tabResponse = "on";
}

tabResponse;