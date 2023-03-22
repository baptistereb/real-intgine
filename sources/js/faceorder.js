function faceOrder (cama, dis, faces) {
	NewDisplay(dis,cama)
	var l=[]
	for (const i of faces) {
		console.log(i)
		let obj = {
			x : i[0],
			y : i[1],
			z : i[2],
			d : i[1] - base.y
		}
		l.append(obj)
	}

	l.sort(function(a, b){return b.d - a.d})

	console.log(l)
}



faceOrder(camera, display, [[100,40,45], [0,1,1], [3,4,5]])