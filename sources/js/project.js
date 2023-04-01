
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
	mat2 = [
		[cy, 0, (-1)*sy],
		[0, 1, 0],
		[sy, 0, cy]
	]
	mat3 = [
		[cz, sz, 0],
		[(-1)*sz, cx, 0],
		[0, 0, 1]
	]
	vect = [[ax-camera.x, 0, 0],
		[ay-camera.y, 0, 0],
		[az-camera.z, 0, 0]
	]

	d = multMatrix(multMatrix(multMatrix(mat1, mat2), mat3), vect)
	
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