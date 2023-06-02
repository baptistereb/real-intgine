// Variables pour stocker les coordonnées précédentes de la souris
var previousX = null;
var previousY = null;

var mouseeventon = false;

document.addEventListener("keydown",keyPush);
document.addEventListener("keyup",ReloadKey);

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("wheel", handleMouseZoom);

function handleMouseMove(event) {
	if(mouseeventon) {
		// Vérifier si les coordonnées précédentes existent
		if (previousX !== null && previousY !== null) {
			// Calculer le delta horizontal et vertical
			var deltaX = event.clientX - previousX;
			var deltaY = event.clientY - previousY;

			// Utiliser les valeurs de deltaX et deltaY à des fins quelconques
			camera_angle.x = camera_angle.x - deltaY*0.002
			camera_angle.z = camera_angle.z + deltaX*0.002
		}
	}

	// Mettre à jour les coordonnées précédentes avec les coordonnées actuelles
	previousX = event.clientX;
	previousY = event.clientY;
}

function handleMouseZoom(event) {
	if(mouseeventon) {
		// Vérifier si le déplacement de la souris est un zoom
		if (event.deltaY < 0) {
			// Zoom in (approche)
			fov = fov - event.deltaY*0.1;
		} else {
			// Zoom out (éloignement)
			fov = fov - event.deltaY*0.1;
		}
	}
}

function keyPush(evt) {
	ReloadKey(evt)
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


        case 68 : // d
        	camera.x = camera.x - 1
            break;
        case 81: // q
        	camera.x = camera.x + 1
            break;
        case 69: // e
        	camera.y = camera.y - 1
            break;
        case 65: // a
        	camera.y = camera.y + 1
            break;
        case 90: // z
        	camera.z = camera.z - 1
            break;
        case 83: // s
        	camera.z = camera.z + 1
            break;
    }
}

function ReloadKey(k) {
	if(k.type == "keyup") {
		switch(k.keyCode) {
	        case 68 : // d
	        	document.getElementById("d").style.color = "white";
	            break;
	        case 81: // q
	        	document.getElementById("q").style.color = "white";
	            break;
	        case 69: // e
	        	document.getElementById("e").style.color = "white";
	            break;
	        case 65: // a
	        	document.getElementById("a").style.color = "white";
	            break;
	        case 90: // z
	        	document.getElementById("z").style.color = "white";
	            break;
	        case 83: // s
	        	document.getElementById("s").style.color = "white";
	            break;
	    }
	} else {
		switch(k.keyCode) {
	        case 68 : // d
	        	document.getElementById("d").style.color = "#00ADB5";
	            break;
	        case 81: // q
	        	document.getElementById("q").style.color = "#00ADB5";
	            break;
	        case 69: // e
	        	document.getElementById("e").style.color = "#00ADB5";
	            break;
	        case 65: // a
	        	document.getElementById("a").style.color = "#00ADB5";
	            break;
	        case 90: // z
	        	document.getElementById("z").style.color = "#00ADB5";
	            break;
	        case 83: // s
	        	document.getElementById("s").style.color = "#00ADB5";
	            break;
	    }
	}
}


function ReloadInformation() {
	document.getElementById("camerax").textContent = Math.round(camera.x*100)/100;
	document.getElementById("cameray").textContent = Math.round(camera.y*100)/100;
	document.getElementById("cameraz").textContent = Math.round(camera.z*100)/100;
	document.getElementById("camera_anglex").textContent = Math.round(camera_angle.x*100)/100;
	document.getElementById("camera_angley").textContent = Math.round(camera_angle.y*100)/100;
	document.getElementById("camera_anglez").textContent = Math.round(camera_angle.z*100)/100;
	document.getElementById("fov").textContent = Math.round(fov*100)/100;
	if (document.getElementById("mouseevent").checked === true) {
	    mouseeventon = true
	} else {
		mouseeventon = false
	}
}

var chargedmap = []


document.getElementById('button1').onclick = function() {
	SetCamera(31, -25, -34)
	SetCameraAngle(1.68, 0, 3.38)
	fov=400
	fetch('map/map1.smf')
		.then(response => response.text())
		.then(data => {
			chargedmap = strToMatrix(data)
			//console.log(chargedmap);
			})
		.catch(error => {
			console.error('Une erreur s\'est produite :', error);
			alert("Une erreur s\'est produite");
		});
}
document.getElementById('button2').onclick = function() {
	SetCamera(-24, -20, -31)
	SetCameraAngle(1.26, 0, 2.25)
	fov=400
	fetch('map/map2.smf')
		.then(response => response.text())
		.then(data => {
			chargedmap = strToMatrix(data)
			//console.log(chargedmap);
			})
		.catch(error => {
			console.error('Une erreur s\'est produite :', error);
			alert("Une erreur s\'est produite");
		});
};
document.getElementById('button3').onclick = function() {
	SetCamera(-17, -23, -18)
	SetCameraAngle(1.47, 0, 1.81)
	fov=400
	fetch('map/map3.smf')
		.then(response => response.text())
		.then(data => {
			chargedmap = strToMatrix(data)
			//console.log(chargedmap);
			})
		.catch(error => {
			console.error('Une erreur s\'est produite :', error);
			alert("Une erreur s\'est produite");
		});
};
document.getElementById('button4').onclick = function() {
	SetCamera(-12, -174, -194)
	SetCameraAngle(1.65, 0, -3.41)
	fov=400
	fetch('map/map4.smf')
		.then(response => response.text())
		.then(data => {
			chargedmap = strToMatrix(data)
			//console.log(chargedmap);
			})
		.catch(error => {
			console.error('Une erreur s\'est produite :', error);
			alert("Une erreur s\'est produite");
		});
};
document.getElementById('button5').onclick = function() {
	SetCamera(16, 90, -101)
	SetCameraAngle(1.15, 0, -2.9)
	fov=660
	fetch('map/map5.smf')
		.then(response => response.text())
		.then(data => {
			chargedmap = strToMatrix(data)
			//console.log(chargedmap);
			})
		.catch(error => {
			console.error('Une erreur s\'est produite :', error);
			alert("Une erreur s\'est produite");
		});
};