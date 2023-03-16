var camera = {
	x: 0,
	y: 0,
	z: 0
}

var camera_angle = {
	x: 0,
	y: 0,
	z: 0
}

var display = {
	x: 0,
	y: 0,
	z: 0
}

var base = {
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

function SetDisplay(x, y, z) {
	display.x = x
	display.y = y
	display.z = z
}

function NewDisplay (dis, ang){
	base.x = dis[0]* Math.cos(ang[0])
	base.y = dis[1]* Math.cos(ang[1])
	base.z = dis[2]* Math.cos(ang[2]) 

}