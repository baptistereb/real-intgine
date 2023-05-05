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

function faceOrder (faces) {
	faces.sort((a, b) => a[1] - b[1]);

	return faces
}