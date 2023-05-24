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

	console.log(faces)
	
	return faces
}