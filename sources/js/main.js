// Variables pour stocker les coordonnées précédentes de la souris
var previousX = null;
var previousY = null;

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(0, 0, 0)
SetCameraAngle(1.4, 0, 2)
    
document.addEventListener("keydown",keyPush);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("wheel", handleMouseZoom);

setInterval(mainloop); //setInterval(mainloop, 1000/60);



function mainloop() {
    NewDisplay()
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

	//AddPyramide([10,2,10], [2, 5, 1], [50, 0, 0],[30,50,5], "blue", "red", "pink", "black") 

	/*AddSquare([10, 40, 0], [10, 42, 0], [10, 42, 2], [10, 40, 2], "blue")
	AddSquare([12, 40, 0], [12, 42, 0], [12, 42, 2], [12, 40, 2], "green")
	AddSquare([10, 40, 0], [12, 40, 0], [12, 40, 2], [10, 40, 2], "red")
	AddSquare([10, 42, 0], [12, 42, 0], [12, 42, 2], [10, 42, 2], "blue")
	AddSquare([12, 40, 0], [10, 40, 0], [10, 40, 2], [12, 40, 2], "orange")
    AddSquare([12, 42, 0], [10, 42, 0], [10, 42, 2], [12, 42, 2], "pink")*/

    AddSquare([10, 40, 0], [10, 42, 0], [12, 42, 0], [12, 40, 0], "blue")
    AddSquare([10, 40, 2], [10, 42, 2], [12, 42, 2], [12, 40, 2], "blue")
    AddSquare([10, 40, 0], [12, 40, 0], [12, 40, 2], [10, 40, 2], "red")
    AddSquare([10, 42, 0], [12, 42, 0], [12, 42, 2], [10, 42, 2], "red")
    AddSquare([10, 40, 0], [10, 42, 0], [10, 42, 2], [10, 40, 2], "orange")
    AddSquare([12, 40, 0], [12, 42, 0], [12, 42, 2], [12, 40, 2], "orange")



    //AddSquare([1000, 1000, 0], [1000, 0, 0], [0, 0, 0], [0, 1000, 0], "green")
    

    col = ["blue", "blue", "yellow", "yellow", "brown", "brown", "#FF00EC", "#FF00EC", "#587B4C", "#587B4C", "#EE8D00", "#EE8D00"]
    if(typeof usermap != "undefined") {
        for(let i = 0; i < usermap[1].length; i++) {
            offsetX = 0
            offsetY = 0
            offsetZ = 0
            AddTriangle([offsetX+usermap[0][usermap[1][i][1]-1][1], offsetY+usermap[0][usermap[1][i][1]-1][2], offsetZ+usermap[0][usermap[1][i][1]-1][3]],
                        [offsetX+usermap[0][usermap[1][i][2]-1][1], offsetY+usermap[0][usermap[1][i][2]-1][2], offsetZ+usermap[0][usermap[1][i][2]-1][3]],
                        [offsetX+usermap[0][usermap[1][i][3]-1][1], offsetY+usermap[0][usermap[1][i][3]-1][2], offsetZ+usermap[0][usermap[1][i][3]-1][3]], col[i])
        }
    }
    
    console.log(triangle_list)
    DrawAllTriangle() // on Draw toutes les faces qu'on a ajouté à la liste

    if (camera_angle.x > 3.14) {
        camera_angle.x = 3.14
    }
    if (camera_angle.x<0) {
        camera_angle.x=0
    }
}


function handleMouseMove(event) {
  // Vérifier si les coordonnées précédentes existent
  if (previousX !== null && previousY !== null) {
    // Calculer le delta horizontal et vertical
    var deltaX = event.clientX - previousX;
    var deltaY = event.clientY - previousY;
    
    // Utiliser les valeurs de deltaX et deltaY à des fins quelconques
    camera_angle.x = camera_angle.x - deltaY*0.002
    camera_angle.z = camera_angle.z + deltaX*0.002
  }
  
  // Mettre à jour les coordonnées précédentes avec les coordonnées actuelles
  previousX = event.clientX;
  previousY = event.clientY;
}

function handleMouseZoom(event) {
  // Vérifier si le déplacement de la souris est un zoom
  if (event.deltaY < 0) {
    // Zoom in (approche)
    fov = fov - event.deltaY*0.1;
  } else {
    // Zoom out (éloignement)
    fov = fov - event.deltaY*0.1;
  }
  console.log(fov)
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


        case 81 : // q
        	camera.x = camera.x - 1
            break;
        case 68: // d
        	camera.x = camera.x + 1
            break;
        case 69: // e
        	camera.y = camera.y - 1
            break;
        case 65: // a
        	camera.y = camera.y + 1
            break;
        case 83: // s
        	camera.z = camera.z - 1
            break;
        case 90: // z
        	camera.z = camera.z + 1
            break;
     

        /*case 81: // q
        	display.x = display.x - 5
            break;
        case 68: // d
        	display.x = display.x + 5
            break;
        case 69: // e
        	display.y = display.y - 5
            break;
        case 65: // a
        	display.y = display.y + 5
            break;
        case 83: // s
        	display.z = display.z - 5
            break;
        case 90: // z
        	display.z = display.z + 5
            break;*/
    }
}