class RealIntgine {
    constructor(idCanvas) {
		this.fov = 1200
		this.triangle_list = []
		this.camera = {
			x: -27,
			y: -18,
			z: -72
		}
		this.camera_angle = {
			x: 1.16, //phi sphérique (angle bas-haut)
			y: 0, //  angle phi dans les angles d'Euler => laisser constant à 0
			z: 2.61  //theta sphérique (angle droite gauche)
		}
		this.display = {
			x: 0,
			y: 0,
			z: 0
		}
		this.triangle_list_length = 0 //nombre de faces
		this.colormap = "#FF0000"
		this.bgcolor = "white"
		this.fps = 0 //nombre de fps
		this.step = 2 //vitesse de deplacement sur la scene


		this.date = new Date().getTime()
		this.nb_iter=10 //nb de frame pour calculer les fps

		// Variables pour stocker les coordonnées précédentes de la souris
		this.previousX = null;
		this.previousY = null;

		// variable à true si on record les mouvements de la souris, false sinon
		this.mouseeventon = false;

		document.addEventListener("keydown",this.keyPush.bind(this));
		document.addEventListener("mousemove", this.handleMouseMove.bind(this));
		document.addEventListener("wheel", this.handleMouseZoom.bind(this));

		this.canvas = document.getElementById(idCanvas);
		this.ctx = this.canvas.getContext("2d");

		setInterval(this.mainloop.bind(this)); //setInterval(mainloop, 1000/60);

		this.i=0
		this.objets=[]
    }

    ChargerMap(html_id, camerax, cameray, cameraz, anglex, angley, anglez, fov, path_to_smf) {
    	document.getElementById(html_id).onclick = function() {
			this.SetCamera(camerax, cameray, cameraz)
			this.SetCameraAngle(anglex, angley, anglez)
			this.fov=fov
			fetch(path_to_smf)
				.then(response => response.text())
				.then(data => {
					//console.log(data)
					this.usermap = this.strToMatrix(data)
					//console.log(this.usermap);
					})
				.catch(error => {
					console.error('Une erreur s\'est produite :', error);
					alert("Une erreur s\'est produite");
				});
		}.bind(this)
    }

    AjouterObjet(path_to_smf, x, y, z, color) {
		fetch(path_to_smf)
			.then(response => response.text())
			.then(data => {
				this.objets.push([this.strToMatrix(data), -x, -y, -z, color])
				})
			.catch(error => {
				console.error('Une erreur s\'est produite :', error);
				alert("Une erreur s\'est produite");
			});
    }

    ChargerMapWithInput(html_id) {
    	const self = this; // Stockez une référence à "this" dans une variable "self"
		document.getElementById(html_id).addEventListener('change', function() {
		    let file = new FileReader();
		    file.onload = () => {
		        //console.log(file.result);
		        self.usermap = self.strToMatrix(file.result);
		        //console.log(self.usermap);
		    };
		    file.readAsText(this.files[0]); // Utilisez "this" ici pour accéder à l'élément DOM
		});
    }

	SetCamera(x, y, z) {
		this.camera.x = -x
		this.camera.y = -y
		this.camera.z = -z
	}

	SetCameraAngle(x, y, z) {
		this.camera_angle.x = x
		this.camera_angle.y = y
		this.camera_angle.z = z
	}

	NewDisplay() {
		this.display.x = this.fov*Math.cos(this.camera_angle.x)*Math.cos(this.camera_angle.y)
		this.display.y = this.fov*Math.cos(this.camera_angle.x)*Math.sin(this.camera_angle.y)
		this.display.z = this.fov*Math.sin(this.camera_angle.x)
	}

