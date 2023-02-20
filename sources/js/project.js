
//a point à transfo
function TransformedPoint(ax, ay, az) {
	cx = Math.cos(camera_angle.x)
	cy = Math.cos(camera_angle.y)
	cz = Math.cos(camera_angle.z)
	sx = Math.sin(camera_angle.x)
	sy = Math.sin(camera_angle.y)
	sz = Math.sin(camera_angle.z)
	camx = camera.x
	camy = camera.y
	camz = camera.z
	dx = cy*(sz*(ay-camy)+cz*(ax-camx))-sy*(az-camz)
	dy = sx*(cy*(az-camz)+sy*(sz*(ay-camy)+cz*(ax-camx)))+cx*(cz*(ay-camy)-sz*(ax-camx))
	dz = cx*(cy*(az-camz)+sy*(sz*(ay-camy)+cz*(ax-camx)))-sx*(cz*(ay-camy)-sz*(ax-camx))

	return [dx, dy, dz]
}

function JustProjectPoint(dx, dy, dz) {
	ex = display.x
	ey = display.y
	ez = display.z
	return [ez*dx/dz+ex, ez*dy/dz+ey]
}

function Project(x, y, z) {
	tp = TransformedPoint(x, y, z)
	return JustProjectPoint(tp[0], tp[1], tp[2])
}