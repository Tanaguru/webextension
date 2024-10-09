var tabResponse;
chrome.storage.local.get(["TAB"]).then((result) => {
var taborder = Object.values(JSON.parse(result.TAB));
var tngTabOrderElement = document.getElementById('tngtaborder');

//!hmax 32767px
if(window.state === "off") {
    if (tngTabOrderElement) {
        tngTabOrderElement.remove();
        tabResponse = "off";
    }
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

    var invisible = false;
    var lastCoord = null;

    for(let i = 0; i < taborder.length; i++) {
        let e = taborder[i];

        if(i === 0 && !e.a.visible && !e.b.visible) {
            invisible = true;
            lastCoord = e.a;
        }
        else if(invisible && !e.b.visible) continue;
        else if(invisible && e.b.visible) {
            ctx.beginPath();
            ctx.moveTo(lastCoord.x, lastCoord.y);
            ctx.lineTo(e.b.x, e.b.y);
            ctx.stroke();

            invisible = false;
            lastCoord = null;
        } 
        else {
            ctx.beginPath();
            ctx.moveTo(e.a.x, e.a.y);
            ctx.lineTo(e.b.x, e.b.y);
            ctx.stroke();

            if(!e.b.visible) {
                invisible = true;
                lastCoord = e.b;
            }
        }
    }

    var invisible2 = false;

    for(let i = 0; i < taborder.length; i++) {
        let e = taborder[i];

        if(e.a.visible) {
            ctx.beginPath();
            ctx.fillStyle = e.a.error ? '#d90b0b' : '#000';
            let size = 18+((i+1).toString().length > 3 ? (i+1).toString().length * 3 : 0);
            ctx.arc(e.a.x+size, e.a.y, size, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.fillText(i+1, e.a.x+size, e.a.y);

            invisible2 = false;
        } 
        else if(!e.a.visible && !invisible2) {
            ctx.beginPath();
            ctx.fillStyle = '#055a7f';
            let size = 18;
            ctx.arc(e.a.x+size, e.a.y, size, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.fillText(i+1, e.a.x+size, e.a.y);

            invisible2 = true;
        }

        if(i === taborder.length-1 && !(invisible2 && !e.b.visible)) {
            ctx.beginPath();
            ctx.fillStyle = e.b.visible ? (e.b.error ? '#d90b0b' : '#000') : '#055a7f';
            let size = 18+((i+2).toString().length > 3 ? (i+1).toString().length * 3 : 0);
            ctx.arc(e.b.x+size, e.b.y, size, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.fillText(i+2, e.b.x+size, e.b.y);
        }
    }

    tabResponse = "on";
}
})
.catch((error) => {
    console.error("Erreur lors de la récupération des données depuis le stockage local : ", error);
});

tabResponse;