	//multiplication de 2 matrices
	multMatrix(m1, m2) {
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
	dotProduct(u, v) {
	  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
	}

	//Norme
	vectorLength(v) {
	  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	}

	// produit vectoriel en dimension 3
	crossProduct(u, v) {
	  const x = u[1] * v[2] - u[2] * v[1];
	  const y = u[2] * v[0] - u[0] * v[2];
	  const z = u[0] * v[1] - u[1] * v[0];
	  return [x, y, z];
	}

	// retourne le vecteur normal au triangle
	TriangleToNormal(som1,som2,som3) {
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
	Normalise(u){
	  return [u[0]/vectorLength(u), u[1]/vectorLength(u), u[2]/vectorLength(u)]
	}

	strToMatrix(str) {
	    str = str.replace(/[^0-9.\s\r\nvf]/g, "");
	    let matrix = str.split("\n").map(line => line.split(" "))
	    let v = []
	    let f = []
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

	    v = v.map(function(row) {
	      return row.map(function(value) {
	        return parseFloat(value, 10);
	      });
	    });
	    f = f.map(function(row) {
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

	//a point à transfo
	TransformedPoint(ax, ay, az) {
		let cx = Math.cos(this.camera_angle.x)
		let cy = Math.cos(this.camera_angle.y)
		let cz = Math.cos(this.camera_angle.z)
		let sx = Math.sin(this.camera_angle.x)
		let sy = Math.sin(this.camera_angle.y)
		let sz = Math.sin(this.camera_angle.z)

		/*let mat1 = [
			[1, 0, 0],
			[0, cx, sx],
			[0, (-1)*sx, cx]
		]
		//let mat2 = [
		//	[cy, 0, (-1)*sy],
		//	[0, 1, 0],
		//	[sy, 0, cy]
		//]
		let mat3 = [
			[cz, sz, 0],
			[(-1)*sz, cz, 0],
			[0, 0, 1]
		]
		let vect = [[ax-this.camera.x, 0, 0],
			[ay-this.camera.y, 0, 0],
			[az-this.camera.z, 0, 0]
		]
		let d = this.multMatrix(this.multMatrix(mat1, mat3), vect)
		let vectd = [d[0][0], d[1][0], d[2][0]]*/

		let vectd=[
			(ax-this.camera.x)*cz+(ay-this.camera.y)*sz,
			(-1)*cx*sz*(ax-this.camera.x) + cx*cz*(ay-this.camera.y) + sx*(az-this.camera.z),
			sx*sz*(ax-this.camera.x) - cz*sx*(ay-this.camera.y) + cx*(az-this.camera.z)
		]

		return vectd
	}

	JustProjectPoint(dx, dy, dz) {
		let ex = this.display.x
		let ey = this.display.y
		let ez = this.display.z
		return [ez*dx/dz+ex, ez*dy/dz+ey]
	}

	Project(x, y, z) {
		let tp = this.TransformedPoint(x, y, z)
		let visible_point = true
		if(tp[2]<0) {
			visible_point = false
		}
		let projection = this.JustProjectPoint(tp[0], tp[1], tp[2])
		return [projection[0], projection[1], visible_point]
	}

	DrawTriangle(co1, co2, co3, color, stroke) {
		this.ctx.fillStyle = color//"transparent"
		this.ctx.strokeStyle = "black"
    	this.ctx.lineWidth = 1;
		let point1 = this.Project(co1[0], co1[1], co1[2])
		let point2 = this.Project(co2[0], co2[1], co2[2])
		let point3 = this.Project(co3[0], co3[1], co3[2])

		//console.log(point1, point2, point3)

		if(point1[2] && point2[2] && point3[2]) {
			this.ctx.beginPath();
			this.ctx.moveTo(point1[0], point1[1]);
			this.ctx.lineTo(point2[0], point2[1]);
			this.ctx.lineTo(point3[0], point3[1]);
			this.ctx.lineTo(point1[0], point1[1]);
			this.ctx.closePath();
			if(stroke) {
				this.ctx.stroke()
	    	}
			this.ctx.fill();
		}
	}

	centerOfTriangle(p1, p2, p3) {
		return [
			(p1[0]+p2[0]+p3[0])/3,
			(p1[1]+p2[1]+p3[1])/3,
			(p1[2]+p2[2]+p3[2])/3
		]
	}

	centerOfSquare(p1, p2, p3, p4) {
		return [
			(p1[0]+p2[0]+p3[0]+p4[0])/4,
			(p1[1]+p2[1]+p3[1]+p4[1])/4,
			(p1[2]+p2[2]+p3[2]+p4[2])/4
		]
	}

	distanceFromCamera(co1, co2, co3) {
		let center = this.centerOfTriangle(co1, co2, co3)
		return Math.sqrt(Math.pow(center[0]-this.camera.x, 2)+Math.pow(center[1]-this.camera.y, 2)+Math.pow(center[2]-this.camera.z, 2))
	}

	faceOrder (faces) {
		//partie du calcul de la distance entre la caméra et la faces
		faces.forEach(function(face){
		  face[4] = this.distanceFromCamera(face[0],face[1],face[2])
		}.bind(this));

		faces.sort(function(a, b) {
		  return b[4] - a[4];
		});

		let r = []

		faces.forEach(function(face){
		  r.push(face)
		});

		return r
	}

	AddTriangle(co1, co2, co3, color, stroke) {
		this.triangle_list.push([co1, co2, co3, color, 0, stroke])	//on ajoute une face à la liste des faces à afficher
	}													//le 0 correspond a la distance qui sera ensuite modifié

	DrawAllTriangle() {
		this.triangle_list = this.faceOrder(this.triangle_list)
		let face
		while((face = this.triangle_list.shift()) !== undefined) {
			this.DrawTriangle(face[0],face[1],face[2],face[3], face[5])	//on draw la face retiré
		}
	}

	handleMouseMove(event) {
		if(this.mouseeventon) {
			// Vérifier si les coordonnées précédentes existent
			if (this.previousX !== null && this.previousY !== null) {
				// Calculer le delta horizontal et vertical
				var deltaX = event.clientX - this.previousX;
				var deltaY = event.clientY - this.previousY;

				// Utiliser les valeurs de deltaX et deltaY à des fins quelconques
				this.camera_angle.x = this.camera_angle.x - deltaY*0.002
				this.camera_angle.z = this.camera_angle.z + deltaX*0.002
			}
		}

		// Mettre à jour les coordonnées précédentes avec les coordonnées actuelles
		this.previousX = event.clientX;
		this.previousY = event.clientY;
	}

	handleMouseZoom(event) {
		if(this.mouseeventon) {
			// Vérifier si le déplacement de la souris est un zoom
			if (event.deltaY < 0) {
				// Zoom in (approche)
				this.fov = this.fov - event.deltaY*0.1;
			} else {
				// Zoom out (éloignement)
				this.fov = this.fov - event.deltaY*0.1;
			}
		}
	}

	keyPush(evt) {
		if(typeof this.keycode == 'undefined') {
			//descendre, monter, avancer, gauche, reculer, droite
			this.keycode=[69,65,90,81,83,68] // e a z q s d
		}
	    switch(evt.keyCode) {
	        case this.keycode[0]: // descendre
	        	this.camera.z = this.camera.z + 1
	            break;
	        case this.keycode[1]: // monter
	        	this.camera.z = this.camera.z - 1
	            break;

	        case this.keycode[2]: // avancer
	        	this.camera.x = this.camera.x + this.step*Math.sin(this.camera_angle.z)
	        	this.camera.y = this.camera.y - this.step*Math.cos(this.camera_angle.z)
	            break;
	        case this.keycode[3]: // gauche
	        	this.camera.x = this.camera.x - this.step*Math.cos(this.camera_angle.z)
	        	this.camera.y = this.camera.y - this.step*Math.sin(this.camera_angle.z)
	            break;
	        case this.keycode[4]: // reculer
	        	this.camera.x = this.camera.x - this.step*Math.sin(this.camera_angle.z)
	        	this.camera.y = this.camera.y + this.step*Math.cos(this.camera_angle.z)
	            break;
	        case this.keycode[5]: // droite
	        	this.camera.x = this.camera.x + this.step*Math.cos(this.camera_angle.z)
	        	this.camera.y = this.camera.y + this.step*Math.sin(this.camera_angle.z)
	            break;
	    }
	}

	mainloop() {
	    this.NewDisplay()
	    
	    if(typeof this.usermap != "undefined") {
	        for(let i = 0; i < this.usermap[1].length; i++) {
	            let offsetX = 0
	            let offsetY = 0
	            let offsetZ = 0
	            this.AddTriangle([offsetX+this.usermap[0][this.usermap[1][i][1]-1][1], offsetY+this.usermap[0][this.usermap[1][i][1]-1][2], offsetZ+this.usermap[0][this.usermap[1][i][1]-1][3]],
	                        [offsetX+this.usermap[0][this.usermap[1][i][2]-1][1], offsetY+this.usermap[0][this.usermap[1][i][2]-1][2], offsetZ+this.usermap[0][this.usermap[1][i][2]-1][3]],
	                        [offsetX+this.usermap[0][this.usermap[1][i][3]-1][1], offsetY+this.usermap[0][this.usermap[1][i][3]-1][2], offsetZ+this.usermap[0][this.usermap[1][i][3]-1][3]], this.colormap, true)
	        }
	    }

	    this.objets.forEach((e) => {
	    	let data = e[0]
	    	let x = e[1]
	    	let y = e[2]
	    	let z = e[3]
	    	let color = e[4]
	    	for(let i = 0; i < data[1].length; i++) {
	            this.AddTriangle([x+data[0][data[1][i][1]-1][1], y+data[0][data[1][i][1]-1][2], z+data[0][data[1][i][1]-1][3]],
	                        [x+data[0][data[1][i][2]-1][1], y+data[0][data[1][i][2]-1][2], z+data[0][data[1][i][2]-1][3]],
	                        [x+data[0][data[1][i][3]-1][1], y+data[0][data[1][i][3]-1][2], z+data[0][data[1][i][3]-1][3]], color, true)
	        }
	    })

	    // permet de stocker le nombre de faces pour l'affichage car les faces sont supprimés avec le DrawAllTriangle
	    this.triangle_list_length = this.triangle_list.length

	    this.ctx.fillStyle=this.bgcolor;
	    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);


	    if(this.main_loop != undefined) {
	    	this.main_loop(this)
	    }


	    this.DrawAllTriangle() // on Draw toutes les faces qu'on a ajouté à la liste

	    if (this.camera_angle.x > 3.14) {
	        this.camera_angle.x = 3.14
	    }
	    if (this.camera_angle.x<0) {
	        this.camera_angle.x=0
	    }

	    this.i++
	    if(this.i==this.nb_iter) {
	        this.fps = Math.round(this.nb_iter*1000/(new Date().getTime() - this.date))
	        this.date = new Date().getTime()
	        this.i=0
	    }
	}
}
