var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(0, 0, 0)
SetCameraAngle(5, 5, 5)
SetDisplay(300, 300, 300)


document.addEventListener("keydown",keyPush);
setInterval(mainloop,20);

i=0
function mainloop() {
	i = i+1
	SetCamera(0, 0, i)
	DrawTriangle([10, 2, 10], [2, 5, 1], [50, 0, 0], "red")
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            alert("ok")
            break;
    }
}