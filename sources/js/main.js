var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(0, 0, 0)
SetCameraAngle(5, 5, 5)
SetDisplay(300, 300, 300)


document.addEventListener("keydown",keyPush);
setInterval(mainloop,1000/15);

i=0
function mainloop() {
	i = i+1
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	SetCamera(0, 0, 0)
	DrawTriangle([10, 2, 10], [2, 5, 1], [50, 0, 0], "red")
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37: // <-
        	camera_angle.x = camera_angle.x - 1
            break;
        case 38: // haut
        	camera_angle.y = camera_angle.y + 1
            break;
        case 39: // ->
        	camera_angle.x = camera_angle.x + 1
            break;
        case 40: // bas
        	camera_angle.y = camera_angle.y - 1
            break;
    }
}