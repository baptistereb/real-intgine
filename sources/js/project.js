
//s point a transfo
function TransformedPoint(sx, sy, sz) {
	cx = camera.x
	cy = camera.y
	cz = camera.z
	ax = ecran.x
	ay = ecran.y
	az = ecran.z
	dx = cy*(sz*(ay-cy)+cz*(ax-cx))-sy*(az-cz)
	dy = sx*(cy*(az-cz)+sy*(sz*(ay-cy)+cz*(ax-cx)))+cx*(cz*(ay-cy)-sz*(ax-cx))
	dz = cx*(cy*(az-cz)+sy*(sz*(ay-cy)+cz*(ax-cx)))-sx*(cz*(ay-cy)-sz*(ax-cx))

	return [dx, dy, dz]
}

function JustProjectPoint(dx, dy, dz) {
	ex = base.x
	ey = base.y
	ez = base.z
	return [ez*dx/dz+ex, ez*dy/dz+ey]
}

function Project(x, y, z) {
	tp = TransformedPoint(x, y, z)
	return JustProjectPoint(tp[0], tp[1], tp[2])
}