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