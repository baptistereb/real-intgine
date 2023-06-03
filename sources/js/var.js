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