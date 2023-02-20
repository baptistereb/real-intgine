
//a point à transfo
function TransformedPoint(ax, ay, az) {
	cx = Math.cos(camera_angle.x)
	cy = Math.cos(camera_angle.y)
	cz = Math.cos(camera_angle.z)
	sx = Math.sin(camera_angle.x)
	sy = Math.sin(camera_angle.y)
	sz = Math.sin(camera_angle.z)
	dx = cy*(sz*(ay-cy)+cz*(ax-cx))-sy*(az-cz)
	dy = sx*(cy*(az-cz)+sy*(sz*(ay-cy)+cz*(ax-cx)))+cx*(cz*(ay-cy)-sz*(ax-cx))
	dz = cx*(cy*(az-cz)+sy*(sz*(ay-cy)+cz*(ax-cx)))-sx*(cz*(ay-cy)-sz*(ax-cx))

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