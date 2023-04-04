var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(0, 0, 0)
SetCameraAngle(1.4, 0, 2)
SetDisplay(300, 300, 300)

    
document.addEventListener("keydown",keyPush);
setInterval(mainloop,1000/60);

i=0
function mainloop() {
	i = i+1
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	/*DrawPyramide([10,2,10], [2, 5, 1], [50, 0, 0],[30,50,5], "blue", "red", "pink", "black") 

	DrawSquare([10, 40, 0], [10, 42, 0], [10, 42, 2], [10, 40, 2], "blue")
	DrawSquare([12, 40, 0], [12, 42, 0], [12, 42, 2], [12, 40, 2], "green")
	DrawSquare([10, 40, 0], [12, 40, 0], [12, 40, 2], [10, 40, 2], "red")
	DrawSquare([10, 42, 0], [12, 42, 0], [12, 42, 2], [10, 42, 2], "yellow")
	DrawSquare([12, 40, 0], [10, 40, 0], [10, 40, 2], [12, 40, 2], "orange")
	DrawSquare([12, 42, 0], [10, 42, 0], [10, 42, 2], [12, 42, 2], "pink")
*/

    col = ["blue", "blue", "yellow", "yellow", "brown", "brown", "#FF00EC", "#FF00EC", "#587B4C", "#587B4C", "#EE8D00", "#EE8D00"]
    if(typeof usermap != "undefined") {
        for(let i = 0; i < usermap[1].length; i++) {
            DrawTriangle([usermap[0][usermap[1][i][1]-1][1], usermap[0][usermap[1][i][1]-1][2], usermap[0][usermap[1][i][1]-1][3]],
                        [usermap[0][usermap[1][i][2]-1][1], usermap[0][usermap[1][i][2]-1][2], usermap[0][usermap[1][i][2]-1][3]],
                        [usermap[0][usermap[1][i][3]-1][1], usermap[0][usermap[1][i][3]-1][2], usermap[0][usermap[1][i][3]-1][3]], col[i])
        }
    }
    
    if (camera_angle.x > 3.14) {
        camera_angle.x = 3.14
    }
    if (camera_angle.x<0) {
        camera_angle.x=0
    }
    //console.log(camera_angle)
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 40: // bas
        	camera_angle.x = camera_angle.x - 0.05
            break;
        case 38: // haut
        	camera_angle.x = camera_angle.x + 0.05
            break;
        case 39: // droite
        	camera_angle.z = camera_angle.z + 0.05
            break;
        case 37: // gauche
        	camera_angle.z = camera_angle.z - 0.05
            break;
        
        //  angle phi dans les angles d'Euler
        /*case 90: // z
            camera_angle.y = camera_angle.y + 0.05
            break;
        case 65: // a
            camera_angle.y = camera_angle.y - 0.05
            break;*/ 


        case 81: // q
        	camera.x = camera.x - 1
            break;
        case 83: // s
        	camera.x = camera.x + 1
            break;
        case 68: // d
        	camera.y = camera.y - 1
            break;
        case 70: // f
        	camera.y = camera.y + 1
            break;
        case 71: // g
        	camera.z = camera.z - 1
            break;
        case 72: // h
        	camera.z = camera.z + 1
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