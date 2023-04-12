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

function faceOrder (cama, dis, faces) {
	//NewDisplay(dis,cama)
	let l=[]
	for (const i of faces) {
		let distance = i[1] - base.y

		if(distance > 0) {
			l.push({
				x : i[0],
				y : i[1],
				z : i[2],
				d : distance
			})
		}
	}

	l.sort(function(a, b){return b.d - a.d})

	return l
}