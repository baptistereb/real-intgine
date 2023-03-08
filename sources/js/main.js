var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(0, 0, 0)
SetCameraAngle(5, 5, 5)
SetDisplay(300, 300, 300)


document.addEventListener("keydown",keyPush);
setInterval(mainloop,1000/60);

i=0
function mainloop() {
	i = i+1
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
	DrawPyramide([10,2,10], [2, 5, 1], [50, 0, 0],[30,50,5], "blue", "red", "pink", "black") 
	//DrawTriangle([10, 2, 10], [2, 5, 1],[50,0,0], "red");
	console.log( camera_angle);
	console.log( camera);
	console.log ( display);
	DrawSquare([10, 40, 0], [10, 42, 0], [10, 42, 2], [10, 40, 2], "blue")
	DrawSquare([12, 40, 0], [12, 42, 0], [12, 42, 2], [12, 40, 2], "green")
	DrawSquare([10, 40, 0], [12, 40, 0], [12, 40, 2], [10, 40, 2], "red")
	DrawSquare([10, 42, 0], [12, 42, 0], [12, 42, 2], [10, 42, 2], "yellow")
	DrawSquare([12, 40, 0], [10, 40, 0], [10, 40, 2], [12, 40, 2], "orange")
	DrawSquare([12, 42, 0], [10, 42, 0], [10, 42, 2], [12, 42, 2], "pink")
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37: // <-
        	camera_angle.x = camera_angle.x - 0.05
            break;
        case 38: // haut
        	camera_angle.y = camera_angle.y + 0.05
            break;
        case 39: // ->
        	camera_angle.x = camera_angle.x + 0.05
            break;
        case 40: // bas
        	camera_angle.y = camera_angle.y - 0.05
            break;
        case 90: // z
        	camera_angle.z = camera_angle.z + 0.01
            break;
        case 65: // a
        	camera_angle.z = camera_angle.z - 0.01
            break;

        case 81: // q
        	camera.x = camera.x - 10
            break;
        case 83: // s
        	camera.x = camera.x + 10
            break;
        case 68: // d
        	camera.y = camera.y - 10
            break;
        case 70: // f
        	camera.y = camera.y + 10
            break;
        case 71: // g
        	camera.z = camera.z - 10
            break;
        case 72: // h
        	camera.z = camera.z + 10
            break;
     

        case 87: // w
        	display.x = display.x - 5
            break;
        case 88: // x
        	display.x = display.x + 5
            break;
        case 67: // c
        	display.y = display.y - 5
            break;
        case 86: // v
        	display.y = display.y + 5
            break;
        case 66: // b
        	display.z = display.z - 5
            break;
        case 78: // n
        	display.z = display.z + 5
            break;
    }
}