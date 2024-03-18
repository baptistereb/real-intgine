var fov = 1200

var triangle_list = []

var camera = {
	x: 0,
	y: 0,
	z: 0
}

var camera_angle = {
	x: 0, //phi sphérique (angle bas-haut)
	y: 0, //  angle phi dans les angles d'Euler => laisser constant à 0
	z: 0  //theta sphérique (angle droite gauche)
}

var display = {
	x: 0,
	y: 0,
	z: 0
}

function SetCamera(x, y, z) {
	camera.x = x
	camera.y = y
	camera.z = z
}

function SetCameraAngle(x, y, z) {
	camera_angle.x = x
	camera_angle.y = y
	camera_angle.z = z
}

function NewDisplay() {
	display.x = fov*Math.cos(camera_angle.x)*Math.cos(camera_angle.y)
	display.y = fov*Math.cos(camera_angle.x)*Math.sin(camera_angle.y)
	display.z = fov*Math.sin(camera_angle.x)
}

var colormap = "#FF0000"
var colorinput = "#00FF00"

var date = new Date().getTime()
var timer = 0
var nb_iter=10 //nb de frame pour calculer les fps




//multiplication de 2 matrices
function multMatrix(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

//produit scalaire 
function dotProduct(u, v) {
  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
}


//Norme
function vectorLength(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}


// produit vectoriel en dimension 3
function crossProduct(u, v) {
  const x = u[1] * v[2] - u[2] * v[1];
  const y = u[2] * v[0] - u[0] * v[2];
  const z = u[0] * v[1] - u[1] * v[0];
  return [x, y, z];
}


// retourne le vecteur normal au triangle
function TriangleToNormal(som1,som2,som3) {
  const u = [
    som2[0] - som1[0],
    som2[1] - som1[1],
    som2[2] - som1[2],
  ];

  const v = [
    som3[0] - som1[0],
    som3[1] - som1[1],
    som3[2] - som1[2],
  ];

  const normal = crossProduct(u, v);

  return normal;
}

//normalise un vecteur
function Normalise(u){
  return [u[0]/vectorLength(u), u[1]/vectorLength(u), u[2]/vectorLength(u)]
}

function strToMatrix(str) {
    str = str.replace(/[^0-9.\s\r\nvf]/g, "");
    matrix = str.split("\n").map(line => line.split(" "))
    v = []
    f = []
    for(let i=5; i<matrix.length; i++) {        //les 6 première lignes c'est des métadonné on s'en fiche
        if(matrix[i][0] == 'f' || matrix[i][0] == 'v') {
            matrix[i][3] = matrix[i][3]//.slice(0, -1) //.slice(0, -1) à décommenter sous windows
            if(matrix[i][0] == 'v') {
                v.push(matrix[i])
            } else {
                f.push(matrix[i])
            }
        }
    }

    var v = v.map(function(row) {
      return row.map(function(value) {
        return parseFloat(value, 10);
      });
    });
    var f = f.map(function(row) {
      return row.map(function(value) {
        return parseInt(value, 10);
      });
    });
    v.forEach(function(face){ //symétrie car sinon la projection inverse certaines mesures
      face[1] = (-1)*face[1]
      face[3] = (-1)*face[3]
    });

    return [v, f]
}

document.getElementById('inputFile').addEventListener('change', function() {
var file = new FileReader();
file.onload = () => {
  //console.log(file.result)
    usermap = strToMatrix(file.result)
  console.log(usermap)
}
file.readAsText(this.files[0])
});



//a point à transfo
function TransformedPoint(ax, ay, az) {
	cx = Math.cos(camera_angle.x)
	cy = Math.cos(camera_angle.y)
	cz = Math.cos(camera_angle.z)
	sx = Math.sin(camera_angle.x)
	sy = Math.sin(camera_angle.y)
	sz = Math.sin(camera_angle.z)
	mat1 = [
		[1, 0, 0],
		[0, cx, sx],
		[0, (-1)*sx, cx]
	]
	/*mat2 = [
		[cy, 0, (-1)*sy],
		[0, 1, 0],
		[sy, 0, cy]
	]*/
	mat3 = [
		[cz, sz, 0],
		[(-1)*sz, cz, 0],
		[0, 0, 1]
	]
	vect = [[ax-camera.x, 0, 0],
		[ay-camera.y, 0, 0],
		[az-camera.z, 0, 0]
	]

	//d = multMatrix(multMatrix(multMatrix(mat1, mat2), mat3), vect)
	d = multMatrix(multMatrix(mat1, mat3), vect)
	
	vectd = [d[0][0], d[1][0], d[2][0]] 

	return vectd
}

function JustProjectPoint(dx, dy, dz) {
	ex = display.x
	ey = display.y
	ez = display.z
	return [ez*dx/dz+ex, ez*dy/dz+ey]
}

function Project(x, y, z) {
	tp = TransformedPoint(x, y, z)
	visible_point = true
	if(tp[2]<0) {
		visible_point = false
	}
	projection = JustProjectPoint(tp[0], tp[1], tp[2])
	return [projection[0], projection[1], visible_point]
}

function DrawTriangle(co1, co2, co3, color) {
	ctx.fillStyle = color//"transparent"
	ctx.stokeStyle = "black"
    ctx.lineWidth   = 1;
	point1 = Project(co1[0], co1[1], co1[2])
	point2 = Project(co2[0], co2[1], co2[2])
	point3 = Project(co3[0], co3[1], co3[2])

	if(point1[2] && point2[2] && point3[2]) {
		ctx.beginPath();
		ctx.moveTo(point1[0], point1[1]);
		ctx.lineTo(point2[0], point2[1]);
		ctx.lineTo(point3[0], point3[1]);
		ctx.lineTo(point1[0], point1[1]);
		ctx.stroke()
		ctx.fill();
		ctx.closePath();
	}
}

function centerOfTriangle(p1, p2, p3) {
	return [
		(p1[0]+p2[0]+p3[0])/3,
		(p1[1]+p2[1]+p3[1])/3,
		(p1[2]+p2[2]+p3[2])/3
	]
}

function centerOfSquare(p1, p2, p3, p4) {
	return [
		(p1[0]+p2[0]+p3[0]+p4[0])/4,
		(p1[1]+p2[1]+p3[1]+p4[1])/4,
		(p1[2]+p2[2]+p3[2]+p4[2])/4
	]
}

function distanceFromCamera(co1, co2, co3) {
	center = centerOfTriangle(co1, co2, co3)
	return Math.sqrt(Math.pow(center[0]-camera.x, 2)+Math.pow(center[1]-camera.y, 2)+Math.pow(center[2]-camera.z, 2))
}

function faceOrder (faces) {
	//partie du calcul de la distance entre la caméra et la faces
	faces.forEach(function(face){
	  face[4] = distanceFromCamera(face[0],face[1],face[2])
	});

	faces.sort(function(a, b) {
	  return b[4] - a[4];
	});

	r = []

	faces.forEach(function(face){
	  r.push(face)
	});

	return r
}

function AddTriangle(co1, co2, co3, color) {
	triangle_list.push([co1, co2, co3, color, 0])	//on ajoute une face à la liste des faces à afficher
}													//le 0 correspond a la distance qui sera ensuite modifié

function DrawAllTriangle() {
	triangle_list = faceOrder(triangle_list)
	while((face = triangle_list.shift()) !== undefined) {
		DrawTriangle(face[0],face[1],face[2],face[3])	//on draw la face retiré
	}
}

// Variables pour stocker les coordonnées précédentes de la souris
var previousX = null;
var previousY = null;

var mouseeventon = false;

document.addEventListener("keydown",keyPush);
document.addEventListener("keyup",ReloadKey);

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("wheel", handleMouseZoom);

document.getElementById('colorinput1').addEventListener('change', function(e) {
	document.querySelectorAll("p").forEach((p) => {
		colormap = e.target.value;
		document.getElementById("coloroutput1").textContent = e.target.value;
	});
});
document.getElementById('colorinput2').addEventListener('change', function(e) {
	document.querySelectorAll("p").forEach((p) => {
		colorinput = e.target.value;
		document.getElementById("coloroutput2").textContent = e.target.value;
	});
});

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


setInterval(function () {document.getElementById("fps").textContent = timer;}, 500);
	
function ReloadInformation() {
	document.getElementById("camerax").textContent = (-1)*Math.round(camera.x*100)/100;
	document.getElementById("cameray").textContent = (-1)*Math.round(camera.y*100)/100;
	document.getElementById("cameraz").textContent = (-1)*Math.round(camera.z*100)/100;
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
	SetCameraAngle(1.42, 0, 3.68)
	fov=1200
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
	SetCameraAngle(1.08, 0, 2.76)
	fov=1200
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
	SetCameraAngle(1.39, 0, 2.36)
	fov=1200
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
	SetCamera(-12, -292, -245)
	SetCameraAngle(1.44, 0, -3.2)
	fov=1200
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
	SetCamera(-9, -37, -105)
	SetCameraAngle(1.35, 0, -3.15)
	fov=1200
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

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(-27, -18, -72)
SetCameraAngle(1.16, 0, 2.61)
fov = 1200

setInterval(mainloop); //setInterval(mainloop, 1000/60);

i=0
function mainloop() {
    NewDisplay()
    ReloadInformation()
    
    if(typeof usermap != "undefined") {
        for(let i = 0; i < usermap[1].length; i++) {
            offsetX = 0
            offsetY = 0
            offsetZ = 0
            AddTriangle([offsetX+usermap[0][usermap[1][i][1]-1][1], offsetY+usermap[0][usermap[1][i][1]-1][2], offsetZ+usermap[0][usermap[1][i][1]-1][3]],
                        [offsetX+usermap[0][usermap[1][i][2]-1][1], offsetY+usermap[0][usermap[1][i][2]-1][2], offsetZ+usermap[0][usermap[1][i][2]-1][3]],
                        [offsetX+usermap[0][usermap[1][i][3]-1][1], offsetY+usermap[0][usermap[1][i][3]-1][2], offsetZ+usermap[0][usermap[1][i][3]-1][3]], colorinput)
        }
    }
    if(chargedmap.length > 0) {
        for(let i = 0; i < chargedmap[1].length; i++) {
            offsetX = 0
            offsetY = 0
            offsetZ = 0
            AddTriangle([offsetX+chargedmap[0][chargedmap[1][i][1]-1][1], offsetY+chargedmap[0][chargedmap[1][i][1]-1][2], offsetZ+chargedmap[0][chargedmap[1][i][1]-1][3]],
                        [offsetX+chargedmap[0][chargedmap[1][i][2]-1][1], offsetY+chargedmap[0][chargedmap[1][i][2]-1][2], offsetZ+chargedmap[0][chargedmap[1][i][2]-1][3]],
                        [offsetX+chargedmap[0][chargedmap[1][i][3]-1][1], offsetY+chargedmap[0][chargedmap[1][i][3]-1][2], offsetZ+chargedmap[0][chargedmap[1][i][3]-1][3]], colormap)
        }
    }

    document.getElementById("nb_face").textContent = triangle_list.length;


    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    DrawAllTriangle() // on Draw toutes les faces qu'on a ajouté à la liste

    if (camera_angle.x > 3.14) {
        camera_angle.x = 3.14
    }
    if (camera_angle.x<0) {
        camera_angle.x=0
    }

    i++
    if(i==nb_iter) {
        timer = Math.round(nb_iter*1000/(new Date().getTime() - date))
        date = new Date().getTime()
        i=0
    }
}